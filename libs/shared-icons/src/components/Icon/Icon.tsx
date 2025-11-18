import { UnionIconType } from '../../types'

//TODO: need to remove after backend migration done
const iconIdAliasMap = {
   'check-verified-02': 'check-verified-01',
   'flag-01': 'flag-02',
   'award-05': 'award-04',
   'puzzle-piece-01': 'puzzle-piece',
   'lifebuoy-02': 'life-buoy-01',
   'breaker-01': 'beaker-01',
   'crypto-currency-03': 'cryptocurrency-03'
}

const getAliasedIconId = (iconId: string): string =>
   iconIdAliasMap[iconId as keyof typeof iconIdAliasMap] || iconId

const Icon = (props: UnionIconType): React.ReactElement => {
   const { type, id, ...svgArgs } = props

   const renderIconBasedOnType = () => {
      switch (type) {
         case 'SOLID':
            return (
               <svg {...svgArgs} data-testid={id}>
                  <use xlinkHref={`/icons/solidIconSprite.svg#${id}`} />
               </svg>
            )
         case 'OUTLINE': {
            //TODO: need to remove after backend migration done
            const aliasedId = getAliasedIconId(id)
            return (
               <svg {...svgArgs} data-testid={aliasedId}>
                  <use
                     xlinkHref={`/icons/outlineIconSprite.svg#${aliasedId}`}
                  />
               </svg>
            )
         }
         case 'DUOTONE': {
            const { fillOpacity = 0.12, ...restSvgArgs } = props
            return (
               <svg {...restSvgArgs} fillOpacity={fillOpacity} data-testid={id}>
                  <use xlinkHref={`/icons/duotoneIconSprite.svg#${id}`} />
               </svg>
            )
         }
         case 'APP':
            return (
               <svg {...svgArgs} data-testid={id}>
                  <use xlinkHref={`/icons/appIconSprite.svg#${id}`} />
               </svg>
            )
         case 'FILE':
            return (
               <svg {...svgArgs} data-testid={id}>
                  <use xlinkHref={`/icons/fileIconSprite.svg#${id}`} />
               </svg>
            )
         case 'MISCELLANEOUS':
            return (
               <svg {...svgArgs} data-testid={id}>
                  <use xlinkHref={`/icons/miscellaneousIconSprite.svg#${id}`} />
               </svg>
            )
         default:
            return <>unknown icon type {type}</>
      }
   }

   return renderIconBasedOnType()
}

export default Icon
