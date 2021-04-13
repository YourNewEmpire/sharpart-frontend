import ImageCard from '../components/Cards/ImageCard';
import ListCard from '../components/Cards/ListCard';
import Heading from '../components/Heading';
import { ListItem } from '../interfaces/cards';

export default function Artists() {

  const cardItems: ListItem[] = [
    {
      link: '#stygian',
      name: 'Stygian',

    },
    {
      link: '#enso',
      name: 'Enso',

    },
  ]
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-20 ">
        <Heading title="Current Artists" />
        < ListCard title="Artists" body={cardItems} />
        <ImageCard
          img='https://images.unsplash.com/photo-1476041026529-411f6ae1de3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          title='the views'
          body='how beautiful'
        />
        <div id="stygian" className="flex items-center justify-center ">
          <ImageCard
            img='https://ipfs.io/ipfs/QmQckkYAkUTS4MeLrVeiRrhsPC8ngQLka6rVt9Uu8PChFp?filename=1.gif'
            title='Stygian'
            body='Stygian designs animated and non-animated visual artwork   '
          />
        </div>
        <div id="enso" className="flex items-center justify-center ">
          <ImageCard
            img='https://ipfs.io/ipfs/QmQckkYAkUTS4MeLrVeiRrhsPC8ngQLka6rVt9Uu8PChFp?filename=1.gif'
            title='Enso'
            body='Enso writes musical art '
          />
        </div>
      </div>
    </>
  );
}
