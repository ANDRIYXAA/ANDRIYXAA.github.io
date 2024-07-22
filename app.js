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
            document.getElementById('registration-container').style.display = 'none';
            document.getElementById('chat-container').style.display = 'block';
        } else {
            alert('Реєстрація не вдалася: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('send-btn').addEventListener('click', function() {
    let chatInput = document.getElementById('chat-input');
    let message = chatInput.value;

    // Відправка повідомлення на сервер
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Додавання повідомлення в чат
    let chatBox = document.getElementById('chat-box');
    let newMessage = document.createElement('div');
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatInput.value = '';
});
