import copy
import json
import os 

CSS_VARIABLE_TEMPLATE = "\t--{}: {};\n"
# Load the exported variables from Figma
with open("./raw_figma_tokens_v2.json", "rb") as file:
    input_data = json.load(file)

PRIMITIVES_CUSTOM_KEY = "PRIMITIVES"
PRIMITIVES_COLORS_KEY = "Colors"
PRIMITIVES_SPACING_KEY = "Spacing"

THEMES_CUSTOM_KEY = "THEMES"
SEMANTICS_CUSTOM_KEY = "SEMANTICS"

MODE_CUSTOM_KEY = "MODES"
LIGHT_MODE_CUSTOM_KEY = "LIGHT"
DARK_MODE_CUSTOM_KEY = "DARK"

MODE_COLORS_KEY = "Colors"
MODE_COLORS_TEXT = "Text"
MODE_COLORS_BORDER = "Border"
MODE_COLORS_BACKGROUND = "Background"
MODE_COLORS_FOREGROUND_KEY = "Foreground"

MODE_COMPONENT_COLORS_KEY = "Component colors"
MODE_COMPONENT_UTILITY_COLORS_KEY = "Utility"
MODE_COMPONENT_COMPONENTS_COLORS_KEY = "Components"

CONTAINERS_CUSTOM_KEY = "CONTAINERS"
WIDTHS_CUSTOM_KEY = "WIDTHS"
SPACING_CUSTOM_KEY = "SPACING"
RADIUS_CUSTOM_KEY = "RADIUS"

ALL_COLOR_POINTER_KEYS = [PRIMITIVES_COLORS_KEY, MODE_COLORS_FOREGROUND_KEY]


def generate_clean_style_name(dirty_name):
    return (
        dirty_name.replace(" ", "-")
        .replace(".", "-")
        .replace("(", "")
        .replace(")", "")
        .lower()
    )

def clean_var_name_for_reverence_value(val):
    remove_wrapping_brackets = val[1:-1]
    partially_cleaned_name = "-".join(remove_wrapping_brackets.split(".")[1:])
    clean_reference_value = generate_clean_style_name(partially_cleaned_name)
    return clean_reference_value

def generate_css_var_for_reference_value(val):
    clean_reference_value = clean_var_name_for_reverence_value(val)
    return "var(--{clean_reference_value})".format(
        clean_reference_value=clean_reference_value
    )

def get_z_indexes():
    indexes = []
    for i in range(0, 12):
        indexes.append(CSS_VARIABLE_TEMPLATE.format("z-l{}".format(i), i*100))
    return indexes

def generate_root_css_files(rootfolder, data_dict):
    FILE_TEMPLATE = """
@import './blue.css';

@import './dark.css';
@import './light.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {css_variables}


"""

    def form_base_colors(colors):
        base_css_variables = []
        for cat in sorted(colors.keys()):
            for sub_cat, data in colors[cat].items():
                color = data["$value"]
                key_name = generate_clean_style_name("{}-{}".format(cat, sub_cat))
                base_css_variables.append(CSS_VARIABLE_TEMPLATE.format(key_name, color))
        return base_css_variables


    colors = data_dict[PRIMITIVES_CUSTOM_KEY][PRIMITIVES_COLORS_KEY]
    base_css_variables = form_base_colors(colors)
    z_indexes = get_z_indexes()

    processed_data = f'{{ \n{"".join(base_css_variables + z_indexes)}\n }}'
    processed_file_template = FILE_TEMPLATE.format(css_variables=processed_data)

    with open(f"{rootfolder}/root.css", "w") as file:
        file.write(processed_file_template)

