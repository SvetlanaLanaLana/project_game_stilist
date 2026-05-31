const QUESTIONS = [
  {
    id: 'event',
    label: 'Событие',
    text: 'Куда вы собираетесь?',
    options: [
      { value: 'work', icon: '💼', title: 'Работа / деловая встреча', desc: 'Офис, переговоры, презентация' },
      { value: 'date', icon: '🥂', title: 'Романтическое свидание', desc: 'Ужин, прогулка, особый вечер' },
      { value: 'party', icon: '✨', title: 'Вечеринка / мероприятие', desc: 'Коктейль, галерея, выход в свет' },
      { value: 'casual', icon: '☕', title: 'Повседневный день', desc: 'Кафе, шопинг, прогулка с друзьями' },
    ],
  },
  {
    id: 'style',
    label: 'Стиль',
    text: 'Какой стиль вам ближе?',
    options: [
      { value: 'classic', icon: '🎩', title: 'Классика', desc: 'Элегантность, лаконичность, вне времени' },
      { value: 'romantic', icon: '🌸', title: 'Романтика', desc: 'Нежность, женственность, мягкие линии' },
      { value: 'minimal', icon: '◻️', title: 'Минимализм', desc: 'Чистые формы, нейтральная палитра' },
      { value: 'bold', icon: '🔥', title: 'Смелый / трендовый', desc: 'Акценты, необычные сочетания' },
    ],
  },
  {
    id: 'colors',
    label: 'Цвета',
    text: 'Какая палитра вам откликается?',
    options: [
      { value: 'neutral', icon: '🤍', title: 'Нейтральная', desc: 'Бежевый, белый, серый, чёрный' },
      { value: 'warm', icon: '🍂', title: 'Тёплая', desc: 'Карамель, терракота, золото' },
      { value: 'cool', icon: '💎', title: 'Холодная', desc: 'Пудра, лаванда, серебро' },
      { value: 'bright', icon: '🌈', title: 'Яркая', desc: 'Насыщенные, контрастные оттенки' },
    ],
  },
  {
    id: 'mood',
    label: 'Настроение',
    text: 'Какое впечатление хотите произвести?',
    options: [
      { value: 'confident', icon: '👑', title: 'Уверенность', desc: 'Сильный, собранный образ' },
      { value: 'soft', icon: '🕊️', title: 'Мягкость', desc: 'Лёгкость, открытость, тепло' },
      { value: 'mysterious', icon: '🌙', title: 'Интрига', desc: 'Загадочность, глубина' },
      { value: 'fresh', icon: '☀️', title: 'Свежесть', desc: 'Бодрость, естественность' },
    ],
  },
  {
    id: 'priority',
    label: 'Приоритет',
    text: 'Что для вас важнее всего?',
    options: [
      { value: 'comfort', icon: '🛋️', title: 'Комфорт', desc: 'Удобство на весь день' },
      { value: 'statement', icon: '💫', title: 'Эффектность', desc: 'Запоминающийся образ' },
      { value: 'versatile', icon: '🔄', title: 'Универсальность', desc: 'Легко адаптировать под разные ситуации' },
      { value: 'quality', icon: '✨', title: 'Качество', desc: 'Премиальные материалы и фактуры' },
    ],
  },
];

