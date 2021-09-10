import React from 'react'
import { ArtistCardProps } from '../../interfaces/cards'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import { NftMetadata } from '../../interfaces/pages';


//todo - Determine what file type the nft is to render the corresponding player comp.
// Many ways to do this


export default function NftCard({ nft }: { nft: NftMetadata }): JSX.Element {

      const trimmedAudio = nft.animation_url.includes('mp3')
      console.log(trimmedAudio)
      const isPlaying = true;
      return (
            <div className='border-2'>
                  
                  <h1>{nft.name}</h1>
                  <h3>{nft.description}</h3>
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