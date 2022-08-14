import { File, NFTStorage, toGatewayURL } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import ora from 'ora';

// environment variables
import dotenv from 'dotenv';
import replace from 'buffer-replace';
dotenv.config();
const metadataDirectoryPath = process.env.METADATA_DIRECTORY_PATH;
const externalUrl = process.env.EXTERNAL_URL;

function getHref(cid) {
  return toGatewayURL(`ipfs://${cid}`).href;
}

const NUMBER_LENGTHS = 11;

function processMetadata(metadataBuffer, cid, cockIndex, length) {
  let intermediateBuffer = replace(metadataBuffer, 'EXTERNAL_URL', `${externalUrl}${cockIndex}`);
  intermediateBuffer = replace(intermediateBuffer, `/${length}/${cockIndex}/cock.svg`, `/${length}_${cockIndex}.svg`);
  intermediateBuffer = replace(intermediateBuffer, '"display_type": "numeric"', '"display_type": "number"');
  intermediateBuffer = replace(intermediateBuffer, 'CID', `${cid}`);
  intermediateBuffer = replace(intermediateBuffer, 'granny', `Granny`);

  const metadata = JSON.parse(intermediateBuffer.toString());
  const lengthIndex = metadata['attributes'].findIndex((attribute) => attribute['trait_type'] === 'length');
  metadata['attributes'][lengthIndex]['max_value'] = 10;
  delete metadata['attributes'][lengthIndex]['display_type'];
  if (length === 11) {
    metadata['attributes'][lengthIndex]['value'] = 10;
    metadata['attributes'].push({
      'value': 'all time high'
    });
  }
  return JSON.stringify(metadata);
}

const imageIdentifiers = [
  "bafybeidgznl4kxsrvcnob2mjxaugxsewvomt2ugumuek6jkmwg2qnplbhy",
  "bafybeiddwhda4ucs3oqlvrqabc2oiluumv7zrsyuq3er3zzlcgcuwltod4",
  "bafybeiazprkpomsikvdxyrur75freaqopon4pxhzq2bvt6w6hzx7yga6qa",
  "bafybeicymvym3nlkmepptxznn6mlc5pjt6xn4gzxzukja5wyri3t4zawwi",
  "bafybeifb3upudkwuw7gq5yqnbtss2r22hjnz5ngwybsxywg6w64fnzkphm",
  "bafybeiarocxbhl2vx52thdhebsjdn7dbmaxjk6e2e6ivw5opsi4ihsmtma",
  "bafybeidj7eio5gspvapwux2oxupju35aprrvcrudsvscsnmbshrtzhrose",
  "bafybeigli4kkcnts7q3kcgegdf6lvnboml5g4eepwpwcozkzgq2ihfj4mm",
  "bafybeifiyx2etlte2ebhj2glgixtwu5d4xjqt3qrbmmdfjqqxd6zgliglm",
  "bafybeidodcrxbwdzpopchv5xdn7nj5adrus6xgelusd6r6cfc2spb6t3g4",
  "bafybeidzb6zbvffokobhko4rstlau4x6jwi6r42ifu2stuhogfr74kecnu"
];

function getFiles(min, max) {
  const files = [];

  for (let length = 1; length <= NUMBER_LENGTHS; length++) {
    const imageIdentifier = imageIdentifiers[length - 1];

    for (let id = min; id <= max; id++) {
      const inputFileName = `${length}_${id}_metadata.json`;
      const outputFileName = `${length}_${id}.json`;
      const imagePath = path.join(metadataDirectoryPath, inputFileName);
      try {
        const svgData = fs.readFileSync(imagePath);
        const processedData = processMetadata(svgData, imageIdentifier, id, length);
        const file = new File(
          [processedData],
          outputFileName
        );
        files.push(file);
      } catch(err) {
        console.log(`Cannot read SVG file for length ${length} and id ${id}`);
        process.exit();
      }
    }
  }

  return files;
}

async function uploadBatch(files, min, max) {
  const spinner = ora(`Storing metadata batch for ids ${min}-${max} (${files.length} files)`).start();
  const client = new NFTStorage({ token: process.env.API_KEY });
  try {
    const cid = await client.storeDirectory(files);
    spinner.succeed(`Stored metadata batch for ids ${min}-${max}`);
    console.log("cid:", cid);
    console.log("href:", getHref(cid));
  } catch (err) {
    spinner.fail(`Cannot store metadata batch for ids ${min}-${max}`)
  }
}

async function storeBatch(min, max) {
  const files = getFiles(min, max);
  await uploadBatch(files, min, max);
}

async function storeMetadata() {
  await storeBatch(1, 2000);
  await storeBatch(2001, 4000);
  await storeBatch(4001, 6000);
  await storeBatch(6001, 8000);
  await storeBatch(8001, 10000);
}

storeMetadata().then(() => {
  console.log("Finished");
});
