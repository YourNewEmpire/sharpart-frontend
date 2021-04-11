import { useState, useEffect, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import Web3 from 'web3'
import SimpleCard from '../components/Cards/SimpleCard';
import AlertCard from '../components/Cards/AlertCard'
import NftList from '../components/Cards/NftCard';
import {
      selectAccount,
      selectUris,
      setUrisThunk,
      setAccount
} from '../lib/slices/accountSlice';
import {
      selectPrice,
      setPriceThunk
} from '../lib/slices/ethpriceSlice'

export default function EthOrb() {
      //@ts-ignore
      const user = useSelector(selectAccount)
      console.log(user)
      const tokens = useSelector(selectUris)
      const eth = useSelector(selectPrice)
      const dispatch = useDispatch();

      const goingUp = async (): Promise<void> => {
            const res = await axios.post('/api/goingUp.js')
      };

      useEffect(() => {
            dispatch(setUrisThunk(user))
            console.log('urithunk')
      }, [user])

      useEffect(() => {
            const id = setInterval(async () => {
                  dispatch(setPriceThunk())
            }, 3000);
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


      if (!user) return (

            <div className="flex items-center justify-center ">
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" color="red" />

            </div>
      )
      else return (
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row lg:gap-8 py-4">
                  <div className="">
                        <SimpleCard title="Welcome" body={user} />
                        <p className="text-gray-400">Price of ETH in USD is ${eth}</p >
                  </div>

                  <NftList items={tokens} />
            </div>
      );

}
