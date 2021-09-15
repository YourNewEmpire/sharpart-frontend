import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import Heading from '../components/Typography/Heading';
import SimpleCard from '../components/Cards/SimpleCard';
import { useInterval } from '../hooks/useInterval';

import {
      selectEthGas,
      selectMaticGas,
      setGasThunk
} from '../lib/slices/gaspriceSlice';
import PolygonImg from '../public/polygon-png.png'
import EthImg from '../public/eth.png';
import NftCardCopy from "../components/Cards/NftCardCopy";

export default function Home() {

      const dispatch = useDispatch()
      const maticGas = useSelector(selectMaticGas)
      const ethGas = useSelector(selectEthGas)

      const fetchGas = () => {
            dispatch(setGasThunk())
      }
      useEffect(() => {
            fetchGas()
      }, [])
      
      useInterval(fetchGas, 10000)

      return (
            <>
                  {ethGas &&
                        <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16">
                              <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                                    <Image className='animate-spin ' src={EthImg} height={110} width={110} />
                                    <p className='text-center text-xs sm:text-sm lg:text-xl font-thin  text-th-primary-light break-all'>Mainnet</p>
                              </div>
                              <SimpleCard title="Safe Low gas price" body={ethGas.safeLow.toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Standard gas price" body={ethGas.average.toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fast gas price" body={ethGas.fast.toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fastest gas price" body={ethGas.fastest.toString() + ' ' + 'Gwei'} />
                        </div>
                  }
                  {!ethGas &&
                        <div className="m-4 md:m-10 lg:m-16">
                              <h1 className="text-center text-th-primary-light">No gas data was received from Polygon</h1>
                        </div>
                  }

                  {maticGas &&
                        <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16">
                              <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                                    <Image className='animate-spin' src={PolygonImg} height={125} width={125} />
                                    <p className='text-center text-xs sm:text-sm lg:text-xl font-thin  text-th-primary-light break-all'>Polygon</p>
                              </div>
                              <SimpleCard title="Safe Low gas price" body={maticGas.safeLow.toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Standard gas price" body={maticGas.standard.toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fast gas price" body={maticGas.fast.toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fastest gas price" body={maticGas.fastest.toString() + ' ' + 'Gwei'} />
                        </div>
                  }
                  {!maticGas &&
                        <div className="m-4 md:m-10 lg:m-16">
                              <h1 className="text-center text-th-primary-light">No gas data was received from Polygon</h1>
                        </div>
                  }
                  <div id="div1" className="flex flex-col items-center justify-center ">
                        <Heading title="This is SharpArt" hScreen={true}>
                              <p className="text-center text-base sm:text-xl lg:text-2xl 
                              text-th-primary-light text-shadow-md subpixel-antialiased 
                              ">
                                    The bridge between talented artists, and the secret of digital asset demand.
                              </p>
                        </Heading>
                  </div>


            </>
      );
}
