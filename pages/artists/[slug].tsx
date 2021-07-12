import { GetStaticPaths, GetStaticProps } from 'next';
import { GraphQLClient, gql } from "graphql-request";
import { IArtist } from '../../interfaces/pages'
import Heading from '../../components/Typography/Heading';
import PageLayout from '../../components/Layouts/PageLayout';

const client = new GraphQLClient(process.env.GRAPHCMS_URL);

export default function Artist({ artist }: { artist: IArtist }) {
      return (
            <PageLayout>

                  <div className="grid grid-flow-col
                  grid-cols-6
                   justify-center items-center 
                   ">
                        <div className=" rounded-full  col-span-2 ">
                              <div className="flex justify-center items-center ">
                                    <img src={'/' + artist.artistName.toLowerCase() + '.png'} alt="" />
                              </div>
                        </div>

                        <div className='  col-span-4  '>
                              <Heading title={artist.artistName} hScreen={false} fontSize='text-2xl sm:text-3xl lg:text-6xl'>

                                    <p className="text-center text-base sm:text-lg lg:text-2xl 
                                          text-th-primary-light text-shadow-sm subpixel-antialiased                 
                                          max-w-xs md:max-w-xl lg:max-w-2xl break-words
                                    ">
                                          {artist.artistDesc}
                                    </p>
                              </Heading>
                        </div>

                  </div>
            </PageLayout >
      )
}

//* Secondly, get info about each path.
export const getStaticProps: GetStaticProps = async ({ params }) => {
      const slug = params.slug as string;

      const query = gql`
        query Artist($slug: String!) {
          artist(where: { artistSlug: $slug }) {
            artistName
            artistSlug
            createdAt
            artistDesc
          }
        }
      `;

      const data: { artist: IArtist | null } = await client.request(query, { slug });

      if (!data.artist) {
            return {
                  notFound: true,
            };
      }

      return {
            props: { artist: { ...data.artist } },
            revalidate: 60 * 60,
      };
};


//* Firstly, make a path for each artist
export const getStaticPaths: GetStaticPaths = async () => {
      const query = gql`
        query Artists {
          artists {
            artistSlug
          }
        }
      `;
      const data = await client.request(query);

      return {
            paths: data.artists.map((artist) => ({ params: { slug: artist.artistSlug } })),
            fallback: "blocking",
      };
};