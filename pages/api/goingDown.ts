import axios from 'axios'
import Web3 from 'web3'
import type { NextApiRequest, NextApiResponse } from 'next'
import { abi } from '../../public/GameItem.json'
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
      const session = await getSession({ req })

      
      const user: string = req.body.user
      const price: number = req.body.price

      //my address.
      const owner: string = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836"

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


      async function transferTo() {
            let i: number = 0
            let usersURIs: number[] = []


            async function pushURIs(total) {
                  for (i = 1; i <= total; i++) {
                        await nftContract.methods.ownerOf(i).call().then(res => {
                              if (res === owner) {
                                    usersURIs.push(i)
                                    console.log(usersURIs)
                              }
                              else {
                                    console.log("user is empty")
                              }
                        }
                        )
                  }
            };
            await nftContract.methods
                  .totalSupply()
                  .call().then(response => pushURIs(response))
                  .catch(error => console.log(error));




            await nftContract.methods
                  .safeTransferFrom(owner, user, usersURIs[0])
                  .send({ from: owner })
                  .then(
                        response => {
                              console.log(response)
                              return response
                        }
                  )
                  .catch(
                        error => {
                              return error
                        }
                  )




      }

      if (!session) {
        // Signed in
        res.status(401).send("not authorised for this route")
      } else {
        // Not Signed in
       

      if (!user) {
            res.status(401).json({ error: 'no user found in request body' })
      }




      setTimeout(async () => {
            const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
            const newPrice = coinData.data.market_data.current_price.usd;
            console.log(newPrice, " newPrice log")
            if (price < newPrice) {
                  res.status(401).json({newPrice: newPrice, result: 'you lossed', address: user, })
            }
            else if(price === newPrice) {
                  res.status(202).json({newPrice: price, result: 'price held'})
            }
            else {
                  await transferTo()
                  res.status(201).json({ newPrice: newPrice, result: 'you won', address: user })
      
            }
      }, 5000)

      }




}
