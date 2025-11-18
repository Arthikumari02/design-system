import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { HealthStatusType } from '../../types'

import HealthProgressbar from './HealthProgressbar'
import Progressbar, { ProgressbarProps } from './Progressbar'
import {
   ColorVariantType,
   LabelPositionType,
   ProgressbarSize,
   ProgressBarUIVariant,
   ProgressbarVariant
} from './types'
import StepsProgressBar from './StepsProgressBar'

// Define the Meta configuration for the component
const meta: Meta<typeof Progressbar> = {
   title: 'Components/Progressbar',
   component: Progressbar,
   argTypes: {
      size: {
         options: ['Small', 'Large'], // Add options as per your component's props
         control: { type: 'radio' } // Use appropriate control type
      }
   }
}

// Export the meta configuration
export default meta

const ProgressbarComponent = ({
   progress,
   colorVariant,
   variant,
   labelPosition,
   minValue,
   maxValue,
   uiVariant,
   shouldIncludePercentageSign: shouldIncludePercentageSign,
   ...otherProps
}: ProgressbarProps): React.ReactElement => {
   const [value, setValue] = useState<number>(progress ?? 500)

   return (
      <Progressbar
         colorVariant={colorVariant as ColorVariantType}
         progress={value}
         onChangeProgress={value => setValue(parseInt(value))}
         labelPosition={labelPosition}
         variant={variant}
         progressbarClassName='w-[300px]'
         minValue={minValue}
         maxValue={maxValue}
         size='Large'
         shouldIncludePercentageSign={shouldIncludePercentageSign}
         {...otherProps}
         uiVariant={uiVariant}
      />
   )
}

interface PartialProgressbarProps extends Partial<ProgressbarProps> {
   progress: number
}

export const DefaultProgressbarTemplate = (args: PartialProgressbarProps) => (
   <div className='flex flex-col  justify-center items-center gap-[12px] w-95vw h-[95vh]'>
      <p className='text-black text-center'>Default Progressbar</p>
      <div>
         <p>Gray</p>
         <ProgressbarComponent colorVariant='GRAY' {...args} progress={0} />
      </div>

      <div>
         <p>Gray Slate</p>
         <ProgressbarComponent colorVariant='GRAY_SLATE' {...args} />
      </div>

      <div>
         <p>Primary</p>
         <ProgressbarComponent colorVariant='PRIMARY' {...args} />
      </div>

      <div>
         <p>Warning</p>
         <ProgressbarComponent colorVariant='WARNING' {...args} />
      </div>

      <div>
         <p>Success</p>
         <ProgressbarComponent colorVariant='SUCCESS' {...args} />
      </div>

      <div>
         <p>Error</p>
         <ProgressbarComponent colorVariant='ERROR' {...args} />
      </div>

      <div>
         <p>Purple</p>
         <ProgressbarComponent colorVariant='PURPLE' {...args} />
      </div>
   </div>
)

export const SliderProgressbar = (args: PartialProgressbarProps) => (
   <div className='flex flex-col    justify-center items-center gap-[12px] w-full h-[95vh]'>
      <p className='text-black'>Slider Progressbar</p>

      <div className='w-full'>
         <p>Gray</p>
         <ProgressbarComponent
            {...args}
            colorVariant='GRAY'
            variant={'SLIDER'}
            labelPosition={'right'}
            progress={0}
         />
      </div>

      <div className='w-full'>
         <p>Gray Slate</p>
         <ProgressbarComponent
            {...args}
            colorVariant='GRAY_SLATE'
            progress={40}
            variant={'SLIDER'}
         />
      </div>

      <div className='w-full'>
         <p>Primary</p>
         <ProgressbarComponent
            colorVariant='PRIMARY'
            variant={'SLIDER'}
            {...args}
         />
      </div>

      <div className='w-full'>
         <p>Warning</p>
         <ProgressbarComponent
            colorVariant='WARNING'
            variant={'SLIDER'}
            labelPosition={'right'}
            {...args}
         />
      </div>

      <div className='w-full'>
         <p>Success</p>
         <ProgressbarComponent
            colorVariant='SUCCESS'
            variant={'SLIDER'}
            labelPosition={'right'}
            {...args}
         />
      </div>

      <div className='w-full'>
         <p>Error</p>
         <ProgressbarComponent
            colorVariant='ERROR'
            variant={'SLIDER'}
            labelPosition={'right'}
            {...args}
         />
      </div>

      <div className='w-full'>
         <p>Purple</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            variant={'SLIDER'}
            labelPosition={'right'}
            {...args}
         />
      </div>
   </div>
)

