import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from "moralis/node";
import axios from 'axios';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL

const itMooned = 'Mooned'
const itDropped = 'Dropped'
const stale = 'Held'



export default async (req: NextApiRequest, res: NextApiResponse) => {
      const { user, gameChoice, oldPrice } = req.body
      const getPrice = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
      const currentPrice = getPrice.data.market_data.current_price.usd;


      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

      const gameResultObj = Moralis.Object.extend("GameResults");
      const setResult = new gameResultObj()
/*
      setResult.set('ethAddress', user);
      setResult.set('gameChoice', gameChoice)
      setResult.set('gameResult', itMooned);
      setResult.set('gameWin', true);
      setResult.set('oldEthPrice', oldPrice);
      setResult.set('newEthPrice', currentPrice);
      */
      res.status(200).json({ price: currentPrice })


}