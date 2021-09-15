import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { SunIcon, HomeIcon } from '@heroicons/react/solid';

type listItem = {
      id: number,
      text: string,
      link: string
}

export const Nav = () => {
      //* nav items for map
      //todo - Put into CMS.
      const listItems: listItem[] = [
            {
                  id: 1,
                  text: 'Your NFT Dashboard',
                  link: 'dashboard',
            },
            {
                  id: 2,
                  text: 'Artists',
                  link: 'artists'
            },
            {
                  id: 3,
                  text: 'Ether Dapps',
                  link: 'etherdapps'
            },
            {
                  id: 4,
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
                              <a className='
                              xl:inline-flex  w-0  
                              xl:w-auto xl:p-2 p-0 mr-0  xl:mr-4  
                              items-center justify-center 
                              invisible xl:visible  
                              hover:shadow-lg rounded-lg transition duration-100 
                              ease-in-out transform  hover:scale-110  antialiased' >
                                    <span className=' lg:text-3xl text-sm text-th-primary-light font-bold uppercase tracking-wide'>
                                          Sharpart
                                    </span>
                              </a>
                        </Link>
                        <Link href='/'>
                              <a className='
                              xl:inline-flex  xl:invisible visible  
                              xl:w-0  p-2  xl:p-0  xl:mr-0  
                              items-center justify-center 
                              antialiased focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg 
                              transition duration-100 ease-in-out transform  hover:scale-110  '
                              >
                                    <HomeIcon width={35} height={35}/>
                              </a>
                        </Link>

                        {listItems.map((listItem) =>
                              <Link key={listItem.id} href={`/` + listItem.link}>
                                    <a className=' 
                                                subpixel-antialiased focus:outline-none
                                                text-th-primary-light
                                                text-xs md:text-lg lg:text-1xl  xl:text-2xl
                                                md:h-auto inline-flex md:w-auto 
                                                font-bold items-center justify-center
                                                py-2 px-4 xl:py-4 xl:px-6
                                                lg:mx-4 md:mx-2 sm:mx-1 mx-0  
                                                hover:shadow-lg rounded-lg transition duration-100 
                                                ease-in-out transform  hover:scale-110
                                                '>
                                          {listItem.text}
                                    </a>
                              </Link>
                        )}

                        <button
                              className='  xl:ml-auto ml-0 inline-flex items-center lg:h-16 lg:w-16 w-10 h-10
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



