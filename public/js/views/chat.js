import {sendMessage, socket, getMessages} from "../socket_io.js";

export default class ChatView {

    constructor() {
        document.title = 'Chat';
        this.lastId = undefined;
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

        messageInput.addEventListener('keypress', ev => {
            if (ev.key === 'Enter') {
                sendMessage(messageInput.value);
                messageInput.value = '';
            }
        });

        socket.off('message');
        socket.off('messages');

        socket.on('message', (message) => {
            const item = document.createElement('li');
            item.innerHTML = `${message.memberName}:<br>${message.content}`;
            messagesList.appendChild(item);
            console.log(messages.scrollHeight)
            messages.scrollTo(0, messages.scrollHeight)
        });


        messages.addEventListener('scroll', (ev) => {
            if (messages.scrollTop <= 100) {
                getMessages(this.lastId);
            }
        });


        socket.on('messages', (data) => {
            if (data.length === 0 || data[0].id === this.lastId)
                return;

            const dataList = data.reverse().map(message => {
                return `<li>${message.name}:<br>${message.content}</li>`;
            })


            messagesList.insertAdjacentHTML('afterbegin', dataList.join(''));

            if (this.lastId === undefined)
                messages.scrollTo(0, messages.scrollHeight)

            this.lastId = data[0].id;
        });

        getMessages();

    }
}