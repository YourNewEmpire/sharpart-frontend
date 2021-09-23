import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY

export default async (req: NextApiRequest, res: NextApiResponse) => {
      const ethGas = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_KEY}`)
      //*fix the decimal place for the next block base gas fee. 
      const fixedDecimal = parseFloat(ethGas.data.result.suggestBaseFee).toFixed(2)
      const formattedData = {
            safeLow: ethGas.data.result.SafeGasPrice,
            standard: ethGas.data.result.ProposeGasPrice,
            fastest: ethGas.data.result.FastGasPrice,
            nextBase: fixedDecimal.toString()
      }
      res.status(200).json(formattedData)
}