const RESULTS = {
  'classic-confident': {
    title: 'Сила классики',
    image: 'images/classic.svg',
    imageAlt: 'Деловой классический образ',
    description: 'Строгий, но безупречный образ для тех, кто ценит элегантность и авторитет. Идеален для деловой среды и важных встреч.',
    outfit: 'Пиджак прямого кроя, шёлковая блуза или рубашка, брюки со стрелками, лаконичные туфли на каблуке.',
    beauty: 'Матовая кожа, nude-помада, стрелки, собранные волосы или гладкий пучок.',
    accessories: 'Тонкие золотые украшения, структурированная сумка, классические часы.',
    tags: ['#классика', '#деловой', '#элегантность', '#вне_времени'],
  },
  'romantic-soft': {
    title: 'Нежная романтика',
    image: 'images/romantic.svg',
    imageAlt: 'Романтичный нежный образ',
    description: 'Нежный, воздушный образ с романтичным настроением. Создаёт ощущение лёгкости и женственности.',
    outfit: 'Платье или юбка миди из лёгкой ткани, мягкий кардиган, балетки или сандалии на низком каблуке.',
    beauty: 'Румянец на яблочках щёк, розовая помада, лёгкие локоны, перламутровый хайлайтер.',
    accessories: 'Жемчужные серьги, тонкий пояс, миниатюрная сумочка.',
    tags: ['#романтика', '#нежность', '#пастель', '#женственность'],
  },
  'minimal-fresh': {
    title: 'Чистый минимализм',
    image: 'images/minimal.svg',
    imageAlt: 'Минималистичный свежий образ',
    description: 'Чистые линии и спокойная палитра — образ для тех, кто ценит простоту и современную эстетику.',
    outfit: 'Свободная рубашка или свитер оверсайз, прямые брюки, белые кроссовки или минималистичные лоферы.',
    beauty: 'Естественный макияж, увлажнённая кожа, блеск для губ, гладкие или собранные волосы.',
    accessories: 'Одно акцентное кольцо, текстильная сумка, солнцезащитные очки.',
    tags: ['#минимализм', '#чистота', '#повседневный', '#современность'],
  },
  'bold-statement': {
    title: 'Смелый акцент',
    image: 'images/bold.svg',
    imageAlt: 'Яркий эффектный образ',
    description: 'Яркий, запоминающийся образ для тех, кто не боится быть в центре внимания.',
    outfit: 'Платье или комплект с необычным кроем, контрастные цвета, каблуки или массивные ботинки.',
    beauty: 'Смелый макияж глаз или губ, сияющая кожа, объёмные волосы или гладкая укладка.',
    accessories: 'Крупные серьги, клатч необычной формы, несколько колец.',
    tags: ['#акцент', '#тренды', '#яркий', '#вечеринка'],
  },
  'romantic-date': {
    title: 'Сияние вечера',
    image: 'images/date.svg',
    imageAlt: 'Вечерний образ для свидания',
    description: 'Изысканный вечерний образ с ноткой романтики — идеален для особого свидания.',
    outfit: 'Платье с открытыми плечами или slip-платье, каблуки, лёгкий пиджак или накидка.',
    beauty: 'Сияющая кожа, дымчатые глаза, красная или ягодная помада, объёмная укладка.',
    accessories: 'Бриллиантовые или кристальные серьги, клатч, тонкий браслет.',
    tags: ['#свидание', '#вечер', '#гламур', '#романтика'],
  },
  'casual-comfort': {
    title: 'Лёгкий шик',
    image: 'images/casual.svg',
    imageAlt: 'Повседневный стильный образ',
    description: 'Стильный повседневный образ без усилий — комфорт и эстетика в одном.',
    outfit: 'Джинсы или брюки свободного кроя, базовый топ, пиджак оверсайз или тренч, кроссовки или лоферы.',
    beauty: 'BB-крем, тонированный бальзам для губ, аккуратные брови, небрежный пучок или хвост.',
    accessories: 'Солнцезащитные очки, шоппер, минимальные украшения.',
    tags: ['#повседневный', '#комфорт', '#на_каждый_день', '#шик'],
  },
  'mysterious-cool': {
    title: 'Тёмная элегантность',
    image: 'images/dark.svg',
    imageAlt: 'Загадочный тёмный образ',
    description: 'Загадочный, утончённый образ в холодной палитре — для тех, кто любит интригу.',
    outfit: 'Total black или монохром: платье-свитер, кожаная куртка, сапоги или ботильоны.',
    beauty: 'Матовая кожа, тёмные губы, графичная стрелка, прямые волосы или низкий пучок.',
    accessories: 'Серебряные украшения, структурированная сумка, тонкий ремень.',
    tags: ['#тёмный', '#загадка', '#монохром', '#дерзость'],
  },
  'versatile-quality': {
    title: 'Капсульная роскошь',
    image: 'images/luxe.svg',
    imageAlt: 'Премиальный универсальный образ',
    description: 'Универсальный премиальный образ — инвестиция в качество, которая работает в любой ситуации.',
    outfit: 'Кашемировый свитер, брюки по фигуре, качественное пальто, классические туфли.',
    beauty: 'Ухоженная кожа, нейтральный макияж, здоровое сияние, аккуратная укладка.',
    accessories: 'Кожаная сумка, шёлковый платок, тонкие золотые украшения.',
    tags: ['#люкс', '#капсула', '#качество', '#универсальность'],
  },
};

