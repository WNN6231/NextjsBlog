const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';
const outputDir = './public/optimized';

// 如果输出目录不存在则创建
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 读取目录
fs.readdirSync(inputDir).forEach(file => {
    const inputFilePath = path.join(inputDir, file);
    
    // 跳过文件夹（比如自身的 optimized 文件夹）
    if (fs.lstatSync(inputFilePath).isDirectory()) return;

    const ext = path.extname(file); // 获取原始后缀，如 .JPG
    const extLower = ext.toLowerCase();

    // 检查是否为图片
    if (['.jpg', '.jpeg', '.png'].includes(extLower)) {
        // 使用正则 /i 忽略大小写进行替换，确保 .JPG 也能变成 .webp
        const newFileName = file.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
        const outputFilePath = path.join(outputDir, newFileName);

        sharp(inputFilePath)
            .resize(1600, null, { withoutEnlargement: true }) // 防止小图拉大模糊
            .webp({ quality: 75 })
            .toFile(outputFilePath)
            .then(() => console.log(`✅ 成功: ${file} -> ${newFileName}`))
            .catch(err => console.error(`❌ 失败: ${file}`, err));
    }
});