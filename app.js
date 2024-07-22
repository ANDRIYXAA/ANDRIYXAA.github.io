// app.js
const socket = io();

const app = document.getElementById('app');

const chatWindow = document.createElement('div');
chatWindow.classList.add('chat-window');
app.appendChild(chatWindow);

const inputArea = document.createElement('div');
inputArea.classList.add('input-area');
app.appendChild(inputArea);

const input = document.createElement('input');
input.setAttribute('type', 'text');
inputArea.appendChild(input);

const button = document.createElement('button');
button.innerText = 'Send';
inputArea.appendChild(button);

button.addEventListener('click', () => {
    const message = input.value;
    socket.emit('message', message);
    input.value = '';
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
