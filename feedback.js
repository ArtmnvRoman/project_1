document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем значения полей формы
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (name === "") {
        alert('Пожалуйста, введите ваше имя.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Пожалуйста, введите корректный email.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Пожалуйста, введите корректный номер телефона.');
        return;
    }

    if (!feedback) {
        alert('Пожалуйста, введите ваш отзыв.');
        return;
    }

    // Если все проверки пройдены
    alert('Ваш отзыв успешно отправлен!');
    document.getElementById('feedbackForm').reset();
});

function validateEmail(email) {
    const re = /[a-zA-Z0-9]{2,20}@[a-z]{2,10}\.[a-z]{2,5}/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /8[0-9]{10}/;
    return re.test(phone);
}