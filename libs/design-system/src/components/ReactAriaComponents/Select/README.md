# Select

The Select component is a customizable dropdown that allows users to choose a single option from a list. It's built on top of React Aria's Select component, ensuring proper accessibility and keyboard navigation.

## Import

```tsx
import Select from '@crimeos-frontend/design-system'
import ListBoxItem from '@crimeos-frontend/design-system'
```

## Usage

### Basic Usage

```tsx
import Select from '@crimeos-frontend/design-system'
import ListBoxItem from '@crimeos-frontend/design-system'

const MyComponent = () => {
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <Select
         label='Choose an option'
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
      >
         <ListBoxItem key='option1' textValue='Option 1'>
            Option 1
         </ListBoxItem>
         <ListBoxItem key='option2' textValue='Option 2'>
            Option 2
         </ListBoxItem>
         <ListBoxItem key='option3' textValue='Option 3'>
            Option 3
         </ListBoxItem>
      </Select>
   )
}
```

### With Dynamic Items

```tsx
const options = [
   { key: 'option1', textValue: 'Option 1' },
   { key: 'option2', textValue: 'Option 2' },
   { key: 'option3', textValue: 'Option 3' }
]

const MyComponent = () => {
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <Select
         label='Choose an option'
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         items={options}
      >
         {item => (
            <ListBoxItem key={item.key} textValue={item.textValue}>
               {item.textValue}
            </ListBoxItem>
         )}
      </Select>
   )
}
```

### With Sections

```tsx
const MyComponent = () => {
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <Select
         label='Choose an animal'
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
      >
         <Section>
            <Header>Mammals</Header>
            <ListBoxItem key='dog' textValue='Dog'>
               Dog
            </ListBoxItem>
            <ListBoxItem key='cat' textValue='Cat'>
               Cat
            </ListBoxItem>
         </Section>
         <Section>
            <Header>Birds</Header>
            <ListBoxItem key='eagle' textValue='Eagle'>
               Eagle
            </ListBoxItem>
            <ListBoxItem key='sparrow' textValue='Sparrow'>
               Sparrow
            </ListBoxItem>
         </Section>
      </Select>
   )
}
```

### With Custom Rendering

```tsx
const MyComponent = () => {
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <Select
         label='Choose an option'
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         renderLeftIcon={() => <UserIcon />}
         renderCustomOption={({ item, isSelected }) => (
            <div className={`p-2 ${isSelected ? 'bg-blue-100' : ''}`}>
               <span>{item.textValue}</span>
               {isSelected && <CheckIcon className='ml-2' />}
            </div>
         )}
      >
         <ListBoxItem key='option1' textValue='Option 1'>
            Option 1
         </ListBoxItem>
         <ListBoxItem key='option2' textValue='Option 2'>
            Option 2
         </ListBoxItem>
         <ListBoxItem key='option3' textValue='Option 3'>
            Option 3
         </ListBoxItem>
      </Select>
   )
}
```

### With Error Message and Hint

```tsx
const MyComponent = () => {
   const [selectedKey, setSelectedKey] = useState(null)
   const [error, setError] = useState(null)

   const handleSelectionChange = key => {
      setSelectedKey(key)
      setError(key ? null : 'Please select an option')
   }

   return (
      <Select
         label='Choose an option'
         selectedKey={selectedKey}
         onSelectionChange={handleSelectionChange}
         errorMessage={error}
         hint='Select one of the available options'
         isRequired
      >
         <ListBoxItem key='option1' textValue='Option 1'>
            Option 1
         </ListBoxItem>
         <ListBoxItem key='option2' textValue='Option 2'>
            Option 2
         </ListBoxItem>
         <ListBoxItem key='option3' textValue='Option 3'>
            Option 3
         </ListBoxItem>
      </Select>
   )
}
```

## Props

### Select Props

The Select component extends React Aria's Select props with additional customization options.

