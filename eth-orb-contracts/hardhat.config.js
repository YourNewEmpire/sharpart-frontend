require("@nomiclabs/hardhat-waffle");
const ethers = require("ethers")
const fs = require("fs")
const MNEMONIC = fs.readFileSync(".secret").toString().trim();
const API_KEY = fs.readFileSync(".apikey").toString().trim()
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
  solidity: "0.7.3",
  networks: {
    matic: {
      url: `https://rpc-matic.maticvigil.com/v1/${API_KEY}`,
      accounts: {
        provider: function () {
          return new HDWalletProvider(MNEMONIC, `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`);
        },
      }
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`,
      accounts: {
        provider: function () {
          return new HDWalletProvider(MNEMONIC, `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`);
        },
      }
    }
  }
};

