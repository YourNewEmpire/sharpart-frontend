import { useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri'
import copyToBoard from '../lib/helpers/copyToClipboard';
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Layouts/Columns';
import NodeCard from '../components/Cards/NodeCard';
import { toast, Zoom } from 'react-toastify';
import validateEmail from '../lib/helpers/validateEmail'

export default function Contact() {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [message, setMessage] = useState('')
      const [submitted, setSubmitted] = useState(false)

      const handleSubmit = (e) => {
            e.preventDefault()
            let data = {
                  name,
                  email,
                  message
            }
            if (!name || !email || !message) {
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
            if (!validateEmail(email)) {
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

            //todo - I must validate the email. on server and client
            fetch('/api/contactApi', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
            }).then((res) => {
                  if (res.status === 200) {
                        toast.success('Success:' + res, {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                        setSubmitted(true)
                        setName('')
                        setEmail('')
                        setMessage('')
                  }
                  else {
                        toast.info('failed with:' + res, {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                        setSubmitted(true)
                        setName('')
                        setEmail('')
                        setMessage('')
                  }
            })
      }

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
                        <div className='py-24 '>
                              <NodeCard>
                                    <form className=' flex flex-col space-y-4  text-center text-sm sm:text-base md:text-xl lg:text-2xl '>
                                          < label className='text-th-primary-light' htmlFor='name'>Name</label>
                                          < input
                                                className='focus:outline-none 
                                          text-th-primary-dark focus:bg-th-accent-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 '
                                                type='text' onChange={(e) => { setName(e.target.value) }} name='name' />

                                          < label className='text-th-primary-light' htmlFor='email'>Email</label>
                                          < input
                                                className='focus:outline-none 
                                          text-th-primary-dark focus:bg-th-accent-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 '
                                                type='email' onChange={(e) => { setEmail(e.target.value) }} name='email' />

                                          < label className='text-th-primary-light' htmlFor='message'>Message</label>
                                          < input
                                                className='focus:outline-none 
                                          text-th-primary-dark focus:bg-th-accent-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 '
                                                type='text' onChange={(e) => { setMessage(e.target.value) }} name='message' />

                                          <button type='submit' onClick={(e) => { handleSubmit(e) }}
                                                className='
                                    bg-th-primary-light
                                    hover:bg-th-accent-light
                                    text-th-primary-dark
                                    shadow-md hover:shadow-lg rounded-lg 
                                    transition duration-300 ease-in-out
                                    focus:outline-none 
                                    focus:ring-2 ring-th-accent-light ' >
                                                Submit
                                          </button>
                                    </form>
                              </NodeCard>
                        </div>
                  </PageLayout>
            </>
      );
}
