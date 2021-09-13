import {sendMessage , socket} from "../socket_io.js";

export default class ChatView {

    constructor() {
        document.title = 'Chat';
    }

    getHtml = () => `<div class="chat">
    <div id="messages">
        <ul id="messagesList"></ul>
    </div>
    <div class="inner-icon">
    <input id="messageInput" placeholder="Write a message" minlength="1" maxlength="256" required/>
    <i id="sendMessageIcon" class="far fa-paper-plane"></i>
    </div>
</div>
    
    
    `;


    init = () => {
        const footer = document.getElementsByTagName('footer')[0];
        footer.style.display = 'none';

        const messages = document.getElementById('messages');
        const messagesList = document.getElementById('messagesList');
        const messageInput = document.getElementById('messageInput');
        const sendMessageIcon = document.getElementById('sendMessageIcon');

        sendMessageIcon.onclick = () => {
            sendMessage(messageInput.value);
            messageInput.value = '';
        }

        messageInput.addEventListener('keypress' , ev=>{
           if (ev.key === 'Enter'){
               sendMessage(messageInput.value);
               messageInput.value = '';
           }
        });

        socket.off('message');
        socket.on('message', (message) => {
            const item = document.createElement('li');
            item.innerHTML = `${message.memberName}:<br>${message.content}`;
            messagesList.appendChild(item);
            console.log(messages.scrollHeight)
            messages.scrollTo(0, messages.scrollHeight)
        });
    }
}