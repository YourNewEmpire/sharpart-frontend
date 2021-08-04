
import AlertCard from '../components/Cards/AlertCard'
import Link from 'next/link';
import { useMoralis } from "react-moralis";


export default function EtherDapps() {
      //@ts-ignore
      const { authenticate, isAuthenticated, user } = useMoralis();
      const ethAddress = user?.get('ethAddress')


      if (!isAuthenticated) {
            return (
                  <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">
                        <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" failure />
                        <button
                              className=' 
                              p-2 lg:p-4
                              lg:text-3xl md:text-lg text-xs text-th-accent-moralis
                              hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                              focus:outline-none '
                              onClick={() => authenticate()}
                        >
                              Metamask/Moralis Authentication

                        </button>

                        <Link href="/ethorbtest">
                              <a className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-lg lg:text-4xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-md
                                    transition duration-300 ease-in-out hover:text-th-primary-medium
                                    transform hover:scale-110 
                                    ">
                                    Eth Orb Test - Play without MetaMask in a construction site.
                              </a>

                        </Link>
                  
                  </div>
            )
      }
      else return (
            <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">

                  <AlertCard info title="You're all set" body={ethAddress}
                  />
                  <Link href="/ethorb">
                        <a className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-lg lg:text-4xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-md
                                    transition duration-300 ease-in-out hover:text-th-primary-medium 
                                    transform scale hover:scale-110
                                    ">
                              Eth Orb - Guess market movements.
                        </a>
                  </Link>
                  <Link href="/ethorbtest">
                        <a className="
                                    subpixel-antialiased  rounded-md
                                    text-center text-lg lg:text-4xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-md
                                    transition duration-300 ease-in-out hover:text-th-primary-medium 
                                    transform scale hover:scale-110
                                    
                                    ">
                              Eth Orb Test - Play without MetaMask
                        </a>
                  </Link>
                  
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