import React, {useState} from 'react'
import { NftListProps } from '../../interfaces/cards'
import ReactPlayer from 'react-player'
import AlertCard from './AlertCard';

export default function NftList({ items }: NftListProps): JSX.Element {
      const [isPlaying, setIsPlaying] = useState(true);
      if(items) return (
            <div className=" 
            grid grid-flow-row
            auto-rows-max
            justify-center items-center
            rounded-lg shadow-lg
            bg-th-accent-medium     
            ">
                  <div className="  mx-auto p-2 md:p-4 lg:p-8 ">
                        <p className=" text-sm md:text-base lg:text-3xl text-th-primary-light text-center text-shadow-md break-words">
                              A list of your tokens from:  
                        </p>
                        <a 
                              target="_blank"
                              className="subpixel-antialiased rounded-md
                              text-sm md:text-base lg:text-3xl text-th-primary-light text-center
                              border-b-4 border-th-primary-medium
                              hover:border-transparent text-shadow-lg
                              transition duration-300 ease-in-out 
                              hover:text-th-primary-medium transform"
                              href="https://explorer-mumbai.maticvigil.com/address/0xf79349d03E0A2BfFD5Ea27B512D51Bd84289E72A/logs"> 
                              The contract on mumbai  
                              </a>
                  </div>
                    {items.map((item, index) =>
                              <div  className=" h-1/4 w-1/4 md:w-full md:h-full py-2 lg:py-4 border-2">
                                    <ReactPlayer key={index} url={item} playing={isPlaying} loop={true}  volume={0} />
                              </div>
                        )}       
            </div>
      )
      else return <div>  <AlertCard title="No items, keep playing..." body="You gotta start somewhere right" color="amber" /> </div>
}