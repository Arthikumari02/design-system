import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '../Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/ReactAriaComponents/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectionChange: { action: 'selectionChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
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
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Tabs {...args} />
    </div>
  ),
};