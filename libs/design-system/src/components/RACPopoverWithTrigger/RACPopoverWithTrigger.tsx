import cn from 'classnames'
import { observer } from 'mobx-react'
import { ReactElement, RefObject } from 'react'

import { PopoverProps, Popover, Dialog } from 'react-aria-components'
import './styles.scss'
import * as Styles from './styles'

type FilteredProps = Omit<
   PopoverProps,
   'isOpen' | 'onOpenChange' | 'triggerRef' | 'className'
>

interface Props extends FilteredProps {
   renderTrigger: () => ReactElement
   renderPopoverBody: () => ReactElement

   isOpen: boolean
   onOpenChange: (isOpen: boolean) => void

   underlayStyles?: React.CSSProperties
   underlayClassName?: string
   popoverClassName?: string

   triggerRef: RefObject<HTMLElement>
}

const RACPopoverWithTrigger = (props: Props): ReactElement => {
   const { renderTrigger, renderPopoverBody, popoverClassName, ...rest } = props

   return (
      <>
         {renderTrigger()}
         <Popover
            {...rest}
            className={cn(Styles.popoverContainerStyles, popoverClassName)}
            //@ts-ignore //FIXME:check how to add props to node modules and resolve this, we got this because of patch
            underlayStyles={props.underlayStyles}
            underlayClassName={props.underlayClassName}
         >
            <Dialog className='outline-none'>{renderPopoverBody()}</Dialog>
         </Popover>
      </>
   )
}

export default observer(RACPopoverWithTrigger)
