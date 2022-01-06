// const fs = require('fs');

// const SLIDE_DIR = './assets/img/slide-test';

// const removeUnnecessaryFilePaths = (files) => {
//   for (let index = 0; index < files.length; index++) {
//     const file = files[index];
//     if (!file.includes('.jpg')) {
//       files.splice(index, 1);
//     }
//   }
// }

// const renameFiles = (files) => {
//   for (let index = 0; index < files.length; index++) {
//     const file = files[index];
//     const oldPath = `${SLIDE_DIR}/${file}`;
//     const newPath = `${SLIDE_DIR}/${index + 1}.jpg`;
//     fs.rename(oldPath, newPath, () => {
//       console.log(`File: ${oldPath} RENAMED to ${newPath}`);
//     });
//   }
// }

// fs.readdir(SLIDE_DIR, function(err, files) {
//   if (err) return console.error(err);

//   try {
//     removeUnnecessaryFilePaths(files);
//     renameFiles(files);
//   } catch (error) {
//     console.error(error);
//   }
// })