export const InvertedSliderProgressbar = (args: PartialProgressbarProps) => (
   <div className='flex flex-col    justify-center items-center gap-[12px] w-full h-[95vh]'>
      <p className='text-black'>Slider Progressbar</p>

      <div className='w-full'>
         <p>Inverted Slider Progressbar</p>
         <ProgressbarComponent
            colorVariant='PRIMARY'
            variant={'SLIDER'}
            minValue={500}
            maxValue={300}
            {...args}
         />
      </div>
   </div>
)

interface HealthProgressbarSliderProps {
   status: HealthStatusType
   sliderValue?: number
   variant?: ProgressbarVariant

   uiVariant?: ProgressBarUIVariant
   labelPosition?: LabelPositionType
   otherprops?: any
}

const HealthProgressbarComponent = ({
   sliderValue,
   status,
   variant,
   labelPosition,
   uiVariant,
   otherprops
}: HealthProgressbarSliderProps): React.ReactElement => {
   const [value, setValue] = useState<number>(sliderValue ?? 50)

   return (
      <HealthProgressbar
         status={status}
         progress={value}
         variant={variant}
         onChangeProgress={value => setValue(parseInt(value))}
         sliderClassName='w-[300px]'
         uiVariant={uiVariant}
         progressbarClassName='w-[300px]'
         labelClassName='right'
         labelPosition={labelPosition}
         {...otherprops}
      />
   )
}

export const HealthStatusSliderProgress = (
   args: HealthProgressbarSliderProps
) => (
   <div className='flex flex-col    justify-center items-center gap-[12px] w-full h-[95vh]'>
      <p className='text-black'>Health Status Slider Progress bar</p>

      <div className='w-full'>
         <p>Not Started</p>
         <HealthProgressbarComponent
            {...args}
            status={'NOT_STARTED'}
            sliderValue={0}
            variant='SLIDER'
         />
      </div>
      <div className='w-full'>
         <p>Not Tracked</p>
         <HealthProgressbarComponent
            {...args}
            status={'NOT_TRACKED'}
            sliderValue={20}
            variant='SLIDER'
         />
      </div>
      <div className='w-full'>
         <p>At Risk</p>
         <HealthProgressbarComponent
            {...args}
            status={'AT_RISK'}
            sliderValue={20}
            variant='SLIDER'
         />
      </div>
      <div className='w-full'>
         <p>Behind</p>
         <HealthProgressbarComponent
            {...args}
            status={'BEHIND'}
            sliderValue={20}
            variant='SLIDER'
         />
      </div>
      <div className='w-full'>
         <p>On Track</p>
         <HealthProgressbarComponent
            {...args}
            status={'ON_TRACK'}
            sliderValue={30}
            variant='SLIDER'
         />
      </div>
      <div className='w-full'>
         <p>Achieved</p>
         <HealthProgressbarComponent
            {...args}
            status={'ACHIEVED'}
            sliderValue={30}
            variant='SLIDER'
         />
      </div>
      <div className='w-full'>
         <p>Exceeded</p>
         <HealthProgressbarComponent
            {...args}
            status={'EXCEEDED'}
            sliderValue={30}
            variant='SLIDER'
         />
      </div>
   </div>
)

export const HealthStatusDefaultProgressbar = (
   args: HealthProgressbarSliderProps
) => (
   <div className='flex flex-col    justify-center items-center gap-[12px] w-full h-[95vh]'>
      <p className='text-black'>Health Status Default Progress bar</p>

      <div className='w-full'>
         <p>Not Started</p>
         <HealthProgressbarComponent
            {...args}
            status={'NOT_STARTED'}
            sliderValue={0}
         />
      </div>
      <div className='w-full'>
         <p>Not Tracked</p>

         <HealthProgressbarComponent
            {...args}
            status={'NOT_TRACKED'}
            sliderValue={20}
         />
      </div>
      <div className='w-full'>
         <p>At Risk</p>
         <HealthProgressbarComponent
            {...args}
            status={'AT_RISK'}
            sliderValue={20}
         />
      </div>
      <div className='w-full'>
         <p>Behind</p>
         <HealthProgressbarComponent
            {...args}
            status={'BEHIND'}
            sliderValue={20}
         />
      </div>
      <div className='w-full'>
         <p>On Track</p>
         <HealthProgressbarComponent
            {...args}
            status={'ON_TRACK'}
            sliderValue={30}
         />
      </div>
      <div className='w-full'>
         <p>Achieved</p>
         <HealthProgressbarComponent
            {...args}
            status={'ACHIEVED'}
            sliderValue={30}
         />
      </div>
      <div className='w-full'>
         <p>Exceeded</p>
         <HealthProgressbarComponent
            {...args}
            status={'EXCEEDED'}
            sliderValue={100}
         />
      </div>
   </div>
)

