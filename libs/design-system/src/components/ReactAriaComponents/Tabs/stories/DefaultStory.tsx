import React from 'react'
import { action } from '@storybook/addon-actions'

import Tabs from '../Tabs'

export function DefaultStory(props = {}) {
   const items = [
      {
         id: 'itemId1',
         name: 'Tab 1',
         children: (id: string) => <>Tab 1 Content </>
      },
      {
         id: 'itemId2',
         name: 'Tab 2',
         children: (id: string) => <>Tab 2 Content </>
      },
      {
         id: 'itemId3',
         name: 'Tab 3',
         children: (id: string) => <>Tab 3 Content </>
      },
      {
         id: 'itemId4',
         name: 'Tab 4',
         children: (id: string) => <>Tab 4 Content </>
      },
      {
         id: 'itemId5',
         name: 'Tab 5',
         children: (id: string) => <>Tab 5 Content </>
      },
      {
         id: 'itemId6',
         name: 'Tab 6',
         children: (id: string) => <>Tab 6 Content </>
      },
      {
         id: 'itemId7',
         name: 'Tab 7',
         children: (id: string) => <>Tab 7 Content </>
      }
   ]

   return (
      <Tabs
         {...props}
         aria-label='Tab example'
         onSelectionChange={action('onSelectionChange')}
         items={items}
      />
   )
}
