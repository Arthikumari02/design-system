export const radioGroupColors = {
   radioGroup: {
      selected: {
         default: 'fill-brand-600 stroke-fg-white',
         hovered: 'fill-brand-700 dark:fill-brand-500 stroke-fg-white'
      },
      unSelected: {
         default:
            'stroke-gray-slate-300 dark:stroke-gray-slate-700 fill-fg-white',
         hover: 'stroke-gray-slate-300 dark:stroke-gray-slate-700 fill-gray-slate-100 dark:fill-gray-slate-800',
         focus: 'stroke-gray-slate-300 dark:stroke-gray-slate-700 fill-gray-slate-100 dark:fill-gray-slate-800'
      },
      error: {
         selected: {
            default: 'fill-error-600 stroke-fg-white',
            hovered: 'fill-error-700 dark:fill-error-500 stroke-fg-white'
         },
         unSelected: {
            hover: 'stroke-error-300 dark:stroke-error-400 fill-gray-slate-100 dark:fill-gray-slate-800',
            focus: 'stroke-error-300 dark:stroke-error-400 fill-gray-slate-100 dark:fill-gray-slate-800',
            default: 'stroke-error-300 dark:stroke-error-400 fill-fg-white'
         }
      },
      disabled: {
         className:
            'stroke-gray-slate-300 dark:stroke-gray-slate-700 fill-gray-slate-50 dark:fill-gray-slate-900'
      }
   }
}
