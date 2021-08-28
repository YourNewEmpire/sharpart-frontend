

require('dotenv').config()


require("@nomiclabs/hardhat-etherscan");
const privateKey = process.env.MNEMONIC;
const maticUrl = process.env.MATIC_API_KEY;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "mumbai",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.POLYGON_SCAN
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {

    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${maticUrl}`,
      accounts: [privateKey]
    },
    matic: {
      url: `https://rpc-mainnet.maticvigil.com/v1/${maticUrl}`,
      accounts: [privateKey]
    },
  }
};

