import React from "react";
import { useAvatarContext } from "./AvatarContext";
import { getUserIconSize, getAvatarShape, getAvatarSize } from "./utils";
import cn from "classnames";

export const AvatarIcon = ({
    render,
}: {
    render: (w: number, h: number) => React.ReactNode;
}) => {
    const { size, shape } = useAvatarContext();
    const dim = getUserIconSize(size);
    return (
        <div className={cn(getAvatarSize(size), getAvatarShape(size, shape), "bg-gray-200")}>
            {render(dim, dim)}
        </div>
    );
};
