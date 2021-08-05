import { GetStaticPaths, GetStaticProps } from 'next';
import { GraphQLClient, gql } from "graphql-request";
import { CalendarIcon } from '@heroicons/react/outline'
import ReactAudioPlayer from 'react-audio-player';
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { IArtist } from '../../interfaces/pages'
import Heading from '../../components/Typography/Heading';
import PageLayout from '../../components/Layouts/PageLayout';

const client = new GraphQLClient(process.env.GRAPHCMS_URL);

export default function Artist({ artist }: { artist: IArtist }) {

      const updatedAt = new Date(artist.updatedAt).toDateString()
      const createdAt = new Date(artist.createdAt).toDateString()
      
      return (
            <>
                  <PageLayout>
                        <div className="grid grid-flow-col
                              grid-cols-6
                              justify-center items-center 
                        ">
                              <div className="rounded-full col-span-2 ">
                                    <div className="flex justify-center items-center ">
                                          <img src={artist.artistImage.url} alt="" />
                                    </div>
                              </div>

                              <div className='col-span-4'>
                                    <Heading title={artist.artistName} hScreen={false} fontSize='text-2xl sm:text-3xl lg:text-6xl'>

                                          <p className="text-center text-base sm:text-lg lg:text-2xl 
                                          text-th-primary-light  subpixel-antialiased                 
                                          max-w-xs md:max-w-xl lg:max-w-2xl break-words
                                    ">
                                                {artist.artistDesc}
                                          </p>
                                    </Heading>
                              </div>
                        </div>



                  </PageLayout>

                  <Heading title='WIP zone' hScreen={false} />
                  <p className='text-th-accent-moralis'>
                        Arrays of markdown posts are not working yet, so just one markdown field for now.
                        Also, the hyperlinks in the markdown arent working.
                  </p>
                  <article className='prose text-th-primary-light text-center bg-th-foreground border-2 border-red-500'>
                        <MDXRemote {...artist.posts} />
                  </article>

                  <article className='prose text-th-primary-light text-center bg-th-foreground border-2 border-blue-500'>
                        <MDXRemote {...artist.links} />

                  </article>
                  <PageLayout>
                        <div>
                              <Heading title="Artist NFTs" hScreen={false} />

                        
                        </div>
                  </PageLayout>


                  <div className='flex justify-center items-center
                  text-th-primary-light text-xs md:text-sm lg:text-lg
                  '>
                        <CalendarIcon className='w-5 h-5' />
                        <div className=' ml-2 lg:ml-4'>
                              <p>
                                    Updated At
                                    <span className='text-th-primary-medium'> {updatedAt}</span>
                              </p>
                        </div>
                  </div>

                  <div className='flex justify-center items-center
                  text-th-primary-light text-xs md:text-sm lg:text-lg
                  '>
                        <CalendarIcon className='w-5 h-5' />
                        <div className=' ml-2 lg:ml-4'>
                              <p>
                                    Created At
                                    <span className='text-th-primary-medium'> {createdAt}</span>
                              </p>
                        </div>
                  </div>
            </>

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
            updatedAt
            artistDesc
            artistLinks
            artistPosts
            artistMarkdown
            artistImage {
                  url
            }
           
          }
        }
      `;

      const data: { artist: IArtist | null } = await client.request(query, { slug });

      if (!data.artist) {
            return {
                  notFound: true,
            };
      }

      const posts = await serialize(data.artist.artistMarkdown)
      const links = await serialize(data.artist.artistLinks)

      return {
            props: { artist: { ...data.artist, posts, links } },
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