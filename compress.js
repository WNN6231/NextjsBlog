const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootDir = './public';

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        if(stat.isDirectory()) {
            if(file === 'optimized' || file === 'node_modules') return;
            processDirectory(filePath);
            return;
        }

        const ext =path.extname(file);
        const extLower = ext.toLowerCase();

        if(['.jpg', '.jpeg', '.png'].includes(extLower)) {
            const newFileName = file.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
            const outputFilePath = path.join(dir, newFileName);

            sharp(filePath)
                .resize(1600, null, { withoutEnlargement: true })
                .webp({ quality: 75 })
                .toFile(outputFilePath)
                .then(() => {
                    console.log(`✅ 成功: ${path.relative(rootDir, filePath)} -> ${newFileName}`);
                })
                .catch(err => console.error(`❌ 失败: ${filePath}:`, err.message));
        }

    });
}

console.log("🚀 开始压缩图片...");
processDirectory(rootDir);