import React, {useState} from 'react'
import { NftListProps } from '../../interfaces/cards'
import ReactPlayer from 'react-player'

export default function NftList({ items }: NftListProps): JSX.Element {
      const [isPlaying, setIsPlaying] = useState(true);
      if(items) return (
            <div className=" 
            grid
            grid-flow-row
            auto-rows-max
            justify-center
            items-center
            rounded-lg
            bg-lightblue-900
            dark:bg-blue-200
            bg-opacity-60
            dark:bg-opacity-60
            ">
                    {items.map((item, index) =>
                              <div  className=" h-1/4 w-1/4 md:w-full md:h-full py-2 lg:py-4">
                                    <ReactPlayer key={index} url={item} playing={isPlaying} loop={true}  volume={0} />
                              </div>
                        )}
       
            </div>
      )
      else return <div className="display-none"></div>
}