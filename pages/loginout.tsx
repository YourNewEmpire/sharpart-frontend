import { signIn, signOut, useSession } from 'next-auth/client';
import AlertCard from '../components/Cards/AlertCard';
import Heading from '../components/Heading';

export default function Loginout() {
      const [session, loading] = useSession()
      return <>
            {loading &&
                  <AlertCard title="loading" body="loading user session" color="blue" />
            }
            {!session &&

                  <div className="flex flex-col items-center justify-center ">
                        <Heading title="Sign In With Google only" >
                              <p> more sign in methods will be available in the future</p>
                              <button
                                    className=' 
                              p-2 lg:p-4
                              text-3xl
                               text-amber-600 dark:text-amber-600
                              hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                              focus:outline-none '
                                    onClick={() => signIn('google')}
                              >
                                    Sign In with Google
                              </button>
                        </Heading>
                  </div>
            }
            {session &&
                  <div className="flex flex-col items-center justify-center ">
                        <Heading title="Sign In With Google only" >
                              <p>  Signed in as {session.user.email}</p>
                              <button
                                    className=' 
                             p-2 lg:p-4
                             text-3xl
                              text-amber-600 dark:text-amber-600
                             hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                             focus:outline-none '
                                    onClick={() => signOut()}
                              >
                                    Sign Out with Google
                             </button>
                        </Heading>
                  </div>
            }
      </>
}
