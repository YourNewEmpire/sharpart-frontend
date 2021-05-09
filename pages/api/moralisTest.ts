import Moralis from 'moralis/node'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
export default async (req: NextApiRequest, res: NextApiResponse) => {

      if(req.method !== 'POST'){
            res.status(404).json({error: 'post only'})
      }
      //Moralis Server config.
      const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
      const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

      //Req body:
      const user: string = req.body.address
      const price: number = req.body.ethprice
      const gameChoice: boolean = req.body.gamechoice
      const userSign: string = req.body.userSign
      console.log('request arrived' ,gameChoice, price, user, )


      let userAuthed: boolean = null;

      //extend the User and GameSession Tables

      const gameSesh = Moralis.Object.extend("GameSession");
      const queryGame = new Moralis.Query(gameSesh);


      queryGame.equalTo("userSign", userSign);
      await queryGame.first()
                  .then((results) => {
                        if (!results) {
                              console.log('no results from moralis query')
                              userAuthed = false
                              res.json({status: 'fail', message: 'user has no auth game session'})
                        }
                        else {
                              userAuthed = true

                              
           setTimeout(async () => {
            const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
            const newPrice = coinData.data.market_data.current_price.usd;
            console.log(newPrice, " newPrice log")
            if (price < newPrice && gameChoice === true) {
                  res.json({oldPrice: price ,newPrice: newPrice, result: 'you won, eth mooned', address: user, })
            }
            else if(price > newPrice && gameChoice === false) {
                  res.json({oldPrice: price ,newPrice: newPrice, result: 'you won, eth dropped', address: user, })
            }
            else if(price === newPrice) {
                  res.json({oldPrice: price ,newPrice: newPrice, result: 'STALE, eth is the same as when you guessed', address: user, })

            }
            else{
                  res.json({result: 'you lossed noob'})
            }
      }, 45000)
                        }
                  })
                  .catch(error => 
                        res.json({status: 'error with auth session query', message: error})
                  );


}
 
      /*
      if (queryAuth._where.ethAddress === user) {
    
            console.log('user has authed')
      }
      else {
            res.status(201).json({
                  garbage: 'yes'
            })
      }



      try {
            gamesession.set('ethAddress', user);
            gamesession.set('coinPrice', price);
            gamesession.set('gameChoice', gameChoice)
            gamesession.set('activeGame' , true)
            await gamesession.save()
            console.log('saved game session')
      }
      catch (e) {
            res.status(203).json({
                  error: 'couldnt set game sesh'
            })
      }
      setTimeout(async () => {
            gamesession.set('activeGame', false)
            await gamesession.save()
             console.log('cleared session')
             res.status(200).json({response: 'success'})
       }, 25000)
*/





      /*Do something with the returned Moralis.Object values
      for (let i = 0; i < results.length; i++) {
            const object = results[i];
            console.log(object.id + ' - ' + object.get('playerName'));
      }*/





      /*
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
                       .transferItem( user, usersURIs[0])
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
     
     
     */
