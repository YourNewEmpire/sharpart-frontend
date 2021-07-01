import { GetStaticProps } from 'next';
import Mp4Card from '../../components/Cards/Mp4Card';
import ListCard from '../../components/Cards/ListCard';
import Heading from '../../components/Typography/Heading';
import { ArtistItem } from '../../interfaces/cards';
import ReactPlayer from 'react-player'
import PageLayout from "../../components/Layouts/PageLayout";

export default function Artists() {

  const cardItems: ArtistItem[] = [
    {
      anchorLink: '#stygian',
      img: 'https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=1.mp4',
      title: 'Stygian',
      body: 'Stygian designs animated and non-animated visual artwork   ',
      pageLink: "/artists/stygian"

    },
    {
      anchorLink: '#enso',
      img: 'https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=1.mp4',
      title: 'Enso',
      body: 'Enso writes musical art',
      pageLink: "/artists/enso"
    },
  ]


  return (
    <PageLayout>
      <Heading title="Current Artists" hScreen={false} />
      <ListCard title="Artists" body={cardItems} />
      <div>
        {cardItems.map((item, index) =>
          <div key={index} id={item.anchorLink} className="flex  flex-wrap items-center justify-center h-screen">
            <Mp4Card
              img={item.img}
              title={item.title}
              body={item.body}
              link={item.pageLink}
            />

          </div>
        )}
      </div>

      <div className="h-screen border-2 " ></div>

    </PageLayout>
  );
}

