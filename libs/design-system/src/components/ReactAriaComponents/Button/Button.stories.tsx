import React from "react";
import { StoryFn, Meta } from '@storybook/react'
import { RadioUnSelectedIcon } from "../../../icons/RadioUnSelectedIcon";
import { UserIcon } from "../../../icons/UserIcon";
import { action } from "@storybook/addon-actions";
import Button from "./Button";
import { Hierarchy, SubVariant } from "../../../types/ButtonTypes";
import { ButtonSize } from "../../../types";

export default {
   title: "Components/Button",
   component: Button,
   argTypes: {
      hierarchy: { control: "select", options: Object.values(Hierarchy) },
      subVariant: { control: "select", options: Object.values(SubVariant) },
      size: {
         control: "select",
         options: ["ExtraSmall", "Small", "Medium", "Large", "ExtraLarge", "DoubleExtraLarge"],
      },
      isDisabled: { control: "boolean" },
      shouldShrinkButtonWhileLoading: { control: "boolean" },
      children: { control: "text" },
   },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
   <Button {...args}
      onPress={action("Button Pressed")}
   >
      <Button.ButtonLeftIcon render={(c) => <UserIcon className={c.stroke} />} />
      <Button.Text>{args.children}</Button.Text>
      {args.shouldShrinkButtonWhileLoading && <Button.Loader />}
   </Button>
);


export const Playground = Template.bind({});
Playground.args = {
   hierarchy: Hierarchy.Secondary,
   subVariant: SubVariant.Primary,
   size: "Medium",
   children: "Button Text",
};

