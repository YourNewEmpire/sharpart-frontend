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
      </Head>
        <div>
          <Link href="/Artists">View our artists</Link>
        </div>

        <div>
          <h1>next app</h1>
        </div>
    </>
  );
}
