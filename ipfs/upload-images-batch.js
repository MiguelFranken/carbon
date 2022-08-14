import { File, NFTStorage, toGatewayURL } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import ora from 'ora';

// environment variables
import dotenv from 'dotenv';
dotenv.config();
const svgDirectoryPath = process.env.SVG_DIRECTORY_PATH;
const client = new NFTStorage({ token: process.env.API_KEY });

function getHref(cid) {
  return toGatewayURL(`ipfs://${cid}`).href;
}

const NUMBER_LENGTHS = 11;
const NUMBER_IMAGES_PER_LENGTH = 10000;

function getOutput(cid) {
  return { cid, href: getHref(cid) };
}

async function storeBatches() {
  const cids = [];

  for (let length = 1; length <= NUMBER_LENGTHS; length++) {
    const files = [];
    for (let id = 1; id <= NUMBER_IMAGES_PER_LENGTH; id++) {
      const inputFileName = `${length}_${id}_cock.svg`;
      const outputFileName = `${length}_${id}.svg`;
      const imagePath = path.join(svgDirectoryPath, inputFileName);
      try {
        const svgData = fs.readFileSync(imagePath);
        const file = new File(
          [svgData],
          outputFileName
        );
        files.push(file);
      } catch(err) {
        console.log(`Cannot read SVG file for length ${length} and id ${id}`);
        process.exit();
      }
    }
    const spinner = ora(`Storing batch ${length} (${files.length} files)`).start();
    const cid = await client.storeDirectory(files);
    spinner.succeed(`Uploaded batch for length ${length}`);
    console.log("cid:", cid);
    console.log("href:", getHref(cid));
    cids.push(cid);
  }

  const output = cids.map((cid) => getOutput(cid));
  console.log("CIDs", output);
}

storeBatches().then(() => {
  console.log("Finished");
});
