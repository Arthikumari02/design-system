import { Key } from '@react-types/shared'
import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Header, Section } from 'react-aria-components'

import CheckIcon from '../../../icons/CheckIcon'
import { UserIcon } from '../../../icons/UserIcon'

import ListBoxItem from '../ListBoxItem/ListBoxItem'
import { ListItemType } from '../ListBoxItem/types'
import Select from './Select'

// Add a custom interface for fruits with color
interface FruitItemType extends ListItemType {
   color: string
}

export default {
   title: 'Components/Select',
   component: Select,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A customizable dropdown component that allows users to select a single option from a list.'
         }
      }
   },
   argTypes: {
      size: {
         options: ['Small', 'Medium'],
         control: { type: 'radio' },
         defaultValue: 'Medium'
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      isRequired: {
         control: 'boolean',
         defaultValue: false
      },
      shouldShowClearButton: {
         control: 'boolean',
         defaultValue: false
      }
   }
}

// Sample data for stories
const options = [
   { key: 'apple', textValue: 'Apple' },
   { key: 'banana', textValue: 'Banana' },
   { key: 'orange', textValue: 'Orange' },
   { key: 'grape', textValue: 'Grape' },
   { key: 'kiwi', textValue: 'Kiwi' },
   { key: 'mango', textValue: 'Mango' },
   { key: 'pineapple', textValue: 'Pineapple' },
   { key: 'strawberry', textValue: 'Strawberry' }
]

// Sample data with sections
const fruitSections = [
   {
      name: 'Citrus Fruits',
      items: [
         { key: 'orange', textValue: 'Orange' },
         { key: 'lemon', textValue: 'Lemon' },
         { key: 'lime', textValue: 'Lime' },
         { key: 'grapefruit', textValue: 'Grapefruit' }
      ]
   },
   {
      name: 'Berries',
      items: [
         { key: 'strawberry', textValue: 'Strawberry' },
         { key: 'blueberry', textValue: 'Blueberry' },
         { key: 'raspberry', textValue: 'Raspberry' },
         { key: 'blackberry', textValue: 'Blackberry' }
      ]
   },
   {
      name: 'Tropical Fruits',
      items: [
         { key: 'banana', textValue: 'Banana' },
         { key: 'mango', textValue: 'Mango' },
         { key: 'pineapple', textValue: 'Pineapple' },
         { key: 'papaya', textValue: 'Papaya' }
      ]
   }
]

// Template for basic Select stories
const Template: StoryFn<typeof Select> = args => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(
      args.defaultSelectedKey || null
   )
   const size = args.size || 'Medium'

   return (
      <div style={{ width: '300px' }}>
         <Select
            {...args}
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            items={options}
         >
            {(item: any) => (
               // @ts-ignore - Ignore missing required props
               <ListBoxItem item={item} key={item.key}>
                  {item.textValue}
               </ListBoxItem>
            )}
         </Select>
      </div>
   )
}

export const Basic = Template.bind({})
Basic.args = {
   label: 'Select a fruit',
   placeholder: 'Choose a fruit'
}

export const WithHint = Template.bind({})
WithHint.args = {
   label: 'Select a fruit',
   placeholder: 'Choose a fruit',
   hint: 'Select your favorite fruit from the list'
}

export const WithError = Template.bind({})
WithError.args = {
   label: 'Select a fruit',
   placeholder: 'Choose a fruit',
   errorMessage: 'Please select a fruit',
   isRequired: true
}

export const Disabled = Template.bind({})
Disabled.args = {
   label: 'Select a fruit',
   placeholder: 'Choose a fruit',
   isDisabled: true
}

export const WithDefaultSelection = Template.bind({})
WithDefaultSelection.args = {
   label: 'Select a fruit',
   placeholder: 'Choose a fruit',
   defaultSelectedKey: 'apple'
}

export const WithClearButton = Template.bind({})
WithClearButton.args = {
   label: 'Select a fruit',
   placeholder: 'Choose a fruit',
   shouldShowClearButton: true,
   defaultSelectedKey: 'apple'
}

