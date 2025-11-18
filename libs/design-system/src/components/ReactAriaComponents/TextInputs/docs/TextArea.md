# TextArea Component

The TextArea component is a customizable multi-line text input field built on top of React Aria components. It provides a consistent and accessible way to collect longer text input from users, with automatic resizing capabilities.

## Features

-  **Accessible**: Built on top of React Aria components for full accessibility support
-  **Auto-resizing**: Automatically adjusts height based on content
-  **Customizable**: Supports various styling options and size variants
-  **Error Handling**: Built-in support for displaying error messages
-  **Hint Text**: Optional hint text to provide additional information
-  **Left/Right Elements**: Support for adding icons or other elements on either side of the input
-  **Focus Management**: Visual focus indicators and keyboard navigation support
-  **Size Variants**: Available in Small and Medium sizes

## Props

| Prop                      | Type                                                 | Default     | Description                                             |
| ------------------------- | ---------------------------------------------------- | ----------- | ------------------------------------------------------- |
| `size`                    | `'Small' \| 'Medium'`                                | Required    | Size variant of the textarea                            |
| `label`                   | `string \| null`                                     | `undefined` | Label text for the textarea                             |
| `placeholder`             | `string`                                             | `undefined` | Placeholder text for the textarea                       |
| `value`                   | `string`                                             | `''`        | Current value of the textarea                           |
| `onChange`                | `(value: string) => void`                            | `undefined` | Callback when the textarea value changes                |
| `errorMessage`            | `ReactNode`                                          | `undefined` | Error message to display below the textarea             |
| `hint`                    | `ReactNode`                                          | `undefined` | Hint text to display below the textarea                 |
| `shouldShowHint`          | `boolean`                                            | `true`      | Whether to show the hint text                           |
| `isDisabled`              | `boolean`                                            | `false`     | Whether the textarea is disabled                        |
| `isRequired`              | `boolean`                                            | `false`     | Whether the textarea is required                        |
| `leftElement`             | `React.ComponentType<any>`                           | `undefined` | Component to render on the left side of the textarea    |
| `rightElement`            | `React.ComponentType<any>`                           | `undefined` | Component to render on the right side of the textarea   |
| `containerClassName`      | `string`                                             | `'w-full'`  | Class name for the container element                    |
| `inputContainerClassName` | `string`                                             | `''`        | Class name for the textarea container element           |
| `inputClassName`          | `string`                                             | `''`        | Class name for the textarea element                     |
| `labelClassName`          | `string`                                             | `''`        | Class name for the label element                        |
| `hintClassName`           | `string`                                             | `''`        | Class name for the hint element                         |
| `title`                   | `string`                                             | `undefined` | Title attribute for the textarea                        |
| `focusRingVariant`        | `FocusRingVariant`                                   | `undefined` | Variant for the focus ring                              |
| `shouldSelectTextOnFocus` | `boolean`                                            | `false`     | Whether to select all text when the textarea is focused |
| `renderRequiredIcon`      | `() => React.ReactElement`                           | `undefined` | Function to render a required icon                      |
| `onClick`                 | `(e: React.MouseEvent<HTMLTextAreaElement>) => void` | `undefined` | Callback when the textarea is clicked                   |
| `onFocus`                 | `(e: any) => void`                                   | `undefined` | Callback when the textarea is focused                   |
| `onBlur`                  | `(e: any) => void`                                   | `undefined` | Callback when the textarea loses focus                  |
| `onMouseDown`             | `(e: React.MouseEvent<HTMLTextAreaElement>) => void` | `undefined` | Callback when the mouse is pressed on the textarea      |

## Usage Examples

### Basic Usage

```tsx
import { RACTextArea } from '@crimeos/design-system'

function MyComponent() {
   const [value, setValue] = useState('')

   return (
      <RACTextArea
         label='Comments'
         placeholder='Enter your comments'
         value={value}
         onChange={setValue}
         size='Small'
      />
   )
}
```

### With Error Message

```tsx
<RACTextArea
   label='Feedback'
   placeholder='Enter your feedback'
   value={feedback}
   onChange={setFeedback}
   size='Small'
   errorMessage='Please provide valid feedback'
/>
```

### With Hint Text

```tsx
<RACTextArea
   label='Description'
   placeholder='Enter a description'
   value={description}
   onChange={setDescription}
   size='Small'
   hint='Describe your project in detail'
/>
```

### With Custom Hint Component

```tsx
<RACTextArea
   label='Description'
   placeholder='Enter a description'
   value={description}
   onChange={setDescription}
   size='Small'
   hint={
      <div className='flex items-center'>
         <span className='text-brand'>Need help?</span>
         <button
            onClick={showHelpModal}
            className='ml-2 text-primary underline'
         >
            Click here
         </button>
      </div>
   }
/>
```

## Auto-resizing Behavior

The TextArea component automatically adjusts its height based on the content. As the user types more text, the textarea will grow to accommodate the content, providing a better user experience without the need for scrollbars until necessary.

```tsx
<RACTextArea
   label='Auto-resizing TextArea'
   placeholder='Type to see auto-resize...'
   value={value}
   onChange={setValue}
   size='Small'
/>
```

## Styling

The TextArea component uses Tailwind CSS for styling. You can customize the appearance by providing custom class names through the various className props:

-  `containerClassName`: Styles the overall container
-  `inputContainerClassName`: Styles the container around the textarea element
-  `inputClassName`: Styles the textarea element itself
-  `labelClassName`: Styles the label
-  `hintClassName`: Styles the hint text container

## Accessibility

The TextArea component is built on top of React Aria components, which provide robust accessibility features:

-  Proper labeling and ARIA attributes
-  Keyboard navigation support
-  Focus management
-  Screen reader announcements for errors
-  Support for disabled states

## Supported States

The TextArea component supports the following states:

-  **Default**: Normal textarea state
-  **Focused**: When the textarea has focus
-  **Disabled**: When the textarea is disabled and cannot be interacted with
-  **Error**: When the textarea has an error
-  **Required**: When the textarea is required
