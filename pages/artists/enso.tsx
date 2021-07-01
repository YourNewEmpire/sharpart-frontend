import { GetStaticProps } from 'next';
import Heading from '../../components/Typography/Heading';


export default function Enso() {

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-20 ">
        <Heading title="Enso" hScreen={false} />
      
      </div>
    </>
  );
}

