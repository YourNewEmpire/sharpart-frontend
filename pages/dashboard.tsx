import {
      useMoralis,
      useMoralisQuery,
      useMoralisWeb3Api,
      useMoralisWeb3ApiCall,
} from 'react-moralis'
import { useState } from 'react';
import Moralis from 'moralis'
import MoralisAuth from '../components/Buttons/MoralisAuth';
import { RefreshIcon } from '@heroicons/react/solid';
import AlertCard from '../components/Cards/AlertCard';
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import NftCard from '../components/Cards/NftCard';

export default function Dashboard() {


      const [uriArray, setUris] = useState([])

      const { isAuthenticated, user, Moralis } = useMoralis()
      const userAddress: string = user?.get('ethAddress')
      const web3API = useMoralisWeb3Api()
      const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(web3API.account.getNFTs, {
            chain: 'polygon',
            format: 'decimal',
            address: userAddress
      });
      //@ts-ignore



      const getNFTs = async () => {
            let uriLocalArray = []
            setUris([])
            fetch().then(() => {
                  data?.result.map((item, index) => {
                        const uri = JSON.parse(item.metadata)
                        if (uri === null) {
                              return
                        }
                        else {
                              uriLocalArray.push(uri)
                        }
                  })
                  setUris(uriLocalArray)
                  console.log(uriArray)
            })
      }
      if (!isAuthenticated) return (
            <PageLayout>
                  <AlertCard
                        title='Stop right there, Chad'
                        body='
                  You will need to
                  authenticate to
                  query with account'
                        warning
                  />
                  <MoralisAuth />
            </PageLayout>
      )
      return (
            <PageLayout>
                  <Heading title={`Welcome ${userAddress}`} />
                  <button
                        onClick={() => getNFTs()}
                        className='
                        flex justify-center items-center
                        p-2 text-xl rounded-lg
                        text-th-primary-light 
                        hover:shadow-lg bg-th-primary-dark 
                        transition duration-300 transform
                        hover:scale-125 ease-in-out
                  '>
                        Fetch/Refresh

                        <RefreshIcon width={50} height={50} />
                  </button>

                  <div className='flex justify-center items-center'>
                        <div className='grid gap-8
                              grid-flow-row grid-cols-4
                              items-center justify-center '>
                              {uriArray.map((item, index) =>
                                    <div key={index} className='ring-4 flex items-center justify-center'>
                                         <NftCard nft={item}/>
                                    </div>
                              )}
                        </div>
                  </div>
            </PageLayout>
      )
}
