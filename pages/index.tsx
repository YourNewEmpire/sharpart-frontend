import CardGroup from '../components/Cards/CardGroup'
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
      <div id="div1" className="flex items-center justify-center py-64 px-24">
        <h1 className="text-6xl text-darkblue-100">This Is SharpArt</h1>
      </div>
      <CardGroup items={cardItems} />
      <div id="div1" className="flex items-center justify-center py-64 px-24">
        <h1 className="text-6xl text-darkblue-100">This Is SharpArt</h1>
      </div><div id="div1" className="flex items-center justify-center py-64 px-24">
        <h1 className="text-6xl text-darkblue-100">This Is SharpArt</h1>
      </div><div id="div1" className="flex items-center justify-center py-64 px-24">
        <h1 className="text-6xl text-darkblue-100">This Is SharpArt</h1>
      </div>

    </>
  );

}
