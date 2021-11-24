# Decentra-CRUD

## About the Project
This project aims to achieve the MVP (Minimum Viable Product) for the Blockchain Developer Bootcamp 2021 hosted by Consensys. It's a minimalistic decentralized whitelist CRUD (Create, read, update and delete) aka Decentra-CRUD.

The goal of the project is to provide functionality for an 'admin' user (the owner of the contract) to create, read, update and delete records (ethereum addresses) from the ethereum network (currently hosted @ the rinkeby testnet).

### The definition of a 'user'
- Decentra-CRUD is designed for individuals wanting to maintain their whitelist of trusted accounts.
- A user in this case should be considered the person who migrates the contract's source code.

## Directory Structure
The project was created with truffle.

- The <code>contracts</code>/ folder contains the source code for the dApp.
- The <code>node_modules/</code> folder contains the dependencies.
- The <code>src/</code> folder contains the front-end code.
- The <code>test/</code> folder contains a test file.

## The frontend project can be accessed @
[Decentra-CRUD](https://atrnd.github.io/)

## Public Ethereum account
0xAcc257213D080DB495149F248561ac94e1C2BC29

## Installing dependencies
### Prerequisites
- [Node.js](https://nodejs.org/en/download/) >= v16
- [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) >= v5.4.9
- [Ganache](https://www.trufflesuite.com/ganache) >= 2.5.4
- [Metamask](https://metamask.io/)

### NPM
- <code>npm install -g live-server</code>
- <code>npm install --save @openzeppelin/contracts</code>

### Accessing the project
- run <code>live-server</code> (from the root of the project)

## Running smart contract unit tests
- run <code>truffle test</code> (from the root of the project)
- host: "127.0.0.1"
- port: 8545

## Screencast
[Decentra-CRUD](https://vimeo.com/649501922/2b0ce280cc)
