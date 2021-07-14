import React, { useState, useEffect } from 'react'
import "tailwindcss/tailwind.css";
import Nav from '../Nav'
import Head from 'next/head'
import { Childs } from '../../interfaces/childs';
import { useRouter } from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

export default function Layout({ children }: Childs): JSX.Element {

      const router = useRouter()

      useEffect(() => {
            router.events.on('routeChangeStart' , () => NProgress.start() )
            router.events.on('routeChangeComplete' , () => NProgress.done())
            router.events.on('routeChangeError' , () => NProgress.done())
      } ,[router.route])

      return (
            <div className=" bg-th-background min-h-full">
                  <Head>
                        <title>SharpArt</title>
                        <link rel='icon' href='/favicon.ico' />
                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
                  </Head>
                  <Nav />
                  <div className="z-50 lg:mx-20 sm:mx-6 mx-4  justify-center items-center" >
                        {children}
                  </div>
            </div>
      )
}