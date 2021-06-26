import ScreenHeading from '../components/Typography/ScreenHeading';
import { GetServerSideProps } from 'next'
import { GasData } from '../interfaces/homepage/gasData';
import SimpleCard from '../components/Cards/SimpleCard';
import { HomeProps } from '../interfaces/homepage';



export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://gasstation-mainnet.matic.network')
  const data = await res.json()
  console.log('gas data log:', data)

  if (!data) {
    return null
  }
  return {
    props: {
      data,
    },
  }
}


export default function Home({ data }: HomeProps) {


  return (
    <>
      {data &&
        <div className="grid grid-cols-4  gap-4 md:gap-8 lg:gap-12">
          <SimpleCard title="Safe Low gas price" body={data.safeLow.toString() + ' ' + 'Gwei'} />
          <SimpleCard title="Standard gas price" body={data.standard.toString()+ ' ' + 'Gwei'} />
          <SimpleCard title="Fast gas price" body={data.fast.toString() + ' ' + 'Gwei'} />
          <SimpleCard title="Fastest gas price" body={data.fastest.toString() + ' ' + 'Gwei'} />
        </div>
      }
      {!data &&
        <div className="m-4 md:m-10 lg:m-16">
          <h1 className="text-center text-th-primary-light">No gas data was received</h1>
        </div>
      }
      <div id="div1" className="flex flex-col items-center justify-center ">
        <ScreenHeading title="This is SharpArt" >
          <p className="text-center text-base sm:text-xl lg:text-2xl text-th-primary-light text-shadow-md subpixel-antialiased ">
            The bridge between talented artists, and the secret of digital asset demand.
          </p>
        </ScreenHeading>
      </div>

    </>
  );
}
