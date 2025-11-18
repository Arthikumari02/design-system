# ComboBox

The ComboBox component is a versatile input field that combines a text input with a dropdown list. It allows users to either type directly into the input field or select from a list of options. The component supports both synchronous and asynchronous data loading, custom rendering, and various customization options.

## Import

```tsx
import { ComboBox } from '@crimeos-frontend/design-system'
import { AsyncComboBox } from '@crimeos-frontend/design-system'
```

## Usage

### Basic Usage

```tsx
import { ComboBox } from '@crimeos-frontend/design-system'
import { ListBoxItem } from '@crimeos-frontend/design-system'

const MyComponent = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <ComboBox
         label='City'
         inputValue={inputValue}
         onInputChange={setInputValue}
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         placeholder='Search cities'
      >
         <ListBoxItem key='item1' textValue='New York'>
            New York
         </ListBoxItem>
         <ListBoxItem key='item2' textValue='Los Angeles'>
            Los Angeles
         </ListBoxItem>
         <ListBoxItem key='item3' textValue='Chicago'>
            Chicago
         </ListBoxItem>
      </ComboBox>
   )
}
```

### With Dynamic Items

```tsx
const items = [
   { key: 'item1', textValue: 'New York' },
   { key: 'item2', textValue: 'Los Angeles' },
   { key: 'item3', textValue: 'Chicago' }
]

const MyComponent = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <ComboBox
         label='City'
         inputValue={inputValue}
         onInputChange={setInputValue}
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         placeholder='Search cities'
         defaultItems={items}
      >
         {item => (
            <ListBoxItem key={item.key} textValue={item.textValue}>
               {item.textValue}
            </ListBoxItem>
         )}
      </ComboBox>
   )
}
```

### Asynchronous Data Loading

```tsx
import { AsyncComboBox } from '@design-system/components/ReactAriaComponents/ComboBox/AsyncComboBox'

const MyComponent = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState(null)

   // API function to fetch data
   const fetchData = async (page: number, filterText?: string) => {
      // Simulate API call
      const response = await fetch(
         `/api/cities?page=${page}&search=${filterText || ''}`
      )
      return response.json()
   }

   return (
      <AsyncComboBox
         label='City'
         inputValue={inputValue}
         onInputChange={setInputValue}
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         placeholder='Search cities'
         apiProps={{
            apiFunction: fetchData,
            isInfiniteScrollable: true,
            shouldFetchMore: true
         }}
      />
   )
}
```

### With Custom Rendering

```tsx
const MyComponent = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState(null)

   return (
      <ComboBox
         label='City'
         inputValue={inputValue}
         onInputChange={setInputValue}
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         placeholder='Search cities'
         renderLeftIcon={() => <SearchIcon />}
         renderRightIcon={() => <ChevronDownIcon />}
         renderNoResults={() => <div>No cities found</div>}
         renderCustomOption={({ item, isSelected }) => (
            <div className={isSelected ? 'bg-blue-100' : ''}>
               <span>{item.textValue}</span>
               {isSelected && <CheckIcon />}
            </div>
         )}
      >
         <ListBoxItem key='item1' textValue='New York'>
            New York
         </ListBoxItem>
         <ListBoxItem key='item2' textValue='Los Angeles'>
            Los Angeles
         </ListBoxItem>
         <ListBoxItem key='item3' textValue='Chicago'>
            Chicago
         </ListBoxItem>
      </ComboBox>
   )
}
```

### With Creatable Options

```tsx
const MyComponent = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState(null)
   const [items, setItems] = useState([
      { key: 'item1', textValue: 'New York' },
      { key: 'item2', textValue: 'Los Angeles' },
      { key: 'item3', textValue: 'Chicago' }
   ])

   const handleCreateOption = (text, onCreate) => {
      const newItem = { key: `new-${Date.now()}`, textValue: text }
      setItems([...items, newItem])
      setSelectedKey(newItem.key)
      setInputValue(text)
      onCreate()
   }

   return (
      <ComboBox
         label='City'
         inputValue={inputValue}
         onInputChange={setInputValue}
         selectedKey={selectedKey}
         onSelectionChange={setSelectedKey}
         placeholder='Search or create city'
         defaultItems={items}
         creatableOptionProps={{
            isCreatable: true,
            onClickCreateOption: handleCreateOption,
            createText: 'Create new city:'
         }}
      >
         {item => (
            <ListBoxItem key={item.key} textValue={item.textValue}>
               {item.textValue}
            </ListBoxItem>
         )}
      </ComboBox>
   )
}
```

