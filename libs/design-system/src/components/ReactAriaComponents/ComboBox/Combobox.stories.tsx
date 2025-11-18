import { Key } from '@react-types/shared'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Header, Section } from 'react-aria-components'

import { ChevronDownIcon } from '../../../icons/ChevronDownIcon'
import { Loader } from '../../Loader/Loader'

import ListBoxItem from '../ListBoxItem/ListBoxItem'
import { ListItemType } from '../ListBoxItem/types'
import { AsyncComboBox } from './AsyncComboBox'
import { ComboBox } from './ComboBox'

export default {
   title: 'Components/ComboBox',
   component: ComboBox,
   parameters: {
      layout: 'centered',
      docs: {
         description: {
            component:
               'A versatile input field that combines a text input with a dropdown list. It allows users to either type directly into the input field or select from a list of options.'
         }
      }
   },
   argTypes: {
      size: {
         control: { type: 'select' },
         options: ['Small', 'Medium'],
         defaultValue: 'Medium'
      },
      isDisabled: {
         control: 'boolean',
         defaultValue: false
      },
      isClearable: {
         control: 'boolean',
         defaultValue: true
      },
      isRequired: {
         control: 'boolean',
         defaultValue: false
      },
      allowsEmptyCollection: {
         control: 'boolean',
         defaultValue: false
      }
   }
} as Meta<typeof ComboBox>

// Sample data for stories
const cities = [
   { key: 'nyc', textValue: 'New York' },
   { key: 'la', textValue: 'Los Angeles' },
   { key: 'chi', textValue: 'Chicago' },
   { key: 'hou', textValue: 'Houston' },
   { key: 'phx', textValue: 'Phoenix' },
   { key: 'phi', textValue: 'Philadelphia' },
   { key: 'san', textValue: 'San Antonio' },
   { key: 'sd', textValue: 'San Diego' },
   { key: 'dal', textValue: 'Dallas' },
   { key: 'sj', textValue: 'San Jose' }
]

// Template for basic ComboBox stories
const Template: StoryFn<typeof ComboBox> = args => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)

   return (
      <div style={{ width: '300px' }}>
         <ComboBox
            {...args}
            selectedKey={selectedKey}
            onSelectionChange={key => setSelectedKey(key)}
            defaultItems={cities}
         >
            {(item: any) => (
               <ListBoxItem
                  item={item}
                  key={item.key}
                  // @ts-ignore
                  textValue={item.textValue}
               >
                  {item.textValue}
               </ListBoxItem>
            )}
         </ComboBox>
      </div>
   )
}

export const Basic = Template.bind({})
Basic.args = {
   label: 'City',
   placeholder: 'Select a city',
   hint: 'Choose a city from the list'
}

export const WithInitialSelection = Template.bind({})
WithInitialSelection.args = {
   label: 'City',
   placeholder: 'Select a city',
   defaultSelectedKey: 'nyc'
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
   label: 'City',
   placeholder: 'Select a city',
   errorMessage: 'Please select a valid city',
   isInvalid: true
}

export const Disabled = Template.bind({})
Disabled.args = {
   label: 'City',
   placeholder: 'Select a city',
   isDisabled: true
}

export const Sizes = () => {
   const sizes = ['Small', 'Medium'] as const

   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   return (
      <div className='flex flex-col gap-8' style={{ width: '300px' }}>
         {sizes.map(size => (
            <div key={size}>
               <h3 className='mb-2 text-lg font-medium'>{size} Size</h3>
               <ComboBox
                  size={size}
                  label={`${size} ComboBox`}
                  placeholder={`Select a city (${size})`}
                  selectedKey={selectedKey}
                  onSelectionChange={key => setSelectedKey(key)}
                  defaultItems={cities}
               >
                  {(item: any) => (
                     <ListBoxItem
                        item={item}
                        key={item.key}
                        // @ts-ignore
                        textValue={item.textValue}
                     >
                        {item.textValue}
                     </ListBoxItem>
                  )}
               </ComboBox>
            </div>
         ))}
      </div>
   )
}

