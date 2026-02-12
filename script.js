const countInput = document.getElementById('count');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('results');
const themeToggle = document.getElementById('themeToggle');

// 로또 번호 생성 (1~45 중 6개 선택)
function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers.sort((a, b) => a - b);
}

// 번호에 따른 색상 클래스 반환
function getNumberColor(num) {
    if (num <= 10) return 'color-1';
    if (num <= 20) return 'color-2';
    if (num <= 30) return 'color-3';
    if (num <= 40) return 'color-4';
    return 'color-5';
}

// 로또 세트 HTML 생성
function createLottoSetHTML(numbers, index) {
    const numbersHTML = numbers.map((num, i) => {
        const delay = i * 0.1;
        return `<div class="number ${getNumberColor(num)}" style="animation-delay: ${delay}s">${num}</div>`;
    }).join('');

    return `
        <div class="lotto-set">
            <div class="lotto-set-header">${index + 1}번째 추천 번호</div>
            <div class="numbers">
                ${numbersHTML}
            </div>
        </div>
    `;
}

// 번호 생성
function generateLotto() {
    const count = parseInt(countInput.value);

    if (count < 1 || count > 10) {
        alert('1~10 사이의 숫자를 입력해주세요!');
        return;
    }

    resultsContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const numbers = generateLottoNumbers();
        const setHTML = createLottoSetHTML(numbers, i);

        setTimeout(() => {
            resultsContainer.innerHTML += setHTML;
        }, i * 100);
    }
}

// 초기화
function clearResults() {
    resultsContainer.innerHTML = '';
}

// 이벤트 리스너
generateBtn.addEventListener('click', generateLotto);
clearBtn.addEventListener('click', clearResults);

// Enter 키로 생성
countInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateLotto();
    }
});

// 테마 관련 기능
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

// 테마 토글 버튼
themeToggle.addEventListener('click', toggleTheme);

// 페이지 로드시 저장된 테마 적용
loadTheme();
