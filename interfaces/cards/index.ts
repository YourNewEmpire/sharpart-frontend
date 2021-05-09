export type ListItem = { 
      link: string,
      name: string,
}
export type ArtistItem = {
      anchorLink: string,
      img: string,
      title: string,
      body: string,
      pageLink: string
}
export interface CardProps {
      img: string
      title: string
      body?: string
}
export interface ImgCardProps extends CardProps {
      link: string
}
export interface ListCardProps {
      title: string
      body: ArtistItem[]
}
export interface SimpleCardProps {
      title: string
      body: string
}
export interface AlertCardProps {
      title: string
      body: string
      success?: boolean
      info?: boolean
      warning?: boolean
      failure?: boolean
}
export interface NftListProps {
     items: string[]
}