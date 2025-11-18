# OptionsList

The OptionsList component is a versatile and customizable dropdown list component that supports single and multiple selection, searching, async loading, infinite scrolling, and creatable options.

## Import

```tsx
import OptionsList from '@crimeos-frontend/design-system'
```

## Usage

### Basic Usage

```tsx
import OptionsList from '@crimeos-frontend/design-system'

const items = [
   { key: '1', textValue: 'Option 1' },
   { key: '2', textValue: 'Option 2' },
   { key: '3', textValue: 'Option 3' }
]

const MyComponent = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])

   return (
      <OptionsList
         items={items}
         selectedKeys={selectedKeys}
         selectedItems={items.filter(item =>
            selectedKeys.includes(item.key as string)
         )}
         onSelectionChange={setSelectedKeys}
         placeholder='Select options'
      />
   )
}
```

### Multiple Selection

```tsx
<OptionsList
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   selectionMode='multiple'
   showSelectedValue={true}
   placeholder='Select multiple options'
/>
```

### Async Loading with API

```tsx
const fetchData = async (page: number, filterText?: string) => {
   // API call to fetch data
   const response = await api.fetchOptions(page, filterText)
   return response.data
}

;<OptionsList
   isAsync={true}
   apiProps={{
      apiFunction: fetchData,
      isInfiniteScrollable: true,
      shouldFetchMore: true
   }}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   placeholder='Search options'
/>
```

### Creatable Options

```tsx
<OptionsList
   items={items}
   selectedKeys={selectedKeys}
   selectedItems={selectedItems}
   onSelectionChange={setSelectedKeys}
   creatableOptionProps={{
      isCreatable: true,
      onClickCreateOption: (text, onCreate) => {
         // Handle creating a new option
         addNewOption(text)
         onCreate()
      },
      createText: 'Create new option:'
   }}
   placeholder='Search or create options'
/>
```

## Props

| Prop                            | Type                       | Default      | Description                                         |
| ------------------------------- | -------------------------- | ------------ | --------------------------------------------------- |
| `selectedKeys`                  | `string[]`                 | Required     | Array of selected item keys                         |
| `selectedItems`                 | `ListItemType[]`           | Required     | Array of selected items                             |
| `onSelectionChange`             | `(keys: string[]) => void` | Required     | Callback when selection changes                     |
| `items`                         | `ListItemType[]`           | `undefined`  | Array of items to display in the list               |
| `size`                          | `'Small' \| 'Medium'`      | `'Medium'`   | Size of the component                               |
| `selectionMode`                 | `'single' \| 'multiple'`   | `'multiple'` | Selection mode for the list                         |
| `isSearchable`                  | `boolean`                  | `true`       | Whether to show search input                        |
| `disallowEmptySelection`        | `boolean`                  | `undefined`  | Whether to prevent empty selection                  |
| `placeholder`                   | `string`                   | `undefined`  | Placeholder text for the search input               |
| `disabledKeys`                  | `string[]`                 | `undefined`  | Array of keys for disabled items                    |
| `removedKeys`                   | `string[]`                 | `undefined`  | Array of keys for items to be removed from the list |
| `showSelectedValue`             | `boolean`                  | `undefined`  | Whether to show selected values as tags             |
| `isAsync`                       | `boolean`                  | `undefined`  | Whether to load items asynchronously                |
| `apiProps`                      | `ApiProps`                 | `undefined`  | API configuration for async loading                 |
| `description`                   | `string \| null`           | `undefined`  | Description text to display                         |
| `autoFocus`                     | `boolean`                  | `undefined`  | Whether to auto-focus the input                     |
| `creatableOptionProps`          | `CreatableOptionProps`     | `undefined`  | Configuration for creatable options                 |
| `forceFetchMoreId`              | `string`                   | `undefined`  | ID to force fetch more items                        |
| `shouldFixMaxHeight`            | `boolean`                  | `true`       | Whether to fix the maximum height                   |
| `enableClearAll`                | `boolean`                  | `undefined`  | Whether to show clear all button                    |
| `containerClassNames`           | `string`                   | `''`         | Additional class names for the container            |
| `noItemsViewClassName`          | `string`                   | `undefined`  | Class name for the no items view                    |
| `optionContainerClassName`      | `string`                   | `undefined`  | Class name for option containers                    |
| `loadingContainerClassName`     | `string`                   | `''`         | Class name for the loading container                |
| `errorViewContainerClassName`   | `string`                   | `''`         | Class name for the error view container             |
| `inputContainerClassName`       | `string`                   | `undefined`  | Class name for the input container                  |
| `descriptionClass`              | `string`                   | `undefined`  | Class name for the description text                 |
| `shouldShowClearForSelectedTag` | `boolean`                  | `undefined`  | Whether to show clear button for selected tags      |

### Render Props

| Prop                      | Type                                          | Description                                       |
| ------------------------- | --------------------------------------------- | ------------------------------------------------- |
| `renderCustomOption`      | `(args: any) => ReactElement`                 | Custom render function for list options           |
| `renderSelectedValue`     | `() => ReactElement`                          | Custom render function for selected values        |
| `renderNoItemsView`       | `(searchText?: string) => React.ReactElement` | Custom render function for no items view          |
| `renderPreOptionsSection` | `() => React.ReactElement`                    | Custom render function for section before options |
| `renderCustomInput`       | `(args: InputArgs) => ReactElement`           | Custom render function for the input              |
| `renderCustomDescription` | `() => React.ReactElement`                    | Custom render function for the description        |
| `renderCustomClearAll`    | `() => React.ReactElement`                    | Custom render function for the clear all button   |

## ApiProps Interface

```tsx
interface ApiProps {
   isInfiniteScrollable: boolean
   shouldFetchMore?: boolean
   apiFunction: (
      page: number,
      filterText?: string,
      signal?: AbortSignal
   ) => Promise<any>
}
```

## CreatableOptionProps Interface

```tsx
interface CreatableOptionProps {
   isCreatable: boolean
   onClickCreateOption?: (optionText: string, onCreate: () => void) => void
   createText?: string
   createOptionName?: (optionText: string) => React.ReactElement
   isLoading?: boolean
   onKeyDown?: (
      e: React.KeyboardEvent<HTMLInputElement>,
      hasFilteredOptions: boolean,
      filterText: string
   ) => void
   shouldNotCreateOnEnter?: boolean
   customCreatableOption?: (props: CreatableOptionType) => React.ReactElement
   getContainerStyles?: (hasFilteredOptions?: boolean) => string
}
```

## Accessibility

The OptionsList component is built using React Aria's ListBox component, ensuring proper accessibility features:

-  Keyboard navigation (arrow keys, Enter, Escape)
-  Screen reader announcements
-  ARIA attributes for roles and states
-  Focus management

## States

The component handles various states:

-  Loading: Initial loading state
-  Loading more: When fetching additional items
-  Error: When API calls fail
-  Empty: When no items match the search criteria
-  Filtering: When search is in progress

## Customization

The OptionsList component can be customized through:

-  Custom rendering of options, selected values, and input
-  Custom styling via class names
-  Custom behavior for creatable options
-  Custom error and loading states
