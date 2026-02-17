const themeToggle = document.getElementById('themeToggle');
const recommendBtn = document.getElementById('recommendBtn');
const retryBtn = document.getElementById('retryBtn');
const resultContainer = document.getElementById('result');
const resultEmoji = document.getElementById('resultEmoji');
const resultName = document.getElementById('resultName');
const resultCategory = document.getElementById('resultCategory');
const historyContainer = document.getElementById('history');
const categoryBtns = document.querySelectorAll('.category-btn');

// 메뉴 데이터
const menus = {
    korean: [
        { name: '김치찌개', emoji: '🍲' },
        { name: '된장찌개', emoji: '🍲' },
        { name: '삼겹살', emoji: '🥩' },
        { name: '불고기', emoji: '🥩' },
        { name: '비빔밥', emoji: '🍚' },
        { name: '갈비탕', emoji: '🍖' },
        { name: '순두부찌개', emoji: '🍲' },
        { name: '제육볶음', emoji: '🍳' },
        { name: '삼계탕', emoji: '🍗' },
        { name: '냉면', emoji: '🍜' },
        { name: '갈비구이', emoji: '🍖' },
        { name: '보쌈', emoji: '🥬' },
    ],
    chinese: [
        { name: '짜장면', emoji: '🍜' },
        { name: '짬뽕', emoji: '🍜' },
        { name: '탕수육', emoji: '🍗' },
        { name: '마파두부', emoji: '🍲' },
        { name: '볶음밥', emoji: '🍚' },
        { name: '깐풍기', emoji: '🍗' },
        { name: '짬짜면', emoji: '🍜' },
        { name: '양장피', emoji: '🥗' },
    ],
    japanese: [
        { name: '초밥', emoji: '🍣' },
        { name: '라멘', emoji: '🍜' },
        { name: '우동', emoji: '🍜' },
        { name: '돈카츠', emoji: '🍱' },
        { name: '규동', emoji: '🍚' },
        { name: '오야코동', emoji: '🍳' },
        { name: '소바', emoji: '🍜' },
        { name: '샤부샤부', emoji: '🍲' },
    ],
    western: [
        { name: '파스타', emoji: '🍝' },
        { name: '스테이크', emoji: '🥩' },
        { name: '피자', emoji: '🍕' },
        { name: '리조또', emoji: '🍚' },
        { name: '햄버거', emoji: '🍔' },
        { name: '샌드위치', emoji: '🥪' },
        { name: '그라탱', emoji: '🫕' },
        { name: '클램차우더', emoji: '🍲' },
    ],
    snack: [
        { name: '떡볶이', emoji: '🌶️' },
        { name: '순대', emoji: '🍢' },
        { name: '튀김', emoji: '🍤' },
        { name: '김밥', emoji: '🍙' },
        { name: '라면', emoji: '🍜' },
        { name: '만두', emoji: '🥟' },
        { name: '쫄면', emoji: '🍜' },
        { name: '어묵', emoji: '🍢' },
    ],
};

const categoryNames = {
    korean: '🥢 한식',
    chinese: '🥡 중식',
    japanese: '🍣 일식',
    western: '🍝 양식',
    snack: '🍢 분식',
};

let selectedCategory = 'all';
let history = [];

// 카테고리 선택
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCategory = btn.dataset.category;
    });
});

// 메뉴 추천
function getRandomMenu() {
    let pool = [];

    if (selectedCategory === 'all') {
        Object.entries(menus).forEach(([cat, items]) => {
            items.forEach(item => pool.push({ ...item, category: cat }));
        });
    } else {
        pool = menus[selectedCategory].map(item => ({
            ...item,
            category: selectedCategory,
        }));
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

function recommend() {
    const menu = getRandomMenu();

    resultEmoji.textContent = menu.emoji;
    resultName.textContent = menu.name;
    resultCategory.textContent = categoryNames[menu.category];

    // 애니메이션 재실행
    resultContainer.classList.remove('hidden');
    const card = document.querySelector('.result-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = '';

    // 히스토리 추가
    addHistory(menu);
}

function addHistory(menu) {
    history.unshift(menu);
    if (history.length > 5) history.pop();

    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyContainer.innerHTML = '';
        return;
    }

    historyContainer.innerHTML = `
        <div class="history-title">최근 추천 기록</div>
        ${history.map(m => `
            <div class="history-item">
                <span class="h-emoji">${m.emoji}</span>
                <span class="h-name">${m.name}</span>
                <span class="h-tag">${categoryNames[m.category]}</span>
            </div>
        `).join('')}
    `;
}

// 테마
function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

function loadTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', saved);
}

// 이벤트
recommendBtn.addEventListener('click', recommend);
retryBtn.addEventListener('click', recommend);
themeToggle.addEventListener('click', toggleTheme);

loadTheme();
