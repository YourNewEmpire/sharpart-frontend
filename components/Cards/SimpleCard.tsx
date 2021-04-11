import React from 'react'
import { SimpleCardProps } from '../../interfaces/cards'

export default function SimpleCard({ title, body }: SimpleCardProps): JSX.Element {
      
      
      
      if( title && body ) return (
            <div className=" 
            grid
            grid-cols-1
            grid-rows-2
            p-0
            my-0
            gap-4
            rounded-lg
            bg-lightblue-900
            dark:bg-blue-200
            bg-opacity-60
           dark:bg-opacity-60
            ">
                  <div className=" py-2" >
                        <p className=" text-center text-3xl dark:text-lightblue-900 text-blue-200">
                              {title}
                        </p>
                  </div>
                  <div className=" py-2"  >
                        <p className="  text-center text-xl dark:text-lightblue-900 text-blue-200 break-all">
                              {body}
                        </p>
                  </div>
            </div>
      )
      else return <div className="display-none"></div>
}