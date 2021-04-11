
import AlertCard from '../components/Cards/AlertCard'
import Link from 'next/link';
import { useSelector } from 'react-redux'
import {
      selectAccount,
} from '../lib/slices/accountSlice';


export default function EtherProj() {
      //@ts-ignore
      const user = useSelector(selectAccount)
      console.log(user)
      return (
            <div className="flex flex-col space-y-64 py-4 ">

                  <div className="flex flex-col my-16 space-y-32 items-center justify-center ">
                       {!user && <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" color="red" />}
                       {user && <AlertCard title="You're connected" body="Run free, address." color="green"/>}
                        <Link href="/ethorb">
                              <a className="  text-center lg:text-6xl text-lightblue-900 dark:text-blue-200 border-blue-200 hover:border-opacity-0
                               hover:shadow-lg rounded-lg transition duration-300 ease-in-out transform  hover:scale-110 
                               " >
                                    Eth Orb - Guess market movements.
                               </a>
                        </Link>
                        <Link href="/ethorb">
                              <a className=" text-center lg:text-6xl text-lightblue-900 dark:text-blue-200  border-blue-200 hover:border-opacity-0
                              hover:shadow-lg rounded-lg transition duration-300 ease-in-out transform  hover:scale-110
                               " >
                                    Eth Orb - Guess market movements.
                               </a>
                        </Link>
                  </div>



            </div>
      );

}
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = axios.get(process.env.HOST_PROD + "/api/fetcheth")

  return {
    props: data
  }
}
*/