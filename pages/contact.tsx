import { useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri'
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Layouts/Columns';
import copyToBoard from '../lib/helpers/copyToClipboard';

export default function Contact() {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [message, setMessage] = useState('')
      const [submitted, setSubmitted] = useState(false)

      const handleSubmit = (e) => {
            e.preventDefault()
            console.log('Sending')

            let data = {
                  name,
                  email,
                  message
            }

            fetch('/api/contactApi', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
            }).then((res) => {
                  console.log('Response received')
                  if (res.status === 200) {
                        console.log('Response succeeded!')
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
                        <form className=' flex flex-col space-y-4'>
                                    < label htmlFor='name'>Name</label>
                                    < input type='text' onChange={(e) => { setName(e.target.value) }} name='name'  />

                                    < label htmlFor='email'>Email</label>
                                    < input type='email' onChange={(e) => { setEmail(e.target.value) }} name='email'  />

                                    < label htmlFor='message'>Message</label>
                                    < input type='text' onChange={(e) => { setMessage(e.target.value) }} name='message'  />

                              < input type='submit' onClick={(e) => { handleSubmit(e) }} />
                        </form>
                  </PageLayout>
            </>
      );
}
