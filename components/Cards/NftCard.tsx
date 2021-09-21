import React from 'react'
import Image from 'next/image'
import { ArtistCardProps } from '../../interfaces/cards'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import { NftMetadata } from '../../interfaces/pages';
import PageLayout from '../Layouts/PageLayout'
import Heading from '../Typography/Heading'


//todo - Determine what file type the nft is to render the corresponding player comp.
// Many ways to do this
 //todo - Pass nft address down, for button to opensea.


export default function NftCard({ nft }: { nft: NftMetadata }): JSX.Element {

      //? Find out the extension of the nft
      const trimmedAudio = nft.animation_url.includes('mp3')
      const trimmedVideo = nft.animation_url.includes('mp4')
      const trimmedImage = nft.animation_url.includes('jpg' || 'png')

     
      return (
            <div className='flex flex-col space-y-10 '>
                  <div>
                        <Heading fontSize='text-base sm:text-xl lg:text-3xl' title={nft.name} hScreen={false} />

                  </div>
                  <p className='text-th-primary-light'>{nft.description}</p>
                  <div className=''>
                        {trimmedAudio && <ReactAudioPlayer className='w-full' src={nft.animation_url} controls controlsList='nodownload' />}
                        {trimmedVideo && <ReactPlayer controls url={nft.animation_url} />}
                        {trimmedImage && <Image src={nft.image}/>}
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


                           <ReactAudioPlayer
                        controls
                        controlsList='nodownload'
                        src={nft.animation_url}
                  />
*/