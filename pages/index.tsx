import Heading from '../components/Typography/Heading';
import { GetServerSideProps } from 'next'
import SimpleCard from '../components/Cards/SimpleCard';
import { useEffect } from "react";
import { HomeProps } from '../interfaces/pages';
import { useInterval } from '../hooks/useInterval';
import { useDispatch, useSelector } from 'react-redux';
import { selectGas, setGasThunk } from '../lib/slices/gaspriceSlice';




export default function Home() {

  const dispatch = useDispatch()
  const gasData = useSelector(selectGas)

  const fetchGas = () => {
    dispatch(setGasThunk())
  }
  useEffect(() => {
    fetchGas()
  }, [])
  useInterval(fetchGas, 10000)

  return (
    <>
      {gasData &&
        <div className="grid grid-cols-4 gap-4 md:gap-8 lg:gap-12 m-4 md:m-10 lg:m-16">
          <SimpleCard title="Safe Low gas price" body={gasData.safeLow.toString() + ' ' + 'Gwei'} />
          <SimpleCard title="Standard gas price" body={gasData.standard.toString() + ' ' + 'Gwei'} />
          <SimpleCard title="Fast gas price" body={gasData.fast.toString() + ' ' + 'Gwei'} />
          <SimpleCard title="Fastest gas price" body={gasData.fastest.toString() + ' ' + 'Gwei'} />
        </div>
      }
      {!gasData &&
        <div className="m-4 md:m-10 lg:m-16">
          <h1 className="text-center text-th-primary-light">No gas data was received</h1>
        </div>
      }

      <div id="div1" className="flex flex-col items-center justify-center ">
        <Heading title="This is SharpArt" hScreen={true}>
          <p className="text-center text-base sm:text-xl lg:text-2xl 
          text-th-primary-light text-shadow-md subpixel-antialiased 
          ">
            The bridge between talented artists, and the secret of digital asset demand.
          </p>
        </Heading>
      </div>

    </>
  );
}
