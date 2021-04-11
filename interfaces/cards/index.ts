export interface CardProps {
      img: string
      title: string
      body: string
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