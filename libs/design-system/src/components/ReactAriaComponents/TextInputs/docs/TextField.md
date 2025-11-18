# TextField Component

The TextField component is a customizable text input field built on top of React Aria components. It provides a consistent and accessible way to collect single-line text input from users.

## Features

-  **Accessible**: Built on top of React Aria components for full accessibility support
-  **Customizable**: Supports various styling options and size variants
-  **Flexible**: Can be used with different input types (text, email, password, etc.)
-  **Error Handling**: Built-in support for displaying error messages
-  **Hint Text**: Optional hint text to provide additional information
-  **Left/Right Elements**: Support for adding icons or other elements on either side of the input
-  **Focus Management**: Visual focus indicators and keyboard navigation support
-  **Size Variants**: Available in Small and Medium sizes

## Props

| Prop                      | Type                                              | Default     | Description                                          |
| ------------------------- | ------------------------------------------------- | ----------- | ---------------------------------------------------- |
| `size`                    | `'Small' \| 'Medium'`                             | Required    | Size variant of the input field                      |
| `label`                   | `string \| null`                                  | `undefined` | Label text for the input field                       |
| `placeholder`             | `string`                                          | `undefined` | Placeholder text for the input field                 |
| `value`                   | `string`                                          | `''`        | Current value of the input field                     |
| `onChange`                | `(value: string) => void`                         | `undefined` | Callback when the input value changes                |
| `errorMessage`            | `ReactNode`                                       | `undefined` | Error message to display below the input             |
| `hint`                    | `ReactNode`                                       | `undefined` | Hint text to display below the input                 |
| `shouldShowHint`          | `boolean`                                         | `true`      | Whether to show the hint text                        |
| `isDisabled`              | `boolean`                                         | `false`     | Whether the input is disabled                        |
| `isRequired`              | `boolean`                                         | `false`     | Whether the input is required                        |
| `leftElement`             | `React.ComponentType<any>`                        | `undefined` | Component to render on the left side of the input    |
| `rightElement`            | `React.ComponentType<any>`                        | `undefined` | Component to render on the right side of the input   |
| `containerClassName`      | `string`                                          | `'w-full'`  | Class name for the container element                 |
| `inputContainerClassName` | `string`                                          | `''`        | Class name for the input container element           |
| `inputClassName`          | `string`                                          | `''`        | Class name for the input element                     |
| `labelClassName`          | `string`                                          | `''`        | Class name for the label element                     |
| `hintClassName`           | `string`                                          | `''`        | Class name for the hint element                      |
| `type`                    | `string`                                          | `'text'`    | Type of the input (text, email, password, etc.)      |
| `minValue`                | `number`                                          | `undefined` | Minimum value for number inputs                      |
| `maxValue`                | `number`                                          | `undefined` | Maximum value for number inputs                      |
| `title`                   | `string`                                          | `undefined` | Title attribute for the input                        |
| `focusRingVariant`        | `FocusRingVariant`                                | `undefined` | Variant for the focus ring                           |
| `shouldSelectTextOnFocus` | `boolean`                                         | `false`     | Whether to select all text when the input is focused |
| `renderRequiredIcon`      | `() => React.ReactElement`                        | `undefined` | Function to render a required icon                   |
| `onClick`                 | `(e: React.MouseEvent<HTMLInputElement>) => void` | `undefined` | Callback when the input is clicked                   |
| `onFocus`                 | `(e: any) => void`                                | `undefined` | Callback when the input is focused                   |
| `onBlur`                  | `(e: any) => void`                                | `undefined` | Callback when the input loses focus                  |
| `onMouseDown`             | `(e: React.MouseEvent<HTMLInputElement>) => void` | `undefined` | Callback when the mouse is pressed on the input      |

## Usage Examples

### Basic Usage

```tsx
import { RACTextField } from '@crimeos/design-system'

function MyComponent() {
   const [value, setValue] = useState('')

   return (
      <RACTextField
         label='Username'
         placeholder='Enter your username'
         value={value}
         onChange={setValue}
         size='Small'
      />
   )
}
```

### With Error Message

```tsx
<RACTextField
   label='Email'
   placeholder='Enter your email'
   value={email}
   onChange={setEmail}
   size='Small'
   errorMessage='Please enter a valid email address'
/>
```

### With Hint Text

```tsx
<RACTextField
   label='Password'
   placeholder='Enter your password'
   type='password'
   value={password}
   onChange={setPassword}
   size='Small'
   hint='Password must be at least 8 characters long'
/>
```

### With Left and Right Elements

```tsx
<RACTextField
   label='Search'
   placeholder='Search...'
   value={searchTerm}
   onChange={setSearchTerm}
   size='Small'
   leftElement={() => <SearchIcon className='ml-2' />}
   rightElement={() => <ClearButton onClick={clearSearch} className='mr-2' />}
/>
```

## Styling

The TextField component uses Tailwind CSS for styling. You can customize the appearance by providing custom class names through the various className props:

-  `containerClassName`: Styles the overall container
-  `inputContainerClassName`: Styles the container around the input element
-  `inputClassName`: Styles the input element itself
-  `labelClassName`: Styles the label
-  `hintClassName`: Styles the hint text container

## Accessibility

The TextField component is built on top of React Aria components, which provide robust accessibility features:

-  Proper labeling and ARIA attributes
-  Keyboard navigation support
-  Focus management
-  Screen reader announcements for errors
-  Support for disabled states

## Supported States

The TextField component supports the following states:

-  **Default**: Normal input state
-  **Focused**: When the input has focus
-  **Disabled**: When the input is disabled and cannot be interacted with
-  **Error**: When the input has an error
-  **Required**: When the input is required
