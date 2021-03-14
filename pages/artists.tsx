import Link from 'next/link'
import Layout from '../components/Layout'
import {useRouter} from 'next/router'


export default function Artists() {
  const router = useRouter()
  return (
    <>
      <div>
        <h1>artists</h1>
        <h2>This is {router.query.artist}</h2>
      </div>
      </>
  );
}
