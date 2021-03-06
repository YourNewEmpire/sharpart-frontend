import { useState } from 'react';
import { toast, Zoom } from 'react-toastify';
import { FaDiscord } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri'
import copyToBoard from '../lib/helpers/copyToClipboard';
import validateEmail from '../lib/helpers/validateEmail'
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Layouts/Columns';
import NodeCard from '../components/Cards/NodeCard';

export default function Contact() {
      //todo - Create useForm hook?
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            message: '',
      })

      const handleChange = (e) => {
            const newFormData = {
                  ...formData,
                  [e.target.name]: e.target.value
            };
            setFormData(newFormData);
      }

      const handleSubmit = (e) => {
            e.preventDefault()
            //* Validate
            if (!formData.email || !formData.message || !formData.name) {
                  return toast.error('missing creds', {
                        position: "top-right",
                        autoClose: 3000,
                        transition: Zoom,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                  })
            }
            else if (!validateEmail(formData.email)) {
                  return toast.error('bad email', {
                        position: "top-right",
                        autoClose: 3000,
                        transition: Zoom,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                  })
            }
            //* Post api
            fetch('/api/contactApi', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
            }).then((res) => {
                  if (res.status === 200) {
                        toast.success('Success:' + res.body, {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                        setFormData({
                              name: '',
                              email: '',
                              message: '',
                        })
                  }
                  else {
                        toast.info('failed with:' + res.body, {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                  }
            })
      }

      return (
            <>
                  <PageLayout>
                        <Heading title='Get In Contact'  >
                              <Columns isAuto>
                                    <a href='https://discord.gg/ZfpJkYSJKJ' target='_blank'>
                                          <button
                                                className=' 
                                                      items-center justify-center 
                                                      antialiased focus:outline-none 
                                                      text-th-primary-light
                                                      hover:shadow-lg rounded-lg 
                                                      transition duration-300 
                                                      ease-in-out transform 
                                                      hover:scale-125'
                                          >
                                                <FaDiscord size={100} />
                                          </button>
                                    </a>
                                    <button
                                          onClick={() => copyToBoard('sharpart37@gmail.com')}
                                          className='
                                                      items-center justify-center 
                                                      antialiased focus:outline-none 
                                                      text-th-primary-light
                                                      hover:shadow-lg rounded-lg 
                                                      transition duration-300 
                                                      ease-in-out transform 
                                                      hover:scale-125'
                                    >
                                          <RiMailOpenFill size={100} />
                                    </button>
                              </Columns>
                        </Heading>


                        <div className='py-24'>
                              <NodeCard>
                                    <form className='flex flex-col space-y-4  text-center text-sm sm:text-base md:text-xl lg:text-2xl '>
                                          < label className='text-th-primary-light' htmlFor='name'>Name</label>
                                          < input
                                                className='
                                                focus:outline-none 
                                                text-th-primary-dark focus:bg-th-accent-light 
                                                transition-colors duration-300 
                                                ease-in-out bg-opacity-25 p-2'
                                                type='text' onChange={(e) => { handleChange(e) }} name='name' />

                                          < label className='text-th-primary-light' htmlFor='email'>Email</label>
                                          < input
                                                className='
                                                focus:outline-none 
                                                text-th-primary-dark focus:bg-th-accent-light 
                                                transition-colors duration-300 
                                                ease-in-out bg-opacity-25 p-2'
                                                type='email' onChange={(e) => { handleChange(e) }} name='email' />

                                          < label className='text-th-primary-light' htmlFor='message'>Message</label>
                                          < textarea
                                                className='
                                                focus:outline-none 
                                                text-th-primary-dark focus:bg-th-accent-light 
                                                transition-colors duration-300 
                                                ease-in-out bg-opacity-25 p-2'
                                                 onChange={(e) => { handleChange(e) }} name='message' />

                                          <button type='submit' onClick={(e) => { handleSubmit(e) }}
                                                className='
                                                bg-th-primary-light
                                                hover:bg-th-accent-light
                                                text-th-primary-dark
                                                shadow-md hover:shadow-lg rounded-lg 
                                                transition duration-300 ease-in-out
                                                focus:outline-none 
                                                focus:ring-2 ring-th-accent-light' >
                                                Submit
                                          </button>
                                    </form>
                              </NodeCard>
                        </div>
                  </PageLayout>
            </>
      );
}
