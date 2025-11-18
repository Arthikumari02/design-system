import { Loader } from './Loader'

export const Default = props => <Loader {...props} />
Default.storyName = '[Controlled]'
export default {
   title: 'Components/Loader',
   component: Loader,
   argTypes: {
      size: {
         options: ['xs', 'sm', 'md', 'lg', 'xl'],
         control: {
            type: 'inline-radio'
         }
      }
   },
   args: {
      size: 'md',
      fill: 'red'
   }
}
