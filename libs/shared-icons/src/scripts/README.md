# Icon Management Guide

This guide explains how to manage icon assets in the project, including adding new icon categories and updating existing ones.

## Overview

The project uses SVG sprite sheets to efficiently manage icons. Icons are organized by categories (e.g., outline, solid, duotone), with each category having its own sprite sheet and component.

## Prerequisites

-  Node.js installed on your machine
-  ZIP file containing SVG icons from the design team

## Available Scripts

The following scripts are included to help manage icons:

-  **`svg-zip-processor.js`**: Processes SVG files from a ZIP archive and converts them to symbol format for use in a sprite sheet.
-  **`extract-icon-ids.js`**: Extracts icon IDs from an existing SVG sprite file to generate an array of available icons.

## Workflow for New Icon Categories

When adding a completely new icon category (e.g., adding "brand" icons when only "outline" and "solid" existed before):

1. **Receive Icon ZIP File**

   -  Obtain the ZIP file containing the new category icons from the design team.

2. **Process the ZIP File**

   -  Run the `svg-zip-processor.js` script to convert individual SVGs to a sprite sheet:
      ```bash
      node libs/shared/icons/src/scripts/svg-zip-processor.js <path-to-zip-file> <output-file-path>
      ```
   -  This will extract the ZIP file, process each SVG, and generate a combined sprite sheet.

3. **Add Sprite Sheet to the Project**

   -  Place the generated sprite sheet in the appropriate location (e.g., `apps/hive/src/assets/icons/`).
   -  Ensure the file is named according to convention (e.g., `brandIconSprite.svg`).

4. **Generate Icon ID Array**

   -  Modify the path in `extract-icon-ids.js` to point to your new sprite sheet.
   -  Run the script to extract all icon IDs:
      ```bash
      node libs/shared/icons/src/scripts/extract-icon-ids.js
      ```
   -  The script will output a JSON file with all icon IDs.

5. **Create a Sprite Component**

   -  Create a new component in `libs/shared/icons/src/components/` (e.g., `SpriteBrandIcons`).
   -  Use the exported icon IDs array in this component.
   -  revert create ids json file
   -  Follow the pattern in existing sprite components like `SpriteOutlineIcons`.

6. **Update the Icon Component**
   -  Add a new case in the switch statement in `libs/shared/icons/src/components/Icon/Icon.tsx`.
   -  This allows the main Icon component to handle the new category.

## Workflow for Existing Icon Categories

When adding new icons to an existing category (e.g., adding more outline icons):

1. **Receive Updated Icon ZIP File**

   -  Obtain the ZIP file containing the updated icons from the design team.

2. **Process the ZIP File**

   -  Run the `svg-zip-processor.js` script to process the new icons.
   -  If completely replacing the sprite, use the output directly.
   -  If merging with existing sprites, manual merging may be required.

3. **Generate and Compare Icon IDs**

   -  Run `extract-icon-ids.js` against both the old and new sprite sheets.
   -  Compare the arrays to identify new additions.
   -  **IMPORTANT**: Verify that no existing icons were removed. If any are missing, stop and consult with the design team.

4. **Update the Sprite Component**
   -  Update the icon IDs array in the respective component (e.g., `SpriteOutlineIcons.tsx`).
   -  Ensure all new icons are included while preserving existing ones.

## Best Practices

1. **Maintain Naming Consistency**

   -  Ensure icon IDs follow the project's naming conventions.
   -  Typically, use kebab-case for icon IDs (e.g., `arrow-right`, `user-profile`).

2. **Remove Fill Attributes**

   -  SVG icons should not have hardcoded fill values to allow for color customization.
   -  Check and remove any default `fill` attributes in the sprite SVG file.

3. **Test Icons After Implementation**

   -  Verify that all icons render correctly after implementation.
   -  Test different sizes and colors to ensure proper scaling and color application.

4. **Document Changes**
   -  Keep track of icon additions and changes.
   -  Communicate updates to the development team.

## Reference Files

-  **Example Sprite Sheet**: `apps/hive/src/assets/icons/outlineIconSprite.svg`
-  **Example Sprite Component**: `libs/shared/icons/src/components/SpriteOutlineIcons/SpriteOutlineIcons.tsx`
-  **Main Icon Component**: `libs/shared/icons/src/components/Icon/Icon.tsx`
