import { observer } from 'mobx-react'
import React from 'react'

import { HealthStatusType } from '../../types'

import Progressbar, { ProgressbarProps } from './Progressbar'
import { ColorVariantType } from './types'

export interface HealthProgressbarProps
   extends Omit<ProgressbarProps, 'colorVariant'> {
   status: HealthStatusType
}

const HealthProgressbar = (
   props: HealthProgressbarProps
): React.ReactElement => {
   const { status, ...other } = props

   const getColorVariantBasedOnStatus = (): ColorVariantType => {
      switch (status) {
         case 'NOT_STARTED':
            return 'GRAY'
         case 'NOT_TRACKED':
            return 'GRAY_SLATE'
         case 'AT_RISK':
            return 'ERROR'
         case 'ACHIEVED':
            return 'SUCCESS'
         case 'BEHIND':
            return 'WARNING'
         case 'EXCEEDED':
            return 'PURPLE'
         case 'ON_TRACK':
            return 'PRIMARY'
      }
   }

   return (
      <Progressbar {...other} colorVariant={getColorVariantBasedOnStatus()} />
   )
}

export default observer(HealthProgressbar)
