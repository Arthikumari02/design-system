# Button Component

## Overview

The Button component is a versatile, accessible UI element built on top of React Aria's Button component. It supports multiple visual hierarchies, variants, sizes, states, and icon placements to meet various design requirements across the application.

## Features

-  **Accessibility**: Built on React Aria for robust accessibility support
-  **Multiple hierarchies**: Primary, Secondary, Tertiary, and Link
-  **Various subvariants**: Primary, Destructive, Gray, GrayOutline, DestructiveOutline
-  **Multiple sizes**: ExtraSmall, Small, Medium, Large, ExtraLarge, DoubleExtraLarge
-  **States**: Default, Hover, Focused, Pressed, Disabled, Loading
-  **Icon support**: Left icon, right icon, or icon-only buttons
-  **Focus ring**: Customizable focus ring for keyboard navigation

## Import

```tsx
import { Button, Hierarchy, SubVariant } from '@crimeos-frontend/design-system'
import { ExtendedSize } from '@crimeos-frontend/design-system'
```

## Props

| Prop                             | Type                                                | Default              | Description                                           |
| -------------------------------- | --------------------------------------------------- | -------------------- | ----------------------------------------------------- |
| `hierarchy`                      | `Hierarchy`                                         | `Hierarchy.Primary`  | Visual hierarchy of the button                        |
| `subVariant`                     | `SubVariant`                                        | `SubVariant.Primary` | Variant within the hierarchy                          |
| `size`                           | `ExtendedSize`                                      | `'Medium'`           | Size of the button                                    |
| `children`                       | `React.ReactNode`                                   | -                    | Content of the button                                 |
| `autoFocus`                      | `boolean`                                           | `false`              | Whether the button should be focused on mount         |
| `buttonContentClassName`         | `string`                                            | -                    | Additional class name for button content              |
| `childrenContainerClassName`     | `string`                                            | -                    | Additional class name for children container          |
| `className`                      | `string`                                            | `''`                 | Additional class name for the button                  |
| `id`                             | `string`                                            | -                    | ID for the button                                     |
| `isDisabled`                     | `boolean`                                           | `false`              | Whether the button is disabled                        |
| `isLoading`                      | `boolean`                                           | `false`              | Whether the button is in loading state                |
| `shouldShrinkButtonWhileLoading` | `boolean`                                           | `false`              | Whether the button should shrink when loading         |
| `shouldPassEventPropagation`     | `boolean`                                           | `false`              | Whether to propagate events                           |
| `leftIcon`                       | `(iconColors: ButtonIconColors) => React.ReactNode` | -                    | Function that returns an icon to display on the left  |
| `rightIcon`                      | `(iconColors: ButtonIconColors) => React.ReactNode` | -                    | Function that returns an icon to display on the right |
| `onClick`                        | `(_: any) => void`                                  | -                    | Function called when the button is clicked            |
| `buttonFocusRingVariant`         | `FocusRingVariant`                                  | -                    | Custom focus ring variant                             |

## Hierarchies and SubVariants

The Button component supports four hierarchies, each with specific subvariants:

### Primary Hierarchy (`Hierarchy.Primary`)

-  `SubVariant.Primary`: Main call-to-action button
-  `SubVariant.Destructive`: For destructive actions like delete

### Secondary Hierarchy (`Hierarchy.Secondary`)

-  `SubVariant.Primary`: Secondary actions
-  `SubVariant.GrayOutline`: Gray outlined button
-  `SubVariant.DestructiveOutline`: Destructive action with outline style
-  `SubVariant.Destructive`: Destructive action with secondary styling

### Tertiary Hierarchy (`Hierarchy.Tertiary`)

-  `SubVariant.Primary`: Tertiary actions
-  `SubVariant.Destructive`: Destructive action with tertiary styling
-  `SubVariant.Gray`: Gray tertiary button

### Link Hierarchy (`Hierarchy.Link`)

-  `SubVariant.Primary`: Link styled as primary color
-  `SubVariant.Destructive`: Link styled for destructive actions
-  `SubVariant.Gray`: Gray link button

## Sizes

The Button component supports six sizes:

-  `ExtraSmall`: Smallest button size
-  `Small`: Small button size
-  `Medium`: Standard button size (default)
-  `Large`: Large button size
-  `ExtraLarge`: Extra large button size
-  `DoubleExtraLarge`: Largest button size

Each size has specific typography, padding, border-radius, and icon spacing settings.

## States

The Button component handles the following states:

-  **Default**: Normal state
-  **Hover**: When the mouse is over the button
-  **Focused/Pressed**: When the button is focused or pressed
-  **Disabled**: When the button is disabled
-  **Loading**: When the button is in a loading state

## Usage Examples

### Basic Button

```tsx
<Button
   hierarchy={Hierarchy.Primary}
   subVariant={SubVariant.Primary}
   size='Medium'
   onClick={handleClick}
>
   Click Me
</Button>
```

### Button with Loading State

```tsx
<Button
   hierarchy={Hierarchy.Primary}
   subVariant={SubVariant.Primary}
   size='Medium'
   isLoading={isLoading}
   onClick={handleClick}
>
   Submit
</Button>
```

### Button with Icons

```tsx
<Button
   hierarchy={Hierarchy.Primary}
   subVariant={SubVariant.Primary}
   size='Medium'
   leftIcon={iconColors => <Icon className={iconColors.fill} />}
   onClick={handleClick}
>
   Button with Left Icon
</Button>
```

### Icon-only Button

```tsx
<Button
   hierarchy={Hierarchy.Tertiary}
   subVariant={SubVariant.Gray}
   size='Medium'
   className='px-md py-md'
   onClick={handleClick}
>
   <Icon />
</Button>
```

### Disabled Button

```tsx
<Button
   hierarchy={Hierarchy.Primary}
   subVariant={SubVariant.Primary}
   size='Medium'
   isDisabled={true}
   onClick={handleClick}
>
   Disabled Button
</Button>
```

### Link Button

```tsx
<Button
   hierarchy={Hierarchy.Link}
   subVariant={SubVariant.Primary}
   size='Small'
   onClick={handleClick}
>
   Link Button
</Button>
```

## Styling

The Button component uses a theme-based styling approach. Styles are determined by:

1. The button's hierarchy (Primary, Secondary, Tertiary, Link)
2. The button's subVariant (Primary, Destructive, etc.)
3. The button's current state (default, hover, focused, disabled)

The styling includes:

-  Background color
-  Text color
-  Border style
-  Focus ring variant
-  Icon colors
-  Loader color

## Accessibility

The Button component is built on top of React Aria's Button component, which provides:

-  Proper role semantics
-  Keyboard navigation
-  Focus management
-  ARIA attributes

## Implementation Details

The Button component is composed of:

-  `Button.tsx`: Main component that handles props and renders the button
-  `ButtonContent.tsx`: Handles the content layout including icons and loading state
-  `sizes.tsx`: Defines size-specific styles
-  `styles.tsx`: Handles state-based styling
-  `types.ts`: TypeScript interfaces and types

## Notes

-  When using the loading state, you can choose whether the button should shrink or maintain its size using the `shouldShrinkButtonWhileLoading` prop.
-  Icon colors are automatically handled based on the button's hierarchy, subVariant, and state.
-  The focus ring is automatically applied when the button is focused via keyboard navigation.
