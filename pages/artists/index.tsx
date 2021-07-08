import Mp4Card from '../../components/Cards/Mp4Card';
import ListCard from '../../components/Cards/ListCard';
import Heading from '../../components/Typography/Heading';
import PageLayout from "../../components/Layouts/PageLayout";
import ImageLinkCard from '../../components/Cards/ImageLinkCard'
import { cardItems } from '../../lib/artists/artistLib'


export default function Artists() {


  return (
    <PageLayout>

      <div>

        <Heading title="Current Artists" hScreen={false} />
        <div>
          here are the avatars
        </div>
        <button className=' lg:h-32 lg:w-32 rounded-full focus:outline-none'>
        <img className='w-8 h-8 lg:h-32 lg:w-32  object-cover rounded-full ' src="https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg" alt="" />

        </button>
      </div>


      <Heading title="Current Artists" hScreen={false} />
      <ListCard title="Artists" body={cardItems} />
      <div>
        {cardItems.map((item, index) =>
          <div key={index} id={item.anchorLink} className="flex items-center justify-center h-screen">
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

    </PageLayout>
  );
}

