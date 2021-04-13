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
            lg:space-y-10
            rounded-lg
            bg-th-primary-medium
            bg-opacity-60

            ">
                  <div className=" " >
                        <p className=" text-center text-3xl text-th-primary-dark text-shadow-md">
                              {title}
                        </p>
                  </div>
                  <div className="grid grid-cols-3 grid-flow-row py-2"  >
                        {body.map((body, index) =>
                              <a href={body.link} key={index} className=" col-span-1 text-center text-xl  text-th-primary-light ">
                                    {body.name}
                              </a>
                        )}

                  </div>
            </div>
      )
      else return <div className="display-none"></div>
}