const hre = require("hardhat");
const fs = require("fs")
require('dotenv').config()
const privateKey = process.env.MNEMONIC
const maticUrl = process.env.MATIC_API_KEY
const NFT_CONTRACT_ADDRESS = '0x5B6fe4efb9FD96f402aC9027e6493331Dc3F2e7a'

const ETHERS_ABI = [
      "function transferItem(address player, uint256 tokenId) public",
      "function totalSupply() public view returns (uint256)",
      "function ownerOf(uint256 tokenId) external view returns (address owner)",
      "function mintItemVoid(address player) public returns (uint256)",
      "function mintItem(address player, string memory tokenURI) public returns (uint256)"
]
const NUM_ITEMS = 5;

async function main() {
      const owner = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836"
      const user = "0x2e9A82c1e0165b6F9f18c8aB2F98a7f44174d345"

      const provider = new hre.ethers.providers.JsonRpcProvider(`https://rpc-mumbai.maticvigil.com/v1/${maticUrl}`);
      const signer = new hre.ethers.Wallet.fromMnemonic(privateKey)
      const ethersContract = new hre.ethers.Contract(NFT_CONTRACT_ADDRESS, ETHERS_ABI, provider)
      const contractSigned = ethersContract.connect(signer);

      for (var i = 0; i < NUM_ITEMS; i++) {

            /*
              The base URI is already set in the contract, all i need is the tokenID, 
              which is from the for loop, i 
              //owner, ` https://ipfs.io/ipfs/QmbTnJu8yiqDwR3jyVoo8gkfvirv5ysm8AVELwy4oa55gX/${i}.json`
            */
            await contractSigned.mintItemVoid(user)
            .then(res => console.log(res))
            .catch(err => console.log(err))

      }

}

main()
      .then(() => process.exit(0))
      .catch(error => {
            console.error(error);
            process.exit(1);
      });
