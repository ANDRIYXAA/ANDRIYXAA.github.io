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

button.addEventListener('click', async () => {
    const message = input.value;
    socket.emit('message', message);
    
    if (message.startsWith('/order')) {
        const product = message.slice(7).trim();
        const order = { product, timestamp: new Date() };
        
        const response = await fetch('/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        
        const result = await response.json();
        console.log('Order created:', result);
    }
    
    input.value = '';
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
