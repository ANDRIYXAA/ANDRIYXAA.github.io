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
