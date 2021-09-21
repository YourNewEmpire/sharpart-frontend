import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { SunIcon, HomeIcon, MenuIcon } from '@heroicons/react/solid';


type listItem = {
      id: number,
      text: string,
      link: string
}


const Nav = () => {
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

      //todo - clean up after setting up responsive dropdown
      return (
            <div>
                  <div className=' w-0 h-0 md:h-auto md:w-auto invisible md:visible'>
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
                              xl:inline-flex  xl:display-none 
                              xl:w-0  p-2  xl:p-0  xl:mr-0  
                              items-center justify-center 
                              antialiased focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg 
                              transition duration-100 ease-in-out transform  hover:scale-110  '
                                    >
                                          <HomeIcon width={35} height={35} />
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
                                    className='
                              xl:ml-auto ml-0 inline-flex items-center 
                              lg:h-16 lg:w-16 md:h-8 md:w-8 sm:w-5 sm:h-5 
                              focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg antialiased 
                              transition duration-100 ease-in-out transform  hover:scale-110 '
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                              >
                                    <SunIcon />

                              </button>
                        </nav>
                  </div>

                  <div className='md:invisible visible'>
                        <nav className='

                  flex items-center justify-start
                  bg-th-background space-x-6
                  md:px-8 px-2 py-4 shadow-lg'>
                              <Link href='/'>
                                    <a className='
                              xl:inline-flex  xl:display-none 
                              xl:w-0  p-2  xl:p-0  xl:mr-0  
                              items-center justify-center 
                              antialiased focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg 
                              transition duration-100 ease-in-out transform  hover:scale-110  '
                                    >
                                          <HomeIcon width={35} height={35} />
                                    </a>
                              </Link>
                              <Menu>
                                    <Menu.Button className="
                        flex space-x-4
                        justify-center items-center
                        lg:p-4 text-xl
                        text-center text-th-primary-dark 
                        bg-th-primary-medium rounded-md
                        shadow-md hover:shadow-lg
                        transition duration-100 ease-in-out 
                        transform hover:scale-110
                        ">
                                          <MenuIcon width={50} height={50} />
                                    </Menu.Button>

                                    <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                    >

                                          <Menu.Items className="
                              sm:p-2 rounded-md text-lg
                              absolute flex 
                              flex-col space-y-2
                              sm:left-24 sm:top-5 left-0 top-12
                              bg-opacity-50 bg-th-primary-light 
                              text-left sm:text-center text-th-primary-dark
                              z-50
                              
                              ">
                                                {listItems.map((listItem) =>
                                                      <Link key={listItem.id} href={`/` + listItem.link}>
                                                            <a className=' 
                                                            text-sm
                                                 rounded-md px-2
                                                 transition duration-200 ease-in-out 
                                                 hover:bg-th-primary-medium hover:cursor-pointer
                                                '>
                                                                  {listItem.text}
                                                            </a>
                                                      </Link>
                                                )}

                                          </Menu.Items>
                                    </Transition>
                              </Menu>
                              <button
                                    className='
                                    inline-flex items-center
                              focus:outline-none text-th-primary-light
                              hover:shadow-lg rounded-lg antialiased 
                              transition duration-100 ease-in-out transform  hover:scale-110 '
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                              >
                                    <SunIcon width={50} height={50} />

                              </button>
                        </nav>
                  </div>

            </div>
      );
};


export default Nav;



