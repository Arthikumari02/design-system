import { createContext, useContext } from "react";
import type { BasicSize } from "../../../types";

interface InputContextProps {
    size: BasicSize;
}

export const InputContext = createContext<InputContextProps | null>(null);

export const useInputContext = () => {
    const ctx = useContext(InputContext);
    if (!ctx) throw new Error("Input.* must be used inside <Input.Root>");
    return ctx;
};
