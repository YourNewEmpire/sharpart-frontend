import Image from 'next/image'
import useSWR from 'swr'
import { useState, useEffect, Suspense } from 'react';
import { ethers } from 'ethers'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { ClipboardCopyIcon } from '@heroicons/react/solid';
import { fetcher } from "../lib/helpers/fetchers";
import copyToBoard from '../lib/helpers/copyToClipboard';
import PolygonImg from '../public/polygon-png.png';
import EthImg from '../public/eth.png'
import Heading from '../components/Typography/Heading';
import SimpleCard from '../components/Cards/SimpleCard';
import PageLayout from '../components/Layouts/PageLayout';
import NodeCard from '../components/Cards/NodeCard';

export default function Home() {
      const { data: maticGas, error: maticGasError } = useSWR(
            'https://gasstation-mainnet.matic.network',
            fetcher,
            { refreshInterval: 10000 }
      )
      const { data: ethGas, error: ethGasError } = useSWR(
            '/api/gasPrice',
            fetcher,
            { refreshInterval: 10000 }
      )

      //todo - move into its own ethers util hook?
      //todo - add copyToClipboard button
      const [ethersBytes, setEthersBytes] = useState('')
      const handleChange = (e) => {
            //* Set formatting input on change of text box
            setEthersBytes(ethers.utils.formatBytes32String(e.target.value));
      }

      //* intersection observer hook
      const { inView, entry, ref } = useInView();
      const animationControl = useAnimation();
      useEffect(() => {
            if (inView) {
                  animationControl.start({
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: {
                              delay: 0.1,
                              duration: 1.25
                        }
                  });
            }
      }, [inView])
      useEffect(() => {
            console.log(ethGas)
      }, [ethGas])

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
                  <motion.div key={ethGas}
                        initial={{ opacity: 0, translateX: -50, }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.75 }}
                        className=''
                  >
                        <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16 ">
                              <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                                    <Image className='animate-spin ' src={EthImg} height={110} width={110} />
                                    <p className='text-center text-xs sm:text-sm lg:text-2xl font-thin  text-th-primary-light break-all'>Mainnet</p>
                              </div>
                              <SimpleCard title="Safe Low gas price" body={ethGas.safeLow + ' ' + 'Gwei'} />
                              <SimpleCard title="Standard gas price" body={ethGas.standard + ' ' + 'Gwei'} />
                              <SimpleCard title="Fast gas price" body={ethGas.fastest + ' ' + 'Gwei'} />
                              <SimpleCard title="Next block base" body={ethGas.nextBase + ' ' + 'Gwei'} />
                        </div>
                        <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-10 m-2 md:m-10 lg:m-16 ">
                              <div className='flex flex-col space-y-1 sm:space-y-4 lg:space-y-6 xl:space-y-10 items-center justify-center'>
                                    <Image className='animate-spin' src={PolygonImg} height={125} width={125} />
                                    <p className='text-center text-xs sm:text-sm lg:text-2xl font-thin text-th-primary-light '>Polygon</p>
                              </div>
                              <SimpleCard title="Safe Low gas price" body={maticGas.safeLow.toFixed(2).toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Standard gas price" body={maticGas.standard.toFixed(2).toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fast gas price" body={maticGas.fast.toFixed(2).toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fastest gas price" body={maticGas.fastest.toFixed(2).toString() + ' ' + 'Gwei'} />
                        </div>
                  </motion.div>




                  <div ref={ref} >
                        <motion.div
                              initial={{
                                    x: '-200vw',
                                    y: '-200vw'
                              }}
                              animate={animationControl}
                        >
                              <Heading title="This is SharpArt" hScreen={true}>
                                    <p className="text-center text-base sm:text-xl lg:text-2xl 
                              text-th-primary-light text-shadow-md subpixel-antialiased 
                              ">
                                          The bridge between talented artists, and the secret of digital asset demand.
                                    </p>
                              </Heading>
                        </motion.div>
                  </div>
                  <PageLayout>
                        <NodeCard wFull>
                              <Heading
                                    title='Convert String to bytes32'
                                    fontSize='text-base sm:text-1xl md:text-3xl '
                              />
                              <div className='
                              w-full flex flex-col 
                              justify-center items-center 
                              space-y-4 text-center'>
                                    < input
                                          type='text'
                                          onChange={(e) => { handleChange(e) }}
                                          className='
                                          focus:outline-none text-xl 
                                          text-th-primary-dark focus:bg-th-accent-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 p-2'/>
                                    <p className='text-th-accent-light text-center ' >
                                          <span className='
                                          uppercase tracking-wide 
                                          font-extrabold text-th-primary-light'>
                                                Result:
                                          </span>
                                          {' ' + ethersBytes}
                                          <button
                                                onClick={() => copyToBoard(ethersBytes)}
                                                className='
                                          focus:outline-none 
                                          text-th-primary-light
                                          transition duration-300 ease-in-out
                                          hover:text-th-primary-medium
                                          transform hover:scale-110
                                          '>
                                                <ClipboardCopyIcon className='inline-flex antialiased' width={30} height={30} />
                                          </button>
                                    </p>
                              </div>
                        </NodeCard>
                  </PageLayout>
            </div >
      )
}
