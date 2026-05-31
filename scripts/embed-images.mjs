import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const MAP = {
  'classic-confident': 'images/extracted/classic-5.jpg',
  'romantic-soft': 'images/extracted/romantic-1.jpg',
  'minimal-fresh': 'images/extracted/sport-2.jpg',
  'bold-statement': 'images/extracted/dramatic-1.jpg',
  'romantic-date': 'images/extracted/romantic-2.jpg',
  'casual-comfort': 'images/extracted/sport-1.jpg',
  'mysterious-cool': 'images/extracted/dramatic-2.jpg',
  'versatile-quality': 'images/extracted/classic-6.jpg',
  default: 'images/extracted/color-6.jpg',
};

const LABELS = {
  'classic-confident': 'Классический стиль',
  'romantic-soft': 'Романтический стиль',
  'minimal-fresh': 'Спортивный стиль',
  'bold-statement': 'Драматический стиль',
  'romantic-date': 'Романтический стиль',
  'casual-comfort': 'Спортивный стиль',
  'mysterious-cool': 'Драматический стиль',
  'versatile-quality': 'Классический стиль',
  default: 'Цвет — эмоциональный компонент',
};

function toDataUrl(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) {
    console.warn('Missing:', relativePath);
    return null;
  }
  const buf = fs.readFileSync(full);
  console.log('OK:', relativePath, Math.round(buf.length / 1024) + ' KB');
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const assets = {};
for (const [key, file] of Object.entries(MAP)) {
  assets[key] = {
    image: toDataUrl(file),
    imageFile: file,
    sourceLabel: LABELS[key] || '',
  };
}

const out = `// Автоматически сгенерировано — фото встроены в base64 для file://
const STYLE_ASSETS = ${JSON.stringify(assets, null, 2)};
`;

fs.writeFileSync(path.join(root, 'style-assets.js'), out, 'utf8');
console.log('Written style-assets.js', Math.round(out.length / 1024) + ' KB');
