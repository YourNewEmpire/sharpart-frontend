import React from 'react'
import { CardProps } from '../../interfaces/cards'
import Link from 'next/link'

export default function Card({ img, title }: CardProps): JSX.Element {
      return (
            <div className=" 
            grid md:grid-cols-2 grid-cols-1 grid-flow-col
            p-2 my-0 gap-2 md:gap-8 lg:gap-12
            ">
                  <div className=" shadow-lg">
                        <img
                              className="rounded-lg object-fill  "
                              src={img}
                              alt="Picture of the author"
                        />
                  </div>
                  <div className="inline-flex flex-col space-y-10 border-2  w-full h-full ">
                        <div className="  " >
                              <p className=" subpixel-antialiased text-6xl  text-th-primary-medium text-shadow-md ">
                                    {title}
                              </p>
                        </div>
                  </div>
            </div>
      )
}

/*
     <div className=" justify-self-center self-start flex-grow" >
                              <p className=" text-6xl  text-th-primary-medium text-shadow-md ">
                                    {title}
                              </p>
                        </div>
                        <div className="  break-words flex-grow justify-self-start self-center"  >
                              <p className=" text-base text-th-primary-light whitespace-wrap ">
                                    {body}
                              </p>
                        </div>
                        <div className=" break-words flex-grow self-end justify-self-end"  >
                              <button className="text-base  text-th-primary-light bg-th-accent-light">
                                    View Artwork
                              </button>
                        </div>
*/