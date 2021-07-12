import React from 'react'
import { ArtistCardProps } from '../../interfaces/cards'
import Link from 'next/link'
import ReactPlayer from 'react-player'

export default function Mp4Card({ img, title, body, link }: ArtistCardProps): JSX.Element {
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

                        <div className="  flex justify-center items-center">
                              <ReactPlayer height='250px' width='250px' style={{ padding: '0px', margin: '0px', }} url={img} playing={isPlaying} loop={true} volume={0} />
                        </div>



                        <div className="  " >
                              <p className=" subpixel-antialiased text-4xl text-center break-words text-th-primary-medium text-shadow-md ">
                                    {title}
                              </p>
                        </div>
                        <div className=" w-60 self-center justify-self-center"  >
                              <p className="  text-center subpixel-antialiased text-base text-th-primary-light ">
                                    {body}
                              </p>
                        </div>


                  </div>
            </Link >

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