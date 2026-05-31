import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'images');
const outputFile = path.join(root, 'style-gallery.js');

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;
const SKIP_FOLDERS = new Set(['Originals', 'originals']);

const KNOWN_LABELS = {
  klassika: 'Классический стиль',
  romantika: 'Романтический стиль',
  dramatik: 'Драматический стиль',
  'спорт': 'Спортивный стиль',
  'этника': 'Этнический стиль',
};

function sortByNumber(files) {
  return files.sort((a, b) => {
    const na = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const nb = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return na - nb;
  });
}

function getStyleFolders() {
  if (!fs.existsSync(imagesDir)) return [];

  return fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') && !SKIP_FOLDERS.has(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b, 'ru'));
}

function scanFolder(folderName) {
  const dir = path.join(imagesDir, folderName);
  return sortByNumber(
    fs.readdirSync(dir).filter(file => IMAGE_EXT.test(file) && !file.startsWith('.'))
  );
}

function buildGallery() {
  const folders = getStyleFolders();
  const gallery = {};
  const labels = {};
  let totalPhotos = 0;

  for (const folder of folders) {
    const files = scanFolder(folder);
    gallery[folder] = files;
    labels[folder] = KNOWN_LABELS[folder] || folder.charAt(0).toUpperCase() + folder.slice(1);
    totalPhotos += files.length;
    console.log(`${folder}: ${files.length} фото`);
  }

  const generatedAt = new Date().toLocaleString('ru-RU');
  const output = `// Автоматически сгенерировано из папок images/
// Обновлено: ${generatedAt}
// Пересобрать: npm run build:gallery
// Авто-обновление: npm run watch:gallery

const STYLE_GALLERY = ${JSON.stringify(gallery, null, 2)};

const STYLE_FOLDER_LABELS = ${JSON.stringify(labels, null, 2)};

const COLOR_LABELS = {
  neutral: 'Нейтральная палитра',
  warm: 'Тёплая палитра',
  cool: 'Холодная палитра',
  bright: 'Яркая палитра',
};
`;

  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`\nstyle-gallery.js — ${totalPhotos} фото, ${folders.length} папок`);
}

let rebuildTimer = null;

function scheduleRebuild(reason) {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(() => {
    console.log(`\nОбновление галереи (${reason})…`);
    buildGallery();
    console.log('Готово. Обновите страницу квиза в браузере.\n');
  }, 400);
}

buildGallery();

if (process.argv.includes('--watch')) {
  if (!fs.existsSync(imagesDir)) {
    console.error('Папка images/ не найдена');
    process.exit(1);
  }

  console.log('\nСледим за папкой images/ — новые фото подхватятся автоматически.');
  console.log('Остановить: Ctrl+C\n');

  fs.watch(imagesDir, { recursive: true }, (_event, filename) => {
    if (!filename || !IMAGE_EXT.test(filename)) return;
    scheduleRebuild(filename);
  });
}
