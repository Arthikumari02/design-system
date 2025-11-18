# CLAUDE.md - ActionMenuOption Component

This file provides guidance for working with the ActionMenuOption component from the @iot-grid/design-system library.

## Overview

ActionMenuOption is a reusable menu item component designed for dropdown menus and action lists. It supports icons, hover states, click handling, and different visual variants.

## Component Location

-  **File**: `src/components/ActionsMenuDropdownV2/ActionMenuOption.tsx`
-  **Export**: Default export as `ActionMenuOption`

## Key Features

-  **MobX Integration**: Uses `observer` for reactive state management
-  **Icon Support**: Supports both left and right icons through render functions
-  **Variants**: Supports 'Neutral' and 'Destructive' action variants
-  **Interaction Handling**: Click and hover event handling
-  **Customization**: Flexible styling through className overrides
-  **Accessibility**: Proper event propagation control

## Props Interface

```typescript
interface Props {
   menuOption: MenuOptionType // Required menu option configuration
   optionTextClassName?: string // Override text styling
   optionContainerClassName?: string // Override container styling
   onClickAction?: (menuOption: MenuOptionType, event: React.MouseEvent) => void
   onHoverAction?: (id: string, isHovered: boolean) => void
   shouldStopPropagation?: boolean // Control event bubbling
   optionRef?: RefObject<HTMLDivElement> // Ref for the option element
}
```

## MenuOptionType Interface

```typescript
interface MenuOptionType {
   label: string // Display text
   value: string // Unique identifier
   variant: 'Neutral' | 'Destructive' // Visual variant
   onClick: (value: string, event?: React.MouseEvent) => void
   renderLeftIcon?: () => React.ReactElement
   renderRightIcon?: () => React.ReactElement
   isDisabled?: boolean
   shouldShowSeparator?: boolean
}
```

## Usage Examples

### Basic Menu Option

```tsx
const menuOption: MenuOptionType = {
  label: "Edit Item",
  value: "edit",
  variant: "Neutral",
  onClick: (value) => console.log(`Clicked ${value}`)
}

<ActionMenuOption menuOption={menuOption} />
```

### With Icons

```tsx
const menuOptionWithIcons: MenuOptionType = {
  label: "Delete Item",
  value: "delete",
  variant: "Destructive",
  onClick: (value) => handleDelete(value),
  renderLeftIcon: () => <TrashIcon />,
  renderRightIcon: () => <ArrowIcon />
}

<ActionMenuOption
  menuOption={menuOptionWithIcons}
  onHoverAction={(id, isHovered) => setHoveredOption(isHovered ? id : null)}
/>
```

### Custom Styling

```tsx
<ActionMenuOption
   menuOption={menuOption}
   optionTextClassName='font-bold text-sm'
   optionContainerClassName='bg-gray-100 rounded-md'
   shouldStopPropagation={true}
/>
```

## Styling Architecture

The component uses a styled-components approach with functions for dynamic styling:

-  `getOptionWrapperStyles()` - Outer wrapper styling
-  `getOptionContainerStyles()` - Interactive container styling
-  `getOptionTextStyles()` - Text label styling
-  `IconWrapperStyles` - Left icon wrapper
-  `RightIconWrapperStyles` - Right icon wrapper

## Event Handling

### Click Events

-  Calls `onClickAction` prop if provided
-  Calls `menuOption.onClick` internally
-  Supports event propagation control via `shouldStopPropagation`

### Hover Events

-  Calls `onHoverAction` on mouse enter/leave
-  Passes option value and hover state

## Accessibility Considerations

-  Uses semantic HTML structure
-  Proper event handling for keyboard and mouse interactions
-  Support for disabled states
-  Clear visual feedback for different variants

## Development Guidelines

### When to Use

-  Building dropdown menus or action lists
-  Need consistent menu item styling across the application
-  Require icon support and hover states
-  Working with MobX-managed state

### Customization Approach

1. Use className props for styling overrides
2. Provide custom icons through render functions
3. Handle interactions through callback props
4. Use appropriate variant for the action type

### Testing Considerations

-  Test both click and hover interactions
-  Verify event propagation behavior
-  Test with and without icons
-  Validate different variants render correctly
-  Test disabled states

### Integration Notes

-  Part of the ActionsMenuDropdownV2 system
-  Designed to work with MobX store patterns
-  Follows the design system's styling conventions
-  Can be used independently or within dropdown containers
