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
testing123
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

    </>
  );
}
