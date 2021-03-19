import React from 'react'
import {CardProps} from '../../interfaces/cards'
import Card from './Card'

interface Props {
      items: CardProps[]
}

export default function CardGroup({items}: Props): JSX.Element {
      return (
            <div className=" 
            flex items-center justify-center 
            grid grid-cols-1
            rounded-lg shadow-lg
            ring-4 ring-opacity-80 ring-darkblue-100
            bg-darkblue-500

            ">
               {items.map((item,  index) => 
                  <Card key={index} header={item.header} body={item.body} img={item.img} />
               )}

            </div>
      )
}