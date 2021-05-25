

require('dotenv').config()

const privateKey = process.env.MNEMONIC;
const maticUrl = process.env.MATIC_API_KEY;
require("@nomiclabs/hardhat-waffle");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    mumbai: {
      gas: 'auto',
      gasPrice: 'auto',
      chainId: 80001,
      url: `https://rpc-mumbai.maticvigil.com/v1/${maticUrl}`,
      accounts: {mnemonic: privateKey}
    }
  }
};

