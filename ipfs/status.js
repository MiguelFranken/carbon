import { NFTStorage } from 'nft.storage';

// environment variables
import dotenv from 'dotenv';
dotenv.config();
const client = new NFTStorage({ token: process.env.API_KEY });

const status = await client.status("bafybeih47vfivlwqjkjwmtsohmjrwd76cwdiufcwsheeukycsa2e6pihcy");
console.log(status);
