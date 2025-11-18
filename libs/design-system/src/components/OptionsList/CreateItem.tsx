import cn from 'classnames'
import { observer } from 'mobx-react'

import { Loader } from '../Loader/Loader'

import * as styles from './styles'
import { CreatableOptionProps } from './types'

interface Props extends CreatableOptionProps {
   hasFilteredOptions: boolean
   text: string

   onCreate: () => void
}

const CreateItem = (props: Props) => {
   const {
      onClickCreateOption,
      createText,
      createOptionName,
      isLoading,
      customCreatableOption,
      hasFilteredOptions,
      text,
      onCreate,
      getContainerStyles
   } = props

   const onCreateOption = (): void => {
      onClickCreateOption?.(text, onCreate)
   }

   const renderCreateOption = (): React.ReactElement => {
      const createButtonStyle = cn(styles.createButtonClassName, {
         'cursor-not-allowed': isLoading
      })
      const createContainerStyles = cn('py-md px-sm', {
         'border-t border-secondary': hasFilteredOptions
      })

      return (
         <div
            className={cn(
               createContainerStyles,
               getContainerStyles?.(hasFilteredOptions) ?? ''
            )}
         >
            <button className={createButtonStyle} onClick={onCreateOption}>
               {customCreatableOption ? (
                  customCreatableOption?.({
                     filterText: text,
                     hasFilteredOptions,
                     onCreate
                  })
               ) : (
                  <div className={styles.creatableOptionContainerClassName}>
                     <p className={styles.creatableOptionTextClassName}>
                        {createText ?? 'Create'}
                        {createOptionName ? (
                           createOptionName(text)
                        ) : (
                           <span
                              className={styles.creatableOptionClassName}
                              title={text}
                           >
                              {text}
                           </span>
                        )}
                     </p>
                     {isLoading ? (
                        <Loader
                           className='fill-fg-quarterary-500'
                           width={20}
                           height={20}
                        />
                     ) : null}
                  </div>
               )}
            </button>
         </div>
      )
   }

   return renderCreateOption()
}

export default observer(CreateItem)
