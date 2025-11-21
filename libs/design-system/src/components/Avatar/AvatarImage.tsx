import { useAvatarContext } from "./AvatarContext";
import { getAvatarShape, getAvatarSize } from "./utils";
import cn from "classnames";

export const AvatarImage = ({ src }: { src: string }) => {
    const { size, shape, name } = useAvatarContext();
    return (
        <img
            src={src}
            alt={name}
            className={cn(getAvatarSize(size), getAvatarShape(size, shape), "object-cover")}
        />
    );
};
