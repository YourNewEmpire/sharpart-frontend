import { GetStaticProps } from 'next';
import ImageLinkCard from '../../components/Cards/ImageLinkCard';
import ListCard from '../../components/Cards/ListCard';
import ScreenHeading from '../../components/Typography/ScreenHeading';
import { ArtistItem } from '../../interfaces/cards';


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
    <>
      <div className="flex flex-col items-center justify-center space-y-20 ">
        <ScreenHeading title="Current Artists" />
        < ListCard title="Artists" body={cardItems} />
        {cardItems.map((item, index) =>
          <div key={index} id={item.anchorLink} className="flex  flex-wrap items-center justify-center h-screen">
            <ImageLinkCard
              img={item.img}
              title={item.title}
              body={item.body}
              link={item.pageLink}
            />
          </div>
        )}
        <div className="h-screen border-2 " ></div>
      
      </div>
    </>
  );
}

