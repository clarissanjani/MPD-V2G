# Trixo-Application
Clarissa Anjani, Leonie Freisinger, Lisa Mangertseder, Johannes Lutz, Vladislav Klaas

# Final Project Submission
As part of the Center of Digital Technology and Management (CDTM) course, Managing Product Development (MPD), we worked on a challenge provided by our project partner, Entrix who posed the question: *how can blockchain technology increase the flexibility of the energy system?* As a result, we have developed Trixo, a blockchain-enabled solution for electric vehicle (EV) owners to participate in vehicle-to-grid (V2G). This allows EV owners to unlock the full potential of their electric vehicle batteries. The objective of our proposed solution is to provide a minimum viable product to show the core capabilities of a blockchain network for bi-directional charging. In this repository, we provide a proof of concept to showcase a dApp where we mocked up a network of electric vehicles.

## Project Details
**Description**: The focus of our prototype is to demonstrate the role and integration of the blockchain network, seeing it as the core of a decentralized EV charging network. As this is only a prototype, we developed on a private Ganache network. This setup is ideal to showcase how the interaction in the blockchain network and the integration works on a small scale. Furthermore, it makes it possible for us to focus on the design of the smart contract, which is core to our solution. To bring our blockchain solution to serve the public, further improvements are necessary.

## Technical Prerequisites
The following prerequisites are required to test the dApp. The corresponding installation links are provided for each prerequisite. 
* **Node.js**: Javascript run time for developing dApp > https://nodejs.org/en/
* **Metamask**: Google Chrome extension used to test the submission of one single charging session and how the transaction went through > https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en
* **Ganache**: personal Ethereum Blockchain used to test smart contracts where you can deploy contracts, develop applications, run tests and perform other tasks without any cost > https://trufflesuite.com/ganache/
* **Truffle**: development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to compile smart contracts for development purposes > https://trufflesuite.com/docs/truffle/getting-started/installation/
* **Ethers.js**: JavaScript library for Web3 development and interacting with the Ethereum Blockchain ecosystem.
```
cd client
```
```
yarn add ethers @ethersproject/units
```
NOTE: use ```npm install --global yarn``` if prompt command not found: yarn


## Installation

## Running the files on the command line interface (Truffle, Ethers.js and Node.js required)
Before running the file, make sure all packages are installed. Execute the following on the command line interface in your computer's terminal. 

Download or clone the repository

```
git clone https://github.com/clarissanjani/Trixo-Application.git
```

Run on the command line interface
1, Compile contract

```
truffle compile
```

2. Run the test cases

```
truffle develop
test
```

Run the React Native application (All mentioned technical prerequisites are required, and a Google Chrome browser)
1. Change to the client directory

```
cd client
```

2. Download all dependencies

```
npm install
```

3. Start the application

```
npm start
```

## Known issues
**xx**: xx

Project Organization
------------

    ├── client           <- The top-level README for developers using this project.
    └── test
        ├── ...
    

## Credits and References

