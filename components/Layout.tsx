import React, { ReactChild, ReactChildren, useEffect } from 'react'
import "tailwindcss/tailwind.css";
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import Nav from './Nav'
import Head from 'next/head'
import { Childs } from '../interfaces/childs'

export default function Layout({ children }: Childs): JSX.Element {


      return (
            <div className=" bg-th-background min-h-full">
                  <Head>
                        <title>SharpTec</title>
                        <link rel='icon' href='/favicon.ico' />
                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
                  </Head>
                  <Nav />
                  <div className="lg:mx-20 sm:mx-6 mx-4  justify-center items-center" >
                        {children}
                  </div>
            </div>

      )
}