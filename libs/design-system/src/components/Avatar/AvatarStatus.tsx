import { useAvatarContext } from "./AvatarContext";
import { getStatusIndicationSize, getStatusStyles } from "./utils";
import type { AvatarStatusType } from "./types";
import cn from "classnames";

export const AvatarStatus = ({
    type,
    companyLogoURL,
}: {
    type: AvatarStatusType;
    companyLogoURL?: string;
}) => {
    const { size } = useAvatarContext();

    if (type === "company" && companyLogoURL) {
        return (
            <img
                src={companyLogoURL}
                alt="company-logo"
                className={cn(
                    "absolute bottom-0 right-0 object-cover rounded-full",
                    getStatusIndicationSize(size)
                )}
            />
        );
    }

    return (
        <span
            className={cn(
                "absolute bottom-0 right-0 rounded-full",
                getStatusStyles(type),
                getStatusIndicationSize(size)
            )}
        />
    );
};
