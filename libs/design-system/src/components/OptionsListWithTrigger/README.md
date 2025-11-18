# OptionsListWithTrigger

The OptionsListWithTrigger component is a wrapper around the OptionsList component that adds a trigger element and popover functionality. It provides a complete dropdown selection experience with a trigger button that displays the selected values.

## Import

```tsx
import OptionsListWithTrigger from '@crimeos-frontend/design-system'
```

## Usage

### Basic Usage

```tsx
import OptionsListWithTrigger from '@crimeos-frontend/design-system'

const items = [
   { key: '1', textValue: 'Option 1' },
   { key: '2', textValue: 'Option 2' },
   { key: '3', textValue: 'Option 3' }
]

const MyComponent = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = items.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   return (
      <OptionsListWithTrigger
         items={items}
         selectedKeys={selectedKeys}
         selectedItems={selectedItems}
         onSelectionChange={setSelectedKeys}
         placeholder='Select options'
         label='Options'
      />
   )
}
```

### Single Selection

```tsx
<OptionsListWithTrigger
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   selectionMode='single'
   placeholder='Select an option'
   label='Select one option'
/>
```

### Multiple Selection with Clear Button

```tsx
<OptionsListWithTrigger
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   selectionMode='multiple'
   placeholder='Select options'
   label='Select multiple options'
   isClearable={true}
/>
```

### With Error Message and Hint

```tsx
<OptionsListWithTrigger
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   placeholder='Select options'
   label='Options with validation'
   errorMessage='Please select at least one option'
   hint='Select from the available options'
   isRequired={true}
/>
```

### With Custom Trigger

```tsx
<OptionsListWithTrigger
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   customTrigger={triggerRef => (
      <button ref={triggerRef} className='custom-trigger'>
         Click to select options
      </button>
   )}
/>
```

### With Custom Selected Option Rendering

```tsx
<OptionsListWithTrigger
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   label='Custom selected options'
   renderCustomSelectedOption={option => (
      <div className='custom-selected-option'>{option.textValue}</div>
   )}
/>
```

## Props

OptionsListWithTrigger extends most props from OptionsList, with some additional props specific to the trigger and popover functionality.

### Trigger and Popover Props

| Prop                          | Type                                                               | Default          | Description                                                   |
| ----------------------------- | ------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------- |
| `isOpen`                      | `boolean`                                                          | Internal state   | Whether the popover is open                                   |
| `setIsOpen`                   | `(isOpen: boolean) => void`                                        | Internal handler | Function to control the open state                            |
| `errorMessage`                | `string`                                                           | `undefined`      | Error message to display below the trigger                    |
| `hint`                        | `string \| null`                                                   | `undefined`      | Hint text to display below the trigger                        |
| `isRequired`                  | `boolean`                                                          | `undefined`      | Whether the field is required                                 |
| `label`                       | `string`                                                           | `undefined`      | Label for the trigger                                         |
| `placeholder`                 | `string`                                                           | `undefined`      | Placeholder text when no options are selected                 |
| `isClearable`                 | `boolean`                                                          | `undefined`      | Whether to show a clear button                                |
| `isDisabled`                  | `boolean`                                                          | `undefined`      | Whether the trigger is disabled                               |
| `labelClassName`              | `string`                                                           | `undefined`      | Class name for the label                                      |
| `customTrigger`               | `(triggerRef: React.RefObject<HTMLElement>) => React.ReactElement` | `undefined`      | Custom render function for the trigger                        |
| `prefixEnhancer`              | `() => React.ReactElement`                                         | `undefined`      | Element to render before the trigger content                  |
| `renderCustomSelectedOption`  | `(option: ListItemType) => React.ReactElement`                     | `undefined`      | Custom render function for selected options in the trigger    |
| `defaultSelectedTagClass`     | `string`                                                           | `undefined`      | Class name for the default selected tag                       |
| `defaultSelectedTagTextClass` | `string`                                                           | `undefined`      | Class name for the text in the default selected tag           |
| `isDefaultTagClearable`       | `boolean`                                                          | `undefined`      | Whether the default selected tags can be cleared individually |
| `containerStyles`             | `string`                                                           | `undefined`      | Additional styles for the container                           |
| `popoverStyles`               | `CSSProperties`                                                    | `undefined`      | Styles for the popover                                        |
| `popoverClassNames`           | `string`                                                           | `undefined`      | Class names for the popover                                   |
| `offset`                      | `number`                                                           | `0`              | Offset distance for the popover                               |
| `defaultSelectedTagWidth`     | `number`                                                           | `undefined`      | Width for the default selected tags                           |
| `popoverPlacement`            | `Placement`                                                        | `undefined`      | Placement of the popover relative to the trigger              |
| `size`                        | `'Small' \| 'Medium'`                                              | `undefined`      | Size of the trigger                                           |

### Inherited OptionsList Props

The component also inherits most props from OptionsList:

| Prop                     | Type                                                | Description                                                 |
| ------------------------ | --------------------------------------------------- | ----------------------------------------------------------- |
| `selectedKeys`           | `string[]`                                          | Array of selected item keys                                 |
| `selectedItems`          | `ListItemType[]`                                    | Array of selected items                                     |
| `onSelectionChange`      | `(keys: string[], isFromPopover?: boolean) => void` | Callback when selection changes                             |
| `items`                  | `ListItemType[]`                                    | Array of items to display in the list                       |
| `selectionMode`          | `'single' \| 'multiple'`                            | Selection mode for the list                                 |
| `isSearchable`           | `boolean`                                           | Whether to show search input in the options list            |
| `disallowEmptySelection` | `boolean`                                           | Whether to prevent empty selection                          |
| `disabledKeys`           | `string[]`                                          | Array of keys for disabled items                            |
| `removedKeys`            | `string[]`                                          | Array of keys for items to be removed from the list         |
| `showSelectedValue`      | `boolean`                                           | Whether to show selected values as tags in the options list |
| `isAsync`                | `boolean`                                           | Whether to load items asynchronously                        |
| `apiProps`               | `ApiProps`                                          | API configuration for async loading                         |
| `description`            | `string \| null`                                    | Description text to display in the options list             |
| `autoFocus`              | `boolean`                                           | Whether to auto-focus the input in the options list         |
| `creatableOptionProps`   | `CreatableOptionProps`                              | Configuration for creatable options                         |

## Accessibility

The OptionsListWithTrigger component is built using React Aria's components, ensuring proper accessibility features:

-  Keyboard navigation (arrow keys, Enter, Escape)
-  Screen reader announcements
-  ARIA attributes for roles and states
-  Focus management
-  Proper labeling and error message association

## Customization

The OptionsListWithTrigger component can be customized through:

-  Custom trigger rendering
-  Custom selected option rendering
-  Custom styling via class names and style props
-  Popover placement and offset configuration
-  Size variations