export const WithIcons = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)

   return (
      <div style={{ width: '300px' }}>
         <ComboBox
            label='City'
            placeholder='Search cities'
            selectedKey={selectedKey}
            onSelectionChange={key => setSelectedKey(key)}
            defaultItems={cities}
            renderLeftIcon={() => (
               <ChevronDownIcon
                  className='stroke-slate-600'
                  width={20}
                  height={20}
               />
            )}
            renderRightIcon={() => (
               <ChevronDownIcon
                  className='stroke-slate-600'
                  width={20}
                  height={20}
               />
            )}
         >
            {(item: any) => (
               <ListBoxItem
                  item={item}
                  key={item.key}
                  // @ts-ignore
                  textValue={item.textValue}
               >
                  {item.textValue}
               </ListBoxItem>
            )}
         </ComboBox>
      </div>
   )
}

export const WithSections = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)

   const usaCities = cities.slice(0, 5)
   const europeanCities = [
      { key: 'lon', textValue: 'London' },
      { key: 'par', textValue: 'Paris' },
      { key: 'ber', textValue: 'Berlin' },
      { key: 'rom', textValue: 'Rome' },
      { key: 'mad', textValue: 'Madrid' }
   ]

   return (
      <div style={{ width: '300px' }}>
         <ComboBox
            label='City'
            placeholder='Search cities'
            selectedKey={selectedKey}
            onSelectionChange={key => setSelectedKey(key)}
         >
            <Section>
               <Header>US Cities</Header>
               {usaCities.map(city => (
                  <ListBoxItem
                     item={city}
                     key={city.key}
                     // @ts-ignore
                     textValue={city.textValue}
                  >
                     {city.textValue}
                  </ListBoxItem>
               ))}
            </Section>
            <Section>
               <Header>European Cities</Header>
               {europeanCities.map(city => (
                  <ListBoxItem
                     item={city}
                     key={city.key}
                     // @ts-ignore
                     textValue={city.textValue}
                  >
                     {city.textValue}
                  </ListBoxItem>
               ))}
            </Section>
         </ComboBox>
      </div>
   )
}

export const WithCustomOption = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)

   const citiesWithData = cities.map(city => ({
      ...city,
      population: Math.floor(Math.random() * 10000000) + 500000,
      country: 'United States'
   }))

   return (
      <div style={{ width: '300px' }}>
         <ComboBox
            label='City'
            placeholder='Search cities'
            selectedKey={selectedKey}
            onSelectionChange={key => setSelectedKey(key)}
            defaultItems={citiesWithData}
            renderCustomOption={({ item, isSelected }) => (
               <div className={`p-2 ${isSelected ? 'bg-blue-100' : ''}`}>
                  <div className='font-medium'>{item.textValue}</div>
                  <div className='text-sm text-gray-500'>
                     Pop: {item.population.toLocaleString()}
                  </div>
                  {isSelected && (
                     <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                        <ChevronDownIcon
                           className='stroke-slate-600'
                           width={16}
                           height={16}
                        />
                     </div>
                  )}
               </div>
            )}
         >
            {(item: any) => (
               <ListBoxItem
                  item={item}
                  key={item.key}
                  // @ts-ignore
                  textValue={item.textValue}
               >
                  {item.textValue}
               </ListBoxItem>
            )}
         </ComboBox>
      </div>
   )
}

export const WithCustomStates = () => {
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)

   return (
      <div style={{ width: '300px' }}>
         <ComboBox
            label='City'
            placeholder='Search cities'
            selectedKey={selectedKey}
            onSelectionChange={key => setSelectedKey(key)}
            defaultItems={[]}
            renderNoResults={() => (
               <div className='p-4 text-center'>
                  <div className='text-gray-500'>No cities found</div>
                  <div className='text-sm text-gray-400'>
                     Try a different search term
                  </div>
               </div>
            )}
            renderCustomLoading={() => (
               <div className='p-4 flex justify-center items-center'>
                  <Loader className='fill-utility-brand-500' />
                  <span className='ml-2'>Loading cities...</span>
               </div>
            )}
            renderCustomError={onRetry => (
               <div className='p-4 text-center'>
                  <div className='text-red-500 mb-2'>Failed to load cities</div>
                  <button
                     onClick={onRetry}
                     className='px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200'
                  >
                     Retry
                  </button>
               </div>
            )}
         >
            {(item: any) => (
               <ListBoxItem
                  item={item}
                  key={item.key}
                  // @ts-ignore
                  textValue={item.textValue}
               >
                  {item.textValue}
               </ListBoxItem>
            )}
         </ComboBox>
      </div>
   )
}