export const Sizes = () => {
   const sizes = ['Small', 'Medium'] as const

   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   return (
      <div className='flex flex-col gap-6'>
         {sizes.map(size => (
            <div key={size} style={{ width: '300px' }}>
               <h3 className='mb-2 text-lg font-medium'>{size} Size</h3>
               <Select
                  label={`${size} Select`}
                  placeholder={`Choose a fruit (${size})`}
                  size={size}
                  selectedKey={selectedKey}
                  onSelectionChange={setSelectedKey}
                  items={options}
               >
                  {(item: any) => (
                     // @ts-ignore - Ignore missing required props
                     <ListBoxItem item={item} key={item.key}>
                        {item.textValue}
                     </ListBoxItem>
                  )}
               </Select>
            </div>
         ))}
      </div>
   )
}

export const WithLeftIcon = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   const size = 'Medium'

   return (
      <div style={{ width: '300px' }}>
         <Select
            label='Select with icon'
            placeholder='Choose a fruit'
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            renderLeftIcon={() => (
               <UserIcon width={20} height={20} className='fill-gray-600' />
            )}
            items={options}
         >
            {(item: any) => (
               // @ts-ignore - Ignore missing required props
               <ListBoxItem item={item} key={item.key}>
                  {item.textValue}
               </ListBoxItem>
            )}
         </Select>
      </div>
   )
}

export const WithSections = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   const size = 'Medium'

   return (
      <div style={{ width: '300px' }}>
         <Select
            label='Fruit categories'
            placeholder='Choose a fruit'
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
         >
            <Section>
               <Header>Citrus Fruits</Header>
               {fruitSections[0].items.map(item => (
                  // @ts-ignore - Ignore missing required props
                  <ListBoxItem item={item} key={item.key}>
                     {item.textValue}
                  </ListBoxItem>
               ))}
            </Section>
            <Section>
               <Header>Berries</Header>
               {fruitSections[1].items.map(item => (
                  // @ts-ignore - Ignore missing required props
                  <ListBoxItem item={item} key={item.key}>
                     {item.textValue}
                  </ListBoxItem>
               ))}
            </Section>
         </Select>
      </div>
   )
}

export const WithCustomOption = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   const size = 'Medium'

   // Sample data with additional properties
   const fruitsWithDetails: FruitItemType[] = options.map(fruit => ({
      ...fruit,
      color:
         fruit.key === 'apple'
            ? 'red'
            : fruit.key === 'banana'
              ? 'yellow'
              : fruit.key === 'orange'
                ? 'orange'
                : fruit.key === 'grape'
                  ? 'purple'
                  : fruit.key === 'kiwi'
                    ? 'green'
                    : fruit.key === 'mango'
                      ? 'yellow'
                      : fruit.key === 'pineapple'
                        ? 'yellow'
                        : 'red'
   }))

   return (
      <div style={{ width: '300px' }}>
         <Select
            label='Fruits with custom rendering'
            placeholder='Choose a fruit'
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            items={fruitsWithDetails}
            renderCustomOption={({ item, isSelected, isDisabled }) => (
               <div
                  className={`p-2 flex items-center justify-between ${
                     isSelected ? 'bg-blue-100' : ''
                  } ${isDisabled ? 'opacity-50' : ''}`}
               >
                  <div className='flex items-center'>
                     <div
                        className='w-3 h-3 rounded-full mr-2'
                        style={{
                           backgroundColor: (item as FruitItemType).color
                        }}
                     />
                     <span>{item.textValue}</span>
                  </div>
                  {isSelected && (
                     <CheckIcon
                        width={16}
                        height={16}
                        className='stroke-fg-quarterary-500'
                     />
                  )}
               </div>
            )}
         >
            {(item: FruitItemType) => (
               // @ts-ignore - Ignore missing required props
               <ListBoxItem item={item} key={item.key}>
                  {item.textValue}
               </ListBoxItem>
            )}
         </Select>
      </div>
   )
}

