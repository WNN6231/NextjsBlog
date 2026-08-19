const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const IMAGE_DIR = path.join(PROJECT_ROOT, 'public');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif'];

// 递归收集目录下所有文件路径
const walk = async (dir) => {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
};

// 压缩 public/ 下所有图片为 .webp，删除原图，返回成功转换的原文件名（basename）
const compressImages = async () => {
  const files = await walk(IMAGE_DIR);
  const images = files.filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()));
  const converted = [];

  for (const img of images) {
    const ext = path.extname(img);
    const out = path.join(path.dirname(img), `${path.basename(img, ext)}.webp`);
    try {
      await sharp(img)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out);
      console.log(`✓ 转换 ${path.relative(PROJECT_ROOT, img)} → ${path.relative(PROJECT_ROOT, out)}`);
      await fs.unlink(img);
      console.log(`  已删除原图 ${path.basename(img)}`);
      converted.push(path.basename(img));
    } catch (err) {
      console.error(`✗ 转换失败 ${path.relative(PROJECT_ROOT, img)}: ${err.message}`);
    }
  }
  return converted;
};

// 把 content/ 下 markdown 里成功转换图片的引用扩展名同步改为 .webp
// 覆盖：正文 ![](...)、front matter cover:、Obsidian 残留 ![[...]]
const rewriteMarkdownRefs = async (converted) => {
  if (!converted.length) {
    console.log('没有成功转换的图片，跳过 markdown 引用更新');
    return;
  }
  const mdFiles = (await walk(CONTENT_DIR)).filter((f) => path.extname(f).toLowerCase() === '.md');
  let touched = 0;

  for (const md of mdFiles) {
    let content = await fs.readFile(md, 'utf8');
    let changed = false;
    for (const origName of converted) {
      const webpName = origName.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      if (content.includes(origName)) {
        content = content.split(origName).join(webpName);
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(md, content, 'utf8');
      touched++;
      console.log(`✓ 更新引用 ${path.relative(PROJECT_ROOT, md)}`);
    }
  }
  console.log(`共更新 ${touched} 个 markdown 文件`);
};

(async () => {
  console.log(`压缩目录: ${IMAGE_DIR}`);
  const converted = await compressImages();
  console.log(`\n转换完成: ${converted.length} 张\n`);
  console.log('同步 markdown 图片引用 → .webp ...');
  await rewriteMarkdownRefs(converted);
  console.log('\n全部完成。');
})();