def generate_semantic_css_files(rootfolder, data_dict):
    FILE_TEMPLATE = ".{theme} {css_variables}"
    CSS_VARIABLE_TEMPLATE = "\t--{}: {};\n"
    dependent_variables = []

    themes = data_dict[THEMES_CUSTOM_KEY]
    for theme, theme_semantics in themes.items():
        colors = theme_semantics[SEMANTICS_CUSTOM_KEY]
        for cat in sorted(colors.keys()):
            for sub_cat, data in colors[cat].items():
                color = data["$value"]
                key_name = generate_clean_style_name("{}-{}".format(cat, sub_cat))

                dependent_variables.append(
                    CSS_VARIABLE_TEMPLATE.format(
                        key_name, generate_css_var_for_reference_value(color)
                    )
                )

        processed_data = f'{{ \n{"".join(dependent_variables)}\n }}'
        with open(f"{rootfolder}/{theme.lower()}.css", "w") as file:
            file.write(FILE_TEMPLATE.format(theme=theme, css_variables=processed_data))


def clean_var_name_for_reverence_value_theme(val):
    if '{' in val or '}' in val: 
        remove_wrapping_brackets = val[1:-1]
        if 'Colors.Semantic' in remove_wrapping_brackets:
            partially_cleaned_name = "-".join(remove_wrapping_brackets.split(".")[2:])
            clean_reference_value = generate_clean_style_name(partially_cleaned_name)
        elif 'Colors' in remove_wrapping_brackets:
            partially_cleaned_name = "-".join(remove_wrapping_brackets.split(".")[1:])
            clean_reference_value = generate_clean_style_name(partially_cleaned_name)
        else:
            print(val)
            raise NotImplementedError 

        return "var(--{clean_reference_value})".format(
            clean_reference_value=clean_reference_value
        )
    elif 'rgba' in val:
        return val 


def get_colors(colors):
    color_variables = []
    for sub_cat, data in colors.items():
        color = data["$value"]
        key_name = generate_clean_style_name(sub_cat)

        color_variables.append(
            CSS_VARIABLE_TEMPLATE.format(
                key_name, clean_var_name_for_reverence_value_theme(color)
            )
        )
    return color_variables

def get_utility_colors(colors):
    color_variables = []
    for _, cat in colors.items():
        for sub_cat, data in cat.items():
            color = data["$value"]
            key_name = generate_clean_style_name(sub_cat)

            color_variables.append(
                CSS_VARIABLE_TEMPLATE.format(
                    key_name, clean_var_name_for_reverence_value_theme(color)
                )
            )

    return color_variables


def get_component_colors(components):
    color_variables = []
    for comp_name, data in components.items():
        key_name = generate_clean_style_name(comp_name)
        color = data["$value"]

        # TODO: assumption is it will refer only semantics
        color_variables.append(
                CSS_VARIABLE_TEMPLATE.format(
                    key_name, clean_var_name_for_reverence_value_theme(color)
                )
            )

    return color_variables

def generate_theme_css_files(rootfolder, data_dict):
    FILE_TEMPLATE = ".{mode} {css_variables}"

    theme_colors = data_dict[MODE_CUSTOM_KEY]

    for mode, colors_and_component_colors in theme_colors.items():
        raw_text_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_TEXT]
        text_colors = get_colors(raw_text_colors)

        raw_border_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_BORDER]
        border_colors = get_colors(raw_border_colors)
        
        raw_bg_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_BACKGROUND]
        bg_colors = get_colors(raw_bg_colors)

        raw_fg_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_FOREGROUND_KEY]
        fg_colors = get_colors(raw_fg_colors)

        raw_utility_colors = colors_and_component_colors[MODE_COMPONENT_COLORS_KEY][MODE_COMPONENT_UTILITY_COLORS_KEY]
        utility_colors = get_utility_colors(raw_utility_colors)


        raw_component = colors_and_component_colors[MODE_COMPONENT_COLORS_KEY][MODE_COMPONENT_COMPONENTS_COLORS_KEY]
        components = get_components(raw_component)
        component_colors = get_component_colors(components)


        processed_data = f'{{ \n{"".join(text_colors + border_colors + bg_colors + fg_colors + utility_colors + component_colors)}\n }}'
        with open(f"{rootfolder}/{mode.lower()}.css", "w") as file:
            file.write(FILE_TEMPLATE.format(mode=mode.lower(), css_variables=processed_data))


def generate_css_files(data_dict):
    rootfolder = "libs/design-system/src/Theme/styles"
    generate_root_css_files(rootfolder, data_dict)
    generate_semantic_css_files(rootfolder, data_dict)
    generate_theme_css_files(rootfolder, data_dict)