| Prop                            | Type                  | Default              | Description                                       |
| ------------------------------- | --------------------- | -------------------- | ------------------------------------------------- |
| `label`                         | `ReactNode`           | -                    | Label for the select field                        |
| `size`                          | `'Small' \| 'Medium'` | `'Medium'`           | Size of the component                             |
| `hint`                          | `ReactNode`           | -                    | Hint text displayed below the select              |
| `errorMessage`                  | `ReactNode`           | -                    | Error message displayed when select is invalid    |
| `placeholder`                   | `string`              | `'select an option'` | Placeholder text for the select                   |
| `direction`                     | `'bottom' \| 'top'`   | `'bottom'`           | Direction for the popover to open                 |
| `align`                         | `'start' \| 'end'`    | `'start'`            | Alignment of the popover                          |
| `shouldFlip`                    | `boolean`             | `true`               | Whether the popover should flip if it doesn't fit |
| `focusRingVariant`              | `FocusRingVariant`    | -                    | Variant for the focus ring                        |
| `shouldShowClearButton`         | `boolean`             | `false`              | Whether to show a clear button                    |
| `shouldOpenPopoverOnLabelClick` | `boolean`             | `false`              | Whether clicking the label opens the popover      |
| `showLabel`                     | `boolean`             | `true`               | Whether to show the label                         |
| `isRequired`                    | `boolean`             | -                    | Whether the field is required                     |
| `dataTestId`                    | `string`              | `''`                 | Test ID for the component                         |
| `labelClassName`                | `string`              | `''`                 | Class name for the label                          |
| `hintClassName`                 | `string`              | `''`                 | Class name for the hint                           |
| `containerClassName`            | `string`              | `''`                 | Class name for the container                      |
| `inputButtonTextClassName`      | `string`              | `''`                 | Class name for the button text                    |
| `buttonClassName`               | `string`              | `''`                 | Class name for the button                         |
| `popOverStyles`                 | `CSSProperties`       | `{}`                 | Custom styles for the popover                     |
| `selectButtonRightIconHeight`   | `number`              | -                    | Height for the right icon                         |
| `selectButtonRightIconWidth`    | `number`              | -                    | Width for the right icon                          |
| `showSelectButtonRightIcon`     | `boolean`             | `true`               | Whether to show the right icon                    |
| `selectButtonClassName`         | `string`              | -                    | Class name for the select button                  |
| `listboxClassName`              | `string`              | `''`                 | Class name for the listbox                        |

### Render Props

| Prop                   | Type                                                  | Description                            |
| ---------------------- | ----------------------------------------------------- | -------------------------------------- |
| `renderCustomOption`   | `(props: CustomOptionProps<T>) => React.ReactElement` | Custom renderer for list options       |
| `renderRequiredIcon`   | `() => React.ReactElement`                            | Custom required icon renderer          |
| `renderValueContainer` | `(state: ValueContainerState) => React.ReactNode`     | Custom renderer for the selected value |
| `renderLeftIcon`       | `() => React.ReactNode`                               | Custom renderer for the left icon      |

## Accessibility

The Select component is built on top of React Aria's Select, ensuring proper accessibility features:

-  Keyboard navigation (arrow keys, Enter, Escape)
-  ARIA attributes for screen readers
-  Focus management
-  Label association with the select field

## States

The Select component handles various states:

-  **Default**: The initial state of the component
-  **Focus**: When the select field is focused
-  **Invalid**: When the select has an error
-  **Disabled**: When the component is disabled
-  **Open**: When the dropdown is open

## Customization

The Select component can be customized through:

-  Custom rendering of icons, options, and selected values
-  Custom styling via class names and style props
-  Size variations
-  Focus ring variants
-  Popover placement and alignment options

## Known Issues

There are some TypeScript linter errors in the stories file related to the ListBoxItem component. These errors occur because the ListBoxItem component expects certain props from React Aria's ListBoxItemRenderProps that are not being provided in the stories.

To fix these issues:

1. The ListBoxItem component should be updated to make the ListBoxItemRenderProps optional or provide default values
2. Alternatively, the stories should be updated to provide the required props

These issues do not affect the functionality of the component in actual usage, as React Aria provides these props when used in a real application.
