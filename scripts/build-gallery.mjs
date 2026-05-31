import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'images');

const STYLE_FOLDERS = ['klassika', 'romantika', 'dramatik', 'спорт', 'этника'];
const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

function sortByNumber(files) {
  return files.sort((a, b) => {
    const na = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const nb = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return na - nb;
  });
}

function mimeType(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
}

function scanFolder(folderName) {
  const dir = path.join(imagesDir, folderName);
  if (!fs.existsSync(dir)) return [];

  const files = sortByNumber(
    fs.readdirSync(dir).filter(f => IMAGE_EXT.test(f) && !f.startsWith('.'))
  );

  return files.map(file => {
    const buffer = fs.readFileSync(path.join(dir, file));
    return {
      file,
      path: `images/${folderName}/${file}`,
      data: `data:${mimeType(file)};base64,${buffer.toString('base64')}`,
      sizeKb: Math.round(buffer.length / 1024),
    };
  });
}

const gallery = {};
let totalKb = 0;

for (const folder of STYLE_FOLDERS) {
  const items = scanFolder(folder);
  gallery[folder] = items;
  totalKb += items.reduce((sum, item) => sum + item.sizeKb, 0);
  console.log(`${folder}: ${items.length} фото`);
}

const compactGallery = {};
for (const [folder, items] of Object.entries(gallery)) {
  compactGallery[folder] = items.map(({ file, data }) => ({ file, data }));
}

const output = `// Сгенерировано из папок images/
// Пересобрать: node scripts/build-gallery.mjs

const STYLE_GALLERY = ${JSON.stringify(compactGallery, null, 2)};

const STYLE_FOLDER_LABELS = {
  klassika: 'Классический стиль',
  romantika: 'Романтический стиль',
  dramatik: 'Драматический стиль',
  'спорт': 'Спортивный стиль',
  'этника': 'Этнический стиль',
};

const COLOR_LABELS = {
  neutral: 'Нейтральная палитра',
  warm: 'Тёплая палитра',
  cool: 'Холодная палитра',
  bright: 'Яркая палитра',
};
`;

fs.writeFileSync(path.join(root, 'style-gallery.js'), output, 'utf8');
console.log(`\nstyle-gallery.js — ${Math.round(totalKb / 1024 * 1.37)} МБ (оценка)`);
