module.exports.reorderFiles = (files) => {
  files.sort((a, b) => {
    const firstFileName = parseInt(a.split('.'), 10);
    const secondFileName = parseInt(b.split('.'), 10);
    if (firstFileName < secondFileName) {
      return -1;
    }

    return 0;
  })
}