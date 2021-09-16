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
    <textarea id="messageInput" placeholder="Write a message" minlength="1" maxlength="256" required></textarea>
    <i id="sendMessageIcon" class="far fa-paper-plane"></i>
    </div>
</div>
    
    
    `;


    init = () => {
        const maxInputHeight = 150;

        const footer = document.getElementsByTagName('footer')[0];
        footer.style.display = 'none';

        const messages = document.getElementById('messages');
        const messagesList = document.getElementById('messagesList');
        const messageInput = document.getElementById('messageInput');
        const sendMessageIcon = document.getElementById('sendMessageIcon');

        let paste = false;

        messageInput.addEventListener('input', ev => {
            const msg = messageInput.value.trim();

            if (msg.length === 1 || paste) {
                if (msg.codePointAt(0) > 127)
                    messageInput.dir = 'rtl';
                else
                    messageInput.dir = 'ltr';

                paste = false;
            }

            auto_grow();
        });

        messageInput.addEventListener('paste', ev => {
            paste = true;
        });

        let lastHeight = document.documentElement.clientHeight;

        window.addEventListener('resize', ev => {
            const w = document.documentElement.clientHeight;

            if (w < lastHeight) {
                messages.scrollTo(0, messages.scrollTop + (lastHeight - w))
            }
            lastHeight = w;
        })

        auto_grow();

        sendMessageIcon.onclick = () => {
            sendMessage(messageInput.value);
            messageInput.value = '';
            auto_grow();
            messageInput.focus();
        }

        function auto_grow() {
            messageInput.style.height = "5px";
            messageInput.style.height = Math.min(messageInput.scrollHeight, maxInputHeight) + "px";

            if (messages.scrollHeight - (messages.offsetHeight + messages.scrollTop) <= maxInputHeight)
                messages.scrollTo(0, messages.scrollHeight)
        }


        socket.off('message');
        socket.off('messages');

        socket.on('message', (message) => {
                const item = document.createElement('li');
                if (message.content.codePointAt(0) > 127)
                    item.dir = 'rtl';

                item.innerHTML = `${message.memberName}\n${message.content}`;
                messagesList.appendChild(item);
                messages.scrollTo(0, messages.scrollHeight)
            }
        );


        messages.addEventListener('scroll', (ev) => {
            if (messages.scrollTop <= 100) {
                getMessages(this.lastId);
            }
        });


        socket.on('messages', (data) => {
            if (data.length === 0 || data[0].id === this.lastId)
                return;

            const dataList = data.reverse().map(message => {
                if (message.content.codePointAt(0) > 127) {
                    return `<li dir="rtl">${message.name}\n${message.content}</li>`;
                }

                return `<li>${message.name}\n${message.content}</li>`;

            })


            messagesList.insertAdjacentHTML('afterbegin', dataList.join(''));

            if (this.lastId === undefined)
                messages.scrollTo(0, messages.scrollHeight)

            this.lastId = data[0].id;
        });

        getMessages();


        const pressedKeys = {}

        messageInput.addEventListener('keydown', ev => {
            pressedKeys[ev.key] = true;

            if (pressedKeys['Enter'] && !pressedKeys['Shift']) {
                sendMessage(messageInput.value);
                messageInput.value = '';
                auto_grow();
                ev.preventDefault();
            }

        });

        messageInput.addEventListener('keyup', ev => {
            delete pressedKeys[ev.key];
            console.log(ev.key);

        });


    }
}