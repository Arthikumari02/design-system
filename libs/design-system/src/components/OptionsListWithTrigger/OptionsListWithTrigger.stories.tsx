import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import ArrowRightIcon from '../../icons/ArrowRightIcon'
import { XCloseIcon } from '../../icons/XCloseIcon/XCloseIcon'

import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'
import OptionsListWithTrigger from './OptionsListWithTrigger'

export default {
   title: 'Components/OptionsListWithTrigger',
   component: OptionsListWithTrigger,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A dropdown component with a trigger that displays selected values. Wraps the OptionsList component.'
         }
      }
   },
   argTypes: {
      selectionMode: {
         control: { type: 'radio' },
         options: ['single', 'multiple'],
         defaultValue: 'multiple'
      },
      isSearchable: {
         control: 'boolean',
         defaultValue: true
      },
      isClearable: {
         control: 'boolean',
         defaultValue: true
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      isRequired: {
         control: 'boolean',
         defaultValue: false
      },
      size: {
         control: { type: 'radio' },
         options: ['Small', 'Medium'],
         defaultValue: 'Medium'
      },
      popoverPlacement: {
         control: { type: 'select' },
         options: ['top', 'bottom', 'left', 'right'],
         defaultValue: 'bottom'
      }
   }
} as Meta<typeof OptionsListWithTrigger>

// Sample data for stories
const sampleItems: ListItemType[] = [
   { key: '1', textValue: 'Option 1' },
   { key: '2', textValue: 'Option 2' },
   { key: '3', textValue: 'Option 3' },
   { key: '4', textValue: 'Option 4' },
   { key: '5', textValue: 'Option 5' },
   { key: '6', textValue: 'Option 6' },
   { key: '7', textValue: 'Option 7' },
   { key: '8', textValue: 'Option 8' },
   { key: '9', textValue: 'Option 9' },
   { key: '10', textValue: 'Option 10' }
]

const Template: StoryFn<typeof OptionsListWithTrigger> = args => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>(
      args.selectedKeys || []
   )
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   const handleSelectionChange = (keys: string[], isFromPopover?: boolean) => {
      setSelectedKeys(keys)
      action('onSelectionChange')(keys, isFromPopover)
   }

   return (
      <div style={{ width: '300px' }}>
         <OptionsListWithTrigger
            {...args}
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
            items={sampleItems}
         />
      </div>
   )
}

export const Basic = Template.bind({})
Basic.args = {
   placeholder: 'Select options',
   label: 'Basic Dropdown'
}

export const SingleSelection = Template.bind({})
SingleSelection.args = {
   placeholder: 'Select an option',
   selectionMode: 'single',
   label: 'Single Selection'
}

export const MultipleSelection = Template.bind({})
MultipleSelection.args = {
   placeholder: 'Select options',
   selectionMode: 'multiple',
   label: 'Multiple Selection'
}

export const WithDisabledOptions = Template.bind({})
WithDisabledOptions.args = {
   placeholder: 'Select options',
   disabledKeys: ['2', '4', '6'],
   label: 'With Disabled Options'
}

export const WithInitialSelection = Template.bind({})
WithInitialSelection.args = {
   placeholder: 'Select options',
   selectedKeys: ['1', '3'],
   label: 'With Initial Selection'
}

export const WithClearButton = Template.bind({})
WithClearButton.args = {
   placeholder: 'Select options',
   selectedKeys: ['1', '3', '5'],
   isClearable: true,
   label: 'With Clear Button'
}

export const Disabled = Template.bind({})
Disabled.args = {
   placeholder: 'Select options',
   selectedKeys: ['1', '3'],
   isDisabled: true,
   label: 'Disabled Dropdown'
}

export const WithHintAndError = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )
   const [hasError, setHasError] = useState(true)

   const handleSelectionChange = (keys: string[]) => {
      setSelectedKeys(keys)
      setHasError(keys.length === 0)
   }

   return (
      <div style={{ width: '300px' }}>
         <OptionsListWithTrigger
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
            items={sampleItems}
            placeholder='Select options'
            label='Required Field'
            isRequired={true}
            hint='Please select at least one option'
            errorMessage={hasError ? 'This field is required' : undefined}
         />
      </div>
   )
}

export const WithPrefixEnhancer = Template.bind({})
WithPrefixEnhancer.args = {
   placeholder: 'Select options',
   label: 'With Prefix Enhancer',
   prefixEnhancer: () => (
      <ArrowRightIcon
         width={20}
         height={20}
         className='stroke-fg-quarterary-500'
      />
   )
}

export const DifferentSizes = () => {
   const [selectedKeysSmall, setSelectedKeysSmall] = useState<string[]>([])
   const [selectedKeysMedium, setSelectedKeysMedium] = useState<string[]>([])

   const selectedItemsSmall = sampleItems.filter(item =>
      selectedKeysSmall.includes(item.key as string)
   )

   const selectedItemsMedium = sampleItems.filter(item =>
      selectedKeysMedium.includes(item.key as string)
   )

   return (
      <div className='space-y-6' style={{ width: '300px' }}>
         <OptionsListWithTrigger
            selectedKeys={selectedKeysSmall}
            selectedItems={selectedItemsSmall}
            onSelectionChange={setSelectedKeysSmall}
            items={sampleItems}
            placeholder='Small size'
            label='Small'
            size='Small'
         />

         <OptionsListWithTrigger
            selectedKeys={selectedKeysMedium}
            selectedItems={selectedItemsMedium}
            onSelectionChange={setSelectedKeysMedium}
            items={sampleItems}
            placeholder='Medium size'
            label='Medium'
            size='Medium'
         />
      </div>
   )
}

