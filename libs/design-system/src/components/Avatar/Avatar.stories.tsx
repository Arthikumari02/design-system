import { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { ProfileIcon } from "../../icons/ProfileIcon";
import { AvatarGroup } from './AvatarGroup/AvatarGroup'
import { AvatarDetails, AvatarStatusType } from './types'
import { AvatarLabelGroup } from './AvatarLabelGroup/AvatarLabelGroup'
import { AvatarLabelSize } from "../../types";

const meta = {
   title: "Components/Avatar",
   component: Avatar.Root,
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
   argTypes: {
      size: {
         control: "select",
         options: ["DoubleExtraSmall", "ExtraSmall", "Small", "Medium", "Large", "ExtraLarge", "DoubleExtraLarge", "TrebleExtraLarge"],
         description: "Size of the avatar"
      },
      shape: {
         control: "select",
         options: ["Circular", "Rounded", "Hexagon"],
         description: "Shape of the avatar"
      },
      name: {
         control: "text",
         description: "Name used for initials and alt text"
      },
   },
} satisfies Meta<typeof Avatar.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleImg = "https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg";

const renderIcon = (w: number, h: number) => (
   <ProfileIcon width={w} height={h} className="fill-button-secondary-fg" />
);

const avatars: AvatarDetails[] = [
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   },
   {
      name: 'Leela',
      imageURL:
         'https://hive-assets.alllq.in/assets/Design-system/fixture_profileImage.jpg',
      userIcon: renderIcon
   }
]

export const TextAvatar: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Olivia Rhye",
      children: null

   },
   render: (args) => (
      <Avatar.Root {...args}>
         <Avatar.Text />
      </Avatar.Root>
   ),
};
export const OnlineStatus: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Jade",
      children: null
   },
   render: (args) => (
      <Avatar.Root {...args}>
         <Avatar.Image src={sampleImg} />
         <Avatar.Status type="online" />
      </Avatar.Root>
   ),
};

export const VerifiedStatus: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Jade",
      children: null
   },
   render: (args) => (
      <Avatar.Root {...args}>
         <Avatar.Image src={sampleImg} />
         <Avatar.Status type="verified" />
      </Avatar.Root>
   ),
};

export const CompanyStatus: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Jade",
      children: null
   },
   render: (args) => (
      <Avatar.Root {...args}>
         <Avatar.Image src={sampleImg} />
         <Avatar.Status type="company" companyLogoURL="/company-logo.png" />
      </Avatar.Root>
   ),
};

