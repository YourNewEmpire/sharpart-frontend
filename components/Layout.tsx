import React, { useState, useEffect } from 'react'
import "tailwindcss/tailwind.css";
import useSWR from 'swr'

import Nav from './Nav'
import Head from 'next/head'
import { Childs } from '../interfaces/childs'



const getResponse = url => fetch(url).then(r => r.json()).then( (json)=> {
      return json
})

export default function Layout({ children }: Childs): JSX.Element {
      const [mounted, setMounted] = useState(false)
      const { data } = useSWR(mounted ? 'https://gasstation-mainnet.matic.network' : null, getResponse)


      useEffect(() => {
            setMounted(true)
      }, [])

      return (
            <div className=" bg-th-background min-h-full">
                  <Head>
                        <title>SharpTec</title>
                        <link rel='icon' href='/favicon.ico' />
                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
                  </Head>
                  <Nav />
                  <div className="z-20 ">
                        <h1>
                        {data && <h1 className="text-th-accent-light">{data.fastest}</h1>}
                        </h1>
                        <div className="lg:mx-20 sm:mx-6 mx-4  justify-center items-center z-30 border-2 border-gray-100" >
                              {children}
                        </div>
                  </div>
            </div>

      )
}