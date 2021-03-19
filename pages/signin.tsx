import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts } from '../redux/actions/accountActions';
import sha3 from 'sha3'
import Head from 'next/head'



//sign in with metamask
const SignInPage = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const router = useRouter();
  const address = state.account.value

  const handleMmask = () => {
    dispatch(fetchAccounts());
    router.push("/private")
  }

  return (
    <>
      <Head>
        <title>SharpArt</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Head>
      <div id="div1" className="flex items-center justify-center py-64 px-24">



        <div className=" 
            flex flex-col items-center justify-center 
            rounded-lg shadow-lg
            bg-blue-200
            px-10
            py-10
        ">

          <div className="flex-1 py-2">
            <p className=" text-gray-900 ">
              First connect your metamask. Then you may proceed.
            </p>
          </div>


          <div className=" flex-1 py-2">

            <div className="py-2" >
              <button onClick={handleMmask}
                className="text-gray-900 px-3 py-2
                              font-bold
                              hover:bg-amber-500 hover:text-gray-200
                              hover:shadow-lg rounded transition duration-500 ease-in-out
                       
                              w-full
                              h-full
                              ">
                Connect MetaMask
              </button >

            </div>


          </div>

        </div>
      </div>
    </>
  );
};

export default SignInPage;