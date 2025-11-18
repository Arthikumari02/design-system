import React, { ReactElement } from 'react'

import { CustomOptionProps, ListItemType } from '../types'

type ListBoxItemContextType = {
   renderCustomOption?: (args: CustomOptionProps<ListItemType>) => ReactElement
}

const ListBoxItemContext = React.createContext<ListBoxItemContextType>({
   renderCustomOption: undefined
})

export const useListBoxItemContext = () => {
   const context = React.useContext(ListBoxItemContext)

   if (!context) {
      throw new Error('Expected to be wrapped in ListBoxItem Context Provider')
   }

   return context
}

export const ListBoxItemContextProvider = ({
   children,
   renderCustomOption
}: {
   children: ReactElement
   renderCustomOption?: (args: CustomOptionProps<ListItemType>) => ReactElement
}) => (
   <ListBoxItemContext.Provider
      value={{
         renderCustomOption
      }}
   >
      {children}
   </ListBoxItemContext.Provider>
)
