import React from 'react'
import { SimpleCardProps } from '../../interfaces/cards'

export default function SimpleCard({ title, body }: SimpleCardProps): JSX.Element {



      if (title && body) return (
            <div className=" 
            flex
            flex-col
            space-y-2
            lg:space-y-10
            rounded-lg
            bg-th-accent-medium
            bg-opacity-60
            ">
                  <div className=" py-2" >
                        <p className=" text-center text-3xl text-th-primary-medium text-shadow-md">
                              {title}
                        </p>
                  </div>
                  <div className=" py-2"  >
                        <p className="  text-center text-xl  text-th-primary-light break-all">
                              {body}
                        </p>
                  </div>
            </div>
      )
      else return <div className="display-none"></div>
}