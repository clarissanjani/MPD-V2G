# Trixo-Application
Clarissa Anjani, Leonie Freisinger, Lisa Mangertseder, Johannes Lutz, Vladislav Klaas

# Final Project Submission
As part of the Center of Digital Technology and Management (CDTM) course, Managing Product Development (MPD), we worked on a challenge provided by our project partner, Entrix who posed the question: *how can blockchain technology increase the flexibility of the energy system?* As a result, we have developed Trixo, a blockchain-enabled solution for electric vehicle (EV) owners to participate in vehicle-to-grid (V2G). This allows EV owners to unlock the full potential of their electric vehicle batteries. The objective of our proposed solution is to provide a minimum viable product to show the core capabilities of a blockchain network for bi-directional charging. In this repository, we provide a proof of concept to showcase a dApp where we mocked up a network of electric vehicles.

## Project Details
**Description**: The focus of our prototype is to demonstrate the role and integration of the blockchain network, seeing it as the core of a decentralized EV charging network. As this is only a prototype, we developed on a private Ganache network. This setup is ideal to showcase how the interaction in the blockchain network and the integration works on a small scale. Furthermore, it makes it possible for us to focus on the design of the smart contract, which is core to our solution. To bring our blockchain solution to serve the public, further improvements are necessary.

## Dependencies
* Metamask: Google Chrome extension used to test the submission of one single charging session and how the transaction went through
* Ganache: personal Ethereum Blockchain used to test smart contracts where you can deploy contracts, develop applications, run tests and perform other tasks without any cost
*Truffle: development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to compile smart contracts for development purposes
*Ethers.js: JavaScript library for Web3 development and interacting with the Ethereum Blockchain ecosystem. It is an alternative to Web3.js which we had trouble using due to the higher number of dependencies that required installing

## Installation

## Running the files
Before running the file, make sure all packages are installed. The python script is not dependent on packages from outside the standard library. Java Packages are included in the source code. For Vadere, the latest stable release is sufficient. Perform the following on the command line interface in your computer's terminal. 

Download or clone the repository
git clone https://github.com/clarissanjani/Trixo-Application.git

Run on the command line interface
1, Compile contract
''''
truffle compile
''''
2. Run the test cases
''''
truffle develop
test
''''

Run the React Native application
1. Change to the client directory
''''
cd client
''''
2. Download all dependencies
''''
npm install
''''
3. Start the application
''''
npm start
''''

## Known issues
**xx**: xx

Project Organization
------------

    ├── client           <- The top-level README for developers using this project.
    └── test
        ├── ...
    

## Credits and References