def get_spacing(data_dict):
    primitive_spacing = data_dict[PRIMITIVES_CUSTOM_KEY][PRIMITIVES_SPACING_KEY]
    tm_spacing_var_dict = {}

    for key, value in primitive_spacing.items():
        # In raw token files, we have get One Dot Leader(\u2024) instead of dot(.)
        key = key.replace("\u2024", ".")
        key=key.split(" ")[0]
        tm_spacing_var_dict[f'{key}'] = f'{value["$value"]}px'

    spacing = data_dict[SPACING_CUSTOM_KEY]
    for dirty_variable_name in spacing.keys():
        clean_variable_name = generate_clean_style_name(dirty_variable_name)
        dirty_value = spacing[dirty_variable_name]["$value"]

        new_key = dirty_value[1:-1].replace("Spacing.", "")
        key=clean_variable_name.replace("spacing-", "")
        tm_spacing_var_dict[f'{key}'] = f'{primitive_spacing[new_key]["$value"]}px'

    return tm_spacing_var_dict

def get_radius_variables(data_dict):
    ## Radius Handling
    radius_config = data_dict[RADIUS_CUSTOM_KEY]
    tw_radius_variables = {}
    for key, value in radius_config.items():
        tw_radius_variables[key.replace("radius-", "")] = "{}px".format(value["$value"])

    return tw_radius_variables

def get_widths(data_dict):
        ## Widths Handling
    width_config = data_dict[WIDTHS_CUSTOM_KEY]
    tw_width_variables = ""

    for key, value in width_config.items():
        width_template = "'{key}': theme({value}),\n"
        tw_width_variables += width_template.format(
            key=key.replace("width-", ""),
            value="'{}'".format(
                ".".join(value["$value"][1:-1].lower().split()[0].split("."))
            ),
        )
    tw_width_variables = f"{{{tw_width_variables}}}"

    return tw_width_variables


def get_base_colors(data_dict):
    tw_base_color_variables = {}
    colors = data_dict[PRIMITIVES_CUSTOM_KEY][PRIMITIVES_COLORS_KEY]

    for cat in sorted(colors.keys()):
        for sub_cat in sorted(colors[cat].keys()):
            key_name = generate_clean_style_name("{}-{}".format(cat, sub_cat))
            tw_base_color_variables[key_name] = "var(--{var_name})".format(var_name=key_name)

    semantic_colors = data_dict[THEMES_CUSTOM_KEY]['blue'][SEMANTICS_CUSTOM_KEY]
    for cat in sorted(semantic_colors.keys()):
        for sub_cat in sorted(semantic_colors[cat].keys()):
            key_name = generate_clean_style_name("{}-{}".format(cat, sub_cat))
            tw_base_color_variables[key_name] = "var(--{var_name})".format(var_name=key_name)

    return tw_base_color_variables

def get_colors_vars(colors):
    tw_color_variables = {}
    for sub_cat in colors.keys():
        color_key_name = " ".join(sub_cat.split("-")[1:])
        key_name = generate_clean_style_name(color_key_name)

        value_name = generate_clean_style_name(sub_cat)
        tw_color_variables[key_name] = "var(--{var_name})".format(var_name=value_name)

    return tw_color_variables

def get_fg_colors_vars(colors):
    tw_color_variables = {}
    for sub_cat in colors.keys():
        color_key_name = " ".join(sub_cat.split("-"))
        key_name = generate_clean_style_name(color_key_name)

        value_name = generate_clean_style_name(sub_cat)
        tw_color_variables[key_name] = "var(--{var_name})".format(var_name=value_name)

    return tw_color_variables

def get_utility_color_vars(colors):
    tw_color_variables = {}
    for _, cat in colors.items():
        for sub_cat, data in cat.items():
            key_name = generate_clean_style_name(sub_cat)

            tw_color_variables[key_name] = "var(--{var_name})".format(var_name=key_name)

    return tw_color_variables

