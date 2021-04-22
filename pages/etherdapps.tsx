
import AlertCard from '../components/Cards/AlertCard'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import {
      setAccountThunk,
      selectAccount,
} from '../lib/slices/accountSlice';




export default function EtherDapps() {
      //@ts-ignore
      const user = useSelector(selectAccount)
      const dispatch = useDispatch()

      const mMask = () => {
            dispatch(setAccountThunk());
      };
      
      if (!user) {
            return (


                  <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-12 items-center justify-center ">
                        <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" color="red" />
                        <button
                              className=' 
                               p-2 lg:p-4
                              text-3xl
                               text-amber-600 dark:text-amber-600
                              hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                              focus:outline-none '
                              onClick={mMask}
                        >
                              Metamask

                        </button>
                  </div>
            )
      }
      else return (
            <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">
                  {!user && <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" color="red" />}
                  {user && <AlertCard title="You're connected" body="Run free, address." color="green" /> &&
                        <Link href="/ethorb">
                              <a className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-lg lg:text-4xl
                                    text-th-primary-light
                                    border-b-4 border-th-accent-medium
                                    hover:border-transparent text-shadow-lg
                                    transition duration-300 ease-in-out hover:text-th-accent-medium transform   
                                    ">
                                    Eth Orb - Guess market movements.
                                    </a>
                        </Link>
                  }
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