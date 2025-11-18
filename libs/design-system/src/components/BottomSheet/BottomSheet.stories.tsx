import { ReactElement, useState } from 'react'

import BottomSheet from './BottomSheet'

export default {
   title: 'components/BottomSheet'
}

const mobileContainerStyles = `bg-neutral-default-l3 h-screen flex flex-col items-center`
const triggerButtonStyles = `button-text-md text-primary font-semibold mt-common-sm-8`
const contentButtonStyles = `button-text-md h-[48px] rounded-full w-full text-primary font-semibold border border-button-primary-bg bg-button-primary-bg px-common-3xl-32 py-common-xl-16 shrink-0`

const BottomSheetDefaultContent = () => (
   <>
      <div className='flex flex-col items-center mb-common-6xl-64'>
         <div className='text-primary heading-xl font-semibold mb-common-sm-8'>
            Heading
         </div>
         <div className='text-secondary body-md font-normal text-center'>
            This is paragraph for the bottom sheet This is paragraph for the
            bottom sheet
         </div>
      </div>
      <button className={contentButtonStyles}>Button</button>
   </>
)

export const DefaultBottomSheet = (): ReactElement => {
   const [open, setOpen] = useState(false)

   const openBottomSheet = (): void => {
      setOpen(true)
   }

   return (
      <div className={mobileContainerStyles}>
         <button onClick={openBottomSheet} className={triggerButtonStyles}>
            Open Bottom Sheet
         </button>
         <BottomSheet isOpen={open} onOpenChange={setOpen}>
            <BottomSheetDefaultContent />
         </BottomSheet>
      </div>
   )
}

export const NonDismissableBottomSheet = (): ReactElement => {
   const [open, setOpen] = useState(false)

   const openBottomSheet = (): void => {
      setOpen(true)
   }

   return (
      <div className={mobileContainerStyles}>
         <button onClick={openBottomSheet} className={triggerButtonStyles}>
            Open Bottom Sheet
         </button>
         <BottomSheet
            isOpen={open}
            onOpenChange={setOpen}
            isDismissable={false}
         >
            <BottomSheetDefaultContent />
         </BottomSheet>
      </div>
   )
}

export const BottomSheetWithFullHeight = (): ReactElement => {
   const [open, setOpen] = useState(false)

   const openBottomSheet = (): void => {
      setOpen(true)
   }

   return (
      <div className={mobileContainerStyles}>
         <button onClick={openBottomSheet} className={triggerButtonStyles}>
            Open Bottom Sheet
         </button>
         <BottomSheet
            isOpen={open}
            onOpenChange={setOpen}
            shouldOccupyFullHeight
         >
            <BottomSheetDefaultContent />
         </BottomSheet>
      </div>
   )
}

export const NestedBottomSheet = (): ReactElement => {
   const [isOpen, setOpen] = useState(false)
   const [isOpen2, setOpen2] = useState(false)

   return (
      <div className={mobileContainerStyles}>
         <button onClick={() => setOpen(true)} className={triggerButtonStyles}>
            Open modal
         </button>
         <BottomSheet isOpen={isOpen} onOpenChange={setOpen}>
            <div className='flex flex-col overflow-y-auto' style={{}}>
               <div className='p-4'>
                  <h2 className='text-xl font-semibold mb-4'>
                     Bottom Sheet Content
                  </h2>
                  {Array(2)
                     .fill(null)
                     .map((_, i) => (
                        <p key={i} className='mb-4'>
                           This is paragraph {i + 1} with some content to
                           demonstrate scrolling.
                        </p>
                     ))}
                  <div className='flex flex-col'>
                     <button
                        onClick={() => setOpen(false)}
                        className={triggerButtonStyles}
                     >
                        Close
                     </button>
                     <button
                        onClick={() => setOpen2(true)}
                        className={triggerButtonStyles}
                     >
                        Open modal 2
                     </button>
                  </div>
                  <BottomSheet isOpen={isOpen2} onOpenChange={setOpen2}>
                     <div className='flex flex-col overflow-y-auto' style={{}}>
                        <div className='p-4'>
                           <h2 className='text-xl font-semibold mb-4'>
                              Bottom Sheet Content 2
                           </h2>
                           {Array(25)
                              .fill(null)
                              .map((_, i) => (
                                 <p key={i} className='mb-4'>
                                    This is paragraph {i + 1} with some content
                                    to demonstrate scrolling. 2
                                 </p>
                              ))}
                           <button
                              onClick={() => setOpen2(false)}
                              className={triggerButtonStyles}
                           >
                              Close
                           </button>
                        </div>
                     </div>
                  </BottomSheet>
               </div>
            </div>
         </BottomSheet>
      </div>
   )
}

export const BottomSheetWithScrolling = (): ReactElement => {
   const [open2, setOpen2] = useState(false)

   return (
      <div className={mobileContainerStyles}>
         <button onClick={() => setOpen2(true)} className={triggerButtonStyles}>
            Open modal
         </button>
         <BottomSheet isOpen={open2} onOpenChange={setOpen2}>
            <div className='flex flex-col overflow-y-auto' style={{}}>
               <div className='p-4'>
                  <h2 className='text-xl font-semibold mb-4'>
                     Bottom Sheet Content 2
                  </h2>
                  {Array(2)
                     .fill(null)
                     .map((_, i) => (
                        <p key={i} className='mb-4'>
                           This is paragraph {i + 1} with some content to
                           demonstrate scrolling. 2
                        </p>
                     ))}
                  <button
                     onClick={() => setOpen2(false)}
                     className={triggerButtonStyles}
                  >
                     Close
                  </button>
               </div>
            </div>
         </BottomSheet>
      </div>
   )
}
