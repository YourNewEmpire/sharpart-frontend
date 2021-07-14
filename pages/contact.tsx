<<<<<<< Updated upstream
import {FaDiscord} from 'react-icons/fa' ;

// todo - Add discord and email links.
export default function Contact() {
  return (
    <>
      <div id="div1" className="flex items-center justify-center py-64 px-24">
        <h1 className="text-6xl text-darkblue-100">Get in contact</h1>
        <FaDiscord/>
      </div>
=======
import Head from 'next/head'
import { FaDiscord } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi'
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import Columns from '../components/Columns';

/*
todo - Add links for mail and discord. 
todo - The mail button copies the mail address.
todo - The discord button can open discord (classic).

*/
export default function Contact() {
  return (
    <>
      <PageLayout>
        <Heading title='Get In Contact' hScreen={false} >
          <Columns cols='2'>
            <FaDiscord />
            <FiMail />
          </Columns>
        </Heading>
      </PageLayout>
>>>>>>> Stashed changes
    </>
  );
}
