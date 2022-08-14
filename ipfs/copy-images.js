import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

// environment
const deleteFolder = process.env.DELETE_FOLDERS || false;
const directoryPath = process.env.DATA_DIRECTORY_PATH || "../cc-images/data";
const frontendImagePath = path.join(__dirname, "../frontend/public/cocks");
const limitFiles = process.env.LIMIT_FILES;

function copyImagesToFrontend(limit) {
  let count = 0;
  try {
    if (deleteFolder) {
      fs.rmdirSync(frontendImagePath, { recursive: true });
    }
    fs.mkdirSync(frontendImagePath);

    const lengthFolders = fs
      .readdirSync(directoryPath)
      .filter((folder) => folder !== ".DS_Store");

    lengthFolders.forEach((length) => {
      const lengthFolderPath = path.join(frontendImagePath, length);
      fs.mkdirSync(lengthFolderPath);

      const cockFolders = fs
        .readdirSync(path.join(directoryPath, length))
        .filter((folder) => folder !== ".DS_Store");

      cockFolders.forEach((cockIndex) => {
        if (!limit || parseInt(cockIndex) <= parseInt(limit)) {
          const cockFolderPath = path.join(lengthFolderPath, cockIndex);
          fs.mkdirSync(cockFolderPath);
          fs.copyFileSync(
            path.join(directoryPath, length, cockIndex, "cock.svg"),
            path.join(cockFolderPath, "cock.svg")
          );
          count++;
        }
      });
    });
  } catch (err) {
    console.error(`Error while deleting ${frontendImagePath}.`);
    console.error(err);
    return Promise.reject(err);
  }
  return Promise.resolve(count);
}

copyImagesToFrontend(limitFiles)
  .then((count) => console.log(`Copied ${count} images to frontend folder!`))
  .catch((err) => {
    console.error("Error occurred during copying of images to frontend folder");
    console.error(err);
  });
