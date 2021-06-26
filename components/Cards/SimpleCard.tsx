import React from 'react'
import { SimpleCardProps } from '../../interfaces/cards'

export default function SimpleCard({ title, body }: SimpleCardProps): JSX.Element {

      if (title && body) return (
            <div className=" 
            flex
            flex-col
            space-y-2
            items-center justify-center 
            md:space-y-4
            lg:space-y-8
            lg:py-6
            lg:px-6
            md:px-4
            md:py-4
            sm:px-2
            sm:py-2
            rounded-lg
            shadow-lg
            bg-th-primary-dark
            bg-opacity-25
            
            ">
                  <div className=" " >
                        <p className=" text-center text-sm md:text-base lg:text-3xl text-th-primary-light text-shadow-md">
                              {title}
                        </p>
                  </div>
                  <div className=""  >
                        <p className="  text-center text-xs md:text-sm lg:text-xl   text-th-primary-light break-all">
                              {body}
                        </p>
                  </div>
            </div>
      )
      
      else return <div className="display-none"></div>
}