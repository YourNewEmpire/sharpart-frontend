import { GetStaticPaths, GetStaticProps } from 'next';
import { GraphQLClient, gql } from "graphql-request";
import { CalendarIcon } from '@heroicons/react/outline'
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { IArtist, NftMetadata } from '../../interfaces/pages'
import Heading from '../../components/Typography/Heading';
import PageLayout from '../../components/Layouts/PageLayout';
import Web3 from 'web3';
import fs from 'fs'
import serverPath from '../../lib/helpers/serverPath';
import axios from 'axios';
import NftCard from '../../components/Cards/NftCard';
import ReactAudioPlayer from 'react-audio-player';

//*define new gql client for cms.
const client = new GraphQLClient(process.env.GRAPHCMS_URL);


//todo - hard coded for now but i should be getting this from cms
const API_KEY = process.env.MATIC_API_KEY;
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`

//?  1 - This page starts at the bottom, L46, with 'getStaticPaths', finding the amount of artists to make paths for.
//?  2 - Then 'getStaticProps'  will query for artist data for each of those paths(artists)
//?  3 - render the Page with react function 'Artist'

export default function Artist({ artist }: { artist: IArtist }) {
      const updatedAt = new Date(artist.updatedAt).toDateString()
      const createdAt = new Date(artist.createdAt).toDateString()


      //* array of nfts for testing

      return (
            <PageLayout>
                  <PageLayout>
                        <div className="grid grid-flow-col
                              grid-cols-6
                              justify-center items-center 
                        ">
                              <div className=" col-span-2 ">
                                    <div className="flex justify-center items-center ">
                                          <img src={artist.artistImage.url} alt="" />
                                    </div>
                              </div>

                              <div className='col-span-4'>
                                    <Heading title={artist.artistName} hScreen={false} fontSize='text-2xl sm:text-3xl lg:text-6xl'>

                                          <p className="text-center text-base sm:text-lg lg:text-2xl 
                                          text-th-primary-light subpixel-antialiased                 
                                          max-w-xs md:max-w-xl lg:max-w-2xl break-words
                                    ">
                                                {artist.artistDesc}
                                          </p>
                                    </Heading>
                              </div>
                        </div>
                  </PageLayout>

                  <PageLayout>
                        <Heading title="Artist NFTs" hScreen={false} />
                        <div className='grid grid-cols-3 gap-2 sm:gap-4 md:gap-14'>
                              {artist.nftMetadata? artist.nftMetadata.map((item, index) =>
                                    <div className='' key={index}>
                                          <NftCard nft={item}  />
                                    </div>
                              ):
                                    <PageLayout>
                                          <h1 className='text-th-primary-light'>Error</h1>
                                          <p className='text-th-primary-light'>NFTs were not found from server side</p>
                                    </PageLayout>
                              }
                        </div>
                  </PageLayout>

                  <PageLayout>
                        <Heading title='Artist Posts' hScreen={false} />
                        <p className='text-th-accent-moralis'>
                              Arrays of markdown posts are not working yet, so just one markdown field for now.
                        </p>
                        {artist.artistMarkdown !== null ?
                              <article className='prose text-th-primary-light text-center bg-th-foreground border-2 p-4'>
                                    <MDXRemote {...artist.posts} />
                              </article>
                              :
                              <p className="text-center text-base sm:text-lg lg:text-2xl 
                              text-th-primary-light  subpixel-antialiased                 
                              max-w-xs md:max-w-xl lg:max-w-2xl break-words
                              ">
                                    No posts yet
                              </p>
                        }


                  </PageLayout>

                  <PageLayout>
                        <Heading title='Artist Links' hScreen={false} />
                        {artist.artistLinks !== null ?
                              <article className='prose text-th-primary-light text-center bg-th-foreground border-2 p-4 '>
                                    <MDXRemote {...artist.links} />
                              </article>
                              :
                              <p className="text-center text-base sm:text-lg lg:text-2xl 
                        text-th-primary-light  subpixel-antialiased                 
                        max-w-xs md:max-w-xl lg:max-w-2xl break-words
                        ">
                                    No links yet
                              </p>
                        }
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
            </PageLayout>

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
            nftAddress
           
          }
        }
      `;

      //* fetch/serialize content from graphcms.
      const data: { artist: IArtist | null } = await client.request(query, { slug });

      if (!data.artist) {
            return {
                  notFound: true,
            };
      }

      //? serialize the markdown. splitted for the frontend arrangement
      const posts = await serialize(data.artist.artistMarkdown);
      const links = await serialize(data.artist.artistLinks);


      //todo - Consider using moralis web3 api for contract fetches as oppose to my own code.
      //? Get the nft contract address array from cms
      const addressArray: string[] = data.artist.nftAddress;

      //? array of objects for token metadata for mapping in frontend.
      //? number is for the for loop in pushURIs.
      let nftMetadata: NftMetadata[] = []
      let i: number = null
      //* New web3 instance with matic provider
      const web3 = new Web3(new Web3.providers.HttpProvider(MATIC))

      //* Validate contract address
      const isAddress = Web3.utils.isAddress(addressArray[0])
      //* Parse ABI
      //todo - perhaps add abi to cms
      const contractPath = serverPath('./public/GameItem.json')
      var parsed = JSON.parse(fs.readFileSync(contractPath.toString(), 'utf-8'));
      var abi = parsed.abi;

      //* If the contract address is not valid, return props now excluding nftmetadata
      if(!isAddress) {
            return {
                  props: { artist: { ...data.artist, posts, links } },
                  revalidate: 60 * 60,
            }
      }

      //* New contract from instance, passing the abi and address
      //todo - Map address' if there are multiple
      const nftContract = isAddress ? new web3.eth.Contract(
            abi,
            addressArray[0],
      ) : null;


      const totalSupply: number = await nftContract.methods.totalSupply().call();

      //* Take the number and concatenate with the json metadata


      //* If the CMS didn't return a valid address, dont call with web3. Return a failed obj instead. Edge case
      if (nftContract == null) {
            return {
                  props: { artist: { ...data.artist, posts, links } },
                  revalidate: 60 * 60,
            }
      }
      
      //* Call blockchain for each token ID and axios.get each json metadata link
      else {
            for (i = 1; i <= totalSupply; i++) {
                  await nftContract.methods.tokenURI(i).call()
                        .then(async (res) => {
                              await axios.get(res).then(obj => {
                                    nftMetadata.push(obj.data)
                              }).catch(err => {
                              
                                    return err
                              })
                        })
                        .catch((err) => {
                              
                              return err
                        })
            } 
      }

      //* Edge case if fetches dont work but nftContract was not null
      if(nftMetadata.length !== 0) return {

            props: { artist: { ...data.artist, posts, links, nftMetadata } },
            revalidate: 60 * 60,
      };
      else return {
            props: { artist: { ...data.artist, posts, links } },
            revalidate: 60 * 60,
            
      }

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