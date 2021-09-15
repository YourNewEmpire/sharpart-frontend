import {
      useMoralis,
      useMoralisQuery,
      useMoralisWeb3Api,
      useMoralisWeb3ApiCall,
} from 'react-moralis'
import { useState } from 'react';
import Moralis from 'moralis'
import MoralisAuth from '../components/Buttons/MoralisAuth';
import AlertCard from '../components/Cards/AlertCard';
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';

export default function Dashboard() {

      const { isAuthenticated, user, Moralis } = useMoralis()
      const userAddress: string = user?.get('ethAddress')
      const web3API = useMoralisWeb3Api()
      //@ts-ignore
      const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(web3API.account.getNFTs, {
            chain: 'polygon',
            format: 'decimal',
            address: userAddress
      });
      const [uriArray, setUris] = useState([])
 

      const getNFTs = async () => {
            fetch().then(() => {
                  data?.result.map((item, index) => {
                        const uri = JSON.parse(item.metadata)
                        if(uri === null){
                              return 
                        }
                        else {
                              uriArray.push(uri)
                        }
                  })
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
                  text-th-primary-light bg-th-primary-dark hover:shadow-lg p-2'>
                        Fetch/Refresh
                  </button>

                  <div>
                        {uriArray.map((item, index) =>
                              <p key={index}>

                                    {item.animation_url}
                              </p>
                        )}
                  </div>
            </PageLayout>
      )
}
