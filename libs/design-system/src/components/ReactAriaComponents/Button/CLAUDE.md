# CLAUDE.md - Button Component

This file provides guidance for working with the Button component from the @iot-grid/design-system library.

## Overview

The Button component is a comprehensive, accessible button built on React Aria Components. It supports multiple hierarchies, variants, sizes, icons, loading states, and follows accessibility best practices with proper focus management.

## Component Location

-  **File**: `src/components/ReactAriaComponents/Button/Button.tsx`
-  **Export**: Named export as `Button` with related types and enums
-  **Index**: `src/components/ReactAriaComponents/Button/index.ts`

## Key Features

-  **Accessibility-First**: Built on React Aria Components for proper ARIA support
-  **Multiple Hierarchies**: Primary, Secondary, Tertiary, and Link button types
-  **Sub-Variants**: Primary, Destructive, DestructiveOutline, Gray, GrayOutline
-  **Flexible Sizing**: Support for different button sizes (Small, Medium, Large, etc.)
-  **Icon Support**: Left and right icons with proper color coordination
-  **Loading States**: Built-in loading spinner with optional shrinking behavior
-  **Focus Management**: Customizable focus ring variants
-  **Event Handling**: Proper event propagation control

## Props Interface

```typescript
interface ButtonProps extends AriaButtonProps {
   hierarchy: Hierarchy // Required: PRIMARY, SECONDARY, TERTIARY, LINK
   size: ButtonSize // Required: Button size variant
   subVariant: SubVariant // Required: Color/style sub-variant
   children: any // Required: Button content
   autoFocus?: boolean // Auto-focus on mount
   buttonContentClassName?: string // Override button content styling
   childrenContainerClassName?: string // Override children container styling
   className?: string // Override root button styling
   id?: string // Button ID
   isDisabled?: boolean // Disable button
   isLoading?: boolean // Show loading state
   shouldShrinkButtonWhileLoading?: boolean // Shrink button during loading
   leftIcon?: (iconColors: ButtonIconColors) => React.ReactNode
   rightIcon?: (iconColors: ButtonIconColors) => React.ReactNode
   onClick?: (_: any) => void // Click handler
   shouldPassEventPropagation?: boolean // Control event bubbling
   buttonFocusRingVariant?: FocusRingVariant // Override focus ring style
}
```

## Enums and Types

### Hierarchy

```typescript
enum Hierarchy {
   Primary = 'PRIMARY', // Most prominent button style
   Secondary = 'SECONDARY', // Secondary prominence
   Tertiary = 'TERTIARY', // Subtle button style
   Link = 'LINK' // Link-style button
}
```

### SubVariant

```typescript
enum SubVariant {
   Primary = 'PRIMARY', // Default primary color
   Destructive = 'DESTRUCTIVE', // Destructive actions (red)
   DestructiveOutline = 'DESTRUCTIVE_OUTLINE', // Outlined destructive
   Gray = 'GRAY', // Gray color scheme
   GrayOutline = 'GRAY_OUTLINE' // Outlined gray
}
```

### ButtonIconColors

```typescript
interface ButtonIconColors {
   stroke: string // Icon stroke color that adapts to button state
}
```

## Usage Examples

### Basic Button

```tsx
import { Button, Hierarchy, SubVariant } from '@iot-grid/design-system'
;<Button
   hierarchy={Hierarchy.Primary}
   size='Medium'
   subVariant={SubVariant.Primary}
   onClick={() => console.log('Clicked')}
>
   Save Changes
</Button>
```

### Button with Icons

```tsx
<Button
   hierarchy={Hierarchy.Secondary}
   size='Large'
   subVariant={SubVariant.Gray}
   leftIcon={iconColors => <SaveIcon stroke={iconColors.stroke} />}
   rightIcon={iconColors => <ArrowIcon stroke={iconColors.stroke} />}
   onClick={handleSave}
>
   Save with Arrow
</Button>
```

### Destructive Action Button

```tsx
<Button
   hierarchy={Hierarchy.Primary}
   size='Medium'
   subVariant={SubVariant.Destructive}
   onClick={handleDelete}
   leftIcon={iconColors => <TrashIcon stroke={iconColors.stroke} />}
>
   Delete Item
</Button>
```

### Loading State Button

```tsx
<Button
   hierarchy={Hierarchy.Primary}
   size='Medium'
   subVariant={SubVariant.Primary}
   isLoading={isSubmitting}
   shouldShrinkButtonWhileLoading={true}
   onClick={handleSubmit}
>
   {isSubmitting ? 'Submitting...' : 'Submit Form'}
</Button>
```

### Link-Style Button

```tsx
<Button
   hierarchy={Hierarchy.Link}
   size='Small'
   subVariant={SubVariant.Primary}
   onClick={() => navigate('/help')}
>
   Learn More
</Button>
```

## Styling Architecture

The Button component uses a sophisticated styling system:

-  **Dynamic Styling**: `getButtonStyles()` function computes styles based on state
-  **Size Variants**: `buttonSizes` object defines size-specific styling
-  **State Management**: Handles hover, pressed, focused, and disabled states
-  **Theme Integration**: Uses centralized color themes and focus ring variants
-  **Content Wrapper**: `ButtonContent` component handles internal layout and styling

## Accessibility Features

-  **ARIA Support**: Built on React Aria Components with proper ARIA attributes
-  **Keyboard Navigation**: Full keyboard support with Enter and Space key handling
-  **Focus Management**: Customizable focus rings with proper focus visibility
-  **Screen Reader Support**: Proper labeling and state communication
-  **Disabled State**: Proper disabled handling that removes from tab order

## Event Handling

### Click Events

-  Uses React Aria's `onPress` for consistent cross-platform behavior
-  Supports event propagation control via `shouldPassEventPropagation`
-  Automatically disabled during loading states

### State Events

-  Exposes hover, pressed, and focused states through render prop pattern
-  Dynamic styling based on interaction states

## Development Guidelines

### When to Use Each Hierarchy

-  **Primary**: Main call-to-action buttons (Save, Submit, Continue)
-  **Secondary**: Important but secondary actions (Cancel, Back)
-  **Tertiary**: Less prominent actions (Edit, View Details)
-  **Link**: Navigation or helper actions (Learn More, See All)

### SubVariant Selection

-  **Primary**: Default positive actions
-  **Destructive**: Delete, Remove, Destructive actions
-  **Gray**: Neutral actions, Cancel buttons
-  **Outline variants**: When you need visual separation or lighter emphasis

### Icon Guidelines

-  Icons receive proper color coordination through `ButtonIconColors`
-  Use left icons for actions, right icons for navigation/direction
-  Keep icons simple and recognizable
-  Ensure icons have proper accessibility labels

### Loading State Best Practices

-  Use `isLoading` to show loading spinner
-  Disable user interaction during loading
-  Provide loading text in children when appropriate
-  Consider `shouldShrinkButtonWhileLoading` for space-constrained layouts

### Testing Considerations

-  Test all hierarchy and subVariant combinations
-  Verify keyboard navigation and focus management
-  Test loading states and disabled states
-  Validate icon rendering and color coordination
-  Test event propagation behavior
-  Verify accessibility with screen readers

### Performance Notes

-  Component uses forwardRef for proper ref forwarding
-  Dynamic styling computation is optimized for performance
-  Icons are render functions to avoid unnecessary re-renders
