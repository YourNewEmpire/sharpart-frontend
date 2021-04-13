export type ListItem = { 
      link: string,
      name: string,

}

export interface CardProps {
      img: string
      title: string
      body: string
}
export interface ListCardProps {
      title: string
      body: ListItem[]
}
export interface SimpleCardProps {
      title: string
      body: string
}
export interface AlertCardProps {
      title: string
      body: string
      color: 'red' | 'blue' | 'amber' | 'green'
}
export interface NftListProps {
     items: string[]
}