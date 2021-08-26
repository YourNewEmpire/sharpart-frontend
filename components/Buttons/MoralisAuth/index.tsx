import React from 'react'
import { useMoralis } from 'react-moralis'


export default function MoralisAuth(): JSX.Element {
      const { authenticate, isAuthenticated, user } = useMoralis();

      return (
            <div >
                  <button
                        className=' 
                              p-2 lg:p-4
                              lg:text-3xl md:text-lg text-xs text-th-accent-warning-medium
                              shadow-md hover:shadow-lg rounded-lg 
                              transition duration-300 ease-in-out 
                              transform  hover:scale-125
                              focus:outline-none'
                        onClick={() => authenticate()}
                  >
                        Connect Metamask

                  </button>
                  
            </div>
      )
}