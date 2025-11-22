import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input } from "./Input";
import { SearchIcon } from "../../../icons/SearchIcon";
import { TickMark } from "../../../icons/TickMark";

const meta: Meta<TemplateProps> = {
   title: "Components/RACInput (Composition)",
   parameters: { layout: "centered" },
   argTypes: {
      size: {
         control: { type: "select" },
         options: ["ExtraSmall", "Small", "Medium"],
      },
      fieldProps: { control: "object" },
   },
};

export default meta;

type FieldProps = Omit<
   React.ComponentProps<typeof Input.Field>,
   "size" | "className" | "value" | "onChange" | "error"
>;

interface TemplateProps {
   size?: "ExtraSmall" | "Small" | "Medium";
   label?: string;
   hint?: string;
   error?: string;
   showLeftIcon?: boolean;
   showRightIcon?: boolean;
   fieldProps?: FieldProps;
}

const Template = (args: TemplateProps) => {
   const [value, setValue] = useState("");
   const hasError = Boolean(args.error);

   return (
      <div className="w-[320px]">
         <Input.Root size={args.size}>
            {args.label && <Input.Label>{args.label}</Input.Label>}

            <Input.Group>
               {args.showLeftIcon && (
                  <Input.IconLeft>
                     <SearchIcon className="text-gray-400 w-4 h-4" />
                  </Input.IconLeft>
               )}

               <Input.Field
                  {...args.fieldProps}
                  value={value}
                  onChange={(e) => {
                     const val = e.target.value;
                     setValue(val);
                     action("onValueChange")(val);
                  }}
                  error={hasError}
                  style={{
                     paddingLeft: args.showLeftIcon ? "2.5rem" : undefined,
                     paddingRight: args.showRightIcon ? "2.5rem" : undefined,
                  }}
               />

               {args.showRightIcon && (
                  <Input.IconRight>
                     <TickMark className="w-4 h-4 text-green-500" />
                  </Input.IconRight>
               )}
            </Input.Group>

            {hasError && <Input.Error>{args.error}</Input.Error>}
            {!hasError && args.hint && <Input.Hint>{args.hint}</Input.Hint>}
         </Input.Root>
      </div>
   );
};

export const Default: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      size: "Medium",
      label: "Email",
      fieldProps: { placeholder: "Enter email" }
   },
};

export const Disabled: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      fieldProps: { placeholder: "Enter email", disabled: true },
   },
};

export const WithHint: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      hint: "We'll never share your email with anyone else.",
      fieldProps: { placeholder: "Enter email" }
   },
};

export const WithError: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      error: "Please enter a valid email address.",
      fieldProps: { placeholder: "Enter email" }
   },
};

export const WithLeftIcon: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Search",
      showLeftIcon: true,
      fieldProps: { placeholder: "Search..." }
   },
};

export const WithRightIcon: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      showRightIcon: true,
      fieldProps: { placeholder: "Enter email" }
   },
};

export const WithBothIcons: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      showLeftIcon: true,
      showRightIcon: true,
      fieldProps: { placeholder: "Search emails..." }
   },
};

export const ErrorWithIcon: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      error: "Invalid email format.",
      showLeftIcon: true,
      showRightIcon: true,
   },
};

export const EmailInput: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Email",
      fieldProps: { type: "email", placeholder: "you@example.com" },
   },
};

export const PasswordInput: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Password",
      fieldProps: { type: "password", placeholder: "Enter password" },
   },
};

export const NumberInput: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Age",
      fieldProps: { type: "number", placeholder: "Enter age" },
   },
};

export const SearchInput: StoryObj<TemplateProps> = {
   render: Template,
   args: {
      label: "Search",
      showLeftIcon: true,
      fieldProps: { type: "search", placeholder: "Type to search..." },
   },
};