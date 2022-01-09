const fs = require('fs');
const SLIDE_DIR = 'assets/img/slides';
const DATA_PATH = 'data/slides.js';
const { removeUnnecessaryFilePaths } = require('./utils/remove-unnecessary-files');
const { reorderFiles } = require('./utils/reorder-files');

fs.readdir(SLIDE_DIR, function(err, files) {
  if (err) return console.error(err);

  try {
    if (fs.existsSync(DATA_PATH)) {
      fs.unlinkSync(DATA_PATH);
    }

    removeUnnecessaryFilePaths(files);
    reorderFiles(files);

    const buildObj = filePath => ({
      img: `${SLIDE_DIR}/${filePath}`
    });

    const slides = files.map(buildObj);

    fs.writeFileSync(DATA_PATH, `const SLIDE_DATA = ${JSON.stringify(slides)};`);
  } catch (error) {
    console.error(error);
  }
})