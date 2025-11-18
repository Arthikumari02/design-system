import classNames from 'classnames'
import { observer } from 'mobx-react'
import { DialogProps, Dialog as RACDialog } from 'react-aria-components'

const Dialog = (props: DialogProps) => (
   <RACDialog
      {...props}
      className={classNames('outline-none', props.className)}
   />
)

export default observer(Dialog)
