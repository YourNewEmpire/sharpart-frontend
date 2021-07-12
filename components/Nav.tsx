import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { SunIcon } from '@heroicons/react/solid';

type listItem = {
      id: number,
      text: string,
      link: string
}
export const Nav = () => {
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

      const { theme, setTheme } = useTheme()




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
                              hover:shadow-lg rounded-lg 
                              transition duration-100 ease-in-out transform  hover:scale-110  '
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
                              className='  xl:ml-auto ml-0 inline-flex items-center lg:h-16 lg:w-16 w-6 h-6
                              antialiased focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg 
                              transition duration-100 ease-in-out transform  hover:scale-110 '
                              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                              <SunIcon />

                        </button>

                  </nav>
            </div>
      );
};


export default Nav;



