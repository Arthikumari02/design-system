import React from 'react'

import { NO_RESULTS_VIEW_IMG_URL } from '../../constants/ImageConstants'

import { noDataViewClassName, titleStyles } from './styles'

interface NoSearchResultsViewProps {
   textClassName?: string
}
export const NoSearchResultsView = (
   props: NoSearchResultsViewProps
): React.ReactElement => (
   //TODO: update title to i18n

   <div className={noDataViewClassName}>
      <img
         src={NO_RESULTS_VIEW_IMG_URL}
         className='w-20 h-[80px]'
         alt='no results'
      />
      <span className={`${titleStyles} ${props.textClassName}`}>
         No Results Found
      </span>
   </div>
)