## Props

### ComboBox Props

The ComboBox component extends React Aria's ComboBox props with additional customization options.

| Prop                         | Type                                           | Default    | Description                                   |
| ---------------------------- | ---------------------------------------------- | ---------- | --------------------------------------------- |
| `label`                      | `ReactNode`                                    | -          | Label for the input field                     |
| `size`                       | `'Small' \| 'Medium'`                          | `'Medium'` | Size of the component                         |
| `hint`                       | `ReactNode`                                    | -          | Hint text displayed below the input           |
| `errorMessage`               | `ReactNode`                                    | -          | Error message displayed when input is invalid |
| `placeholder`                | `string`                                       | -          | Placeholder text for the input                |
| `focusRingVariant`           | `FocusRingVariant`                             | -          | Variant for the focus ring                    |
| `popOverStyles`              | `CSSProperties`                                | -          | Custom styles for the popover                 |
| `labelClassName`             | `string`                                       | -          | Class name for the label                      |
| `listboxClassName`           | `string`                                       | -          | Class name for the listbox                    |
| `leftIconContainerClassName` | `string`                                       | -          | Class name for the left icon container        |
| `inputClassName`             | `string`                                       | -          | Class name for the input                      |
| `renderRequiredIcon`         | `() => ReactElement`                           | -          | Custom required icon renderer                 |
| `isClearable`                | `boolean`                                      | `true`     | Whether the input can be cleared              |
| `renderNoResults`            | `() => ReactNode`                              | -          | Custom renderer for no results state          |
| `renderLeftIcon`             | `() => ReactNode`                              | -          | Custom renderer for left icon                 |
| `renderRightIcon`            | `() => ReactNode`                              | -          | Custom renderer for right icon                |
| `renderCustomOption`         | `(args: CustomOptionProps<T>) => ReactElement` | -          | Custom renderer for list options              |
| `renderCustomLoading`        | `() => ReactNode`                              | -          | Custom renderer for loading state             |
| `renderCustomError`          | `(onApiRetry: () => void) => ReactNode`        | -          | Custom renderer for error state               |
| `creatableOptionProps`       | `CreatableOptionProps`                         | -          | Props for creatable options functionality     |

### AsyncComboBox Props

The AsyncComboBox component extends the ComboBox props with additional props for asynchronous data loading.

| Prop          | Type                                                                                                                                                    | Default | Description                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------- |
| `apiProps`    | `{ isInfiniteScrollable: boolean; shouldFetchMore?: boolean; apiFunction: (page: number, filterText?: string, signal?: AbortSignal) => Promise<any>; }` | -       | Configuration for API calls      |
| `removedKeys` | `string[]`                                                                                                                                              | -       | Keys to be removed from the list |

## Accessibility

The ComboBox component is built on top of React Aria's ComboBox, ensuring proper accessibility features:

-  Keyboard navigation (arrow keys, Enter, Escape)
-  ARIA attributes for screen readers
-  Focus management
-  Label association with the input field

## States

The ComboBox component handles various states:

-  **Default**: The initial state of the component
-  **Focus**: When the input field is focused
-  **Invalid**: When the input has an error
-  **Disabled**: When the component is disabled
-  **Loading**: When data is being loaded
-  **Error**: When data loading fails
-  **Empty**: When no results match the search criteria

## Customization

The ComboBox component can be customized through:

-  Custom rendering of icons, options, and state views
-  Custom styling via class names and style props
-  Size variations
-  Focus ring variants
-  Creatable options functionality
