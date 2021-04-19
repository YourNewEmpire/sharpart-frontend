import React from 'react'
import { SimpleCardProps } from '../../interfaces/cards'

export default function SimpleCard({ title, body }: SimpleCardProps): JSX.Element {



      if (title && body) return (
            <div className=" 
            flex
            flex-col
            space-y-2
            md:space-y-4
            lg:space-y-8
            py-4
            rounded-lg
            shadow-lg
            bg-th-accent-medium
            bg-opacity-10
            ">
                  <div className=" py-0" >
                        <p className=" text-center text-sm md:text-base lg:text-3xl text-th-primary-light text-shadow-md">
                              {title}
                        </p>
                  </div>
                  <div className=" py-2"  >
                        <p className="  text-center text-xs md:text-sm lg:text-xl   text-th-primary-light break-all">
                              {body}
                        </p>
                  </div>
            </div>
      )
      else return <div className="display-none"></div>
}