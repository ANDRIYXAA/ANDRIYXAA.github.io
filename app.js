document.getElementById('send-btn').addEventListener('click', function() {
    let chatBox = document.getElementById('chat-box');
    let chatInput = document.getElementById('chat-input');
    let newMessage = document.createElement('div');
    newMessage.textContent = chatInput.value;
    chatBox.appendChild(newMessage);
    chatInput.value = '';
});
