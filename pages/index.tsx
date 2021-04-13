import CardGroup from '../components/Cards/CardGroup'
import ImageCard from '../components/Cards/ImageCard';
import Heading from '../components/Heading';
import { CardProps } from "../interfaces/cards";

export default function Home() {

  const cardItems: CardProps[] = [
    {
      img: 'https://images.unsplash.com/photo-1476041026529-411f6ae1de3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'the views',
      body: 'how beautiful'
    },
    {
      img: 'https://images.unsplash.com/photo-1476041026529-411f6ae1de3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'the views',
      body: 'how beautiful'
    },
    {
      img: 'https://images.unsplash.com/photo-1476041026529-411f6ae1de3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      title: 'the views',
      body: 'how beautiful'
    },
  ]

  return (
    <>
      <div id="div1" className="flex flex-col items-center justify-center ">
        <Heading title="This is SharpArt" />
        <ImageCard
          img='https://images.unsplash.com/photo-1476041026529-411f6ae1de3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          title='the views'
          body='how beautiful'
        />
      </div>

      <Heading title="This is SharpArt" />      
      
        <Heading title="This is SharpArt" />

    </>
  );

}
