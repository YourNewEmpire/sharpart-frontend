import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArrowDownIcon } from '@heroicons/react/solid'
import PageLayout from './Layouts/PageLayout'



export default function Dropdown({ title, options, clickHandler }) {

      return (
            <PageLayout styles='relative flex flex-col space-y-12
            justify-center items-center
            p-2 md:p-4 lg:p-6 webkit-antialiased'>
                  <Menu>
                        <Menu.Button className="
                        flex flex-row space-x-2
                        justify-center items-center
                        lg:p-4 text-lg
                        text-center text-th-primary-light 
                        bg-th-primary-medium rounded-md
                        shadow-md hover:shadow-lg
                        transition duration-200 ease-in-out 
                        hover:text-th-primary-dark
                        ">
                              <p>
                                    {title}
                              </p>
                              <ArrowDownIcon width={25} height={25} />
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
                              p-2 rounded-md
                              absolute flex flex-col top-10 
                              bg-opacity-50 bg-th-primary-light 
                              text-center text-th-primary-dark
                              text-xl
                              ">
                                    {options.map((item, index) =>
                                          <Menu.Item key={index}>
                                                <button
                                                      onClick={() => clickHandler(item)}
                                                      className='
                                                      rounded-md px-2
                                                      transition duration-200 ease-in-out 
                                                      hover:bg-th-primary-medium hover:cursor-pointer'
                                                >
                                                      {item}
                                                </button>
                                          </Menu.Item>
                                    )}

                              </Menu.Items>
                        </Transition>
                  </Menu>
            </PageLayout>
      )
}