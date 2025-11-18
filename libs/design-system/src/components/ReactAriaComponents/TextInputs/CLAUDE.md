# CLAUDE.md - TextInputs Components

This file provides guidance for working with the TextInputs components (TextField and TextArea) from the @iot-grid/design-system library.

## Overview

The TextInputs module provides accessible, feature-rich text input components built on React Aria Components. It includes TextField for single-line inputs and TextArea for multi-line inputs, both with comprehensive validation, styling, and accessibility features.

## Component Location

-  **Directory**: `src/components/ReactAriaComponents/TextInputs/`
-  **Main File**: `src/components/ReactAriaComponents/TextInputs/index.tsx`
-  **Exports**: `TextField`, `TextArea`, and related types and constants

## Components Included

### TextField

Single-line text input with label, validation, hints, and icon support.

### TextArea

Multi-line text input with auto-resizing capability, validation, and accessibility features.

## Key Features

-  **Accessibility-First**: Built on React Aria Components with proper ARIA support
-  **Comprehensive Validation**: Error states, messages, and visual feedback
-  **Flexible Sizing**: Small and Medium size variants
-  **Icon Support**: Left and right element/icon slots
-  **Auto-Focus Options**: Configurable focus and selection behavior
-  **Help Text**: Support for hints and contextual help
-  **Label Integration**: Built-in label component with required indicators
-  **Focus Management**: Custom focus ring variants and proper focus handling
-  **Auto-Resize**: TextArea automatically adjusts height based on content

## Props Interfaces

### TextField Props

```typescript
interface RACTextFieldProps extends TextFieldProps {
   size: SmallAndMedium // Required: 'Small' | 'Medium'
   highlightErrorState?: boolean // Force error state highlighting
   hint?: ReactNode // Help text below input
   multiLine?: boolean // Enable multi-line mode
   leftElement?: React.ComponentType<any> // Left icon/element
   rightElement?: React.ComponentType<any> // Right icon/element
   color?: string // Custom color override
   containerClassName?: string // Container styling
   inputContainerClassName?: string // Input wrapper styling
   inputClassName?: string // Input element styling
   focusRingVariant?: FocusRingVariant // Focus ring style
   hintClassName?: string // Hint text styling
   labelClassName?: string // Label styling
   isRequired?: boolean // Show required indicator
   shouldShowHint?: boolean // Control hint visibility
   title?: string // Tooltip text
   errorTransitionClassName?: string // Error transition styling
   renderRequiredIcon?: () => React.ReactElement // Custom required indicator
   shouldSelectInputOnFocus?: boolean // Auto-select on focus
   shouldShowErrorOnFocus?: boolean // Show errors when focused
   withIn?: boolean // Enable focus ring
   onClick?: (e: any) => void // Click handler
   label?: string | null // Label text
   placeholder?: string // Placeholder text
   errorMessage?: ReactNode // Error message
   minValue?: number // Min numeric value
   maxValue?: number // Max numeric value
}
```

### TextArea Props

```typescript
interface RACTextAreaProps extends TextFieldProps {
   size: SmallAndMedium // Required: 'Small' | 'Medium'
   hint?: ReactNode // Help text below input
   inputRef?: React.ForwardedRef<HTMLTextAreaElement>
   leftElement?: React.ComponentType<any> // Left icon/element
   rightElement?: React.ComponentType<any> // Right icon/element
   color?: string // Custom color override
   containerClassName?: string // Container styling
   inputContainerClassName?: string // Input wrapper styling
   inputClassName?: string // Input element styling
   focusRingVariant?: FocusRingVariant // Focus ring style
   hintClassName?: string // Hint text styling
   labelClassName?: string // Label styling
   isRequired?: boolean // Show required indicator
   shouldShowHint?: boolean // Control hint visibility
   title?: string // Tooltip text
   label?: string | null // Label text
   placeholder?: string // Placeholder text
   errorMessage?: ReactNode // Error message
   renderRequiredIcon?: () => React.ReactElement
   onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void
   shouldSelectTextOnFocus?: boolean // Auto-select on focus
   onMouseDown?: (e: React.MouseEvent<HTMLTextAreaElement>) => void
}
```

## Constants and Enums

### InputSize

```typescript
enum InputSize {
   xs = 'EXTRA_SMALL',
   sm = 'SMALL',
   md = 'MEDIUM'
}
```

### Input Theme

The `TEXT_INPUT_THEME` constant defines styling for different input states:

-  **default**: Normal state styling
-  **focused**: Focused state with brand colors
-  **disabled**: Disabled state styling
-  **error**: Error state with error colors
-  **placeholderColor**: Placeholder text styling

