// ============================================
// French Learning App - Main JavaScript
// ============================================

(function () {
    'use strict';

    // ============================================
    // State Management
    // ============================================
    const state = {
        currentSection: 'home',
        currentVocabCategory: 'famille',
        currentVocabMode: 'list',
        currentGrammarTopic: 'imperatif',
        currentExerciseType: 'translate',
        textMode: 'read',

        // Flashcard state
        flashcardIndex: 0,
        flashcards: [],
        isFlipped: false,
        showFrFirst: true,

        // Test state
        testIndex: 0,
        testWords: [],
        testCorrect: 0,
        testWrong: 0,

        // Translation exercise state
        translateIndex: 0,
        translateCompleted: [],

        // Progress tracking
        progress: {
            texte: { read: [], memorized: [] },
            vocab: { learned: [], hard: [] },
            exercises: { completed: [], correct: [] }
        }
    };

    // Load progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem('frenchapp_progress');
        if (saved) {
            try {
                state.progress = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
    }

    // Save progress to localStorage
    function saveProgress() {
        localStorage.setItem('frenchapp_progress', JSON.stringify(state.progress));
        updateProgressUI();
    }

    // ============================================
    // Theme Management
    // ============================================
    function initTheme() {
        const savedTheme = localStorage.getItem('frenchapp_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        document.getElementById('theme-toggle').addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('frenchapp_theme', newTheme);
        });
    }

    // ============================================
    // Navigation
    // ============================================
    function initNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.section');

        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const sectionId = btn.dataset.section;
                navigateTo(sectionId);
            });
        });

        // Quick cards navigation
        document.querySelectorAll('.quick-card').forEach(card => {
            card.addEventListener('click', () => {
                navigateTo(card.dataset.goto);
            });
        });
    }

    function navigateTo(sectionId) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionId);
        });

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        state.currentSection = sectionId;

        // Initialize section content if needed
        if (sectionId === 'texte') initTexte();
        if (sectionId === 'vocabulaire') initVocabulaire();
        if (sectionId === 'grammaire') initGrammaire();
        if (sectionId === 'exercises') initExercises();
    }

    // ============================================
    // Progress UI
    // ============================================
    function updateProgressUI() {
        // Text progress
        const textTotal = lessonData.texte.content.length;
        const textDone = state.progress.texte.read.length;
        const textPercent = Math.round((textDone / textTotal) * 100);
        updateProgressCircle('texte', textPercent);

        // Vocab progress
        const vocabTotal = lessonData.vocabulaire.famille.length +
            lessonData.vocabulaire.relations.length +
            lessonData.vocabulaire.expressions.length;
        const vocabDone = state.progress.vocab.learned.length;
        const vocabPercent = Math.round((vocabDone / vocabTotal) * 100);
        updateProgressCircle('vocab', vocabPercent);

        // Exercises progress
        const exTotal = lessonData.exercises.traduisez.length;
        const exDone = state.progress.exercises.completed.length;
        const exPercent = Math.round((exDone / exTotal) * 100);
        updateProgressCircle('exercises', exPercent);
    }

    function updateProgressCircle(key, percent) {
        const circle = document.querySelector(`[data-progress="${key}"]`);
        if (!circle) return;

        const fill = circle.querySelector('.progress-fill');
        const text = circle.querySelector('.progress-text');

        fill.setAttribute('stroke-dasharray', `${percent}, 100`);
        text.textContent = `${percent}%`;
    }

    // Reset progress
    function initResetProgress() {
        document.getElementById('reset-progress')?.addEventListener('click', () => {
            if (confirm('Сбросить весь прогресс?')) {
                state.progress = {
                    texte: { read: [], memorized: [] },
                    vocab: { learned: [], hard: [] },
                    exercises: { completed: [], correct: [] }
                };
                saveProgress();
                showToast('Прогресс сброшен');
            }
        });
    }

    // ============================================
    // TEXTE Section
    // ============================================
    function initTexte() {
        const container = document.getElementById('text-content');
        const vocabList = document.querySelector('#text-vocabulary .vocab-list');

        // Render text paragraphs
        container.innerHTML = lessonData.texte.content.map((para, i) => `
      <div class="text-paragraph" data-index="${i}">
        <p class="text-fr">${para.fr}</p>
        <p class="text-ru">${para.ru}</p>
      </div>
    `).join('');

        // Render vocabulary
        vocabList.innerHTML = lessonData.texte.vocabulary.map(word => `
      <div class="vocab-item">
        <span class="vocab-fr">${word.fr}</span>
        <span class="vocab-ru">${word.ru}</span>
      </div>
    `).join('');

        // Mode buttons
        const modeRead = document.getElementById('text-mode-read');
        const modeTranslate = document.getElementById('text-mode-translate');
        const modeMemorize = document.getElementById('text-mode-memorize');

        modeRead.addEventListener('click', () => setTextMode('read'));
        modeTranslate.addEventListener('click', () => setTextMode('translate'));
        modeMemorize.addEventListener('click', () => setTextMode('memorize'));

        // Click handlers for paragraphs
        container.addEventListener('click', (e) => {
            const para = e.target.closest('.text-paragraph');
            if (!para) return;

            const index = parseInt(para.dataset.index);

            if (state.textMode === 'translate') {
                const ru = para.querySelector('.text-ru');
                ru.classList.toggle('visible');

                // Mark as read
                if (!state.progress.texte.read.includes(index)) {
                    state.progress.texte.read.push(index);
                    saveProgress();
                }
            } else if (state.textMode === 'memorize') {
                const fr = para.querySelector('.text-fr');
                fr.classList.toggle('revealed');
            }
        });
    }

    function setTextMode(mode) {
        state.textMode = mode;
        const container = document.getElementById('text-content');
        container.setAttribute('data-mode', mode);

        // Update buttons
        document.getElementById('text-mode-read').classList.toggle('active', mode === 'read');
        document.getElementById('text-mode-read').classList.toggle('btn-primary', mode === 'read');
        document.getElementById('text-mode-read').classList.toggle('btn-secondary', mode !== 'read');

        document.getElementById('text-mode-translate').classList.toggle('active', mode === 'translate');
        document.getElementById('text-mode-translate').classList.toggle('btn-primary', mode === 'translate');
        document.getElementById('text-mode-translate').classList.toggle('btn-secondary', mode !== 'translate');

        document.getElementById('text-mode-memorize').classList.toggle('active', mode === 'memorize');
        document.getElementById('text-mode-memorize').classList.toggle('btn-primary', mode === 'memorize');
        document.getElementById('text-mode-memorize').classList.toggle('btn-secondary', mode !== 'memorize');

        // Reset visibility
        document.querySelectorAll('.text-ru').forEach(el => el.classList.remove('visible'));
        document.querySelectorAll('.text-fr').forEach(el => el.classList.remove('revealed'));

        // Show all translations in read mode
        if (mode === 'read') {
            document.querySelectorAll('.text-ru').forEach(el => el.classList.add('visible'));
        }
    }

    // ============================================
    // VOCABULAIRE Section
    // ============================================
    function initVocabulaire() {
        // Category tabs
        document.querySelectorAll('.vocab-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.vocab;
                setVocabCategory(category);
            });
        });

        // Mode switches
        document.getElementById('vocab-mode-list').addEventListener('click', () => setVocabMode('list'));
        document.getElementById('vocab-mode-cards').addEventListener('click', () => setVocabMode('cards'));
        document.getElementById('vocab-mode-test').addEventListener('click', () => setVocabMode('test'));

        // Search
        document.getElementById('vocab-search').addEventListener('input', (e) => {
            filterVocabList(e.target.value);
        });

        // Flashcard controls
        document.getElementById('flashcard').addEventListener('click', flipCard);
        document.getElementById('card-prev').addEventListener('click', prevCard);
        document.getElementById('card-next').addEventListener('click', nextCard);
        document.getElementById('card-easy').addEventListener('click', markEasy);
        document.getElementById('card-hard').addEventListener('click', markHard);
        document.getElementById('show-fr-first').addEventListener('change', (e) => {
            state.showFrFirst = e.target.checked;
            updateFlashcard();
        });
        document.getElementById('shuffle-cards').addEventListener('change', (e) => {
            if (e.target.checked) shuffleFlashcards();
            updateFlashcard();
        });

        // Test controls
        document.getElementById('test-check').addEventListener('click', checkTestAnswer);
        document.getElementById('test-skip').addEventListener('click', skipTestWord);
        document.getElementById('test-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkTestAnswer();
        });

        // Initial render
        setVocabCategory('famille');
    }

    function setVocabCategory(category) {
        state.currentVocabCategory = category;

        document.querySelectorAll('.vocab-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.vocab === category);
        });

        renderVocabList();
        initFlashcards();
        initTest();
    }

    function setVocabMode(mode) {
        state.currentVocabMode = mode;

        document.getElementById('vocab-mode-list').classList.toggle('active', mode === 'list');
        document.getElementById('vocab-mode-cards').classList.toggle('active', mode === 'cards');
        document.getElementById('vocab-mode-test').classList.toggle('active', mode === 'test');

        document.getElementById('vocab-list-view').classList.toggle('active', mode === 'list');
        document.getElementById('vocab-cards-view').classList.toggle('active', mode === 'cards');
        document.getElementById('vocab-test-view').classList.toggle('active', mode === 'test');

        if (mode === 'cards') initFlashcards();
        if (mode === 'test') initTest();
    }

    function getVocabData() {
        return lessonData.vocabulaire[state.currentVocabCategory] || [];
    }

    function renderVocabList() {
        const container = document.getElementById('vocab-list');
        const words = getVocabData();

        container.innerHTML = words.map((word, i) => {
            const key = `${state.currentVocabCategory}_${i}`;
            const isLearned = state.progress.vocab.learned.includes(key);
            return `
        <div class="vocab-item ${isLearned ? 'learned' : ''}" data-key="${key}">
          <span class="vocab-fr">${word.fr}</span>
          <span class="vocab-ru">${word.ru}</span>
        </div>
      `;
        }).join('');

        // Click to toggle learned
        container.querySelectorAll('.vocab-item').forEach(item => {
            item.addEventListener('click', () => {
                const key = item.dataset.key;
                const idx = state.progress.vocab.learned.indexOf(key);
                if (idx === -1) {
                    state.progress.vocab.learned.push(key);
                    item.classList.add('learned');
                } else {
                    state.progress.vocab.learned.splice(idx, 1);
                    item.classList.remove('learned');
                }
                saveProgress();
            });
        });
    }

    function filterVocabList(query) {
        const items = document.querySelectorAll('#vocab-list .vocab-item');
        const q = query.toLowerCase();

        items.forEach(item => {
            const fr = item.querySelector('.vocab-fr').textContent.toLowerCase();
            const ru = item.querySelector('.vocab-ru').textContent.toLowerCase();
            const match = fr.includes(q) || ru.includes(q);
            item.style.display = match ? '' : 'none';
        });
    }

    // Flashcards
    function initFlashcards() {
        state.flashcards = [...getVocabData()];
        state.flashcardIndex = 0;
        state.isFlipped = false;
        updateFlashcard();
    }

    function shuffleFlashcards() {
        for (let i = state.flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [state.flashcards[i], state.flashcards[j]] = [state.flashcards[j], state.flashcards[i]];
        }
    }

    function updateFlashcard() {
        const card = document.getElementById('flashcard');
        const word = state.flashcards[state.flashcardIndex];
        if (!word) return;

        const front = state.showFrFirst ? word.fr : word.ru;
        const back = state.showFrFirst ? word.ru : word.fr;

        card.querySelector('.flashcard-word').textContent = front;
        card.querySelector('.flashcard-translation').textContent = back;
        card.classList.remove('flipped');
        state.isFlipped = false;

        document.getElementById('card-counter').textContent =
            `${state.flashcardIndex + 1} / ${state.flashcards.length}`;
    }

    function flipCard() {
        document.getElementById('flashcard').classList.toggle('flipped');
        state.isFlipped = !state.isFlipped;
    }

    function prevCard() {
        if (state.flashcardIndex > 0) {
            state.flashcardIndex--;
            updateFlashcard();
        }
    }

    function nextCard() {
        if (state.flashcardIndex < state.flashcards.length - 1) {
            state.flashcardIndex++;
            updateFlashcard();
        }
    }

    function markEasy() {
        const key = `${state.currentVocabCategory}_${state.flashcardIndex}`;
        if (!state.progress.vocab.learned.includes(key)) {
            state.progress.vocab.learned.push(key);
            saveProgress();
        }
        showToast('✅ Отмечено как выученное');
        nextCard();
    }

    function markHard() {
        const key = `${state.currentVocabCategory}_${state.flashcardIndex}`;
        if (!state.progress.vocab.hard.includes(key)) {
            state.progress.vocab.hard.push(key);
        }
        showToast('😓 Добавлено в сложные');
        nextCard();
    }

    // Test Mode
    function initTest() {
        state.testWords = [...getVocabData()];
        state.testIndex = 0;
        state.testCorrect = 0;
        state.testWrong = 0;

        // Shuffle
        for (let i = state.testWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [state.testWords[i], state.testWords[j]] = [state.testWords[j], state.testWords[i]];
        }

        updateTestWord();
        updateTestStats();
    }

    function updateTestWord() {
        const word = state.testWords[state.testIndex];
        if (!word) {
            document.getElementById('test-word').textContent = 'Тест завершён! 🎉';
            return;
        }

        document.getElementById('test-word').textContent = word.ru;
        document.getElementById('test-input').value = '';
        document.getElementById('test-input').classList.remove('correct', 'wrong');
        document.getElementById('test-feedback').textContent = '';
        document.getElementById('test-feedback').className = 'test-feedback';
        document.getElementById('test-input').focus();
    }

    function updateTestStats() {
        document.getElementById('test-correct').textContent = state.testCorrect;
        document.getElementById('test-wrong').textContent = state.testWrong;
        const total = state.testCorrect + state.testWrong;
        const accuracy = total > 0 ? Math.round((state.testCorrect / total) * 100) : 0;
        document.getElementById('test-accuracy').textContent = `${accuracy}%`;
    }

    function checkTestAnswer() {
        const word = state.testWords[state.testIndex];
        if (!word) return;

        const input = document.getElementById('test-input');
        const feedback = document.getElementById('test-feedback');
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = word.fr.toLowerCase();

        // Normalize for comparison (remove articles for flexibility)
        const normalize = (s) => s.replace(/^(le |la |l'|les |un |une |des )/i, '').trim();

        if (normalize(userAnswer) === normalize(correctAnswer) || userAnswer === correctAnswer) {
            input.classList.add('correct');
            feedback.textContent = '✅ Правильно!';
            feedback.className = 'test-feedback correct';
            state.testCorrect++;

            setTimeout(() => {
                state.testIndex++;
                updateTestWord();
            }, 1000);
        } else {
            input.classList.add('wrong');
            feedback.innerHTML = `❌ Неправильно. Правильный ответ: <strong>${word.fr}</strong>`;
            feedback.className = 'test-feedback wrong';
            state.testWrong++;
        }

        updateTestStats();
    }

    function skipTestWord() {
        const word = state.testWords[state.testIndex];
        if (!word) return;

        document.getElementById('test-feedback').innerHTML =
            `⏭️ Пропущено. Ответ: <strong>${word.fr}</strong>`;
        document.getElementById('test-feedback').className = 'test-feedback wrong';
        state.testWrong++;
        updateTestStats();

        setTimeout(() => {
            state.testIndex++;
            updateTestWord();
        }, 1500);
    }

    // ============================================
    // GRAMMAIRE Section
    // ============================================
    function initGrammaire() {
        // Topic tabs
        document.querySelectorAll('.grammar-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const topic = tab.dataset.grammar;
                setGrammarTopic(topic);
            });
        });

        // Conjugation practice
        document.getElementById('conj-verb-select').addEventListener('change', renderConjugationExercise);
        document.getElementById('conj-tense-select').addEventListener('change', renderConjugationExercise);

        setGrammarTopic('imperatif');
    }

    function setGrammarTopic(topic) {
        state.currentGrammarTopic = topic;

        document.querySelectorAll('.grammar-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.grammar === topic);
        });

        renderGrammarContent(topic);
    }

    function renderGrammarContent(topic) {
        const container = document.getElementById('grammar-content');
        const data = lessonData.grammaire;

        if (topic === 'imperatif') {
            container.innerHTML = `
        <h3 class="grammar-title">${data.imperatif.title}</h3>
        <div class="grammar-rules">
          ${data.imperatif.rules.map(rule => `<p class="grammar-rule">• ${rule}</p>`).join('')}
        </div>
        <div class="grammar-examples">
          <h4>Примеры:</h4>
          ${data.imperatif.examples.map(ex => `
            <div class="grammar-example">
              <span class="example-fr">${ex.fr}</span>
              <span class="example-ru">${ex.ru}</span>
            </div>
          `).join('')}
        </div>
        <div class="grammar-examples">
          <h4>Особые формы:</h4>
          <table class="conjugation-table">
            <tr><th>Глагол</th><th>Tu</th><th>Vous</th><th>Nous</th></tr>
            <tr><td>avoir</td><td>${data.imperatif.special.avoir[0]}</td><td>${data.imperatif.special.avoir[1]}</td><td>${data.imperatif.special.avoir[2]}</td></tr>
            <tr><td>être</td><td>${data.imperatif.special.être[0]}</td><td>${data.imperatif.special.être[1]}</td><td>${data.imperatif.special.être[2]}</td></tr>
            <tr><td>savoir</td><td>${data.imperatif.special.savoir[0]}</td><td>${data.imperatif.special.savoir[1]}</td><td>${data.imperatif.special.savoir[2]}</td></tr>
          </table>
        </div>
        <div class="grammar-examples">
          <h4>С местоимениями:</h4>
          ${data.imperatif.negative.map(ex => `
            <div class="grammar-example">
              <span class="example-fr">${ex.fr}</span>
              <span class="example-ru">${ex.ru}</span>
            </div>
          `).join('')}
        </div>
      `;
        } else if (topic === 'imparfait') {
            container.innerHTML = `
        <h3 class="grammar-title">${data.imparfait.title}</h3>
        <div class="grammar-rules">
          ${data.imparfait.rules.map(rule => `<p class="grammar-rule">• ${rule}</p>`).join('')}
        </div>
        <div class="grammar-examples">
          <h4>Образование:</h4>
          ${data.imparfait.examples.map(ex => `
            <div class="grammar-example">
              <span class="example-fr">${ex.fr}</span>
              <span class="example-ru">${ex.ru}</span>
            </div>
          `).join('')}
        </div>
        <div class="grammar-examples">
          <h4>Употребление:</h4>
          ${data.imparfait.usage.map(use => `<p class="grammar-rule">• ${use}</p>`).join('')}
        </div>
        <div class="grammar-examples">
          <h4>Спряжение venir:</h4>
          <table class="conjugation-table">
            <tr><th>Лицо</th><th>Affirmative</th><th>Négative</th></tr>
            ${['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'].map((p, i) => `
              <tr>
                <td>${p}</td>
                <td>${data.imparfait.conjugation.venir.affirmative[i]}</td>
                <td>${data.imparfait.conjugation.venir.negative[i]}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `;
        } else if (topic === 'verbes') {
            container.innerHTML = `
        <h3 class="grammar-title">${data.verbes2groupe.title}</h3>
        <p style="margin-bottom: var(--spacing-md); color: var(--text-secondary);">${data.verbes2groupe.description}</p>
        <div class="grammar-examples">
          <h4>Глаголы 2-й группы:</h4>
          <div class="vocab-list" style="margin-top: var(--spacing-sm);">
            ${data.verbes2groupe.verbs.map(v => `
              <div class="vocab-item">
                <span class="vocab-fr">${v.fr}</span>
                <span class="vocab-ru">${v.ru}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="grammar-examples">
          <h4>Спряжение réunir (présent):</h4>
          <table class="conjugation-table">
            <tr><th>Лицо</th><th>Спряжение</th></tr>
            ${data.verbes2groupe.conjugation.réunir.present.map(form => `
              <tr><td colspan="2">${form}</td></tr>
            `).join('')}
          </table>
          <p style="margin-top: var(--spacing-sm); color: var(--text-muted);">
            Passé composé: ${data.verbes2groupe.conjugation.réunir.passeCompose}
          </p>
        </div>
        <div class="grammar-examples">
          <h4>Autres verbes: vivre, recevoir</h4>
          <table class="conjugation-table">
            <tr><th>Лицо</th><th>vivre</th><th>recevoir</th></tr>
            ${['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'].map((p, i) => `
              <tr>
                <td>${p}</td>
                <td>${data.autresVerbes.vivre.present[i]}</td>
                <td>${data.autresVerbes.recevoir.present[i]}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `;
        }

        renderConjugationExercise();
    }

    function renderConjugationExercise() {
        const verb = document.getElementById('conj-verb-select').value;
        const tense = document.getElementById('conj-tense-select').value;
        const container = document.getElementById('conj-exercise');

        const pronouns = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];
        const impPronouns = ['tu', 'nous', 'vous'];

        const currentPronouns = tense === 'imperatif' ? impPronouns : pronouns;

        container.innerHTML = currentPronouns.map((p, i) => `
      <div class="conj-row">
        <span class="conj-pronoun">${p}</span>
        <input type="text" class="conj-input" data-pronoun="${p}" data-index="${i}" placeholder="...">
      </div>
    `).join('') + `<button class="btn btn-primary" style="margin-top: var(--spacing-md);" id="check-conj">Проверить</button>`;

        document.getElementById('check-conj').addEventListener('click', () => checkConjugation(verb, tense));
    }

    function checkConjugation(verb, tense) {
        // Simple conjugation answers (would be expanded with full data)
        const answers = getConjugationAnswers(verb, tense);

        document.querySelectorAll('.conj-input').forEach((input, i) => {
            const userAnswer = input.value.trim().toLowerCase();
            const correct = answers[i]?.toLowerCase() || '';

            if (userAnswer === correct) {
                input.classList.add('correct');
                input.classList.remove('wrong');
            } else {
                input.classList.add('wrong');
                input.classList.remove('correct');
                input.value = correct;
            }
        });
    }

    function getConjugationAnswers(verb, tense) {
        const answers = {
            réunir: {
                present: ['réunis', 'réunis', 'réunit', 'réunissons', 'réunissez', 'réunissent'],
                imparfait: ['réunissais', 'réunissais', 'réunissait', 'réunissions', 'réunissiez', 'réunissaient'],
                imperatif: ['réunis', 'réunissons', 'réunissez']
            },
            finir: {
                present: ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'],
                imparfait: ['finissais', 'finissais', 'finissait', 'finissions', 'finissiez', 'finissaient'],
                imperatif: ['finis', 'finissons', 'finissez']
            },
            choisir: {
                present: ['choisis', 'choisis', 'choisit', 'choisissons', 'choisissez', 'choisissent'],
                imparfait: ['choisissais', 'choisissais', 'choisissait', 'choisissions', 'choisissiez', 'choisissaient'],
                imperatif: ['choisis', 'choisissons', 'choisissez']
            },
            vivre: {
                present: ['vis', 'vis', 'vit', 'vivons', 'vivez', 'vivent'],
                imparfait: ['vivais', 'vivais', 'vivait', 'vivions', 'viviez', 'vivaient'],
                imperatif: ['vis', 'vivons', 'vivez']
            },
            recevoir: {
                present: ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent'],
                imparfait: ['recevais', 'recevais', 'recevait', 'recevions', 'receviez', 'recevaient'],
                imperatif: ['reçois', 'recevons', 'recevez']
            }
        };

        return answers[verb]?.[tense] || [];
    }

    // ============================================
    // EXERCISES Section
    // ============================================
    function initExercises() {
        // Tab switching
        document.querySelectorAll('.exercise-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const type = tab.dataset.exercise;
                setExerciseType(type);
            });
        });

        // Translation controls
        document.getElementById('translate-check').addEventListener('click', checkTranslation);
        document.getElementById('translate-show').addEventListener('click', showTranslationAnswer);
        document.getElementById('translate-next').addEventListener('click', nextTranslation);

        setExerciseType('translate');
        renderQuestions();
    }

    function setExerciseType(type) {
        state.currentExerciseType = type;

        document.querySelectorAll('.exercise-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.exercise === type);
        });

        document.getElementById('exercise-translate').classList.toggle('active', type === 'translate');
        document.getElementById('exercise-questions').classList.toggle('active', type === 'questions');

        if (type === 'translate') renderTranslation();
    }

    function renderTranslation() {
        const exercise = lessonData.exercises.traduisez[state.translateIndex];
        if (!exercise) {
            document.getElementById('translate-ru').textContent = 'Все упражнения выполнены! 🎉';
            return;
        }

        document.getElementById('translate-ru').textContent = exercise.ru;
        document.getElementById('translate-input').value = '';
        document.getElementById('translate-feedback').classList.remove('visible', 'correct', 'wrong');
        document.getElementById('translate-counter').textContent =
            `${state.translateIndex + 1} / ${lessonData.exercises.traduisez.length}`;
    }

    function checkTranslation() {
        const exercise = lessonData.exercises.traduisez[state.translateIndex];
        if (!exercise) return;

        const input = document.getElementById('translate-input').value.trim();
        const feedback = document.getElementById('translate-feedback');

        // Normalize for comparison
        const normalize = (s) => s.toLowerCase()
            .replace(/[.,!?;:'"]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        const userNorm = normalize(input);
        const correctNorm = normalize(exercise.fr);

        if (userNorm === correctNorm) {
            feedback.innerHTML = '✅ Отлично! Правильный ответ.';
            feedback.className = 'translate-feedback visible correct';

            // Mark as completed
            if (!state.progress.exercises.completed.includes(state.translateIndex)) {
                state.progress.exercises.completed.push(state.translateIndex);
                state.progress.exercises.correct.push(state.translateIndex);
                saveProgress();
            }
        } else {
            feedback.innerHTML = `
        ❌ Не совсем. Сравните с правильным ответом:
        <span class="correct-answer">${exercise.fr}</span>
      `;
            feedback.className = 'translate-feedback visible wrong';

            if (!state.progress.exercises.completed.includes(state.translateIndex)) {
                state.progress.exercises.completed.push(state.translateIndex);
                saveProgress();
            }
        }
    }

    function showTranslationAnswer() {
        const exercise = lessonData.exercises.traduisez[state.translateIndex];
        if (!exercise) return;

        const feedback = document.getElementById('translate-feedback');
        feedback.innerHTML = `Правильный ответ: <span class="correct-answer">${exercise.fr}</span>`;
        feedback.className = 'translate-feedback visible';
    }

    function nextTranslation() {
        if (state.translateIndex < lessonData.exercises.traduisez.length - 1) {
            state.translateIndex++;
            renderTranslation();
        } else {
            showToast('🎉 Вы прошли все упражнения!');
        }
    }

    function renderQuestions() {
        const container = document.querySelector('.questions-list');

        container.innerHTML = lessonData.exercises.questions.map((q, i) => `
      <div class="question-item">
        <p class="question-text">${i + 1}. ${q}</p>
        <p class="question-hint">Нажмите, чтобы ответить устно</p>
      </div>
    `).join('');
    }

    // ============================================
    // Toast Notification
    // ============================================
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('visible');

        setTimeout(() => {
            toast.classList.remove('visible');
        }, 2500);
    }

    // ============================================
    // PWA Install Prompt
    // ============================================
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Don't show if already dismissed
        if (localStorage.getItem('frenchapp_install_dismissed')) return;

        document.getElementById('install-prompt').classList.remove('hidden');
    });

    function initInstallPrompt() {
        document.getElementById('install-btn')?.addEventListener('click', async () => {
            if (!deferredPrompt) return;

            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                showToast('✅ Приложение установлено!');
            }

            deferredPrompt = null;
            document.getElementById('install-prompt').classList.add('hidden');
        });

        document.getElementById('install-dismiss')?.addEventListener('click', () => {
            document.getElementById('install-prompt').classList.add('hidden');
            localStorage.setItem('frenchapp_install_dismissed', 'true');
        });
    }

    // ============================================
    // Initialization
    // ============================================
    function init() {
        loadProgress();
        initTheme();
        initNavigation();
        updateProgressUI();
        initResetProgress();
        initInstallPrompt();

        // Initialize home section content
        navigateTo('home');
    }

    // Start the app
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
