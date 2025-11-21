import { createContext, useContext } from "react";
import type { AvatarSize } from "../../types";
import type { AvatarShape } from "./types";

export interface AvatarContextValue {
    size: AvatarSize;
    shape: AvatarShape;
    name?: string;
}

export const AvatarContext = createContext<AvatarContextValue | null>(null);

export const useAvatarContext = () => {
    const ctx = useContext(AvatarContext);
    if (!ctx) throw new Error("Avatar.* must be used inside <Avatar.Root>");
    return ctx;
};