## Usage Examples

### Basic TextField

```tsx
import { TextField } from '@iot-grid/design-system'
;<TextField
   size='Medium'
   label='Email Address'
   placeholder='Enter your email'
   value={email}
   onChange={value => setEmail(value)}
/>
```

### TextField with Validation

```tsx
<TextField
   size='Medium'
   label='Password'
   placeholder='Enter password'
   value={password}
   onChange={value => setPassword(value)}
   isRequired={true}
   errorMessage={passwordError}
   hint='Password must be at least 8 characters'
   renderRequiredIcon={() => <RequiredIcon />}
/>
```

### TextField with Icons

```tsx
<TextField
   size='Medium'
   label='Search'
   placeholder='Search items...'
   leftElement={() => <SearchIcon />}
   rightElement={() => <ClearIcon onClick={clearSearch} />}
   value={searchQuery}
   onChange={value => setSearchQuery(value)}
/>
```

### Basic TextArea

```tsx
import { TextArea } from '@iot-grid/design-system'
;<TextArea
   size='Medium'
   label='Comments'
   placeholder='Enter your comments...'
   value={comments}
   onChange={value => setComments(value)}
/>
```

### TextArea with Validation

```tsx
<TextArea
   size='Medium'
   label='Description'
   placeholder='Describe the issue...'
   value={description}
   onChange={value => setDescription(value)}
   isRequired={true}
   errorMessage={descriptionError}
   hint='Please provide at least 10 characters'
   shouldSelectTextOnFocus={false}
/>
```

### Custom Styling

```tsx
<TextField
   size='Small'
   label='Custom Input'
   containerClassName='max-w-md'
   inputClassName='rounded-lg'
   labelClassName='font-semibold'
   hintClassName='text-xs'
   focusRingVariant='brand'
/>
```

## Styling Architecture

### Size Variants

-  **Small**: Compact input for dense layouts
-  **Medium**: Standard input size for most use cases

### Theme System

-  Uses centralized `TEXT_INPUT_THEME` for consistent styling
-  Dynamic state-based styling (default, focused, disabled, error)
-  Customizable through className props at multiple levels

### Focus Management

-  Custom focus ring variants
-  Proper focus and blur handling
-  Optional auto-selection on focus

## Accessibility Features

-  **ARIA Support**: Built on React Aria Components with proper ARIA attributes
-  **Label Association**: Proper label-input association for screen readers
-  **Error Handling**: Accessible error messages linked to inputs
-  **Validation States**: Clear indication of required fields and validation errors
-  **Keyboard Navigation**: Full keyboard support for all interactions
-  **Focus Management**: Proper focus ring and focus state handling

## Advanced Features

### TextField Specific

-  **Input Selection**: `shouldSelectInputOnFocus` for auto-selection behavior
-  **Numeric Inputs**: `minValue` and `maxValue` for number constraints
-  **Custom Elements**: Left and right element slots for icons or buttons

### TextArea Specific

-  **Auto-Resize**: Automatically adjusts height based on content
-  **Firefox Compatibility**: Special handling for Firefox scroll position issues
-  **Text Selection**: Configurable text selection on focus

## Development Guidelines

### When to Use Each Component

-  **TextField**: Single-line inputs (email, password, search, names)
-  **TextArea**: Multi-line inputs (comments, descriptions, messages)

### Validation Best Practices

-  Use `isRequired` for required fields with visual indicators
-  Provide clear `errorMessage` text for validation failures
-  Use `hint` for helpful guidance text
-  Consider `shouldShowErrorOnFocus` for better UX

### Icon and Element Guidelines

-  Use `leftElement` for search icons, input types, or prefixes
-  Use `rightElement` for clear buttons, validation icons, or suffixes
-  Ensure elements are clickable when they perform actions
-  Maintain consistent icon sizes across the application

### Accessibility Best Practices

-  Always provide meaningful labels
-  Use proper error messages that describe how to fix issues
-  Ensure sufficient color contrast for all states
-  Test with keyboard navigation and screen readers
-  Use appropriate `title` attributes for additional context

### Performance Considerations

-  TextArea auto-resize calculation is optimized but can impact performance with very large content
-  Use `shouldSelectInputOnFocus` judiciously as it can be disruptive
-  Consider controlled vs uncontrolled state based on usage patterns

### Testing Guidelines

-  Test all size variants and states (normal, focused, disabled, error)
-  Verify auto-resize behavior in TextArea
-  Test keyboard navigation and focus management
-  Validate error state transitions and messaging
-  Test with screen readers for accessibility compliance
