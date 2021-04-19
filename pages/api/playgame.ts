import axios from 'axios'
export default async (req, res) => {


    async function ethFetch(): Promise<number> {
        return new Promise((resolve, reject) => {
            const coinData = axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true').then(coinData => {
                const price: number = coinData.data.market_data.current_price.usd;
                resolve(price)
            }).catch(error => reject(error));
            //@ts-ignore


        });
    }

    const user = req.body.user
    const price: number = req.body.price
    console.log(price, user)
    setTimeout(async () => {
        const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
        const newPrice: number = coinData.data.market_data.current_price.usd;
        console.log(newPrice , " newPrice log")
        if (price > newPrice) {
            console.log("promise failed in timeout")
            res.status(201).json({ newPrice: price, result: 'you won' , address: user})
        }
        else {
            res.end(401) 
        }
    }, 30000)

   

}
