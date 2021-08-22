import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from "graphql-request";
import ImageLinkCard from '../../components/Cards/ImageLinkCard';
import PageLayout from "../../components/Layouts/PageLayout";
import { IArtist } from '../../interfaces/pages';


export const getServerSideProps: GetServerSideProps = async () => {
      const client = new GraphQLClient(process.env.GRAPHCMS_URL);
      const query = gql`
      query MyQuery { 
            artists(orderBy: createdAt_ASC) {
                  artistName
                  artistSlug
                  artistDesc
                  artistImage{
                        url
                  }
            }
      }
      `;
      const data = await client.request(query);

      return {
            props: { artists: data.artists },
      };
};

export default function Artists({ artists }: { artists: IArtist[] }) {

      return (
            <PageLayout>
                  <div className=" 
            grid grid-cols-2 lg:grid-cols-3
            gap-4 md:gap-8 lg:gap-12
            pb-36 items-center justify-center
            ">
                        {artists.map((artist) =>
                              <div key={artist.artistSlug}>
                                    <ImageLinkCard
                                          img={artist.artistImage.url}
                                          title={artist.artistName}
                                          body={artist.artistDesc}
                                          link={'/artists/' + artist.artistSlug}
                                    />
                              </div>
                        )}
                  </div>
            </PageLayout>
      );
}