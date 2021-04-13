import React from 'react'
import { CardProps } from '../../interfaces/cards'

export default function Card({ img, title, body }: CardProps): JSX.Element {
      return (
            <div className=" 
            grid grid-cols-2
            rounded-lg
            p-2
            my-0
            gap-4
            md:gap-8
            ">
                  <div className=" ">
                        <img
                              className="rounded-lg object-fill "
                              src={img}
                              alt="Picture of the author"

                        />
                  </div>
                  <div className="max-w-max items-center justify-center">
                        <div className=" py-4" >
                              <p className=" text-6xl  text-th-primary-medium text-shadow-md ">
                                    {title}
                              </p>
                        </div>
                        <div className=" py-4 break-words"  >
                              <p className="text-base max-w-xs text-th-primary-light ">
                              {body}
                              </p>
                        </div>
                  </div>
            </div>
      )
}