export const CircularHealthStatusDefaultProgressbar = (
   args: HealthProgressbarSliderProps
) => (
   <div className='flex flex-col    justify-center items-center gap-[12px] w-full h-[95vh]'>
      <p className='text-black'>Circular Health Status Default Progress bar</p>

      <div className='w-full'>
         <p>Not Started</p>
         <HealthProgressbarComponent
            {...args}
            status={'NOT_STARTED'}
            sliderValue={0}
            uiVariant='CIRCULAR'
         />
      </div>
      <div className='w-full'>
         <p>Not Tracked</p>

         <HealthProgressbarComponent
            {...args}
            status={'NOT_TRACKED'}
            sliderValue={20}
            uiVariant='CIRCULAR'
         />
      </div>
      <div className='w-full'>
         <p>At Risk</p>
         <HealthProgressbarComponent
            {...args}
            status={'AT_RISK'}
            sliderValue={20}
            uiVariant='CIRCULAR'
         />
      </div>
      <div className='w-full'>
         <p>Behind</p>
         <HealthProgressbarComponent
            {...args}
            status={'BEHIND'}
            sliderValue={20}
            uiVariant='CIRCULAR'
         />
      </div>
      <div className='w-full'>
         <p>On Track</p>
         <HealthProgressbarComponent
            {...args}
            status={'ON_TRACK'}
            sliderValue={30}
            uiVariant='CIRCULAR'
         />
      </div>
      <div className='w-full'>
         <p>Achieved</p>
         <HealthProgressbarComponent
            {...args}
            status={'ACHIEVED'}
            sliderValue={30}
            uiVariant='CIRCULAR'
         />
      </div>
      <div className='w-full'>
         <p>Exceeded</p>
         <HealthProgressbarComponent
            {...args}
            status={'EXCEEDED'}
            sliderValue={100}
            uiVariant='CIRCULAR'
         />
      </div>
   </div>
)

export const DefaultProgressbarFloatingLabel = (
   args: PartialProgressbarProps
) => (
   <div className='flex flex-col   justify-center items-center gap-[12px] w-full h-[95vh]'>
      <div className='flex flex-col gap-y-[100px] w-[300px]'>
         <p>Label Top Float</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            progress={1}
            labelPosition={'top-float'}
         />
      </div>
      <div className='mt-[100px] flex flex-col gap-y-[30px] w-[300px]'>
         <p>Label Bottom Float</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            labelPosition={'bottom-float'}
            {...args}
         />
      </div>
   </div>
)

export const SliderProgressbarFloatingLabel = (
   args: PartialProgressbarProps
) => (
   <div className='flex flex-col justify-center items-center gap-[12px] w-full h-[95vh]'>
      <div className='flex flex-col gap-y-[100px] w-[300px]'>
         <p>Label Top Float</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            variant={'SLIDER'}
            labelPosition={'top-float'}
            {...args}
            progress={1}
         />
      </div>
      <div className='mt-[100px] flex flex-col gap-y-[30px] w-[300px]'>
         <p>Label Bottom Float</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            variant={'SLIDER'}
            labelPosition={'bottom-float'}
            {...args}
         />
      </div>
   </div>
)

export const DefaultProgressbarLabel = (args: PartialProgressbarProps) => (
   <div className='flex flex-col   justify-center items-center gap-[12px] w-full h-[95vh]'>
      <div className='flex flex-col gap-y-8 w-[300px]'>
         <p>Label Right</p>

         <ProgressbarComponent
            colorVariant='PURPLE'
            labelPosition={'right'}
            {...args}
         />
      </div>
      <div className='mt-[100px] flex flex-col gap-y-8 w-[300px]'>
         <p>Label Bottom</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            labelPosition={'bottom'}
            {...args}
         />
      </div>
   </div>
)

export const SliderProgressbarLabel = (args: PartialProgressbarProps) => (
   <div className='flex flex-col  justify-center items-center gap-[12px]  h-[95vh]'>
      <div className='flex flex-col gap-y-8 w-[300px]'>
         <p>Label Right</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={'SLIDER'}
            {...args}
         />
      </div>
      <div className='mt-[100px] flex flex-col gap-y-8 w-[300px]'>
         <p>Label Bottom</p>
         <ProgressbarComponent
            colorVariant='PURPLE'
            labelPosition={'bottom'}
            variant={'SLIDER'}
            {...args}
         />
      </div>
   </div>
)

export const SliderProgressbarRandomRange = (args: PartialProgressbarProps) => (
   <div className='flex flex-col   justify-center items-center gap-[12px] w-full h-[95vh]'>
      <div className='flex flex-col gap-y-8 w-[300px] '>
         <p>Range from 33 to 122</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={'SLIDER'}
            minValue={33}
            maxValue={122}
            progress={40}
            shouldIncludePercentageSign={false}
            isDisabled
         />
      </div>
   </div>
)

