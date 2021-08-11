import React from 'react'
import { ArtistCardProps } from '../../interfaces/cards'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { NftMetadata } from '../../interfaces/pages';

interface Props {
    nft: NftMetadata
}

export default function NftCard({ nft }: Props): JSX.Element {

    //const trimmedAudio = nft.animation_url.includes('mp3')
    const trimmedVideo = nft.animation_url.includes('mp4')
    console.log(nft)
    console.log(trimmedVideo)
    //console.log(trimmedAudio)
    const isPlaying = true;
    return (
        <div>
            {nft.animation_url}
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