const DEFAULT_RESULT = {
  title: 'Ваш фирменный образ',
  image: 'images/default.svg',
  imageAlt: 'Уникальный персональный образ',
  description: 'Уникальный образ, сочетающий ваши предпочтения. Экспериментируйте с текстурами и акцентами!',
  outfit: 'Сочетайте базовые вещи с одним акцентным элементом — это всегда работает.',
  beauty: 'Подчеркните естественную красоту: увлажнение, лёгкий макияж, ухоженные волосы.',
  accessories: 'Выберите 1–2 акцентных аксессуара, не перегружая образ.',
  tags: ['#ваш_стиль', '#образ', '#уникальность', '#стиль'],
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

function getResultKey(answers) {
  const { event, style, colors, mood, priority } = answers;

  if (event === 'date' && (style === 'romantic' || mood === 'soft' || mood === 'mysterious')) {
    return 'romantic-date';
  }
  if (style === 'classic' && (mood === 'confident' || event === 'work')) {
    return 'classic-confident';
  }
  if (style === 'romantic' && mood === 'soft') {
    return 'romantic-soft';
  }
  if (style === 'minimal' && (mood === 'fresh' || colors === 'neutral')) {
    return 'minimal-fresh';
  }
  if (style === 'bold' || priority === 'statement' || colors === 'bright') {
    return 'bold-statement';
  }
  if (event === 'casual' && priority === 'comfort') {
    return 'casual-comfort';
  }
  if (mood === 'mysterious' || colors === 'cool') {
    return 'mysterious-cool';
  }
  if (priority === 'quality' || priority === 'versatile') {
    return 'versatile-quality';
  }

  const fallbackMap = {
    work: 'classic-confident',
    date: 'romantic-date',
    party: 'bold-statement',
    casual: 'casual-comfort',
  };

  return fallbackMap[event] || 'versatile-quality';
}

function renderWelcome() {
  app.innerHTML = `
    <div class="card card--quiz">
      <div class="welcome-icon">✦</div>
      <h1>Выбери идеальный образ</h1>
      <p class="subtitle">Ответьте на 5 коротких вопросов — и мы подберём образ, который отражает ваш стиль, настроение и повод</p>
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

      <div class="options options--grid" role="radiogroup" aria-label="${q.text}">
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
              <span>${opt.desc}</span>
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

  const profile = FOLDER_PROFILES[photo.folder] || {};
  const folderLabel = STYLE_FOLDER_LABELS?.[photo.folder] || photo.folder;
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

function getPhotoFolders(answers) {
  const { event, style, colors, mood, priority } = answers;

  if (event === 'date' || event === 'party') {
    return ['romantika'];
  }

  if (event === 'casual') {
    if (style === 'bold' || priority === 'statement' || colors === 'bright') {
      return ['dramatik'];
    }
    if (style === 'minimal' || priority === 'comfort' || mood === 'fresh') {
      return ['спорт'];
    }
    if (style === 'romantic' || colors === 'warm' || mood === 'soft') {
      return ['этника'];
    }
    if (style === 'classic') {
      return ['этника', 'спорт', 'dramatik'];
    }
    if (mood === 'mysterious' || colors === 'cool') {
      return ['dramatik'];
    }
    return ['спорт', 'этника', 'dramatik'];
  }

  if (style === 'classic') {
    return ['klassika', 'romantika'];
  }
  if (style === 'romantic') {
    return ['romantika'];
  }
  if (style === 'bold') {
    return ['dramatik'];
  }
  if (style === 'minimal') {
    return event === 'work' ? ['klassika'] : ['спорт', 'klassika'];
  }

  if (event === 'work') {
    return ['klassika'];
  }

  return ['klassika', 'romantika'];
}

function pickStylePhoto(answers) {
  if (typeof STYLE_GALLERY === 'undefined') return null;

  const COLOR_INDEX = { neutral: 0, warm: 1, cool: 2, bright: 3 };
  const MOOD_OFFSET = { confident: 0, soft: 1, mysterious: 2, fresh: 3 };
  const PRIORITY_OFFSET = { comfort: 0, statement: 1, versatile: 2, quality: 3 };

  const folders = getPhotoFolders(answers);
  const pool = [];

  for (const folder of folders) {
    const items = STYLE_GALLERY[folder];
    if (!items?.length) continue;
    for (const item of items) {
      pool.push({ ...item, folder });
    }
  }

  if (!pool.length) return null;

  const colors = answers.colors || 'neutral';
  const mood = answers.mood || 'confident';
  const priority = answers.priority || 'comfort';
  const idx = (
    (COLOR_INDEX[colors] || 0)
    + (MOOD_OFFSET[mood] || 0)
    + (PRIORITY_OFFSET[priority] || 0)
  ) % pool.length;

  const picked = pool[idx];

  return {
    image: picked.data,
    folder: picked.folder,
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
              <button type="button" class="btn btn-primary" id="pdfBtn">Сохранить PDF</button>
              <button type="button" class="btn btn-secondary" id="restartBtn">Пройти заново</button>
              <button type="button" class="btn btn-ghost" id="shareBtn">Поделиться результатом</button>
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

  const key = getResultKey(state.answers);
  const baseResult = RESULTS[key] || DEFAULT_RESULT;
  const result = enrichResult(baseResult, state.answers);
  state.currentResult = result;

  app.innerHTML = buildResultHtml(result);
  scrollToTop();

  document.getElementById('pdfBtn').addEventListener('click', () => downloadPdf(result));
  document.getElementById('restartBtn').addEventListener('click', () => {
    state.step = 0;
    state.answers = {};
    state.selected = null;
    state.currentResult = null;
    renderWelcome();
  });
  document.getElementById('shareBtn').addEventListener('click', () => shareResult(result));
}

async function downloadPdf(result) {
  const btn = document.getElementById('pdfBtn');
  const originalText = btn.textContent;
  btn.textContent = 'Готовим PDF…';
  btn.disabled = true;

  const container = document.createElement('div');
  container.className = 'pdf-container';
  container.innerHTML = buildResultHtml(result, { forPrint: true });
  document.body.appendChild(container);

  const card = container.querySelector('#resultCard');

  try {
    if (typeof html2pdf !== 'undefined') {
      await html2pdf().set({
        margin: [12, 12, 12, 12],
        filename: `образ-${result.title.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      }).from(card).save();
    } else {
      window.print();
    }
  } catch {
    window.print();
  } finally {
    container.remove();
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

function shareResult(result) {
  const text = `Мой идеальный образ — «${result.title}»! ${result.description}`;

  if (navigator.share) {
    navigator.share({ title: 'Выбери идеальный образ', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('shareBtn');
      const original = btn.textContent;
      btn.textContent = 'Скопировано!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    }).catch(() => {});
  }
}

renderWelcome();