export const VariantMatrix = () => {
   const variants = [
      {
         hierarchy: Hierarchy.Primary,
         title: "Primary",
         subVariants: [
            { variant: SubVariant.Primary, label: "Primary" },
            { variant: SubVariant.Destructive, label: "Destructive" },
         ],
      },
      {
         hierarchy: Hierarchy.Secondary,
         title: "Secondary",
         subVariants: [
            { variant: SubVariant.Primary, label: "Primary" },
            { variant: SubVariant.GrayOutline, label: "Gray Outline" },
            { variant: SubVariant.DestructiveOutline, label: "Destructive Outline" },
         ],
      },
      {
         hierarchy: Hierarchy.Tertiary,
         title: "Tertiary",
         subVariants: [
            { variant: SubVariant.Primary, label: "Primary" },
            { variant: SubVariant.Gray, label: "Gray" },
            { variant: SubVariant.Destructive, label: "Destructive" },
         ],
      },
      {
         hierarchy: Hierarchy.Link,
         title: "Link",
         subVariants: [
            { variant: SubVariant.Primary, label: "Primary" },
            { variant: SubVariant.Gray, label: "Gray" },
            { variant: SubVariant.Destructive, label: "Destructive" },
         ],
      },
   ];

   return (
      <div>
         {variants.map(({ hierarchy, title, subVariants }) => (
            <div key={hierarchy} className="mb-8">
               <h3 className="text-lg font-bold mb-4">{title} Hierarchy</h3>
               <div className="grid grid-cols-3 gap-4">
                  {subVariants.map(({ variant, label }) => (
                     <div key={`${hierarchy}-${variant}`} className="border p-4 rounded flex flex-col gap-lg">
                        <h4 className="text-md font-semibold">{label}</h4>
                        <div className="flex flex-row gap-lg">
                           <Button onPress={action("Button Pressed")}
                              hierarchy={hierarchy} subVariant={variant} size="Medium"
                           >
                              <Button.Text>Normal</Button.Text>
                           </Button>

                           <Button onPress={action("Button Pressed")}
                              isDisabled hierarchy={hierarchy} subVariant={variant} size="Medium"
                           >
                              <Button.Text>Disabled</Button.Text>
                           </Button>

                           <Button onPress={action("Button Pressed")}
                              hierarchy={hierarchy} subVariant={variant} size="Medium"
                           >
                              <Button.Loader />
                              <Button.Text>Loading</Button.Text>
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};

export const ButtonSizes = () => {
   const sizes: ButtonSize[] = ["Small", "Medium", "Large", "ExtraLarge", "DoubleExtraLarge"];

   return (
      <div className="space-y-4">
         {sizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
               <div className="w-36 text-right">{size}:</div>
               <Button onPress={action("Button Pressed")}
                  hierarchy={Hierarchy.Primary} subVariant={SubVariant.Primary} size={size}
               >
                  <Button.Text>{size} Button</Button.Text>
               </Button>
            </div>
         ))}
      </div>
   );
};

export const ButtonWithIcons = () => {
   const configs = [
      { left: true, right: false, loading: false, label: "Left Icon" },
      { left: false, right: true, loading: false, label: "Right Icon" },
      { left: true, right: true, loading: false, label: "Both Icons" },
      { left: true, right: true, loading: true, label: "Loading + Icons" },
   ];

   return (
      <div className="flex flex-row gap-lg">
         {configs.map((cfg, i) => (
            <Button key={i} hierarchy={Hierarchy.Primary} subVariant={SubVariant.Primary} size="Medium" shouldShrinkButtonWhileLoading={cfg.loading}>
               {cfg.left && <Button.ButtonLeftIcon render={(c) => <RadioUnSelectedIcon className={c.stroke} />} />}
               <Button.Text>{cfg.label}</Button.Text>
               {cfg.right && <Button.ButtonRightIcon render={(c) => <RadioUnSelectedIcon className={c.stroke} />} />}
               {cfg.loading && <Button.Loader />}
            </Button>
         ))}
      </div>
   );
};

export const IconOnlyButtons = () => {
   const hierarchies = [
      { hierarchy: Hierarchy.Primary, subVariant: SubVariant.Primary, label: "Primary" },
      { hierarchy: Hierarchy.Secondary, subVariant: SubVariant.GrayOutline, label: "Secondary Gray" },
      { hierarchy: Hierarchy.Tertiary, subVariant: SubVariant.Gray, label: "Tertiary Gray" },
      { hierarchy: Hierarchy.Link, subVariant: SubVariant.Primary, label: "Link Primary" }
   ];

   const sizes: ButtonSize[] = ["Small", "Medium", "Large"];

   return (
      <div className="space-y-8">
         {hierarchies.map(({ hierarchy, subVariant, label }) => (
            <div key={`${hierarchy}-${subVariant}`} >
               <h3 className="text-md font-semibold mb-2">{label}</h3>
               <div className="flex gap-4">
                  {sizes.map((size) => (
                     <Button key={`${hierarchy}-${subVariant}-${size}`}
                        onPress={action("Button Pressed")}
                        hierarchy={hierarchy} subVariant={subVariant} size={size}
                     >
                        <Button.ButtonLeftIcon render={(c) => <RadioUnSelectedIcon className={c.stroke} />} />
                     </Button>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};

export const LoadingStates = () => (
   <div className="space-y-8">
      <div>
         <h3 className="text-md font-semibold">Normal Loading</h3>
         <Button onPress={action("Button Pressed")}
            hierarchy={Hierarchy.Primary} subVariant={SubVariant.Primary} size="Medium"
         >
            <Button.Loader />
            <Button.Text>Loading Button</Button.Text>
         </Button>
      </div>

      <div>
         <h3 className="text-md font-semibold">Shrink While Loading</h3>
         <Button onPress={action("Button Pressed")}
            hierarchy={Hierarchy.Tertiary} subVariant={SubVariant.Gray} size="Medium"
         >
            <Button.Loader />
            <Button.Text>Loading Button</Button.Text>
         </Button>
      </div>

      <div>
         <h3 className="text-md font-semibold">Loading with Icons</h3>
         <Button onPress={action("Button Pressed")}
            hierarchy={Hierarchy.Primary} subVariant={SubVariant.Destructive} size="Medium"
            shouldShrinkButtonWhileLoading
         >
            <Button.ButtonLeftIcon render={(c) => <RadioUnSelectedIcon className={c.stroke} />} />
            <Button.Text>Loading with Icons</Button.Text>
            <Button.Loader />
            <Button.ButtonRightIcon render={(c) => <RadioUnSelectedIcon className={c.stroke} />} />
         </Button>
      </div>
   </div>
);

export const LinkButtons = () => {
   const variants = [
      { subVariant: SubVariant.Gray, label: "Gray" },
      { subVariant: SubVariant.Primary, label: "Primary" },
      { subVariant: SubVariant.Destructive, label: "Destructive" },
   ];

   const states = [
      { label: "Normal" },
      { label: "Loading", loading: true },
      { label: "Disabled", disabled: true },
   ];

   return (
      <div className="space-y-8">
         {variants.map(({ subVariant, label }) => (
            <div key={subVariant}>
               <h3>{label}</h3>
               <div className="flex gap-4">
                  {states.map((state, idx) => (
                     <Button
                        key={idx}
                        hierarchy={Hierarchy.Link}
                        subVariant={subVariant}
                        size="Small"
                        onPress={action("Button Pressed")}
                        isDisabled={state.disabled}
                        shouldShrinkButtonWhileLoading={state.loading}
                     >
                        <Button.Text>
                           {label} ({state.label})
                        </Button.Text>
                        {state.loading && <Button.Loader />}
                     </Button>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};
