import Image from 'next/image'
import useSWR from 'swr'
import { fetcher } from "../lib/helpers/fetchers";
import Heading from '../components/Typography/Heading';
import SimpleCard from '../components/Cards/SimpleCard';
import PolygonImg from '../public/polygon-png.png';
import EthImg from '../public/eth.png'

export default function Home() {
      const defiPulseKey = process.env.NEXT_PUBLIC_DEFI_PULSE_KEY
      const { data: maticGas, error: maticGasError } = useSWR('https://gasstation-mainnet.matic.network', fetcher, { refreshInterval: 10000 })

      if (!maticGas) return (
            <div id="div1" className="flex flex-col items-center justify-center ">
                  <Heading title="This is SharpArt" hScreen={true}>
                        <p className="text-center text-base sm:text-xl lg:text-2xl 
                              text-th-primary-light text-shadow-md subpixel-antialiased 
                              ">
                              The bridge between talented artists, and the secret of digital asset demand.
                        </p>
                  </Heading>
            </div>
      );
      else return (

            <div>
                  <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16">
                        <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                              <Image className='animate-spin ' src={EthImg} height={110} width={110} />
                              <p className='text-center text-xs sm:text-sm lg:text-xl font-thin  text-th-primary-light break-all'>Mainnet</p>
                        </div>
                        <p className='col-span-4 text-base text-shadow-md text-th-primary-light'>
                              Ethereum gas is gone! The api devs changed the rules, api keys only chads! Fetching it with API key is impossible from dev environment, as the dev environment cannot be whitelisted.
                              My knowledge of dev/prod environments is not up to it, therefore I dont know how to fix this right now. I could go into detail, but it's simpler to stop fetching and 
                              look at it another day. ;_; At least we can cry rivers for the ones that are droughted.
                        </p>
                  </div>
                  <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16">
                        <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                              <Image className='animate-spin' src={PolygonImg} height={125} width={125} />
                              <p className='text-center text-xs sm:text-sm lg:text-xl font-thin  text-th-primary-light '>Polygon</p>
                        </div>
                        <SimpleCard title="Safe Low gas price" body={maticGas.safeLow.toFixed(2).toString() + ' ' + 'Gwei'} />
                        <SimpleCard title="Standard gas price" body={maticGas.standard.toFixed(2).toString() + ' ' + 'Gwei'} />
                        <SimpleCard title="Fast gas price" body={maticGas.fast.toFixed(2).toString() + ' ' + 'Gwei'} />
                        <SimpleCard title="Fastest gas price" body={maticGas.fastest.toFixed(2).toString() + ' ' + 'Gwei'} />
                  </div>

                  <div id="div1" className="flex flex-col items-center justify-center ">
                        <Heading title="This is SharpArt" hScreen={true}>
                              <p className="text-center text-base sm:text-xl lg:text-2xl 
                              text-th-primary-light text-shadow-md subpixel-antialiased 
                              ">
                                    The bridge between talented artists, and the secret of digital asset demand.
                              </p>
                        </Heading>
                  </div>
            </div>
      )
}
