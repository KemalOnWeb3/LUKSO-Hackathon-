import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { create } from 'domain';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const web3 = new Web3();

var readline = require('readline-sync');
const PRIVATE_KEY = readline.question("Type a private key to create your UP. ");
console.log("Your private key to create your UP is" + PRIVATE_KEY + " .");


const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);


// sample private key 0x7d05989b88e6caff128c969683320b0964930f048a3cb51cf3b084bdb2abd850



// initialize the LSPFactory with the L16 chain RPC endpoint, chainId and your EOA's private key which will deploy the UP smart contracts
const lspFactory = new LSPFactory('https://rpc.l16.lukso.network', {
  deployKey: PRIVATE_KEY,
  chainId: 2828,
});

async function createUniversalProfile() {
    const deployedContracts = await lspFactory.UniversalProfile.deploy({
      controllerAddresses: [myEOA.address], // our EOA that will be controlling the UP
      lsp3Profile: {
        name: readline.question("Type the name of your UP: "),
        description: readline.question("Type the description of your UP: "),
        tags: ['Public Profile'],
        links: [
          {
            title: readline.question("Type the name (not the URL) of your website: "),
            url: readline.question("Type the URL of your website:"),
          },
        ],
      },
    });
  
    return deployedContracts;
  }
  
  createUniversalProfile().then((deployedContracts) => {
    console.log(deployedContracts);
  });

  
