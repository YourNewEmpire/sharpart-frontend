import Image from 'next/image'
import useSWR from 'swr'
import { fetcher } from "../lib/helpers/fetchers";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ethers } from 'ethers'
import Heading from '../components/Typography/Heading';
import SimpleCard from '../components/Cards/SimpleCard';
import PolygonImg from '../public/polygon-png.png';
import EthImg from '../public/eth.png'
import PageLayout from '../components/Layouts/PageLayout';
import NodeCard from '../components/Cards/NodeCard';

export default function Home() {
      const defiPulseKey = process.env.NEXT_PUBLIC_DEFI_PULSE_KEY

      const { data: maticGas, error: maticGasError } = useSWR(
            'https://gasstation-mainnet.matic.network',
            fetcher, 
            { refreshInterval: 10000 }
      )
      const { data: ethGas, error: ethGasError } = useSWR(
            `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${defiPulseKey}`,
            fetcher, 
            { refreshInterval: 10000 }
      )

      //todo - move into its own ethers util hook?
      //todo - add copyToClipboard button
      const [ethersBytes, setEthersBytes] = useState('')
      //* Set formatting input on change of text box
      const handleChange = (e) => {
            setEthersBytes(ethers.utils.formatBytes32String(e.target.value));
      }


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
                  <motion.div key={maticGas}
                        initial={{ opacity: 0, translateX: -50, }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.75 }}
                  >
                        <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16">
                              <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                                    <Image className='animate-spin ' src={EthImg} height={110} width={110} />
                                    <p className='text-center text-xs sm:text-sm lg:text-xl font-thin  text-th-primary-light break-all'>Mainnet</p>
                              </div>
                              <p className='col-span-4 text-base text-shadow-sm text-th-primary-light'>
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
                  </motion.div>




                  <div id="div1" className="flex flex-col items-center justify-center ">
                        <Heading title="This is SharpArt" hScreen={true}>
                              <p className="text-center text-base sm:text-xl lg:text-2xl 
                              text-th-primary-light text-shadow-md subpixel-antialiased 
                              ">
                                    The bridge between talented artists, and the secret of digital asset demand.
                              </p>
                        </Heading>
                  </div>
                  <PageLayout>
                        <NodeCard>
                              <Heading title='Convert String to bytes32' fontSize='text-base sm:text-1xl md:text-3xl '/>
                              <div className='flex flex-col space-y-4 text-center'>
                                    
                                    < textarea
                                          className='
                              focus:outline-none text-xl 
                              text-th-primary-dark focus:bg-th-accent-light 
                              transition-colors duration-300 
                              ease-in-out bg-opacity-25 p-2'
                                          onChange={(e) => { handleChange(e) }} name='message' />
                                    <p className='text-th-accent-light' >
                                          <span className='font-extrabold text-th-primary-light'>Result: </span>{ethersBytes}

                                    </p>
                              </div>
                        </NodeCard>
                  </PageLayout>
            </div >
      )
}
