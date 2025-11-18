import React, { useState, useRef, useEffect } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import OptionsList from './OptionsList'
import { ListItemType } from '../ReactAriaComponents/ListBoxItem/types'
import { XCloseIcon } from '../../icons/XCloseIcon/XCloseIcon'

export default {
   title: 'Components/OptionsList',
   component: OptionsList,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A versatile dropdown list component supporting single and multiple selection, searching, async loading, and creatable options.'
         }
      }
   },
   argTypes: {
      selectionMode: {
         control: { type: 'radio' },
         options: ['single', 'multiple'],
         defaultValue: 'multiple'
      },
      size: {
         control: { type: 'radio' },
         options: ['Small', 'Medium'],
         defaultValue: 'Medium'
      },
      isSearchable: {
         control: 'boolean',
         defaultValue: true
      },
      disallowEmptySelection: {
         control: 'boolean',
         defaultValue: false
      },
      showSelectedValue: {
         control: 'boolean',
         defaultValue: true
      },
      isAsync: {
         control: 'boolean',
         defaultValue: false
      },
      shouldFixMaxHeight: {
         control: 'boolean',
         defaultValue: true
      },
      enableClearAll: {
         control: 'boolean',
         defaultValue: false
      }
   }
} as Meta<typeof OptionsList>

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

const Template: StoryFn<typeof OptionsList> = args => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>(
      args.selectedKeys || []
   )
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   const handleSelectionChange = (keys: string[]) => {
      setSelectedKeys(keys)
      action('onSelectionChange')(keys)
   }

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
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
   description: 'Select one or more options'
}

export const SingleSelection = Template.bind({})
SingleSelection.args = {
   placeholder: 'Select an option',
   selectionMode: 'single',
   description: 'Select a single option'
}

export const MultipleSelection = Template.bind({})
MultipleSelection.args = {
   placeholder: 'Select options',
   selectionMode: 'multiple',
   showSelectedValue: true,
   description: 'Select multiple options'
}

export const WithDisabledOptions = Template.bind({})
WithDisabledOptions.args = {
   placeholder: 'Select options',
   disabledKeys: ['2', '4', '6'],
   description: 'Some options are disabled'
}

export const WithInitialSelection = Template.bind({})
WithInitialSelection.args = {
   placeholder: 'Select options',
   selectedKeys: ['1', '3'],
   description: 'With initial selection'
}

export const WithClearAll = Template.bind({})
WithClearAll.args = {
   placeholder: 'Select options',
   selectedKeys: ['1', '3', '5'],
   enableClearAll: true,
   description: 'With clear all button'
}

export const DifferentSizes = () => {
   const sizes = ['Small', 'Medium'] as const

   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )
   return (
      <div className='flex flex-col gap-8'>
         {sizes.map(size => (
            <div key={size} style={{ width: '300px' }}>
               <h3 className='mb-2 text-lg font-medium'>{size} Size</h3>
               <OptionsList
                  size={size}
                  selectedKeys={selectedKeys}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedKeys}
                  items={sampleItems}
                  placeholder={`${size} size options list`}
                  description={`OptionsList with ${size} size`}
               />
            </div>
         ))}
      </div>
   )
}

export const WithCustomInput = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )
   const [text, setText] = useState('')
   const inputRef = useRef<HTMLInputElement>(null)

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={sampleItems}
            placeholder='Custom input'
            description='With custom input component'
            renderCustomInput={({ onInputChange, onKeyDown, value, ref }) => (
               <div className='custom-input-container border border-gray-300 rounded p-2'>
                  <input
                     ref={ref}
                     value={value}
                     onChange={e => onInputChange(e.target.value)}
                     onKeyDown={onKeyDown}
                     placeholder='Custom input...'
                     className='outline-none w-full'
                  />
               </div>
            )}
         />
      </div>
   )
}

export const WithCustomOption = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={sampleItems}
            placeholder='Custom options'
            description='With custom option rendering'
            renderCustomOption={({ item, isSelected, isDisabled }) => (
               <div
                  className={`p-2 flex items-center justify-between ${
                     isSelected ? 'bg-blue-100' : ''
                  } ${isDisabled ? 'opacity-50' : ''}`}
               >
                  <span>{item.textValue}</span>
                  {isSelected && <span className='text-blue-500'>✓</span>}
               </div>
            )}
         />
      </div>
   )
}

export const WithCustomSelectedValue = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>(['1', '3'])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={sampleItems}
            placeholder='Custom selected values'
            description='With custom selected value rendering'
            showSelectedValue={true}
            renderSelectedValue={() => (
               <div className='flex flex-wrap gap-2 mb-2'>
                  {selectedItems.map(item => (
                     <div
                        key={item.key}
                        className='bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1'
                     >
                        <span>{item.textValue}</span>
                        <button
                           onClick={() =>
                              setSelectedKeys(
                                 selectedKeys.filter(k => k !== item.key)
                              )
                           }
                           className='text-blue-500 hover:text-blue-700'
                        >
                           <XCloseIcon
                              height={16}
                              width={16}
                              className='stroke-fg-quinary-400'
                           />
                        </button>
                     </div>
                  ))}
               </div>
            )}
         />
      </div>
   )
}

export const WithNoItems = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={[]}
            onSelectionChange={setSelectedKeys}
            items={[]}
            placeholder='No items'
            description='No items available'
            renderNoItemsView={() => (
               <div className='p-4 text-center text-gray-500'>
                  No options available
               </div>
            )}
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
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={items}
            placeholder='Type to search or create'
            description='Creatable options'
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

   useEffect(() => {
      // Reset items when component mounts
      setLoadedItems([])
   }, [])

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
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
            description='Async loading with infinite scroll'
         />
      </div>
   )
}

export const WithCustomStyling = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const selectedItems = sampleItems.filter(item =>
      selectedKeys.includes(item.key as string)
   )

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={sampleItems}
            placeholder='Custom styling'
            description='With custom styling classes'
            containerClassNames='border-2 border-purple-500 rounded-xl overflow-hidden'
            optionContainerClassName='hover:bg-purple-100'
            inputContainerClassName='bg-purple-50'
            descriptionClass='text-purple-600 italic'
            noItemsViewClassName='text-purple-500'
         />
      </div>
   )
}

export const WithCustomErrorAndLoading = () => {
   const [selectedKeys, setSelectedKeys] = useState<string[]>([])
   const [items, setItems] = useState<ListItemType[]>([])
   const [isError, setIsError] = useState(true)
   const selectedItems: ListItemType[] = []

   // Force error state for demonstration
   useEffect(() => {
      setIsError(true)
   }, [])

   return (
      <div style={{ width: '300px' }}>
         <OptionsList
            selectedKeys={selectedKeys}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedKeys}
            items={items}
            placeholder='Error state'
            description='Shows custom error state'
            errorViewContainerClassName='bg-red-50 p-4'
            loadingContainerClassName='bg-blue-50 p-4'
            isAsync={true}
            apiProps={{
               apiFunction: async () => {
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  if (isError) {
                     throw new Error('Failed to load')
                  }
                  return []
               },
               isInfiniteScrollable: false,
               shouldFetchMore: false
            }}
         />
      </div>
   )
}
