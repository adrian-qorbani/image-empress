const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

const uploadDirectory = '../uploads';

uploadsDirCleaner = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const directories = fs.readdirSync(uploadDirectory);

  directories.forEach(directory => {
    const directoryPath = path.join(uploadDirectory, directory);
    const stat = fs.statSync(directoryPath);

    if (stat.isDirectory() && stat.ctime < yesterday) {
      fs.rmdirSync(directoryPath, { recursive: true });
      logger.info(`Removed directory: ${directoryPath}`);
    }
  });
}

uploadsDirCleaner();
