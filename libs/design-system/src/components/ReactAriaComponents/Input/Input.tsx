import classNames from "classnames";
import { InputProps, Input as RACInput } from "react-aria-components";
import { useRef } from "react";
import * as React from "react";
import { InputContext, useInputContext } from "./InputContext";
import { BasicSize } from "../../../types";
import {
   getElementTypeStyles,
   containerStyles,
   rootStyles,
   labelStyles,
   hintStyles,
   errorStyles,
   groupStyles,
   iconLeftStyles,
   iconRightStyles
} from "./styles";

interface RootProps {
   size?: BasicSize;
   children: React.ReactNode;
   className?: string;
}

const InputRoot = ({ size = "Medium", children, className }: RootProps) => {
   return (
      <InputContext.Provider value={{ size }}>
         <div className={classNames(rootStyles, className)}>
            {children}
         </div>
      </InputContext.Provider>
   );
};

const InputLabel = ({ children }: { children: React.ReactNode }) => (
   <p className={labelStyles}>{children}</p>
);

const InputHint = ({ children }: { children: React.ReactNode }) => (
   <p className={hintStyles}>{children}</p>
);

const InputError = ({ children }: { children: React.ReactNode }) => (
   <p className={errorStyles}>{children}</p>
);

interface InputFieldProps extends Omit<InputProps, "size"> {
   error?: boolean;
   variant?: 'default' | 'borderless';
}

const InputField = ({ error, variant = 'default', ...props }: InputFieldProps) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const { size } = useInputContext();
   const shouldBeBorderless = variant === 'borderless';

   return (
      <RACInput
         {...props}
         className={({ isDisabled, isFocused }) =>
            classNames(
               !shouldBeBorderless && containerStyles,
               getElementTypeStyles({
                  isDisabled,
                  isFocused,
                  size,
                  error: error ? "error" : undefined,
                  variant,
               }),
               props.className
            )
         }
         ref={inputRef}
      />
   );
};

const InputGroup = ({ children }: { children: React.ReactNode }) => {
   return <div className={groupStyles}>{children}</div>;
};

const InputIconLeft = ({ children }: { children: React.ReactNode }) => (
   <div className={iconLeftStyles}>
      {children}
   </div>
);

const InputIconRight = ({ children }: { children: React.ReactNode }) => (
   <div className={iconRightStyles}>
      {children}
   </div>
);

export const Input = {
   Root: InputRoot,
   Field: InputField,
   Group: InputGroup,
   Label: InputLabel,
   Hint: InputHint,
   Error: InputError,
   IconLeft: InputIconLeft,
   IconRight: InputIconRight,
};

export default Input;