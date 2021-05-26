import Moralis from 'moralis/node'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import fs from 'fs'
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3'

const maticUrl = process.env.NEXT_PUBLIC_MATIC_API_KEY;
const MNEMONIC = process.env.MNEMONIC;
const OWNER_ADDRESS = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836";
const SECOND_OWNER = "0x2e9A82c1e0165b6F9f18c8aB2F98a7f44174d345"
const NFT_CONTRACT_ADDRESS = '0xD7bE337082fa3CceD5461879752b9197652fC1c0'
const USERS_ADDRESS = '0x296477206a6cAa99f032D798E327bfF41D05f00B';
/*
let rawdata = fs.readFileSync("./public/GameItem.json");
//@ts-ignore
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi;
*/


export default async (req: NextApiRequest, res: NextApiResponse) => {

      //* Deny any other reqs
      if (req.method !== 'POST') {
            res.status(404).json({ error: 'wrong http method' })
      }

      //* Req body
      const user: string = req.body.address
      const price: number = req.body.ethprice
      const gameChoice: boolean = req.body.gamechoice
      const userSign = req.body.userSign
      console.log('request arrived', gameChoice, price, user, userSign)

      //* array of token uri's for a user.
      let tokenIds: number[] = []

      //* var 's for game results
      const itMooned = 'Mooned'
      const itDropped = 'Dropped'
      const stale = 'Held'

      //*Moralis Server config.
      const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
      const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

/*

      //* Matic contract instance
      const provider = new HDWalletProvider(
            MNEMONIC,
            `https://rpc-mumbai.maticvigil.com/v1/${maticUrl}`
      );

      const web3Instance = new Web3(provider);


      const nftContract = new web3Instance.eth.Contract(
            NFT_ABI,
            NFT_CONTRACT_ADDRESS,
      );

      //* Find Owners equal to the contract owner to award items from.
      async function pushURIs(total: number) {
            let i: number = 0
            for (i = 1; i <= total; i++) {
                  await nftContract.methods.ownerOf(i).call().then(res => {
                        if (res === OWNER_ADDRESS) {
                              tokenIds.push(i)
                              console.log(tokenIds)
                        }
                        else {
                              console.log("user is empty")
                        }
                  })
            }
      };

      await nftContract.methods
            .totalSupply()
            .call().then(res => pushURIs(res))
            .catch(error => console.log(error));

*/




      //* extend GameSession table for querying if the user has created one (only available on my frontend)


      const gameSesh = Moralis.Object.extend("GameSession");
      const gameResultObj = Moralis.Object.extend("GameResults");
      const queryGame = new Moralis.Query(gameSesh);
      const gameResult = new gameResultObj()
      queryGame.equalTo("userSign", userSign);


      //*game logic will run if the user has created a session


      await queryGame.first()
            .then((results) => {
                  if (!results) {
                        console.log('no results from moralis query')
                        res.json({ status: 'error', error: 'user has no auth game session' })
                  }
                  //*if the user has a gamesession then run game
                  else {
                        setTimeout(async () => {
                              //* new price fetch
                              const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
                              const newPrice = coinData.data.market_data.current_price.usd;
                              console.log(newPrice, " newPrice log, now starting game logic")

                              //* GAME LOGIC

                              //*  game victory handling
                              if (price < newPrice && gameChoice === true) {
                                    //console.log("Mooning choice success")
                                    gameResult.set('ethAddress', user);
                                    gameResult.set('gameChoice', gameChoice)
                                    gameResult.set('gameResult', itMooned);
                                    gameResult.set('gameWin', true);
                                    gameResult.set('oldEthPrice', price);
                                    gameResult.set('newEthPrice', newPrice);
                                    await gameResult.save().then((()=> {
                                          res.json({ gameResult: itMooned, gameWin: 'yes' })
                                    }))
                                          .catch(err => res.json({ status: 'error setting game result', error: err }))
                              }
                              else if (price > newPrice && gameChoice === false) {
                                    //console.log("Dropping choice success")
                                    gameResult.set('ethAddress', user);
                                    gameResult.set('gameChoice', gameChoice)
                                    gameResult.set('gameResult', itDropped);
                                    gameResult.set('gameWin', true);
                                    gameResult.set('oldEthPrice', price);
                                    gameResult.set('newEthPrice', newPrice);
                                    await gameResult.save().then(() => {
                                          res.json({ gameResult: itDropped, gameWin: 'yes' })
                                    })
                                          .catch(err => res.json({ status: 'error setting game result', error: err }))
                              }
                              //* draw
                              else if (price === newPrice) {
                                    gameResult.set('ethAddress', user);
                                    gameResult.set('gameResult', stale);
                                    gameResult.set('gameChoice', gameChoice)
                                    gameResult.set('gameWin', false);
                                    gameResult.set('oldEthPrice', price);
                                    gameResult.set('newEthPrice', newPrice);
                                    await gameResult.save().then(() => {
                                          res.json({ gameResult: stale, gameWin: 'no' })
                                    })
                                          .catch(err => res.json({ status: 'error setting game result', error: err }))

                              }
                              //* game loss handling
                              else if (price > newPrice && gameChoice === true) {
                                    gameResult.set('ethAddress', user);
                                    gameResult.set('gameChoice', gameChoice)
                                    gameResult.set('gameResult', itDropped);
                                    gameResult.set('gameWin', false);
                                    gameResult.set('oldEthPrice', price);
                                    gameResult.set('newEthPrice', newPrice);
                                    await gameResult.save().then(() => {
                                          res.json({ gameResult: itMooned, gameWin: 'no' })
                                    })
                                          .catch(err => res.json({ status: 'error setting game result', error: err }))
                              }
                              else if (price < newPrice && gameChoice === false) {
                                    gameResult.set('ethAddress', user);
                                    gameResult.set('gameChoice', gameChoice)
                                    gameResult.set('gameResult', itMooned);
                                    gameResult.set('gameWin', false);
                                    gameResult.set('oldEthPrice', price);
                                    gameResult.set('newEthPrice', newPrice);
                                    await gameResult.save().then(() => {
                                          res.json({ gameResult: itDropped, gameWin: 'no' })
                                    })
                                          .catch(err => res.json({ status: 'error setting game result', error: err }))
                              }
                        }, 45000)
                  }
            })
            .catch(error =>
                  res.json({ status: 'error with auth session query', message: error })
            );
}
