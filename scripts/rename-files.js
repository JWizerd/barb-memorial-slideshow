const fs = require('fs');
const SLIDE_DIR = './assets/img/slides-test';
const TMP_DIR = `./assets/img/tmp`;

const removeUnnecessaryFilePaths = (files) => {
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (!file.includes('.jpg')) {
      files.splice(index, 1);
    }
  }
}

const replaceDir = () => {
  fs.rmdirSync(SLIDE_DIR, { recursive: true });
  fs.renameSync(TMP_DIR, SLIDE_DIR);
}

const renameFiles = (files) => {
  // create tmp directory to process files
  fs.mkdirSync(TMP_DIR);
  const filesProcessed = {};
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const oldPath = `${SLIDE_DIR}/${file}`;
    const newPath = `${TMP_DIR}/${index + 1}.jpg`;
    if (!filesProcessed[newPath]) {
      filesProcessed[newPath] = true;
      fs.renameSync(oldPath, newPath);
      console.log(`File: ${oldPath} RENAMED to ${newPath}`);
    }
  }
}

fs.readdir(SLIDE_DIR, function(err, files) {
  if (err) return console.error(err);

  try {
    removeUnnecessaryFilePaths(files);
    renameFiles(files);
    replaceDir();
  } catch (error) {
    console.error(error);
  }
})