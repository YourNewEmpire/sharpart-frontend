import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import Nav from '../components/Nav'


export default function Home() {
  return (
    <>
      <Head>
        <title>SharpArt</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </Head>
      <div className="flex items-center justify-center py-64 px-24">
        <h1 className="text-6xl text-gray-200">This Is SharpArt</h1>
      </div>
    </>
  );
}