export const AllTextVariants: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Olivia Rhye",
      children: null
   },
   render: (args) => {
      const sizes = ["DoubleExtraSmall", "ExtraSmall", "Small", "Medium", "Large", "ExtraLarge", "DoubleExtraLarge", "TrebleExtraLarge"] as const;
      const shapes = ["Circular", "Rounded", "Hexagon"] as const;

      return (
         <div className="flex flex-col gap-6 p-6">
            {shapes.map((shape) => (
               <div key={shape}>
                  <p className="font-semibold mb-3 text-sm text-gray-600">{shape} Shape</p>
                  <div className="flex gap-4 items-center">
                     {sizes.map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                           <Avatar.Root {...args} size={size} shape={shape} name="Olivia Rhye">
                              <Avatar.Text />
                           </Avatar.Root>
                           <span className="text-xs text-gray-500">{size}</span>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      );
   },
};

export const AllIconVariants: Story = {
   args: {
      size: "Medium",
      shape: "Rounded",
      name: "Arthi",
      children: null
   },
   render: (args) => {
      const sizes = ["DoubleExtraSmall", "ExtraSmall", "Small", "Medium", "Large", "ExtraLarge", "DoubleExtraLarge", "TrebleExtraLarge"] as const;

      return (
         <div className="flex gap-6 p-6 items-center">
            {sizes.map((size) => (
               <div key={size} className="flex flex-col items-center gap-2">
                  <Avatar.Root {...args} size={size}>
                     <Avatar.Icon render={renderIcon} />
                  </Avatar.Root>
                  <span className="text-xs text-gray-500">{size}</span>
               </div>
            ))}
         </div>
      );
   },
};

export const AllImageWithStatus: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Jade",
      children: null
   },
   render: (args) => {
      const sizes = ["DoubleExtraSmall", "ExtraSmall", "Small", "Medium", "Large", "ExtraLarge", "DoubleExtraLarge", "TrebleExtraLarge"] as const;
      const statuses = [
         { type: "online" as const, label: "Online" },
         { type: "verified" as const, label: "Verified" },
         { type: "company" as const, label: "Company" },
      ];

      return (
         <div className="flex flex-col gap-6 p-6">
            {statuses.map(({ type, label }) => (
               <div key={type}>
                  <p className="font-semibold mb-3 text-sm text-gray-600">{label} Status</p>
                  <div className="flex gap-4 items-center">
                     {sizes.map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                           <Avatar.Root {...args} size={size}>
                              <Avatar.Image src={sampleImg} />
                              <Avatar.Status
                                 type={type}
                                 companyLogoURL={type === "company" ? "/company-logo.png" : undefined}
                              />
                           </Avatar.Root>
                           <span className="text-xs text-gray-500">{size}</span>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      );
   },
};

export const Playground: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "John Doe",
      children: null
   },
   render: (args) => (
      <div className="flex gap-8 p-6">
         <div className="flex flex-col items-center gap-2">
            <Avatar.Root {...args}>
               <Avatar.Text />
            </Avatar.Root>
            <span className="text-xs text-gray-500">Text</span>
         </div>

         <div className="flex flex-col items-center gap-2">
            <Avatar.Root {...args}>
               <Avatar.Image src={sampleImg} />
            </Avatar.Root>
            <span className="text-xs text-gray-500">Image</span>
         </div>

         <div className="flex flex-col items-center gap-2">
            <Avatar.Root {...args}>
               <Avatar.Icon render={renderIcon} />
            </Avatar.Root>
            <span className="text-xs text-gray-500">Icon</span>
         </div>

         <div className="flex flex-col items-center gap-2">
            <Avatar.Root {...args}>
               <Avatar.Image src={sampleImg} />
               <Avatar.Status type="online" />
            </Avatar.Root>
            <span className="text-xs text-gray-500">With Status</span>
         </div>
      </div>
   ),
};

export const FullGridExample: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "John Doe",
      children: null
   },
   render: () => {
      const statuses = ["online", "verified", "company", undefined];
      const sizes = ["Small", "Medium", "Large", "ExtraLarge"];

      return (
         <div className="grid grid-cols-4 gap-8 p-8 border border-dashed border-purple-400">
            {sizes.map((size) =>
               statuses.map((status) => (
                  <AvatarLabelGroup.Root
                     key={size + status}
                     name="Olivia Rhye"
                     size={size as AvatarLabelSize}
                     shape="Circular"
                     description="olivia@untitledui.com"
                  >
                     <AvatarLabelGroup.Avatar>
                        <Avatar.Image src={sampleImg} />
                        {status && <Avatar.Status type={status as AvatarStatusType} />}
                     </AvatarLabelGroup.Avatar>

                     <AvatarLabelGroup.Details>
                        <AvatarLabelGroup.Text />
                        <AvatarLabelGroup.Description />
                     </AvatarLabelGroup.Details>
                  </AvatarLabelGroup.Root>
               ))
            )}
         </div>
      );
   },
};

export const AvatarWithGroup: Story = {
   args: {
      size: "Medium",
      shape: "Circular",
      name: "Olivia Rhye",
      children: null
   },
   render: () => (
      <div className="p-6">
         <p className="text-sm font-semibold mb-3">Avatar Group</p>
         <AvatarGroup
            avatars={avatars}
            size="Medium"
            shape="Circular"
            maxDisplayCount={4}
            onAddClick={() => alert("Add clicked")}
         />
      </div>
   ),
};