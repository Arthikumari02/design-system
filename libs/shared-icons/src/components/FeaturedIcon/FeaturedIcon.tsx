import React from 'react'

import { FeaturedIconProps } from '../../types'
import FeaturedOutlineIcon from './FeaturedOutlineIcon'
import FeaturedSolidIcon from './FeaturedSolidIcon'

type Props = FeaturedIconProps & {
   type: 'OUTLINE' | 'SOLID'
}

const FeaturedIcon = (props: Props): React.ReactElement => {
   const { type, ...rest } = props

   switch (type) {
      case 'OUTLINE':
         return <FeaturedOutlineIcon {...rest} />
      case 'SOLID':
         return <FeaturedSolidIcon {...rest} />
      default:
         return <>Handled type: {type}</>
   }
}

export default FeaturedIcon