def get_component_color_vars(components): 
    theme_color_variables = {}
    tw_derived_color_variables = {}

    for dirty_variable_name, value in components.items():
        clean_variable_name = generate_clean_style_name(dirty_variable_name)
        updated_key = ".{}".format(clean_variable_name)
        dirty_value = value["$value"]

        theme_color_variables[updated_key] = {
            dirty_value: "var(--{clean_reference_value})".format(
                clean_reference_value=clean_variable_name
            )
        }

    keys_to_delete = []
    updated_theme_color_variables = copy.deepcopy(theme_color_variables)
    for key, value in theme_color_variables.items():
        if "-bg" in key or "bg-" in key:
            if "backgroundColor" in value:
                continue
            updated_theme_color_variables[key] = {
                "backgroundColor": list(value.values())[0]
            }
        elif "-border" in key or "border-" in key:
            if "backgroundColor" in value:
                continue
            updated_theme_color_variables[key] = {
                "borderColor": list(value.values())[0]
            }
        elif (
            (("-fg" in key or "fg-" in key) or ("utility-" in key or "-utility" in key))
            and "-text" not in key
            or "-bg" in key
            or "-border" in key
        ):
            color_value = list(value.values())[0]
            color_value = color_value.replace("colors.", "_baseColors.")
            tw_derived_color_variables[f"{key[1:]}"] = "{value}".format(value=color_value)
            keys_to_delete.append(key)
        else:
            updated_theme_color_variables[key] = {"color": list(value.values())[0]}

    for key_ in keys_to_delete:
        updated_theme_color_variables.pop(key_)
    
    return tw_derived_color_variables, updated_theme_color_variables

def get_components(components_raw_dict):
    component_plugin_colors = {}

    component_plugin_colors.update(components_raw_dict["App store badges"])
    component_plugin_colors.update(components_raw_dict["Application navigation"])
    component_plugin_colors.update(components_raw_dict["Avatars"])
    component_plugin_colors.update(components_raw_dict["Breadcrumbs"])

    for _, value in components_raw_dict["Buttons"].items():
        component_plugin_colors.update(value)

    component_plugin_colors.update(components_raw_dict["Footers"])
    component_plugin_colors.update(components_raw_dict["Header sections"])

    component_plugin_colors.update(components_raw_dict["Icons"].get("Icons", {}))

    for _, value in components_raw_dict["Icons"].get("Featured icons", {}).items():
        component_plugin_colors.update(value)

    component_plugin_colors.update(components_raw_dict["Icons"].get("Social icons", {}))

    component_plugin_colors.update(components_raw_dict["Mockups"])
    component_plugin_colors.update(components_raw_dict["Sliders"])
    component_plugin_colors.update(components_raw_dict["Thumbnail"])
    component_plugin_colors.update(components_raw_dict["Toggles"])
    component_plugin_colors.update(components_raw_dict["Tooltips"])
    component_plugin_colors.update(components_raw_dict["WYSIWYG editor"])

    return component_plugin_colors


