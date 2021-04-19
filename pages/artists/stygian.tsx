import { GetStaticProps } from 'next';
import Heading from '../../components/Heading';
import Web3 from 'web3'
import ImageCard from '../../components/Cards/ImageCard';
import { abi } from '../../public/GameItem.json'
export const getStaticProps: GetStaticProps = async (context) => {
      const res = await fetch("https://contract-abis.herokuapp.com/api/contract/")
      let URIs: string[] = []
      //initial number for forloop. typescript will be happy with this for sure . 
      let i: number = 0
      //instantiate a new web3 http provider - passing in my matic/mumbai network node rpc-url.
      const provider = new Web3.providers.HttpProvider(
            '  https://rpc-mumbai.maticvigil.com/v1/f7178baf2319f5704d765be9c095e1b9c94ceb1f'
      );
      //new Web3 instance - passing in the http provider
      const web3 = new Web3(provider)
      //instantiate contract from web3 for reference in this js module. 
      const nftContract = new web3.eth.Contract(
            //@ts-ignore
            abi,
            "0xf79349d03E0A2BfFD5Ea27B512D51Bd84289E72A",
      );

      async function pushURIs(total: number) {
            for (i = 1; i <= total; i++) {
                  URIs.push(`https://contract-abis.herokuapp.com/mp4s/${i}.mp4`)
                  console.log(res)
            }
      }

      //
      await nftContract.methods
            .totalSupply()
            .call().then(res => pushURIs(res))
            .catch(error => console.log(error));


      return {
            props: {
                  URIs
            }
      }
}
export default function Stygian({URIs}) {


      return (
            <>
                  <div className="flex flex-col items-center justify-center space-y-20 ">
                        <Heading title="Stygian" />
                        {URIs.map((uri: string) => 
                              <ImageCard 
                              img={uri}
                              title="an Item of Stygian's"
                              />
                        )}
                  </div>
            </>
      );
}

