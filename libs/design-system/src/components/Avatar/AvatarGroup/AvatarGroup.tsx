import cn from "classnames";
import Avatar from "../Avatar";
import { AvatarDetails, AvatarShape } from "../types";
import { AvatarGroupSize } from "../../../types";
import {
   getAvatarGroupSize,
   getAvatarShape,
   getLeftMargin,
   getAvatarSize,
   getFontSize,
} from "../utils";
import {
   avatarGroupContainerClassName,
   avatarWrapperClassName,
   avatarCountContainerClassName,
   avatarCountTextClassName,
   addButtonClassName,
} from "./styles";

export interface AvatarGroupProps {
   avatars: AvatarDetails[];
   size: AvatarGroupSize;
   shape: AvatarShape;
   maxDisplayCount: number;
   onAddClick?: () => void;
   className?: string;
}

export const AvatarGroup = ({
   avatars,
   size,
   shape,
   maxDisplayCount,
   onAddClick,
   className,
}: AvatarGroupProps) => {
   const avatarSize = getAvatarGroupSize(size);

   return (
      <div className={cn(avatarGroupContainerClassName, className)}>
         {avatars.slice(0, maxDisplayCount).map((item, index) => (
            <div
               key={index}
               className={cn(
                  avatarWrapperClassName,
                  getAvatarShape(avatarSize, shape),
                  getAvatarSize(avatarSize),
                  index > 0 && getLeftMargin(avatarSize, index)
               )}
            >
               <Avatar.Root name={item.name} size={avatarSize} shape={shape}>
                  {item.imageURL ? <Avatar.Image src={item.imageURL} /> : <Avatar.Text />}
               </Avatar.Root>
            </div>
         ))}

         {avatars.length > maxDisplayCount && (
            <div
               className={cn(
                  avatarWrapperClassName,
                  avatarCountContainerClassName,
                  getAvatarShape(avatarSize, shape),
                  getAvatarSize(avatarSize),
                  getLeftMargin(avatarSize, maxDisplayCount)
               )}
            >
               <span className={cn(avatarCountTextClassName, getFontSize(avatarSize))}>
                  +{avatars.length - maxDisplayCount}
               </span>
            </div>
         )}

         {onAddClick && (
            <button
               onClick={onAddClick}
               className={cn(
                  avatarWrapperClassName,
                  addButtonClassName,
                  getAvatarSize(avatarSize),
                  getLeftMargin(avatarSize, maxDisplayCount + 1),
                  "ml-2"
               )}
            >
               +
            </button>
         )}
      </div>
   );
};
