import { GetStaticProps } from 'next';
import ImageLinkCard from '../../components/Cards/ImageLinkCard';
import ListCard from '../../components/Cards/ListCard';
import Heading from '../../components/Heading';
import { ArtistItem } from '../../interfaces/cards';


export default function Artists({ data }) {

  const cardItems: ArtistItem[] = [
    {
      anchorLink: '#stygian',
      img: 'https://ipfs.io/ipfs/QmQckkYAkUTS4MeLrVeiRrhsPC8ngQLka6rVt9Uu8PChFp?filename=1.gif',
      title: 'Stygian',
      body: 'Stygian designs animated and non-animated visual artwork   ',
      pageLink: "/artists/stygian"

    },
    {
      anchorLink: '#enso',
      img: 'https://ipfs.io/ipfs/QmQckkYAkUTS4MeLrVeiRrhsPC8ngQLka6rVt9Uu8PChFp?filename=1.gif',
      title: 'Enso',
      body: 'Enso writes musical art',
      pageLink: "/artists/enso"
    },
  ]
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-20 ">
        <Heading title="Current Artists" />
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
        <div id="stygian" className="flex  flex-wrap items-center justify-center h-screen">
          <ImageLinkCard
            img='https://ipfs.io/ipfs/QmQckkYAkUTS4MeLrVeiRrhsPC8ngQLka6rVt9Uu8PChFp?filename=1.gif'
            title='Stygian'
            body='Stygian designs animated and non-animated visual artwork   '
            link="/artists/stygian"
          />
        </div>
        <div id="enso" className="flex  flex-wrap   items-center justify-center  h-screen">
          <ImageLinkCard
            img='https://ipfs.io/ipfs/QmQckkYAkUTS4MeLrVeiRrhsPC8ngQLka6rVt9Uu8PChFp?filename=1.gif'
            title='Enso'
            body='Enso writes musical art '
            link="/artists/enso"
          />
        </div>
      </div>
    </>
  );
}

