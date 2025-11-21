import cn from "classnames";
import { ReactNode, createContext, useContext } from "react";
import { Avatar } from "../Avatar";
import { AvatarLabelSize } from '../../../types';
import { AvatarShape } from "../types";
import {
   getAvatarLabelGroupSize,
   getAvatarLabelStyles,
   getAvatarDescriptionStyles,
   getAvatarLabelMargins,
} from "../utils";

import {
   avatarLabelContainerClassName,
   avatarLabelWrapper,
   labelTextClassName,
   descriptionClassName,
} from "./styles";

export interface AvatarLabelRootProps {
   name: string;
   size: AvatarLabelSize;
   description?: string;
   shape?: AvatarShape;
   children: ReactNode;
   className?: string;
}

interface ContextType {
   name: string;
   size: AvatarLabelSize;
   shape: AvatarShape;
   description?: string;
}

const AvatarLabelContext = createContext<ContextType | null>(null);

const AvatarLabelRoot = ({
   name,
   size,
   description,
   shape = "Circular",
   className,
   children,
}: AvatarLabelRootProps) => {

   return (
      <AvatarLabelContext.Provider value={{ name, size, shape, description }}>
         <div className={cn(avatarLabelContainerClassName, className)}>
            {children}
         </div>
      </AvatarLabelContext.Provider>
   );
};

const AvatarLabelAvatar = ({ children }: { children: ReactNode }) => {
   const ctx = useContext(AvatarLabelContext);
   if (!ctx) return null;

   const avatarSize = getAvatarLabelGroupSize(ctx.size);

   return (
      <Avatar.Root name={ctx.name} size={avatarSize} shape={ctx.shape}>
         {children}
      </Avatar.Root>
   );
};


const AvatarLabelDetails = ({ children }: { children: ReactNode }) => {
   const ctx = useContext(AvatarLabelContext);
   if (!ctx) return null;

   const avatarSize = getAvatarLabelGroupSize(ctx.size);
   return (
      <div className={cn(avatarLabelWrapper, getAvatarLabelMargins(avatarSize))}>
         {children}
      </div>
   );
};


const AvatarLabelText = ({ className }: { className?: string }) => {
   const ctx = useContext(AvatarLabelContext);
   if (!ctx) return null;

   const avatarSize = getAvatarLabelGroupSize(ctx.size);
   return (
      <p
         className={cn(
            labelTextClassName,
            getAvatarLabelStyles(avatarSize),
            className
         )}
      >
         {ctx.name}
      </p>
   );
};

const AvatarLabelDescription = ({ className }: { className?: string }) => {
   const ctx = useContext(AvatarLabelContext);
   if (!ctx || !ctx.description) return null;

   const avatarSize = getAvatarLabelGroupSize(ctx.size);
   return (
      <p
         className={cn(
            descriptionClassName,
            getAvatarDescriptionStyles(avatarSize),
            className
         )}
      >
         {ctx.description}
      </p>
   );
};

export const AvatarLabelGroup = {
   Root: AvatarLabelRoot,
   Avatar: AvatarLabelAvatar,
   Details: AvatarLabelDetails,
   Text: AvatarLabelText,
   Description: AvatarLabelDescription,
};
