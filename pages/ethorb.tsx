import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router'
import SimpleCard from '../components/Cards/SimpleCard';
import AlertCard from '../components/Cards/AlertCard'
import NftList from '../components/Cards/NftList';
import {
      selectAccount,
      selectUris,
      setUrisThunk,
      setAccount,
} from '../lib/slices/accountSlice';
import {
      selectPrice,
      setPriceThunk
} from '../lib/slices/ethpriceSlice'
import {
      ethOrb, selectError,
      selectResult, setError
} from '../lib/slices/gameSlice';

import ModalCard from '../components/Cards/ModalCard';


export default function EthOrb() {
      //@ts-ignore
      const user = useSelector(selectAccount)
      const gameResult = useSelector(selectResult)
      const gameError = useSelector(selectError)
      const tokens = useSelector(selectUris)
      const eth = useSelector(selectPrice)
      const dispatch = useDispatch()
      const [session, loading] = useSession()
      const router = useRouter()
      // click handlers for game UI. call the  game 
      const goingUp = () => {
            console.log("yess")
            dispatch(ethOrb(user, eth, 'api/goingUp'));
      };
      const goingDown = () => {
            console.log("yess")
            dispatch(ethOrb(user, eth, 'api/goingUp'));
      };


      useEffect(() => {
            dispatch(setUrisThunk(user))
            console.log('uris fetched')
      }, [user])

      useEffect(() => {
            const id = setInterval(async () => {
                  dispatch(setPriceThunk())
                  console.log('new Price fetched')
            }, 5000);
            return () => clearInterval(id);
      }, [eth])

      useEffect(() => {
            async function listenMMAccount() {
                  //@ts-ignore
                  const web3 = new Web3(window.ethereum);
                  //@ts-ignore
                  window.ethereum.on("accountsChanged", async function () {
                        const accounts = await web3.eth.getAccounts();
                        console.log(accounts, "account changed");
                        dispatch(setAccount(accounts[0]))
                  });
            }
            listenMMAccount();
      }, []);

      if (!session) {
            router.push('loginout')
      }
      if (!user) return (

            <div className="flex items-center justify-center py-10">
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" color="red" />

            </div>
      )
      else return (
            <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-2 md:gap-4 lg:gap-8 py-4">

                        <div className="">
                              <SimpleCard title="Welcome" body={user} />
                              <p className="py-20 text-th-primary-light">Price of ETH in USD is ${eth}</p >
                              <ModalCard
                                    body="Where will the price (usd) of Eth be in 2 minutes? "
                                    action1={
                                          <button
                                                onClick={goingUp}
                                                className=" 
                                                p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light
                                                rounded-lg bg-opacity-0
                                                hover:bg-th-accent-success
                                          transition duration-300 ease-in-out"
                                          >
                                                Mooning
                                           </button>
                                    }
                                    action2={
                                          <button
                                                onClick={goingDown}
                                                className=" 
                                          p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light
                                          bg-opacity-0 rounded-lg
                                          hover:bg-th-accent-failure
                                          transition duration-300 ease-in-out">Dropping</button>
                                    }
                              />
                              {gameError && <AlertCard title="Error:" body={gameError} color="red" />}
                              {gameResult === 'victory' && <AlertCard title=" Victory" body="you will be transferred 1 of our mp4 NFTs and will appear on this front end any moment. " color="green" />}
                        </div>

                        <NftList items={tokens} />
                  </div>


            </div>
      );

}
