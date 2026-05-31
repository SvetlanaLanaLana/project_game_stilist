import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesDir = path.join(root, 'images');
const outDir = path.join(imagesDir, 'extracted');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const PDF_SOURCES = [
  { fileMatch: 'драмат', id: 'dramatic', label: 'Драматический стиль' },
  { fileMatch: 'классич', id: 'classic', label: 'Классический стиль' },
  { fileMatch: 'романт', id: 'romantic', label: 'Романтический стиль' },
  { fileMatch: 'спортив', id: 'sport', label: 'Спортивный стиль' },
  { fileMatch: 'цвет', id: 'color', label: 'Цвет — эмоциональный компонент' },
  { fileMatch: 'этнич', id: 'ethnic', label: 'Этнический стиль' },
];

function extractJpegsFromPdf(buffer) {
  const images = [];
  let i = 0;

  while (i < buffer.length - 4) {
    if (buffer[i] === 0xff && buffer[i + 1] === 0xd8 && buffer[i + 2] === 0xff) {
      let j = i + 2;
      while (j < buffer.length - 1) {
        if (buffer[j] === 0xff && buffer[j + 1] === 0xd9) {
          j += 2;
          break;
        }
        j++;
      }
      const slice = buffer.subarray(i, j);
      if (slice.length > 20000) images.push(slice);
      i = j;
    } else {
      i++;
    }
  }

  return images.sort((a, b) => b.length - a.length);
}

const catalog = [];

for (const source of PDF_SOURCES) {
  const pdfName = fs.readdirSync(imagesDir).find(
    f => f.toLowerCase().endsWith('.pdf') && f.toLowerCase().includes(source.fileMatch)
  );

  if (!pdfName) continue;

  const buffer = fs.readFileSync(path.join(imagesDir, pdfName));
  const jpegs = extractJpegsFromPdf(buffer);
  const savedImages = [];

  jpegs.slice(0, 6).forEach((jpeg, index) => {
    const fileName = `${source.id}-${index + 1}.jpg`;
    fs.writeFileSync(path.join(outDir, fileName), jpeg);
    savedImages.push(`images/extracted/${fileName}`);
  });

  catalog.push({
    id: source.id,
    label: source.label,
    pdf: pdfName,
    images: savedImages,
    coverImage: savedImages[0] || null,
  });
}

const RESULT_IMAGE_MAP = {
  'classic-confident': { sourceId: 'classic', imageIndex: 4 },
  'romantic-soft': { sourceId: 'romantic', imageIndex: 0 },
  'minimal-fresh': { sourceId: 'sport', imageIndex: 1 },
  'bold-statement': { sourceId: 'dramatic', imageIndex: 0 },
  'romantic-date': { sourceId: 'romantic', imageIndex: 1 },
  'casual-comfort': { sourceId: 'sport', imageIndex: 0 },
  'mysterious-cool': { sourceId: 'dramatic', imageIndex: 1 },
  'versatile-quality': { sourceId: 'classic', imageIndex: 5 },
  default: { sourceId: 'color', imageIndex: 0 },
};

function toDataUrl(relativePath) {
  if (!relativePath) return null;
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  const buffer = fs.readFileSync(fullPath);
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

function getImage(sourceId, imageIndex) {
  const entry = catalog.find(c => c.id === sourceId);
  if (!entry) return null;
  return entry.images[imageIndex] || entry.coverImage;
}

const resultAssets = {};
for (const [key, map] of Object.entries(RESULT_IMAGE_MAP)) {
  const source = catalog.find(c => c.id === map.sourceId);
  const imageFile = getImage(map.sourceId, map.imageIndex);
  resultAssets[key] = {
    image: toDataUrl(imageFile) || imageFile,
    imageFile,
    sourceLabel: source?.label || '',
    sourcePdf: source?.pdf || '',
  };
}

const stylesData = { generatedAt: new Date().toISOString(), catalog, resultAssets };
fs.writeFileSync(path.join(root, 'styles-data.json'), JSON.stringify(stylesData, null, 2), 'utf8');

const jsContent = `// Автоматически сгенерировано из PDF-файлов в папке images/
// Изображения встроены в base64 для работы через file://
const STYLE_ASSETS = ${JSON.stringify(resultAssets, null, 2)};

const STYLE_CATALOG = ${JSON.stringify(catalog.map(({ id, label, pdf, coverImage }) => ({ id, label, pdf, coverImage })), null, 2)};
`;

fs.writeFileSync(path.join(root, 'style-assets.js'), jsContent, 'utf8');
console.log('Generated style-assets.js with', Object.keys(resultAssets).length, 'mappings');
