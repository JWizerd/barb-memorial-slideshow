module.exports.removeUnnecessaryFilePaths = (files) => {
  for (let index = 0; index < files.length; index++) {
    const file = files[index
    ];
    if (!file.includes('.jpg')) {
      files.splice(index,
      1);
    }
  }
}