import React from 'react'
import { ArtistCardProps } from '../../interfaces/cards'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import Heading from '../Typography/Heading';

export default function ImageLinkCard({ img, title, body, link }: ArtistCardProps): JSX.Element {
      const isPlaying = true;
      return (
            <Link href={link} >
                  <div className=" 
            grid grid-flow-row justify-center items-center
            p-2 my-0 gap-2 md:gap-8 lg:gap-6
            transition duration-300 ease-in-out 
            antialiased rounded-3xl
            ring-offset-th-primary-medium 
            hover:scale-110 transform
            hover:ring-8 
            hover:shadow-xl 
            hover:cursor-pointer
            ">

                        <div className="place-self-center justify-self-center w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36">
                              <img src={img} alt="" className="" />
                        </div>

                        <div className="  " >
                           <Heading title={title} hScreen={false}  fontSize=" text-base sm:text-xl lg:text-4xl " />
                        </div>
                        <div className=" max-w-xs self-center justify-self-center "  >
                              <p className="  text-center subpixel-antialiased text-base text-th-primary-light ">
                                    {body}
                              </p>
                        </div>


                  </div>
            </Link >

      )
}

