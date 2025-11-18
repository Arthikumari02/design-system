import { FocusRing, FocusRingWithBorder } from '.'

export const FocusRingDefault = () => (
   <FocusRing>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRing>
)
FocusRingDefault.storyName = 'Default'

export const FocusRingDefaultError = () => (
   <FocusRing isError={true}>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRing>
)
FocusRingDefaultError.storyName = 'FocusRing with Error'

export const FocusRingGrayVariant = () => (
   <>
      <FocusRing variant={'Gray'}>
         <div className='w-fit border'>
            <input
               type='text'
               className='outline-none rounded-[10px]'
               autoFocus
            />
         </div>
      </FocusRing>
      <hr className='my-md' />
      <FocusRing variant={'GraySecondary'}>
         <div className='w-fit border'>
            <input
               type='text'
               className='outline-none rounded-[10px]'
               autoFocus
            />
         </div>
      </FocusRing>
   </>
)
FocusRingGrayVariant.storyName = 'FocusRing with Gray Variants'

export const FocusRingDefaultVariantAndError = () => (
   <FocusRing isError={true} variant={'Gray'}>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRing>
)
FocusRingDefaultVariantAndError.storyName = 'FocusRing with Variant and Error'

export const FocusRingWithBorderDefault = () => (
   <FocusRingWithBorder>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRingWithBorder>
)
FocusRingWithBorderDefault.storyName = 'FocusRingWithBorder'
export const FocusRingWithBorderError = () => (
   <FocusRingWithBorder isError={true}>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRingWithBorder>
)
FocusRingWithBorderError.storyName = 'FocusRingWithBorder with Error'

export const FocusRingWithBoarderVariant = () => (
   <FocusRingWithBorder variant={'Gray'}>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRingWithBorder>
)
FocusRingWithBoarderVariant.storyName = 'FocusRingWithBorder with Variant'

export const FocusRingWithBorderVariantAndError = () => (
   <FocusRingWithBorder isError={true} variant={'Gray'}>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRingWithBorder>
)

FocusRingWithBorderVariantAndError.storyName =
   'FocusRingWithBorder with Variant and Error'

export const FocusRingWithBorderNoneVariant = () => (
   <FocusRingWithBorder variant={'None'}>
      <div className='w-fit border'>
         <input type='text' className='outline-none rounded-[10px]' autoFocus />
      </div>
   </FocusRingWithBorder>
)

FocusRingWithBorderNoneVariant.storyName =
   'FocusRingWithBorder with Variant None'

export default {
   title: 'un-published/Components/FocusRing',
   component: FocusRing
}
