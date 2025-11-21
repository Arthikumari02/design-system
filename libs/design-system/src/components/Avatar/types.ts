import { ReactElement } from 'react'

export type AvatarType = 'Image' | 'Icon' | 'Text'

export type AvatarShape = 'Circular' | 'Rounded' | 'Hexagon'

export type AvatarStatusType = "online" | "verified" | "company";

export interface AvatarDetails {
   name: string

   avatarType?: AvatarType
   imageURL?: string

   userIcon?: ((width: number, height: number) => ReactElement) | undefined
}
