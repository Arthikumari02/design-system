import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Components/Toggle',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <div className='flex flex-col items-center justify-center p-10'>
        <Toggle checked={isChecked} onChange={setIsChecked} name='Toggle' />
      </div>
    );
  },
};

export const Checked: Story = {
//    const [isChecked, setIsChecked] = useState(true)

//    return (
//       <div className='flex flex-col items-center justify-center p-10'>
//          <Toggle checked={isChecked} onChange={setIsChecked} name={'Toggle'} />
//       </div>
//    )
// }

// export const ToggleWithMediumSize = () => {
//    const [isChecked, setIsChecked] = useState(false)

//    return (
//       <div className='flex flex-col items-center justify-center p-10'>
//          <Toggle
//             checked={isChecked}
//             onChange={setIsChecked}
//             name={'Toggle'}
//             size={'Medium'}
//          />
//       </div>
//    )
// }

// export const ToggleWithDisabled = () => {
//    const [isChecked, setIsChecked] = useState(false)

//    return (
//       <div className='flex flex-col items-center justify-center p-10'>
//          <Toggle
//             checked={isChecked}
//             onChange={setIsChecked}
//             name={'Toggle'}
//             disabled={true}
//          />
//       </div>
//    )
// }

// export const ToggleWithCheckedAndDisabled = () => {
//    const [isChecked, setIsChecked] = useState(true)

//    return (
//       <div className='flex flex-col items-center justify-center p-10'>
//          <Toggle
//             checked={isChecked}
//             onChange={setIsChecked}
//             name={'Toggle'}
//             disabled={true}
//          />
//       </div>
//    )
}
