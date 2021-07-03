import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from "moralis/node";

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL

export default async (req: NextApiRequest, res: NextApiResponse) => {
      const { user, price, gameChoice } = req.body
      console.log(user)

      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

      await Moralis.Cloud.run("playGame", req.body).then(
            res.status(200).json({ name: req.body })
      );

}