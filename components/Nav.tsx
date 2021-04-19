import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { useDispatch, useSelector, } from 'react-redux'
import { setAccountThunk, selectAccount } from '../lib/slices/accountSlice';




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
                  text: 'Ether Dapps',
                  link: 'etherdapps'
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
                  bg-th-background
                  md:px-8 px-2 py-4 shadow-lg'>
                        <Link href='/'>
                              <a className='  xl:inline-flex  w-0  xl:w-auto xl:p-2 p-0 mr-0  xl:mr-4  items-center justify-center invisible xl:visible  hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110  antialiased' >
                                    <span className=' lg:text-3xl text-sm text-th-primary-light font-bold uppercase tracking-wide'>
                                          Sharpart
                                    </span>
                              </a>
                        </Link>
                        <Link href='/'>
                              <a className=' 
                              xl:inline-flex  xl:invisible visible  xl:w-0  w-auto p-2  xl:p-0  
                              xl:mr-0  items-center justify-center 
                              antialiased focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg transition-shadow duration-200 ease-in-out '
                              >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                              </a>
                        </Link>

                        {listItems.map((listItem) =>
                              <Link key={listItem.id} href={`/` + listItem.link}><a className=' 
                                                subpixel-antialiased text-xs md:text-base  lg:text-2xl
                                                md:h-auto inline-flex  md:w-auto 
                                                px-2 py-2 font-bold items-center justify-center
                                                md:px-6 md:py-4 lg:mx-4 md:mx-2 mx-0  
                                                focus:outline-none 
                                                text-th-primary-light
                                                hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                                                '>
                                    {listItem.text}
                              </a></Link>
                        )}
                        <button
                              className=' xl:ml-auto ml-0  subpixel-antialiased  text-xs md:text-base  lg:text-2xl md:h-auto inline-flex md:w-auto 
                              font-bold items-center justify-center
                              px-2 py-2 md:px-6 md:py-4 lg:mx-4 md:mx-2 sm:mx-0  
                               text-amber-600 dark:text-amber-600
                              hover:shadow-lg rounded-lg transition duration-100 ease-in-out transform  hover:scale-110
                              focus:outline-none '
                              onClick={mMask}
                        >
                              Metamask

                        </button>
                        <button
                              className='inline-flex items-center lg:h-16 lg:w-16 w-6 h-6
                              antialiased focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg 
                              transition duration-100 ease-in-out transform  hover:scale-110 '
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


export default Nav;



