const QUESTIONS = [
  {
    id: 'style',
    label: 'Стиль',
    text: 'Какое направление вам ближе?',
    gridClass: 'options--grid-5',
    options: [
      { value: 'klassika', icon: '🎩', title: 'Классика', desc: 'Костюмы, жакеты, деловая элегантность' },
      { value: 'romantika', icon: '🌸', title: 'Романтика', desc: 'Платья, нежность, женственность' },
      { value: 'dramatik', icon: '✨', title: 'Драматика', desc: 'Контраст, выразительность, акценты' },
      { value: 'спорт', icon: '👟', title: 'Спорт', desc: 'Комфорт, динамика, casual' },
      { value: 'этника', icon: '🪶', title: 'Этника', desc: 'Boho, этнические мотивы, свобода' },
    ],
  },
  {
    id: 'colors',
    label: 'Палитра',
    text: 'Какая цветовая гамма вам ближе?',
    options: [
      { value: 'neutral', icon: '🤍', title: 'Нейтральная', desc: 'Бежевый, белый, серый, чёрный' },
      { value: 'bright', icon: '🌈', title: 'Яркая', desc: 'Насыщенные, контрастные оттенки' },
      { value: 'warm', icon: '🍂', title: 'Тёплая' },
      { value: 'cool', icon: '💎', title: 'Холодная' },
    ],
  },
];

const DEFAULT_RESULT = {
  title: 'Ваш образ',
  image: 'images/default.svg',
  imageAlt: 'Персональный образ',
  description: 'Образ из нашей коллекции — подобран по вашему стилю и палитре.',
  outfit: 'Сочетайте базовые вещи с одним акцентным элементом.',
  beauty: 'Подчеркните естественную красоту: увлажнение, лёгкий макияж.',
  accessories: 'Выберите 1–2 акцентных аксессуара.',
  tags: ['#образ', '#стиль'],
};

const FOLDER_PROFILES = {
  klassika: {
    title: 'Классическая элегантность',
    description: 'Безупречный деловой образ в нейтральных оттенках — костюм, жакет или комплект прямого кроя для уверенного и собранного вида.',
    outfit: 'Пиджак или жакет прямого кроя, брюки или юбка-карандаш, блуза или топ, лаконичные туфли на каблуке.',
    beauty: 'Матовая кожа, nude-помада, лёгкая стрелка, собранные волосы или аккуратный пучок.',
    accessories: 'Структурированная сумка, тонкие золотые украшения, классические часы.',
    tags: ['#классика', '#деловой', '#элегантность', '#костюм'],
  },
  romantika: {
    title: 'Романтичный образ',
    description: 'Нежный женственный look с мягкими линиями и воздушными тканями — идеален для свидания, вечера и особых случаев.',
    outfit: 'Платье или юбка миди из лёгкой ткани, блуза с рукавами, каблуки или изящные сандалии.',
    beauty: 'Сияющая кожа, розовая или ягодная помада, мягкие локоны, перламутровый хайлайтер.',
    accessories: 'Жемчужные или кристальные серьги, миниатюрная сумочка, тонкий пояс.',
    tags: ['#романтика', '#нежность', '#вечер', '#женственность'],
  },
  dramatik: {
    title: 'Смелый драматичный образ',
    description: 'Выразительный look с характером — контрастные силуэты, насыщенные цвета и акцентные детали для тех, кто любит быть заметной.',
    outfit: 'Платье или комплект с необычным кроем, кожаные элементы, каблуки или массивные ботинки.',
    beauty: 'Смелый макияж глаз или губ, сияющая кожа, объёмная укладка или гладкие прямые волосы.',
    accessories: 'Крупные серьги, клатч необычной формы, массивные кольца или ремень.',
    tags: ['#драма', '#акцент', '#смелость', '#тренды'],
  },
  'спорт': {
    title: 'Спортивный шик',
    description: 'Комфортный повседневный образ в спортивно-элегантном ключе — удобство и стиль для активного дня.',
    outfit: 'Леггинсы или джоггеры, худи или свитшот, кроссовки, лёгкая куртка или бомбер.',
    beauty: 'Естественный макияж, увлажнённая кожа, блеск для губ, высокий хвост или небрежный пучок.',
    accessories: 'Рюкзак или кросс-боди, кепка или бейсболка, минимальные украшения.',
    tags: ['#спорт', '#комфорт', '#повседневный', '#активный'],
  },
  'этника': {
    title: 'Этнический стиль',
    description: 'Свободный bohemian-look с этническими мотивами, натуральными тканями и расслабленным настроением.',
    outfit: 'Свободное платье или юбка с принтом, льняная блуза, сандалии или мягкие сапоги, накидка или кардиган.',
    beauty: 'Лёгкий загар, бронзер, натуральные тона помады, распущенные волосы или лёгкие волны.',
    accessories: 'Деревянные или серебряные украшения, плетёная сумка, шарф или пояс с этническим орнаментом.',
    tags: ['#этника', '#boho', '#свобода', '#натуральность'],
  },
};

