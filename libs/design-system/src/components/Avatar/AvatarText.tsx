import { useAvatarContext } from "./AvatarContext";
import { getAvatarProfileTextColor, getAvatarProfileBgColor } from "./constants";
import {
    getTwoLettersFromUsername,
    getFontSize,
    getAvatarShape,
    getAvatarSize,
} from "./utils";
import cn from "classnames";

export const AvatarText = () => {
    const { name = "", size, shape } = useAvatarContext();

    const initials = getTwoLettersFromUsername(name);
    const color = getAvatarProfileTextColor(initials[0]);
    const bg = getAvatarProfileBgColor(initials[0]);

    return (
        <div
            className={cn(
                getAvatarSize(size),
                getAvatarShape(size, shape),
                bg,
                "flex items-center justify-center select-none"
            )}
        >
            <span className={cn(getFontSize(size), color)}>
                {initials}
            </span>
        </div>
    );
};
