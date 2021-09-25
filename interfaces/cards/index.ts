import React from "react";

export type ListItem = { 
      link: string,
      name: string,
}
export type ArtistItem = {
      anchorLink: string,
      img: string,
      title: string,
      body: string,
      pageLink: string,
      isImage?: boolean
}
export interface CardProps {
      img: string
      title: string
      body?: string
}
export interface ArtistCardProps {
      img:string
      title: string
      body:string
      link:string
      isImage?: boolean
}
export interface ImgCardProps extends CardProps {
      link: string
}


export interface ModalCardProps {
      action1: React.ReactNode,
      action2:  React.ReactNode,
      body: string
}

export interface ListCardProps {
      title: string
      body: ArtistItem[]
}
export interface SimpleCardProps  {
      title: string
      body: string
}

export interface AlertCardProps {
      title: string
      body: string
      icon?: JSX.Element
      success?: boolean
      info?: boolean
      warning?: boolean
      failure?: boolean
}
export interface NftListProps {
     items: string[]
}