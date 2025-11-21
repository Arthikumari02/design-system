import React, { ReactNode } from "react";
import { AvatarContext } from "./AvatarContext";
import { AvatarText } from "./AvatarText";
import { AvatarIcon } from "./AvatarIcon";
import { AvatarImage } from "./AvatarImage";
import { AvatarStatus } from "./AvatarStatus";
import type { AvatarSize } from "../../types";
import type { AvatarShape } from "./types";
import cn from "classnames";

export interface AvatarProps {
   size: AvatarSize;
   shape: AvatarShape;
   name?: string;
   children: ReactNode;
   className?: string;
}

const AvatarRoot = ({ size, shape, name, children, className }: AvatarProps) => {
   return (
      <AvatarContext.Provider value={{ size, shape, name }}>
         <div className={cn("relative inline-block", className)}>{children}</div>
      </AvatarContext.Provider>
   );
};

export const Avatar = {
   Root: AvatarRoot,
   Text: AvatarText,
   Icon: AvatarIcon,
   Image: AvatarImage,
   Status: AvatarStatus,
};

export default Avatar;