const state = {
  screen: 'welcome',
  step: 0,
  answers: {},
  selected: null,
  autoAdvanceTimer: null,
  currentResult: null,
};

const app = document.getElementById('app');

function renderWelcome() {
  app.innerHTML = `
    <div class="card card--quiz">
      <div class="welcome-icon">✦</div>
      <h1>Выбери идеальный образ</h1>
      <p class="subtitle">Два шага — и мы покажем look из коллекции: классика, романтика, драматика, спорт или этника</p>
      <button type="button" class="btn btn-primary" id="startBtn">Начать подбор</button>
    </div>
  `;
  document.getElementById('startBtn').addEventListener('click', startQuiz);
}

function startQuiz() {
  clearAutoAdvance();
  state.screen = 'quiz';
  state.step = 0;
  state.answers = {};
  state.selected = null;
  state.currentResult = null;
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[state.step];
  const progress = ((state.step + 1) / QUESTIONS.length) * 100;

  app.innerHTML = `
    <div class="card card--quiz">
      <div class="progress-wrap">
        <div class="progress-meta">
          <span>Вопрос ${state.step + 1} из ${QUESTIONS.length}</span>
          <span>${Math.round(progress)}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <p class="question-label">${q.label}</p>
      <h2 class="question-text">${q.text}</h2>

      <div class="options options--grid ${q.gridClass || ''}" role="radiogroup" aria-label="${q.text}">
        ${q.options.map(opt => `
          <button
            type="button"
            class="option option--tile ${state.selected === opt.value ? 'selected' : ''}"
            data-value="${opt.value}"
            role="radio"
            aria-checked="${state.selected === opt.value}"
          >
            <span class="option-icon">${opt.icon}</span>
            <span class="option-text">
              <strong>${opt.title}</strong>
              ${opt.desc ? `<span>${opt.desc}</span>` : ''}
            </span>
          </button>
        `).join('')}
      </div>

      <p class="selection-hint ${state.selected ? 'selection-hint--hidden' : ''}" id="selectionHint">
        Выберите один из вариантов, чтобы продолжить
      </p>

      <button type="button" class="btn btn-primary" id="nextBtn" ${!state.selected ? 'disabled' : ''}>
        ${state.step < QUESTIONS.length - 1 ? 'Далее' : 'Узнать результат'}
      </button>

      ${state.step > 0 ? '<button type="button" class="btn-back" id="backBtn">← Назад</button>' : ''}
    </div>
  `;

  document.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => selectOption(btn.dataset.value));
  });

  document.getElementById('nextBtn').addEventListener('click', nextStep);
  const backBtn = document.getElementById('backBtn');
  if (backBtn) backBtn.addEventListener('click', prevStep);
}

function clearAutoAdvance() {
  if (state.autoAdvanceTimer) {
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }
}

