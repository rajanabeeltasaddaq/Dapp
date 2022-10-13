
# TOKEN DAPP

A Dapp through which you can buy Ropstam Tokens which are defaltionary ERC20 tokens. 

User can buy ropstam token by paying some amount of ethers to a smart contract. After that, through ropstam tokens user can purchase an Open Apes NFT & Hammer token.




## Tools & Languages
Tools used creating this dapps are

- Hardhat

- ReactJs

Languages used creating Dapp (smart contract, scripts, frontend) are

- Solidity

- JavaScript

Alchemy is also used.
## Demo

Below is the Demo link of dapp. You can watch this in 2x.

https://www.loom.com/share/034bba06bf04488f90bb989c14bb3d51

## Deployment

Install dependencies
```bash
  npm install
```

### Contract Side

Compile Smart Contracts
```bash
  npx hardhat compile
```

To deploy smart contract locally
```bash
  node scripts/deploy.js
```

To deploy smart contract on testnet. In this dapp I uses goerli testnet using alchemy api.
```bash
  npx hardhat run scripts/deploy.js --network [networkName]
```

To withdraw Ethers (only Owner function)
```bash
  node scripts/withdrawEthers.js
```

To run tests
```bash
  npx hardhat test
```

### Frontend Side
Firstly, change directory to frontend
```bash
  cd frontend/
```

Run dapp by simply typing 
```bash
  npm start
```



## Features

- Buy Ropstam Tokens
- Buy Open Apes Nft
- Buy Hammer Token
- Withdraw Contract Ethers (only owner)



## Authors

- [@NabeelAhmed](https://www.github.com/rajanabeeltasaddaq)
