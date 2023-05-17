alert("welcome")
import { io } from "socket.io-client";
const socket = io();
//const socket = new WebSocket("ws://localhost:3000");
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
var name;

do{
    name = prompt('Enter your name: ');
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing');

    textarea.value = '';

    scrollToBottom()

    socket.emit('message', msg);
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom(); 
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}