export const DifferentPlacements = () => {
   // Create individual stories for each placement to avoid type issues
   const [topKeys, setTopKeys] = useState<string[]>([])
   const [rightKeys, setRightKeys] = useState<string[]>([])
   const [bottomKeys, setBottomKeys] = useState<string[]>([])
   const [leftKeys, setLeftKeys] = useState<string[]>([])

   return (
      <div className='grid grid-cols-2 gap-8' style={{ width: '600px' }}>
         <div style={{ width: '250px' }}>
            <OptionsListWithTrigger
               selectedKeys={topKeys}
               selectedItems={sampleItems.filter(item =>
                  topKeys.includes(item.key as string)
               )}
               onSelectionChange={setTopKeys}
               items={sampleItems}
               placeholder='Top placement'
               label='Top Placement'
               popoverPlacement='top'
            />
         </div>
         <div style={{ width: '250px' }}>
            <OptionsListWithTrigger
               selectedKeys={rightKeys}
               selectedItems={sampleItems.filter(item =>
                  rightKeys.includes(item.key as string)
               )}
               onSelectionChange={setRightKeys}
               items={sampleItems}
               placeholder='Right placement'
               label='Right Placement'
               popoverPlacement='right'
            />
         </div>
         <div style={{ width: '250px' }}>
            <OptionsListWithTrigger
               selectedKeys={bottomKeys}
               selectedItems={sampleItems.filter(item =>
                  bottomKeys.includes(item.key as string)
               )}
               onSelectionChange={setBottomKeys}
               items={sampleItems}
               placeholder='Bottom placement'
               label='Bottom Placement'
               popoverPlacement='bottom'
            />
         </div>
         <div style={{ width: '250px' }}>
            <OptionsListWithTrigger
               selectedKeys={leftKeys}
               selectedItems={sampleItems.filter(item =>
                  leftKeys.includes(item.key as string)
               )}
               onSelectionChange={setLeftKeys}
               items={sampleItems}
               placeholder='Left placement'
               label='Left Placement'
               popoverPlacement='left'
            />
         </div>
      </div>
   )
}

export const WithCustomTrigger = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const [isOpen, setIsOpen] = useState(false)

   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   return (
      <div style={{ width: '300px' }}>
         <OptionsListWithTrigger
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={sampleItems}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            customTrigger={triggerRef => (
               <button
                  ref={triggerRef as any}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-between w-full'
                  onClick={() => setIsOpen(!isOpen)}
               >
                  <span>
                     {selectedKeys.length > 0
                        ? `${selectedKeys.length} option(s) selected`
                        : 'Custom Trigger'}
                  </span>
                  <span>▼</span>
               </button>
            )}
         />
      </div>
   )
}

export const WithCustomSelectedOption = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>(['1', '3'])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   return (
      <div style={{ width: '300px' }}>
         <OptionsListWithTrigger
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={sampleItems}
            placeholder='Custom selected options'
            label='Custom Selected Options'
            renderCustomSelectedOption={option => (
               <div className='bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1 max-w-[100px]'>
                  <span className='truncate'>{option.textValue}</span>
                  <button
                     onClick={e => {
                        e.stopPropagation()
                        setSelectedKeys(
                           selectedKeys.filter(k => k !== option.key)
                        )
                     }}
                     className='text-blue-500 hover:text-blue-700'
                  >
                     <XCloseIcon
                        height={12}
                        width={12}
                        className='stroke-fg-quinary-400'
                     />
                  </button>
               </div>
            )}
         />
      </div>
   )
}

export const AsyncLoading = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const [loadedItems, setLoadedItems] = useState<ListItemType[]>([])
   const selectedItems = loadedItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   // Mock API function
   const fetchData = async (page: number, filterText?: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate items based on page and filter
      const items = Array.from({ length: 10 }, (_, i) => {
         const index = page * 10 + i + 1
         return {
            key: `item-${index}`,
            textValue: filterText
               ? `${filterText} Result ${index}`
               : `Async Item ${index}`
         }
      })

      setLoadedItems(prev => [...prev, ...items])
      return items
   }

   return (
      <div style={{ width: '300px' }}>
         <OptionsListWithTrigger
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            isAsync={true}
            apiProps={{
               apiFunction: fetchData,
               isInfiniteScrollable: true,
               shouldFetchMore: true
            }}
            placeholder='Search async options'
            label='Async Loading'
         />
      </div>
   )
}

export const WithCreatableOptions = () => {
   const [items, setItems] = useState<ListItemType[]>(sampleItems)
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = items.filter(item =>
      selectedKeys.includes(item.key as string)
   )
   const [isCreating, setIsCreating] = useState(false)

   const handleCreateOption = (text: string, onCreate: () => void) => {
      setIsCreating(true)

      // Simulate API call
      setTimeout(() => {
         const newItem = {
            key: `new-${Date.now()}`,
            textValue: text
         }

         setItems([...items, newItem])
         setSelectedKeys([...selectedKeys, newItem.key as string])
         setIsCreating(false)
         onCreate()
      }, 1000)
   }

   return (
      <div style={{ width: '300px' }}>
         <OptionsListWithTrigger
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={items}
            placeholder='Type to search or create'
            label='Creatable Options'
            creatableOptionProps={{
               isCreatable: true,
               onClickCreateOption: handleCreateOption,
               createText: 'Create new option:',
               isLoading: isCreating
            }}
         />
      </div>
   )
}