export const CreatableComboBox = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   const [items, setItems] = useState<ListItemType[]>(cities)
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
         setSelectedKey(newItem.key)
         setInputValue(text)
         setIsCreating(false)
         onCreate()
      }, 1000)
   }

   return (
      <div style={{ width: '300px' }}>
         <ComboBox
            label='City'
            placeholder='Search or create a city'
            inputValue={inputValue}
            onInputChange={setInputValue}
            selectedKey={selectedKey}
            onSelectionChange={key => setSelectedKey(key)}
            defaultItems={items}
            creatableOptionProps={{
               isCreatable: true,
               onClickCreateOption: handleCreateOption,
               createText: 'Create new city:',
               isLoading: isCreating
            }}
         >
            {(item: any) => (
               <ListBoxItem
                  item={item}
                  key={item.key}
                  // @ts-ignore
                  textValue={item.textValue}
               >
                  {item.textValue}
               </ListBoxItem>
            )}
         </ComboBox>
      </div>
   )
}

export const AsyncComboBoxExample = () => {
   const [selectedKey, setSelectedKey] = useState()

   const getItems = async (page: number, filterText = '') => {
      // If no cursor is available, then we're loading the first page,
      // filtering the results returned via a query string that
      // mirrors the input text.
      // Otherwise, the cursor is the next URL to load,
      // as returned from the previous page.
      const res = await fetch(
         `https://swapi.dev/api/people/?search=${filterText}&page=${page + 1}`
      )
      const json = await res.json()

      return json.results.map(item => ({
         ...item,
         key: item.name,
         textValue: item.name
      }))
   }

   return (
      <AsyncComboBox
         size='Medium'
         label={'City'}
         hint={'This is a hint text to help user.'}
         placeholder={'Search'}
         selectedKey={selectedKey}
         onSelectionChange={value => {
            setSelectedKey(value)
         }}
         allowsEmptyCollection={true}
         renderNoResults={() => <p>No Results Found</p>}
         apiProps={{
            isInfiniteScrollable: true,
            shouldFetchMore: true,
            apiFunction: getItems
         }}
      >
         {(item: any) => (
            <ListBoxItem
               item={item}
               key={item.key}
               // @ts-ignore
               textValue={item.textValue}
               size='Medium'
            >
               {item.textValue}
            </ListBoxItem>
         )}
      </AsyncComboBox>
   )
}

export const WithCustomInputHandling = () => {
   const [inputValue, setInputValue] = useState('')
   const [selectedKey, setSelectedKey] = useState<Key | null>(null)
   const size = 'Medium'

   const onSelectionChange = (key: Key | null) => {
      setSelectedKey(key)
      const selectedItem = cities.find(city => city.key === key)
      setInputValue(selectedItem?.textValue || '')
   }

   return (
      <ComboBox
         size={size}
         label='City'
         placeholder='Search cities'
         inputValue={inputValue}
         onInputChange={setInputValue}
         selectedKey={selectedKey}
         onSelectionChange={onSelectionChange}
         defaultItems={cities}
      >
         {(item: any) => (
            <ListBoxItem
               item={item}
               key={item.key}
               // @ts-ignore
               textValue={item.textValue}
            >
               {item.textValue}
            </ListBoxItem>
         )}
      </ComboBox>
   )
}

export const ComboBoxShowcase = () => (
   <div className='grid grid-cols-2 gap-8' style={{ width: '650px' }}>
      <div>
         <h3 className='mb-4 text-lg font-medium'>Basic ComboBox</h3>
         <div className='mb-8'>
            <Basic {...Basic.args} />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Error Message</h3>
         <div className='mb-8'>
            <WithErrorMessage {...WithErrorMessage.args} />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Icons</h3>
         <div className='mb-8'>
            <WithIcons />
         </div>

         <h3 className='mb-4 text-lg font-medium'>With Custom Option</h3>
         <div>
            <WithCustomOption />
         </div>
      </div>

      <div>
         <h3 className='mb-4 text-lg font-medium'>With Sections</h3>
         <div className='mb-8'>
            <WithSections />
         </div>

         <h3 className='mb-4 text-lg font-medium'>Creatable ComboBox</h3>
         <div className='mb-8'>
            <CreatableComboBox />
         </div>

         <h3 className='mb-4 text-lg font-medium'>Async ComboBox</h3>
         <div>
            <AsyncComboBoxExample />
         </div>

         <h3 className='mb-4 text-lg font-medium'>
            With Custom Input Handling
         </h3>
         <div>
            <WithCustomInputHandling />
         </div>
      </div>
   </div>
)
