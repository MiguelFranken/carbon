## Requirements
- Node 12
  - Use [NVM](https://github.com/nvm-sh/nvm) or [NVM-Windows](https://github.com/coreybutler/nvm-windows) to manage NodeJS versions on your machine
- Docker
- [MetaMask Chrome Plugin](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=de)

## Getting Started

- `npm install && npm run bootstrap` to install all dependencies
- Create `.env` and `truffle/.env`. Use the `.env.example` files as starting point.
- Start database container by running `docker-compose up -d db`
- Start local blockchain by running `npm run blockchain`
- Deploy contract on local blockchain by running `npm run deploy`
- Start frontend and backend by running `npm run dev`
- Configure MetaMask
  - Import contract owner account in MetaMask (private keys are logged in `npm run blockchain`)
  - Connect to local test network in MetaMask
- Open <a href="http://localhost:8080/">http://localhost:8080/ in Chrome
- Use the blue button in the menu bar to connect your wallet

## Tech Stack
- [NestJS](https://nestjs.com) backend ([TypeScript](https://www.typescriptlang.org))
  - [MySQL](https://registry.hub.docker.com/_/mysql) database Docker container
  - [Web3 v1](https://github.com/ChainSafe/web3.js)
- [Vue v3](https://v3.vuejs.org) (JavaScript)
  - [Tailwind](https://tailwindcss.com) CSS framework
  - [HeadlessUI](https://headlessui.dev/vue/menu) components
  - [Vue Router v4](https://next.router.vuejs.org)
  - [HeroIcons](https://github.com/tailwindlabs/heroicons#vue)
  - [Web3 v1](https://github.com/ChainSafe/web3.js)
  - [Vuex v4](https://next.vuex.vuejs.org)
- Ethereum development environment
  - [Hardhat](https://hardhat.org/) for local blockchain deployment
  - [Alchemy](https://www.alchemy.com) for deployment to test networks
  
