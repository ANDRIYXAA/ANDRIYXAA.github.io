document.getElementById('register-btn').addEventListener('click', function() {
    let emailInput = document.getElementById('email-input');
    let email = emailInput.value;

    // Відправка електронної адреси на сервер для реєстрації
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/chat.html';
        } else {
            alert('Реєстрація не вдалася: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
