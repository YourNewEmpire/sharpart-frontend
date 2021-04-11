import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { useDispatch, useSelector,} from 'react-redux'
import { setAccountThunk, selectAccount} from '../lib/slices/accountSlice';




type listItem = {
      id: number,
      text: string,
      link: string
}


export const Nav = () => {

      const { theme, setTheme } = useTheme()

      const dispatch = useDispatch()
      const user = useSelector(selectAccount)

      //nav items for map
      const listItems: listItem[] = [
            {
                  id: 1,
                  text: 'Artists',
                  link: 'artists'
            },
            {
                  id: 2,
                  text: 'Ether Projects',
                  link: 'etherprojects'
            },
            {
                  id: 3,
                  text: 'Contact',
                  link: 'contact'
            },
      ]
      const mMask = () => {
            dispatch(setAccountThunk());
      };

      return (
            <div className="">
                  <nav className='
                  flex flex-wrap items-center justify-center 
                  bg-lightblue-900
                  dark:bg-blue-200
                  bg-gradient-to-br
                  from-lightblue-900
                  dark:from-blue-200
                  to-blue-200
                  dark:to-lightblue-900 
                  md:px-8 py-4 shadow-lg'>
                        <Link href='/'>
                              <a className=' inline-flex items-center justify-center display-none w-0  lg:p-2 p-0 mr-4  lg:w-auto invisible lg:visible hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110  antialiased' >

                                    <span className=' lg:text-3xl text-sm text-blue-200 dark:text-lightblue-900 font-bold uppercase tracking-wide'>
                                          Sharpart
                                    </span>
                              </a>
                        </Link>

                        {listItems.map((listItem, index) =>
                              <Link key={index} href={`/` + listItem.link}>
                                    <a className=' subpixel-antialiased text-xs md:text-2xl  
                                                md:h-auto inline-flex  md:w-auto 
                                                px-2 py-2 font-bold items-center justify-center
                                                md:px-6 md:py-4 lg:mx-8 mx-4
                                                focus:outline-none 
                                                rounded-lg text-blue-200 dark:text-lightblue-900 
                                                hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                                                '>
                                          {listItem.text}
                                    </a>
                              </Link>
                        )}
                        <button
                              className='  lg:ml-auto ml-0  subpixel-antialiased text-xs md:text-2xl  md:h-auto inline-flex md:w-auto 
                              mx-2 px-2 py-0 font-bold items-center justify-center
                              md:mx-4 md:px-6 md:py-4 
                              rounded-lg text-amber-600 dark:text-amber-600
                              hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                              focus:outline-none '
                              onClick={mMask}
                        >
                              Metamask

                        </button>
                        <button
                              className=' mx-2 items-center lg:h-20 lg:w-20 w-5 h-5 hover:text-blue-300 antialiased focus:outline-none '
                              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                              <svg viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>

                        </button>

                  </nav>
            </div>
      );
};
/*
 <a className=' subpixel-antialiased  text-xl text-blue-200 dark:text-lightblue-900 lg:inline-flex lg:w-auto w-full 
                                                mx-3 px-6 py-4 rounded-lg font-bold items-center justify-center 
                                                  hover:shadow-lg hover:border-b hover:border-blue-200   transition duration-500 ease-in-out 
                                                '>



                                                 <div className='  sm:inline-flex sm:flex-row  w-auto sm:w-auto w-full sm:items-center  lg:h-auto'  >
 </div>
*/

export default Nav;



