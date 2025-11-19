import cn from 'classnames'
import {
   animate,
   AnimatePresence,
   motion,
   PanInfo,
   Transition,
   useMotionTemplate,
   useMotionValue,
   useTransform
} from 'framer-motion'
import { ReactElement, useEffect, useRef } from 'react'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

import { XCloseIcon } from '../../icons/XCloseIcon/XCloseIcon'

import * as styles from './styles'

const MotionModal = motion(Modal)
const MotionModalOverlay = motion(ModalOverlay)

const inertiaTransition = {
   type: 'inertia' as const,
   bounceStiffness: 300,
   bounceDamping: 40,
   timeConstant: 300
}

const staticTransition: Transition = {
   duration: 0.5,
   ease: 'easeOut'
}

interface BottomSheetProps {
   children: ReactElement

   isOpen: boolean
   onOpenChange: (isOpen: boolean) => void

   isDismissable?: boolean

   containerClassname?: string
   modalClassname?: string
   dialogStyles?: string
   shouldShowCloseIcon?: boolean
}

const BottomSheet = (props: BottomSheetProps) => {
   const {
      children,
      isOpen,
      onOpenChange,
      containerClassname = '',
      modalClassname = '',
      dialogStyles = '',
      isDismissable = true,
      shouldShowCloseIcon = false
   } = props

   const sheetRef = useRef<HTMLDivElement>(null)
   const contentRef = useRef<HTMLDivElement>(null)
   const isDraggingRef = useRef(false)

   const windowHeight = window.innerHeight
   const yMotionValue = useMotionValue(windowHeight)
   const bgOpacity = useTransform(yMotionValue, [0, windowHeight], [0.4, 0])
   const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden'
         if (contentRef.current) {
            contentRef.current.scrollTop = 0
         }
      } else {
         document.body.style.overflow = 'auto'
      }

      return () => {
         document.body.style.overflow = 'auto'
      }
   }, [isOpen])

   const onDragStart = () => {
      isDraggingRef.current = true
   }

   const onDrag = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
   ) => {
      if (!isDismissable) return

      const content = contentRef.current
      if (!content) return

      // Only allow dragging if we're at the top of the content
      if (content.scrollTop > 0) {
         event.preventDefault()
         return
      }

      const newY = Math.max(0, Math.min(info.offset.y, windowHeight))
      yMotionValue.set(newY)
   }

   const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      { offset, velocity }: PanInfo
   ) => {
      isDraggingRef.current = false

      if (!isDismissable) return

      if (offset.y > window.innerHeight * 0.2 || velocity.y > 500) {
         onOpenChange(false)
      } else {
         animate(yMotionValue, 0, {
            ...inertiaTransition,
            min: 0,
            max: 0
         })
      }
   }

   const onClickCloseIcon = (): void => onOpenChange(false)

   const renderCloseIcon = (): React.ReactElement => (
      <div className={styles.closeIconContainerStyles}>
         <div
            className={styles.closeIconBGContainerStyles}
            onClick={onClickCloseIcon}
         >
            <XCloseIcon height={18} width={18} className='stroke-fg-white' />
         </div>
      </div>
   )

   return (
      <AnimatePresence>
         {isOpen && (
            <MotionModalOverlay
               isOpen={isOpen}
               onOpenChange={onOpenChange}
               className={styles.modalOverlayStyles}
               initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
               animate={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
               exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
               style={{ backgroundColor: bg }}
               transition={staticTransition}
               isDismissable={isDismissable}
            >
               <MotionModal
                  ref={sheetRef}
                  className={cn(styles.modalStyles, modalClassname)}
                  initial={{ y: windowHeight }}
                  animate={{ y: 0 }}
                  exit={{ y: windowHeight }}
                  transition={staticTransition}
                  style={{ y: yMotionValue, overflow: 'visible' }}
               >
                  {shouldShowCloseIcon ? (
                     <div className='relative flex flex-col items-center'>
                        {renderCloseIcon()}
                     </div>
                  ) : null}

                  <div className='overflow-hidden w-full flex flex-col h-full'>
                     <motion.div
                        className={styles.handleMotionContainerStyles}
                        drag='y'
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragStart={onDragStart}
                        onDrag={onDrag}
                        onDragEnd={handleDragEnd}
                        dragElastic={false}
                     >
                        <div className={styles.handleStyles} />
                     </motion.div>
                     <Dialog
                        className={cn(
                           '!outline-none overflow-hidden w-full',
                           dialogStyles
                        )}
                     >
                        <div
                           ref={contentRef}
                           className={cn(
                              styles.modalContentContainerStyles,
                              containerClassname
                           )}
                        >
                           {children}
                        </div>
                     </Dialog>
                  </div>
               </MotionModal>
            </MotionModalOverlay>
         )}
      </AnimatePresence>
   )
}

export default BottomSheet
