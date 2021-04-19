import Link from 'next/link'
import React from 'react'
import { ListCardProps } from '../../interfaces/cards'

export default function ListCard({ title, body }: ListCardProps): JSX.Element {



      if (title && body) return (
            <div className=" 
            flex
            flex-col
            space-y-2
            p-4
            md:p-8
            lg:p-12
            lg:space-y-10
            rounded-lg
            bg-th-primary-medium
            bg-opacity-60
            shadow-lg
            ">
                  <div className=" " >
                        <p className=" text-center text-5xl text-th-primary-dark text-shadow-md">
                              {title}
                        </p>
                  </div>
                  <div className="grid grid-cols-3 grid-flow-row py-2 gap-2 md:gap-4 lg:gap-8"  >
                        {body.map((body, index) =>
                              <a href={body.anchorLink} key={index} className="
                              text-center text-2xl  text-th-primary-light
                              border-b-4 border-th-accent-medium
                              hover:border-transparent text-shadow-lg
                              transition duration-300 ease-in-out hover:text-th-accent-medium transform  
                              rounded-md col-span-1
                              ">
                                    {body.title}
                              </a>
                        )}

                  </div>
            </div>
      )
      else return <div className="display-none"></div>
}