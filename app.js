document.getElementById('send-btn').addEventListener('click', function() {
    let chatBox = document.getElementById('chat-box');
    let chatInput = document.getElementById('chat-input');
    let newMessage = document.createElement('div');
    newMessage.textContent = chatInput.value;
    chatBox.appendChild(newMessage);
    chatInput.value = '';
});

// Ініціалізація Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('send-btn').addEventListener('click', function() {
    let chatInput = document.getElementById('chat-input');
    let newMessageRef = push(ref(database, 'messages'));
    set(newMessageRef, {
        text: chatInput.value,
        timestamp: Date.now()
    });
    chatInput.value = '';
});

onValue(ref(database, 'messages'), (snapshot) => {
    let chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Очистити чат перед додаванням нових повідомлень
    snapshot.forEach((childSnapshot) => {
        let message = childSnapshot.val();
        let newMessage = document.createElement('div');
        newMessage.textContent = message.text;
        chatBox.appendChild(newMessage);
    });
});
