import Mp4Card from '../../components/Cards/Mp4Card';
import ListCard from '../../components/Cards/ListCard';
import Heading from '../../components/Typography/Heading';
import PageLayout from "../../components/Layouts/PageLayout";
import ImageLinkCard from '../../components/Cards/ImageLinkCard'
import { cardItems } from '../../lib/artists/artistLib'
import Columns from "../../components/Columns";
import NodeCard from "../../components/Cards/NodeCard";

export default function Artists() {
  return (
    <PageLayout>
      <div className=" 
           grid grid-flow-col col-span-3
          gap-4 md:gap-8 lg:gap-12
          
        pb-36
            items-center justify-center
            ">

        {cardItems.map((item, index) =>
          <div key={index} id={item.anchorLink} className=' '>
            {item.isImage === false &&
              <div className=''>


                <Mp4Card
                  img={item.img}
                  title={item.title}
                  body={item.body}
                  link={item.pageLink}
                  isImage={false}
                />
              </div>
            }

            {item.isImage === true &&
              <div className=''>
                <Mp4Card
                  img={item.img}
                  title={item.title}
                  body={item.body}
                  link={item.pageLink}
                  isImage

                />
              </div>
            }
          </div>
        )}

      </div>
    </PageLayout>
  );
}