def generate_tailwind_config_file(data_dict):
    TAILWIND_CONFIG_FILE_TEMPLATE = """const plugin = require('tailwindcss/plugin') \n\n
    /** @type {{import('tailwindcss').Config}} */\n\n
    
    module.exports = {{
    theme: {{
        extend: {{
            _baseColors: {baseColors},
            _fgColors: {fgColors},
            _utilityColors: {utilityColors},
            _componentColors: {componentColors},
            colors: ({{ theme }}) => ({{ ...theme('_fgColors'), ...theme('_utilityColors'), ...theme('_baseColors'), ...theme('_componentColors')}}),

            backgroundColor: ({{theme}}) => ({{
                ...theme('colors'),
                  {bgColors}
            }}),
            borderColor: ({{theme}}) => ({{
                ...theme('colors'),
                  {borderColors}
            }}),
            textColor: ({{theme}}) => ({{
                ...theme('colors'),
                  {textColors}
            }}),

            borderRadius: {borderRadius},
            borderWidth: {borderWidth},

            spacing: {spacing},

            gap: ({{ theme }}) => theme('spacing'),
            margin: ({{ theme }}) => ({{
                ...theme('spacing'),
                auto: 'auto',
            }}),
            padding: ({{ theme }}) => ({{
                ...theme('spacing'),
                {calculatedPaddings}
            }}),

            width: ({{ theme }}) => ({width}),
        }},
    }},

    plugins: [{componentPlugins}]

    }}"""

    ## Base Colors
    # TODO: Remove base colors and theme colors this after proper reference changes are made
    base_color_vars = get_base_colors(data_dict)

    colors_and_component_colors = data_dict[MODE_CUSTOM_KEY][LIGHT_MODE_CUSTOM_KEY]

    raw_text_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_TEXT]
    tw_text_color_variables = get_colors_vars(raw_text_colors)

    raw_border_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_BORDER]
    tw_border_color_variables = get_colors_vars(raw_border_colors)
    
    raw_bg_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_BACKGROUND]
    tw_bg_color_variables = get_colors_vars(raw_bg_colors)

    raw_fg_colors = colors_and_component_colors[MODE_COLORS_KEY][MODE_COLORS_FOREGROUND_KEY]
    # TODO: here adding prefix fg also in key, as we are using in the code already 
    fg_colors = get_fg_colors_vars(raw_fg_colors)

    raw_utility_colors = colors_and_component_colors[MODE_COMPONENT_COLORS_KEY][MODE_COMPONENT_UTILITY_COLORS_KEY]
    
    utility_colors = get_utility_color_vars(raw_utility_colors)

    raw_component = colors_and_component_colors[MODE_COMPONENT_COLORS_KEY][MODE_COMPONENT_COMPONENTS_COLORS_KEY]
    components = get_components(raw_component)
    tw_derived_color_variables, updated_theme_color_variables = get_component_color_vars(components)
    
        
    tw_spacing_variables = get_spacing(data_dict)
    tw_radius_variables = get_radius_variables(data_dict)
    tw_width_variables = get_widths(data_dict)

    ## (Temporary) Border Width Handling
    possible_border_width = {'1':'1px'}

    ## Modified Padding Handling
    tw_stringified_padding_variables = ""
    possible_padding_values = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl', '11xl' ]
    for padding_value in possible_padding_values:
        for border_width_value in possible_border_width.keys():
            key = "{prefix}_border-{suffix}".format(prefix=padding_value, suffix=border_width_value)
            value = '`calc(${{theme("spacing.{prefix}")}} - ${{theme("borderWidth.{suffix}")}})`'.format(prefix=padding_value, suffix=border_width_value)
            tw_stringified_padding_variables += "'{key}': {value},\n".format(
                key=key,
                value=value,
            )
    
    COMPONENTS_PLUGINS_TEMPLATE = """plugin(function ({{ addComponents, theme }}) {{
       addComponents({theme_color_variables})
    }})"""

    output_ = TAILWIND_CONFIG_FILE_TEMPLATE.format(
        baseColors=base_color_vars,
        fgColors=json.dumps(fg_colors, indent=12),
        utilityColors=json.dumps(utility_colors, indent=12),
        componentColors=json.dumps(tw_derived_color_variables, indent=12),
        bgColors=json.dumps(tw_bg_color_variables, indent=12)[1:-1],
        borderColors=json.dumps(tw_border_color_variables, indent=12)[1:-1],
        textColors=json.dumps(tw_text_color_variables, indent=12)[1:-1],
        borderRadius=json.dumps(tw_radius_variables, indent=12),
        borderWidth=json.dumps(possible_border_width, indent=12),
        width=tw_width_variables,
        spacing=json.dumps(tw_spacing_variables, indent=12),
        calculatedPaddings=tw_stringified_padding_variables,
        componentPlugins=COMPONENTS_PLUGINS_TEMPLATE.format(
            theme_color_variables=json.dumps(updated_theme_color_variables)
        )
    )
    with open("../../src/Theme/styles/generated_tailwind_config.js", "w", encoding='utf-8') as file:
        file.write(output_)


if __name__ == "__main__":
    generate_css_files(input_data)
    generate_tailwind_config_file(input_data)

    print("Processing completed successfully. Output written to 'variableOutput.json'.")
