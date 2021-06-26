import { GetServerSideProps } from 'next';
import ScreenHeading from '../../components/Typography/ScreenHeading';
import Web3 from 'web3'
import ImageCard from '../../components/Cards/ImageCard';
import { abi } from '../../public/GameItem.json'

export const getServerSideProps: GetServerSideProps = async ({params}) => {
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
            "0x5B6fe4efb9FD96f402aC9027e6493331Dc3F2e7a",
      );

      async function pushURIs(total: number) {
            for (i = 1; i <= total; i++) {
                  URIs.push(`https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=${i}.mp4`)
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


export default function artist({ URIs }) {


      return (
            <>
                  <div className="flex flex-col items-center justify-center space-y-20 ">
                        <ScreenHeading title="Stygian" />
                        {URIs.map((uri, index) => 
                              <div key={index}>
                                    <h1>
                                          {uri}
                                    </h1>
                              </div>
                        )}
                  </div>
            </>
      );
}

