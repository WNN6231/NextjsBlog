
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = './public';

const processDirectory = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Could not list the directory: ${dir}`, err);
      return;
    }

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        processDirectory(fullPath);
      } else {
        const fileExt = path.extname(fullPath);
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExt.toLowerCase())) {
          const outputFilePath = path.join(dir, `${path.basename(file.name, fileExt)}.webp`);

          sharp(fullPath)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outputFilePath, (err, info) => {
              if (err) {
                console.error(`Error converting ${file.name}:`, err);
              } else {
                console.log(`Successfully converted ${file.name} to ${outputFilePath}`);
              }
            });
        }
      }
    });
  });
};

processDirectory(directory);
