import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
dotenv.config();
const deleteFolder = process.env.DELETE_FOLDERS || false;
const metadataPath = path.join(__dirname, "../api/metadata");
const limitFiles = process.env.LIMIT_FILES;

function generateMetaData(tokenId, ipfs, size, externalUrl) {
  return {
    "image": `ipfs://${ipfs}/${size}.png`,
    "tokenId": tokenId,
    "name": `Diamond ${size}`,
    "external_url": externalUrl,
    "attributes": [
      {
        "trait_type": "size",
        "value": size,
        "max_value": 10
      }
    ]
  };
}

function copyMetaDataFilesToAPI(limit) {
  console.log("Copying metadata to API folder..");
  let count = 0;

  try {
    if (deleteFolder) {
      fs.rmdirSync(metadataPath, { recursive: true });
    }
    fs.mkdirSync(metadataPath);

    for (let size = 1; size <= 11; size++) {
      const lengthFolderPath = path.join(metadataPath, size.toString());
      fs.mkdirSync(lengthFolderPath);

      const tokenIdLimit = limit ? limit : 10000;

      for (let tokenId = 1; tokenId <= tokenIdLimit; tokenId++) {
        const metadata = generateMetaData(tokenId, "", size, "");

        const diamondFolderPath = path.join(lengthFolderPath, tokenId.toString());
        fs.mkdirSync(diamondFolderPath);
        fs.writeFileSync(path.join(diamondFolderPath, "metadata.json"), JSON.stringify(metadata));
        count++;
      }
    }
  } catch (err) {
    console.error(`Error while deleting ${metadataPath}.`);
    console.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(count);
}

copyMetaDataFilesToAPI(limitFiles)
  .then((count) => console.log(`Copied ${count} metadata files to API folder!`))
  .catch((err) => {
    console.error("Error occurred during copying of metadata to API folder");
    console.error(err);
  });
