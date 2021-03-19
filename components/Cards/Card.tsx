import React from 'react'
import { Childs } from '../../interfaces/childs'
import Image from 'next/image'
import { CardProps } from '../../interfaces/cards'

export default function Card({ img, header, body }: CardProps): JSX.Element {
      return (
            <div className=" 
            flex  justify-center 

            bg-blue-200

            ">
                  <div className="w-2/5 ">
                        <Image
                              src={img}
                              alt="Picture of the author"
                              width={"auto"}
                              height={"auto"}
                        />
                  </div>
                  <div className=" grid grid-cols-1 w-3/5 ">
                        <div className="py-4" >
                              {header}
                        </div>
                        <div className="py-4"  >
                              {body}
                        </div>
                  </div>

            </div>
      )
}