
document.addEventListener('DOMContentLoaded', function () {
    const categoryFilter = document.getElementById('category-filter');
    const durationFilter = document.getElementById('duration-filter');
    const courseCards = document.querySelectorAll('.course-card');

    function filterCourses() {
        const selectedCategory = categoryFilter.value;
        const selectedDuration = durationFilter.value;

        courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const duration = card.getAttribute('data-duration');

            const categoryMatch = selectedCategory === 'all' || category === selectedCategory;
            const durationMatch = selectedDuration === 'all' || duration === selectedDuration;

            if (categoryMatch && durationMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    categoryFilter.addEventListener('change', filterCourses);
    durationFilter.addEventListener('change', filterCourses);
});

document.addEventListener('DOMContentLoaded', function () {
    const courseId = window.location.pathname.includes('advanced-infographics') 
    ? 'advanced-infographics' 
    : 'basics-of-infographics'; // Уникальный идентификатор курса
    const lessons = document.querySelectorAll('.lesson');
    const completeButtons = document.querySelectorAll('.complete-lesson');
    const cancelButtons = document.querySelectorAll('.cancel-lesson');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress span');

    // Загружаем прогресс из LocalStorage
    let completedLessons = JSON.parse(localStorage.getItem(courseId)) || [];

    // Обновляем прогресс-бар
    function updateProgressBar() {
        const totalLessons = lessons.length;
        const completedCount = completedLessons.length;
        const progressPercent = (completedCount / totalLessons) * 100;

        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `Вы завершили ${completedCount} из ${totalLessons} уроков`;
    }

    // Обновляем состояние кнопок
    function updateButtons() {
        lessons.forEach((lesson, index) => {
            const lessonId = lesson.getAttribute('data-lesson');
            if (completedLessons.includes(lessonId)) {
                completeButtons[index].textContent = 'Пройдено';
                completeButtons[index].disabled = true;
                cancelButtons[index].disabled = false;
            } else {
                completeButtons[index].textContent = 'Отметить как пройденный';
                completeButtons[index].disabled = false;
                cancelButtons[index].disabled = true;
            }
        });
    }

    // Отмечаем урок как пройденный
    completeButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем действие по умолчанию
            const lessonId = button.closest('.lesson').getAttribute('data-lesson');
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
                localStorage.setItem(courseId, JSON.stringify(completedLessons));
                updateButtons();
                updateProgressBar(); // Обновляем прогресс-бар
            }
        });
    });

    // Отменяем прохождение урока
    cancelButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем действие по умолчанию
            const lessonId = button.closest('.lesson').getAttribute('data-lesson');
            if (completedLessons.includes(lessonId)) {
                completedLessons = completedLessons.filter(id => id !== lessonId);
                localStorage.setItem(courseId, JSON.stringify(completedLessons));
                updateButtons();
                updateProgressBar(); // Обновляем прогресс-бар
            }
        });
    });

    // Инициализация прогресса
    updateButtons();
    updateProgressBar();
});

document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('test-form');
    const resultDiv = document.getElementById('result');
    const scoreSpan = document.getElementById('score');

    // Правильные ответы для каждого теста
    const correctAnswers = {
        'basics-of-infographics': { // Тест "Основы инфографики"
            q1: 'b',
            q2: 'b',
            q3: 'a',
            q4: 'c',
            q5: 'c'
        },
        'tools-for-infographics': { // Тест "Инструменты для инфографики"
            q1: 'b',
            q2: 'c',
            q3: 'a',
            q4: 'a',
            q5: 'a'
        },
        'data-visualization': { // Тест "Визуализация данных"
            q1: 'b',
            q2: 'a',
            q3: 'a',
            q4: 'c',
            q5: 'a'
        },
        'advanced-techniques': { // Тест "Продвинутые техники"
            q1: 'a', 
            q2: 'a',
            q3: 'c', 
            q4: 'b', 
            q5: 'c' 
        },
    };

    // Определяем, какой тест загружен
    const testId = quizForm.getAttribute('data-test-id'); // Добавьте атрибут data-test-id в форму
    const currentCorrectAnswers = correctAnswers[testId];

    // Обработка отправки формы
    quizForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        let score = 0;
        const userAnswers = {
            q1: quizForm.q1.value,
            q2: quizForm.q2.value,
            q3: quizForm.q3.value,
            q4: quizForm.q4.value,
            q5: quizForm.q5.value
        };
        // Проверяем ответы
        for (const question in currentCorrectAnswers) {
            if (userAnswers[question] === currentCorrectAnswers[question]) {
                score++;
            }
        }
        // Показываем результат
        scoreSpan.textContent = score;
        resultDiv.classList.remove('hidden');
    });
});

 // Данные галереи
 const galleryData = [
    {image: "../images/gallery/FKTIPM.PNG", title: "Хронологическая инфографика руководства ФКТиПМ"},
    {image: "../images/gallery/KADII.PNG", title: "Хронологическая инфографика кафедры анализа данных и искусственного интеллекта"},
    {image: "../images/gallery/KIT.PNG", title: "Хронологическая инфографика кафедры информационных технологий"},
    {image: "../images/gallery/KMM.PNG", title: "Хронологическая инфографика кафедры математического моделирования"},
    {image: "../images/gallery/KPM.PNG", title: "Хронологическая инфографика кафедры прикладной математики"},
    {image: "../images/gallery/KVT.PNG", title: "Хронологическая инфографика кафедры вычислительных технологий"}
];

// Инициализация галереи
const track = document.querySelector('.gallery-track');
const prevBtn = document.querySelector('.gallery-arrow--prev');
const nextBtn = document.querySelector('.gallery-arrow--next');
let currentIndex = 0;
let slidesPerView = 3;

// Создаем слайды
function initGallery() {
    track.innerHTML = '';
    
    galleryData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `
            <div class="gallery-card">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
            </div>
        `;
        track.appendChild(slide);
    });
    
    updateSlidesPerView();
    updateGallery();
}

// Обновляем количество видимых слайдов
function updateSlidesPerView() {
    const width = window.innerWidth;
    slidesPerView = width < 768 ? 1 : width < 1024 ? 2 : 3;
    
    document.querySelectorAll('.gallery-slide').forEach(slide => {
        slide.style.flex = `0 0 ${100/slidesPerView}%`;
    });
}

// Обновляем состояние галереи
function updateGallery() {
    track.style.transform = `translateX(-${currentIndex * (100/slidesPerView)}%)`;
    
    // Обновляем состояние кнопок
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', 
        currentIndex >= galleryData.length - slidesPerView);
}

// Обработчики событий
nextBtn.addEventListener('click', () => {
    if (currentIndex < galleryData.length - slidesPerView) {
        currentIndex++;
        updateGallery();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    const oldSlidesPerView = slidesPerView;
    updateSlidesPerView();
    
    // Корректируем currentIndex при изменении slidesPerView
    if (oldSlidesPerView !== slidesPerView) {
        currentIndex = Math.min(
            currentIndex, 
            Math.max(0, galleryData.length - slidesPerView)
        );
        updateGallery();
    }
});

// Инициализация
initGallery();
