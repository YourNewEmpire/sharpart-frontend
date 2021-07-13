import { GetServerSideProps } from 'next';
import ImageLinkCard from '../../components/Cards/ImageLinkCard';
import PageLayout from "../../components/Layouts/PageLayout";
import { GraphQLClient, gql } from "graphql-request";


export const getServerSideProps: GetServerSideProps = async () => {
      const client = new GraphQLClient(process.env.GRAPHCMS_URL);
      const query = gql`
      query MyQuery { 
            artists(orderBy: createdAt_ASC) {
            artistName
            artistSlug
            artistDesc
            }
      }
      `;
      const data = await client.request(query);

      return {
            props: { artists: data.artists },
      };
};

//*map the artists from graph cms
// todo - Use Columns comp?
export default function Artists({ artists }) {
      console.log(artists)
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
                                          img={'/' + artist.artistName.toLowerCase() + '.png'}
                                          title={artist.artistName}
                                          body={artist.artistDesc}
                                          link={'/artists/' +artist.artistSlug}
                                    />
                              </div>
                        )}
                  </div>
            </PageLayout >
      );
}

