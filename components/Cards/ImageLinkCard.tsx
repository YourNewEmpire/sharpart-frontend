import React from 'react'
import { ImgCardProps } from '../../interfaces/cards'
import Link from 'next/link'

export default function Card({ img, title, body, link }: ImgCardProps): JSX.Element {
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
                  <div className="inline-flex flex-col space-y-4 md:space-y-14 lg:space-y-24   w-full h-full ">
                        <div className="  " >
                              <p className=" subpixel-antialiased text-6xl text-center  text-th-primary-medium text-shadow-md ">
                                    {title}
                              </p>
                        </div>
                        <div className=" w-60 self-center justify-self-center"  >
                              <p className="  text-center subpixel-antialiased text-base text-th-primary-light ">
                                    {body}
                              </p>
                        </div>
                        <div className=" self-center justify-self-end "  >
                              <Link href={link}>
                                    <a className="
                              subpixel-antialiased rounded-md
                              text-base text-th-primary-light text-center
                              border-b-4 border-th-accent-medium
                              hover:border-transparent text-shadow-lg
                              transition duration-300 ease-in-out 
                              hover:text-th-accent-medium transform"
                                    >
                                          View {title}
                                    </a>
                              </Link>
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