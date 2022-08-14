import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
dotenv.config();
const directoryPath = process.env.DATA_DIRECTORY_PATH || "../cc-images/data";
const deleteFolder = process.env.DELETE_FOLDERS || false;
const metadataPath = path.join(__dirname, "../api/metadata");
const limitFiles = process.env.LIMIT_FILES;

function copyMetaDataFilesToAPI(limit) {
  console.log("Copying metadata to API folder..");
  let count = 0;
  try {
    if (deleteFolder) {
      fs.rmdirSync(metadataPath, { recursive: true });
    }
    fs.mkdirSync(metadataPath);

    const lengthFolders = fs
      .readdirSync(directoryPath)
      .filter((folder) => folder !== ".DS_Store");

    lengthFolders.forEach((length) => {
      const lengthFolderPath = path.join(metadataPath, length);
      fs.mkdirSync(lengthFolderPath);
      const cockFolders = fs
        .readdirSync(path.join(directoryPath, length))
        .filter((folder) => folder !== ".DS_Store");
      cockFolders.forEach((cockIndex) => {
        if (!limit || parseInt(cockIndex) <= limit) {
          const cockFolderPath = path.join(lengthFolderPath, cockIndex);
          fs.mkdirSync(cockFolderPath);
          fs.copyFileSync(
            path.join(directoryPath, length, cockIndex, "metadata.json"),
            path.join(cockFolderPath, "metadata.json")
          );
          count++;
        }
      });
    });
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
