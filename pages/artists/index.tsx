import { GetStaticProps } from 'next';
import Mp4Card from '../../components/Cards/Mp4Card';
import ListCard from '../../components/Cards/ListCard';
import Heading from '../../components/Typography/Heading';
import { ArtistItem } from '../../interfaces/cards';
import ReactPlayer from 'react-player'
import PageLayout from "../../components/Layouts/PageLayout";
import ImageLinkCard from '../../components/Cards/ImageLinkCard'
export default function Artists() {

  const cardItems: ArtistItem[] = [
    {
      anchorLink: '#stygian',
      img: 'https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=1.mp4',
      title: 'Stygian',
      body: 'Stygian designs animated and non-animated visual artwork   ',
      pageLink: "/artists/stygian",
      isImage: false
    },
    {
      anchorLink: '#enso',
      img: 'https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=1.mp4',
      title: 'Enso',
      body: 'Enso writes musical art',
      pageLink: "/artists/enso",
      isImage: false
    },
    {
      anchorLink: '#emeraldcitizen',
      img: 'https://ipfs.io/ipfs/QmdpLLWDfgXJWvJyqydRwP6Dw8pFwrgn2ziZPAHosjWfCR',
      title: 'Emerald Citizen',
      body: 'Emerald Citizen writes lo-fi music',
      pageLink: "/artists/emeraldcitizen",
      isImage: true

    },
  ]


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

