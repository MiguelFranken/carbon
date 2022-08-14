import { File, NFTStorage, toGatewayURL } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import replace from 'buffer-replace';

// environment variables
import dotenv from 'dotenv';
dotenv.config();
const directoryPath = process.env.DATA_DIRECTORY_PATH;
const externalUrl = process.env.EXTERNAL_URL;

function getCockFiles(limit) {
  const files = [];

  const lengthFolders = fs.readdirSync(directoryPath).filter(fileOrFolder => fileOrFolder !== ".DS_Store");
  lengthFolders.forEach((length) => {
    const lengthFolderPath = path.join(directoryPath, length);
    const cockFolders = fs.readdirSync(lengthFolderPath).filter(file => file !== ".DS_Store");
    cockFolders.forEach((cockIndex) => {
      if (!limit || cockIndex <= limit) {
        const svg = fs.readFileSync(
          path.join(lengthFolderPath, cockIndex, "cock.svg")
        );
        const cockFile = new File(
          [svg],
          `${length}/${cockIndex}/cock.svg`
        );
        files.push(cockFile);
      }
    });
  });

  console.log(`Read ${files.length} cock images`);
  return files;
}

function getMetadataFiles(cid, limit) {
  const files = [];

  const lengthFolders = fs.readdirSync(directoryPath).filter(fileOrFolder => fileOrFolder !== ".DS_Store");
  lengthFolders.forEach((length) => {
    const lengthFolderPath = path.join(directoryPath, length);
    const cockFolders = fs.readdirSync(lengthFolderPath).filter(file => file !== ".DS_Store");
    cockFolders.forEach((cockIndex) => {
      if (!limit || cockIndex <= limit) {
        const metadata = fs.readFileSync(
          path.join(lengthFolderPath, cockIndex, "metadata.json")
        );
        const metadataFile = new File(
          [processMetadata(metadata, cid, cockIndex)],
          `${length}/${cockIndex}/metadata.json`
        );
        files.push(metadataFile);
      }
    });
  });

  console.log(`Read ${files.length} metadata files`);
  return files;
}

function processMetadata(metadata, cid, cockIndex) {
  const intermediateBuffer = replace(metadata, 'EXTERNAL_URL', `${externalUrl}${cockIndex}`);
  return replace(intermediateBuffer, 'CID', `${cid}`);
}

function getHref(cid) {
  return toGatewayURL(`ipfs://${cid}`).href;
}

async function store(limit) {
  let client = new NFTStorage({ token: process.env.API_KEY });
  const cockCID = await client.storeDirectory(getCockFiles(limit));
  console.log("Images stored");
  client = new NFTStorage({ token: process.env.API_KEY })
  const metadataCID = await client.storeDirectory(getMetadataFiles(cockCID, limit))
  console.log("Metadata stored");
  return {
    cockHttp: getHref(cockCID),
    metadataHttp: getHref(metadataCID),
    cockCID,
    metadataCID,
  }
}

store().then((cids) => {
  console.log("Uploaded diamond images and metadata files");
  console.log(cids);
})
