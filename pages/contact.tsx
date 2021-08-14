import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri'
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Layouts/Columns';
import copyToBoard from '../lib/helpers/copyToClipboard';

export default function Contact() {
      return (
            <>
                  <PageLayout>
                        <Heading title='Get In Contact' hScreen={false} >
                              <Columns isAuto>
                                    <a href='https://discord.gg/ZfpJkYSJKJ' target='_blank'>
                                          <button
                                                className=' 
                                                      items-center justify-center 
                                                      antialiased focus:outline-none 
                                                      text-th-primary-light
                                                      hover:shadow-lg rounded-lg 
                                                      transition duration-300 ease-in-out transform  
                                                      hover:scale-125'
                                          >
                                                <FaDiscord size={100} />
                                          </button>
                                    </a>
                                          <button
                                                onClick={() => copyToBoard('sharpart37@gmail.com')}
                                                className=' p-0
                                                      items-center justify-center 
                                                      antialiased focus:outline-none 
                                                      text-th-primary-light
                                                      hover:shadow-lg rounded-lg 
                                                      transition duration-300 
                                                      ease-in-out transform  hover:scale-125'
                                          >
                                                <RiMailOpenFill size={100} />
                                          </button>
                              </Columns>
                        </Heading>
                  </PageLayout>
            </>
      );
}