function selectOption(value) {
  state.selected = value;

  document.querySelectorAll('.option').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === value);
    btn.setAttribute('aria-checked', btn.dataset.value === value);
  });

  const nextBtn = document.getElementById('nextBtn');
  const hint = document.getElementById('selectionHint');

  if (nextBtn) nextBtn.disabled = false;
  if (hint) hint.classList.add('selection-hint--hidden');

  clearAutoAdvance();
  state.autoAdvanceTimer = setTimeout(() => {
    if (state.selected === value) {
      nextStep();
    }
  }, 450);
}

function nextStep() {
  clearAutoAdvance();

  if (!state.selected) {
    const hint = document.getElementById('selectionHint');
    if (hint) {
      hint.classList.remove('selection-hint--hidden');
      hint.classList.add('selection-hint--shake');
      setTimeout(() => hint.classList.remove('selection-hint--shake'), 500);
    }
    return;
  }

  const q = QUESTIONS[state.step];
  state.answers[q.id] = state.selected;

  if (state.step < QUESTIONS.length - 1) {
    state.step++;
    state.selected = state.answers[QUESTIONS[state.step].id] || null;
    renderQuestion();
  } else {
    renderResult();
  }
}

function prevStep() {
  clearAutoAdvance();

  if (state.step > 0) {
    state.step--;
    state.selected = state.answers[QUESTIONS[state.step].id] || null;
    renderQuestion();
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enrichResult(result, answers = {}) {
  const photo = pickStylePhoto(answers);

  if (!photo?.image) {
    return { ...result, fallbackImage: result.image };
  }

  const folderLabel = STYLE_FOLDER_LABELS?.[photo.folder] || photo.folder;
  const profile = FOLDER_PROFILES[photo.folder] || {
    title: folderLabel,
    description: `Образ в стиле «${folderLabel}» — подобран по вашим ответам в квизе.`,
    outfit: 'Сочетайте базовые вещи с одним акцентным элементом — это всегда работает.',
    beauty: 'Подчеркните естественную красоту: увлажнение, лёгкий макияж, ухоженные волосы.',
    accessories: 'Выберите 1–2 акцентных аксессуара, не перегружая образ.',
    tags: ['#стиль', '#образ', `#${photo.folder}`],
  };
  const colorLabel = COLOR_LABELS?.[answers.colors] || '';

  return {
    ...result,
    title: profile.title || result.title,
    description: profile.description || result.description,
    outfit: profile.outfit || result.outfit,
    beauty: profile.beauty || result.beauty,
    accessories: profile.accessories || result.accessories,
    tags: profile.tags || result.tags,
    image: photo.image,
    fallbackImage: result.image,
    imageAlt: `${profile.title || result.title} — ${folderLabel}`,
    sourceLabel: folderLabel,
    colorLabel,
    styleLabel: folderLabel,
    photoFolder: photo.folder,
  };
}

function pickStylePhoto(answers) {
  if (typeof STYLE_GALLERY === 'undefined') return null;

  const folder = answers.style;
  const items = STYLE_GALLERY[folder];
  if (!items?.length) return null;

  const PALETTE_INDEX = { neutral: 0, bright: 1, warm: 2, cool: 3 };
  const paletteIdx = PALETTE_INDEX[answers.colors] ?? 0;
  const step = Math.max(1, Math.floor(items.length / 4));
  const idx = Math.min(paletteIdx * step, items.length - 1);

  const file = typeof items[idx] === 'string' ? items[idx] : items[idx].file;
  if (!file) return null;

  return {
    image: `images/${folder}/${file}`,
    folder,
  };
}

function buildResultHtml(result, { forPrint = false } = {}) {
  const printClass = forPrint ? ' pdf-sheet' : '';
  const actionsClass = forPrint ? ' no-print' : '';

  return `
    <div class="card card--result${printClass}" id="resultCard">
      <div class="result-layout">
        <div class="result-photo">
          <img
            class="result-image"
            src="${result.image}"
            alt="${result.imageAlt}"
            loading="eager"
            onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}"
            data-fallback="${result.fallbackImage || ''}"
          >
        </div>

        <div class="result-content">
          <span class="result-badge">Ваш идеальный образ</span>

          <h2 class="result-title">${result.title}</h2>
          ${result.sourceLabel ? `<p class="result-source">Стиль: ${result.styleLabel || result.sourceLabel}${result.colorLabel ? ` · ${result.colorLabel}` : ''}</p>` : ''}
          <p class="result-desc">${result.description}</p>

          <div class="result-recommendations">
            <h3 class="result-recommendations-heading">Общие идеи для вашего образа по выбранному стилю</h3>
          </div>

          <div class="result-details">
            <div class="result-detail">
              <h3>Одежда</h3>
              <p>${result.outfit}</p>
            </div>
            <div class="result-detail">
              <h3>Красота</h3>
              <p>${result.beauty}</p>
            </div>
            <div class="result-detail">
              <h3>Аксессуары</h3>
              <p>${result.accessories}</p>
            </div>
          </div>

          <div class="result-tags">
            ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>

          ${forPrint ? `
            <p class="pdf-footer">
              StyleLab · Ваш персональный стилист · ${new Date().toLocaleDateString('ru-RU')}
            </p>
          ` : `
            <div class="btn-group${actionsClass}">
              <button type="button" class="btn btn-primary" id="downloadBtn">Скачать</button>
              <button type="button" class="btn btn-secondary" id="restartBtn">Пройти заново</button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderResult() {
  state.screen = 'result';
  clearAutoAdvance();

  const result = enrichResult(DEFAULT_RESULT, state.answers);
  state.currentResult = result;

  app.innerHTML = buildResultHtml(result);
  scrollToTop();

  document.getElementById('downloadBtn').addEventListener('click', () => downloadJpg(result));
  document.getElementById('restartBtn').addEventListener('click', () => {
    state.step = 0;
    state.answers = {};
    state.selected = null;
    state.currentResult = null;
    renderWelcome();
  });
}

async function waitImageLoad(img) {
  if (!img) return;
  if (img.complete) return;
  await new Promise(resolve => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
    setTimeout(resolve, 5000);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function embedImageAsDataUrl(img) {
  if (!img || img.src.startsWith('data:')) return;

  try {
    const response = await fetch(img.src);
    if (response.ok) {
      img.src = await blobToDataUrl(await response.blob());
      await waitImageLoad(img);
      return;
    }
  } catch (_) {}

  try {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    img.src = canvas.toDataURL('image/jpeg', 0.92);
    await waitImageLoad(img);
  } catch (_) {}
}

function saveCanvasAsJpg(canvas, filename) {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Не удалось создать JPG'));
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/jpeg', 0.92);
      return;
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    resolve();
  });
}

async function downloadJpg(result) {
  const card = document.getElementById('resultCard');
  const btn = document.getElementById('downloadBtn');
  if (!card || !btn) return;

  const originalText = btn.textContent;
  btn.textContent = 'Готовим…';
  btn.disabled = true;

  const img = card.querySelector('.result-image');
  await waitImageLoad(img);

  card.classList.add('pdf-sheet');
  document.body.classList.add('pdf-export');

  try {
    if (typeof html2canvas !== 'function') {
      throw new Error('Библиотека html2canvas не загружена');
    }

    await embedImageAsDataUrl(img);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const canvas = await html2canvas(card, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const filename = `obraz-${result.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    await saveCanvasAsJpg(canvas, filename);
    btn.textContent = 'Скачано';
  } catch (err) {
    console.error(err);
    if (result.image) {
      try {
        const link = document.createElement('a');
        link.href = result.image;
        link.download = `obraz-foto.jpg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        btn.textContent = 'Скачано фото';
        return;
      } catch (_) {}
    }
    btn.textContent = 'Не удалось скачать';
  } finally {
    card.classList.remove('pdf-sheet');
    document.body.classList.remove('pdf-export');
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2500);
  }
}

renderWelcome();
