import Mp4Card from '../../components/Cards/Mp4Card';
import ListCard from '../../components/Cards/ListCard';
import Heading from '../../components/Typography/Heading';
import ReactPlayer from 'react-player'
import PageLayout from "../../components/Layouts/PageLayout";
import ImageLinkCard from '../../components/Cards/ImageLinkCard'
import {cardItems} from '../../lib/artists/artistLib'
export default function Artists() {

  


  return (
    <PageLayout>
      <Heading title="Current Artists" hScreen={false} />
      <ListCard title="Artists" body={cardItems} />
      <div>
        {cardItems.map((item, index) =>
          <div key={index} id={item.anchorLink} className="flex  items-center justify-center h-screen">
            {item.isImage === false &&
              <Mp4Card
                img={item.img}
                title={item.title}
                body={item.body}
                link={item.pageLink}
              />
            }
            {item.isImage === true &&
              <ImageLinkCard
                title={item.title}
                img={item.img}
                body={item.body}
                link={item.pageLink}
              />
            }
          </div>
        )}
      </div>

      <div className="h-screen border-2 " ></div>

    </PageLayout>
  );
}