export const DisabledSliderProgressbar = (args: PartialProgressbarProps) => (
   <div className='flex flex-col   justify-center items-center gap-[12px] w-full h-[95vh]'>
      <div className='flex flex-col gap-y-8 w-[300px] '>
         <p>Range from 33 to 122</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={'SLIDER'}
            minValue={33}
            maxValue={122}
            progress={40}
            shouldIncludePercentageSign={false}
            isDisabled={true}
         />
      </div>
   </div>
)

export const ProgressbarWithExpectedValue = (args: PartialProgressbarProps) => {
   const variants: ProgressbarVariant[] = ['SLIDER', 'DEFAULT']
   const expectedValue = [65]

   const renderSizeItem = (
      size: ProgressbarSize = 'Small',
      type: ProgressbarVariant = 'DEFAULT',
      title = `Size :- ${size} & Variant :- ${type}`
   ) => (
      <div className='flex flex-col justify-between w-[300px] border border-primary py-8 px-4 m-2 rounded-xl'>
         <p className='pb-4'>{title}</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={type}
            progress={40}
            shouldIncludePercentageSign={false}
            expectedValues={expectedValue}
            showExpectedValues
            size={size}
         />
      </div>
   )
   const renderWithCustomExpectedValueIconSize = () => (
      <div className='flex flex-col justify-between w-[300px] border border-primary py-8 px-4 m-2 rounded-xl'>
         <p className='pb-4'>{'Custom Expected Value Icon Size :- 20 & 10'}</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={'DEFAULT'}
            progress={40}
            shouldIncludePercentageSign={false}
            expectedValues={expectedValue}
            showExpectedValues
            customExpectedIconSize={{ width: 20, height: 10 }}
            size={'Large'}
         />
      </div>
   )

   return (
      <div className='flex flex-col justify-center items-center gap-[12px] w-full h-[95vh]'>
         <p>{`Expected Value :- ${expectedValue}`}</p>
         <div className='flex flex-row flex-wrap'>
            {variants.map(variant => renderSizeItem('Small', variant))}
            {variants.map(variant => renderSizeItem('Large', variant))}
            {renderWithCustomExpectedValueIconSize()}
         </div>
      </div>
   )
}

export const ProgressbarWithExpectedValues = (
   args: PartialProgressbarProps
) => {
   const variants: ProgressbarVariant[] = ['SLIDER', 'DEFAULT']
   const expectedValues = [20, 80]

   const renderSizeItem = (
      size: ProgressbarSize = 'Small',
      type: ProgressbarVariant = 'DEFAULT',
      title = `Size :- ${size} & Variant :- ${type}`
   ) => (
      <div className='flex flex-col justify-between w-[300px] border border-primary py-8 px-4 m-2 rounded-xl'>
         <p className='pb-4'>{title}</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={type}
            progress={40}
            shouldIncludePercentageSign={false}
            expectedValues={expectedValues}
            showExpectedValues
            size={size}
         />
      </div>
   )
   const renderWithCustomExpectedValueIconSize = () => (
      <div className='flex flex-col justify-between w-[300px] border border-primary py-8 px-4 m-2 rounded-xl'>
         <p className='pb-4'>{'Custom Expected Value Icon Size :- 20 & 10'}</p>
         <ProgressbarComponent
            {...args}
            colorVariant='PURPLE'
            labelPosition={'right'}
            variant={'DEFAULT'}
            progress={40}
            shouldIncludePercentageSign={false}
            expectedValues={expectedValues}
            showExpectedValues
            customExpectedIconSize={{ width: 20, height: 10 }}
            size={'Large'}
         />
      </div>
   )

   return (
      <div className='flex flex-col justify-center items-center gap-[12px] w-full h-[95vh]'>
         <p>{`Expected Values :- ${expectedValues}`}</p>
         <div className='flex flex-row flex-wrap'>
            {variants.map(variant => renderSizeItem('Small', variant))}
            {variants.map(variant => renderSizeItem('Large', variant))}
            {renderWithCustomExpectedValueIconSize()}
         </div>
      </div>
   )
}

export const StepsSliderProgressbar = () => {
   const [sliderValue, setSliderValue] = useState(0)

   const steps = [0, 20, 40, 60, 80, 100]
   return (
      <div className='w-[100vw] flex justify-center items-center'>
         <div className='w-[500px]'>
            <StepsProgressBar
               sliderValue={sliderValue}
               onChangeSliderValue={value => setSliderValue(parseInt(value))}
               steps={steps}
            />
         </div>
      </div>
   )
}

export const DisabledFilledStepsSliderProgressbar = () => {
   const [sliderValue, setSliderValue] = useState(30)

   const steps = [0, 20, 40, 60, 80, 100]
   return (
      <div className='w-[100vw] flex justify-center items-center'>
         <div className='w-[500px]'>
            <StepsProgressBar
               sliderValue={sliderValue}
               onChangeSliderValue={value => setSliderValue(parseInt(value))}
               steps={steps}
               isDisabled={true}
            />
         </div>
      </div>
   )
}
