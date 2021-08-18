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
import NftCardCopy from "../../components/Cards/NftCardCopy";
//*define new gql client for cms.
const client = new GraphQLClient(process.env.GRAPHCMS_URL);

const NFT_CONTRACT_ADDRESS = '0xbb21662c2ba070db869c94d475f78b9fa7273b0e'
const API_KEY = process.env.MATIC_API_KEY;
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`

//?  1 - This page starts at the bottom, L46, with 'getStaticPaths', finding the amount of artists to make paths for.
//?  2 - Then 'getStaticProps'  will query for artist data for each of those paths(artists)
//?  3 - render the Page with react function 'Artist'

export default function Artist({ artist }: { artist: IArtist }) {

      const updatedAt = new Date(artist.updatedAt).toDateString()
      const createdAt = new Date(artist.createdAt).toDateString()

      // todo - Read the nft metadata format from string, to render different components depending on the file type
      console.log(artist.nftMetadata)
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

                  <PageLayout>
                              <Heading title="Artist NFTs" hScreen={false} />

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

      //?
      const addressArray = data.artist.nftAddress;

      //? array of objects for token metadata for mapping in frontend.
      //? number is for the for loop in pushURIs.
      let nftMetadata = []
      let i: number = null

      //* New web3 instance with matic provider
      const web3 = new Web3(new Web3.providers.HttpProvider(MATIC))

      //* Parse ABI
      const contractPath = serverPath('./public/GameItem.json')
      var parsed = JSON.parse(fs.readFileSync(contractPath.toString(), 'utf-8'));
      var abi = parsed.abi;

      //* New contract from instance, passing the abi and address
      const nftContract = new web3.eth.Contract(
            abi,
            NFT_CONTRACT_ADDRESS,
      );

      //todo - put json metadata in the cms?
      //* Take the number and concatenate with the json metadata
      async function pushURIs(total: number) {
            for (i = 1; i <= total; i++) {
                  await nftContract.methods.tokenURI(i).call().then(res => {
                        //todo - add these hashes to graph cms 
                        axios.get(`https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/${i}.json`).then(obj => {
                              console.log(obj.data)
                              nftMetadata.push(obj.data)
                        }).catch(err => {
                              console.log(err)
                        })
                  }
                  )
            }
      };

      //* Call for the totalSupply (number) and pass it to the async function
      await nftContract.methods.totalSupply().call().then(res => {
            pushURIs(res)
      })
            .catch(error => console.log(error))

      console.log(nftMetadata.length)
      return {
            props: { artist: { ...data.artist, posts, links, nftMetadata } },
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