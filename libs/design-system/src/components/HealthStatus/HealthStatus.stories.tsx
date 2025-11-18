import HealthStatus from './HealthStatus'

export default {
   title: 'Components/HealthStatus',
   component: HealthStatus
}

const HealthStatusTemplate = (args: any) => (
   <div className='flex flex-col justify-center items-center w-[500px] h-[95%]'>
      <p>Health Statuses</p>
      <div className='flex flex-col  items-start'>
         <HealthStatus status={'NOT_STARTED'} title='Not Started' {...args} />
         <HealthStatus status={'NOT_TRACKED'} title='Not Tracked' {...args} />
         <HealthStatus status={'ON_TRACK'} title='On Track' {...args} />
         <HealthStatus status={'BEHIND'} title='Behind' {...args} />
         <HealthStatus status={'AT_RISK'} title='At Risk' {...args} />
         <HealthStatus status={'ACHIEVED'} title='Achieved' {...args} />
         <HealthStatus status={'EXCEEDED'} title='Exceeded' {...args} />
      </div>
   </div>
)

export const HealthStatusComponent = HealthStatusTemplate.bind({})

HealthStatus.args = {
   size: 'Small'
}