export const WithCustomValueContainer = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>('apple')
   const size = 'Medium'

   return (
      <div style={{ width: '300px' }}>
         <Select
            label='Custom value display'
            placeholder='Choose a fruit'
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            items={options}
            renderValueContainer={({ selectedText }) => (
               <div className='flex items-center'>
                  <span className='text-blue-600 font-medium'>
                     {selectedText}
                  </span>
                  <span className='ml-1 text-gray-500'>(selected)</span>
               </div>
            )}
         >
            {(item: any) => (
               // @ts-ignore - Ignore missing required props
               <ListBoxItem item={item} key={item.key}>
                  {item.textValue}
               </ListBoxItem>
            )}
         </Select>
      </div>
   )
}

export const WithDisabledOptions = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   const size = 'Medium'

   return (
      <div style={{ width: '300px' }}>
         <Select
            label='Some options disabled'
            placeholder='Choose a fruit'
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            disabledKeys={['banana', 'mango']}
            items={options}
         >
            {(item: any) => (
               // @ts-ignore - Ignore missing required props
               // @ts-ignore - Ignore size property not existing
               <ListBoxItem item={item} key={item.key}>
                  {item.textValue}
               </ListBoxItem>
            )}
         </Select>
      </div>
   )
}

export const ControlledSelect = () => {
   const [selectedKey, setSelectedKey] = useState<Key>('apple')
   const [selectionMessage, setSelectionMessage] =
      useState<string>('Selected: Apple')
   const size = 'Medium'

   const handleSelectionChange = (key: Key) => {
      setSelectedKey(key)
      const selectedOption = options.find(option => option.key === key)
      setSelectionMessage(`Selected: ${selectedOption?.textValue || 'None'}`)
   }

   return (
      <div style={{ width: '300px' }}>
         <Select
            label='Controlled select'
            placeholder='Choose a fruit'
            selectedKey={selectedKey}
            onSelectionChange={handleSelectionChange}
            items={options}
         >
            {(item: any) => (
               // @ts-ignore - Ignore missing required props
               <ListBoxItem item={item} key={item.key}>
                  {item.textValue}
               </ListBoxItem>
            )}
         </Select>
         <div className='mt-2 text-sm text-blue-600'>{selectionMessage}</div>
      </div>
   )
}

export const SelectShowcase = () => (
   <div className='grid grid-cols-2 gap-8' style={{ width: '650px' }}>
      <div>
         <h3 className='mb-4 text-lg font-medium'>Basic Select</h3>
         <div className='mb-8'>
            <Basic {...Basic.args} />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Hint</h3>
         <div className='mb-8'>
            <WithHint {...WithHint.args} />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Error</h3>
         <div className='mb-8'>
            <WithError {...WithError.args} />
         </div>

         <h3 className='mb-4 text-lg font-medium'>Disabled</h3>
         <div className='mb-8'>
            <Disabled {...Disabled.args} />
         </div>

         <h3 className='mb-4 text-lg font-medium'>Different Sizes</h3>
         <div>
            <Sizes />
         </div>
      </div>

      <div>
         <h3 className='mb-4 text-lg font-medium'>With Left Icon</h3>
         <div className='mb-8'>
            <WithLeftIcon />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Sections</h3>
         <div className='mb-8'>
            <WithSections />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Custom Options</h3>
         <div className='mb-8'>
            <WithCustomOption />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Custom Value Display</h3>
         <div className='mb-8'>
            <WithCustomValueContainer />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Disabled Options</h3>
         <div className='mb-8'>
            <WithDisabledOptions />
         </div>

         <h3 className='mb-4 text-lg font-medium'>Controlled Select</h3>
         <div className='mb-8'>
            <ControlledSelect />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Clear Button</h3>
         <div>
            <WithClearButton {...WithClearButton.args} />
         </div>
      </div>
   </div>
)
