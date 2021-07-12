import Image from 'next/image'
import stygian from '../../public/stygian.png'
import PageLayout from '../../components/Layouts/PageLayout';
import Heading from '../../components/Typography/Heading';


export default function Stygian() {
      return (
            <PageLayout styles=" 
            flex flex-col space-y-20
            justify-center items-center rounded-md
            p-2 md:p-4 lg:p-8 m-2
            bg-th-foreground shadow-lg
            ">

                  <div className="grid   grid-cols-5 justify-center items-center ">


                        <div className=" rounded-full col-span-5 md:col-span-2 lg:col-span-2">
                              <Image
                                    src={stygian}
                                    className=""
                                    width={500}
                                    height={500}
                              />
                        </div>

                        <div className='  md:col-span-3 lg:col-span-3'>
                              <Heading title="Stygian" hScreen={false} >

                                    <p className="text-center text-base sm:text-lg lg:text-2xl 
                                          text-th-primary-light text-shadow-sm subpixel-antialiased                 
                                          max-w-xs md:max-w-xl lg:max-w-2xl break-words
                                    ">
                                          The bridge between talented artists, and the secret of digital asset demand.
                                          The bridge between talented artists, and the secret of digital asset demand.
                                          The bridge between talented artists, and the secret of digital asset demand.
                                          The bridge between talented artists, and the secret of digital asset demand.

                                    </p>
                              </Heading>


                        </div>


                  </div>


            </PageLayout >


      );
}

