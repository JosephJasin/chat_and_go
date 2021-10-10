import {sendMessage, socket, getMessages} from "../socket_io.js";

export default class ChatView {
    constructor() {
        document.title = 'Chat';

        this.oldestMessageId = undefined;
    }

    getHtml = () =>
        `<div class="chat">
            <div id="messages">
                <ul id="messagesList"></ul>
            </div>
            <div class="input-with-icon">
                <textarea id="sendMessageInput" placeholder="Write a message" minlength="1" maxlength="256" required></textarea>
                <i id="sendMessageIcon" class="far fa-paper-plane"></i>
            </div>
         </div>`;


    init = () => {
        socket.off('message');
        socket.off('messages');

        const root = document.documentElement;

        const maxInputHeight = 150;

        const input = document.getElementById('sendMessageInput');
        const icon = document.getElementById('sendMessageIcon');

        const msgs = document.getElementById('messages');
        const list = document.getElementById('messagesList');

        let paste = false;
        let isEnterKeyDown = false;
        let isShiftKeyDown = false;
        let prevWindowHeight = root.clientHeight;

        function getTextDirection(text) {
            return text.trim().codePointAt(0) > 127 ? 'rtl' : 'ltr';
        }

        function auto_grow() {
            //When the height is set to zero `input.scrollHeight` will take the minimum
            //required height, this will make the input to return to its original height
            //when text is removed.
            input.style.height = "0px";

            input.style.height = Math.min(input.scrollHeight, maxInputHeight) + "px";

            if (msgs.scrollHeight - (msgs.offsetHeight + msgs.scrollTop) <= maxInputHeight)
                msgs.scrollTo(0, msgs.scrollHeight)
        }

        function send() {
            sendMessage(input.value);
            input.value = '';
            auto_grow();
        }

        auto_grow();

        //Input Listeners
        input.addEventListener('paste', () => paste = true);
        input.addEventListener('input', () => {
            const msg = input.value.trim();

            if (msg.length || paste) {
                input.dir = getTextDirection(msg);
                paste = false;
            }

            auto_grow();
        });

        input.addEventListener('keydown', ev => {
            if (ev.key === 'Enter') isEnterKeyDown = true;
            if (ev.key === 'Shift') isShiftKeyDown = true;

            if (isEnterKeyDown && isShiftKeyDown) {
                send();
                ev.preventDefault();
            }
        });

        input.addEventListener('keyup', ev => {
            if (ev.key === 'Enter') isEnterKeyDown = false;
            if (ev.key === 'Shift') isShiftKeyDown = false;
        });

        //Send Icon
        icon.onclick = () => {
            send();
            input.focus();
        }

        //Window Listener
        window.addEventListener('resize', ev => {
            const style = document.getElementsByClassName('input-with-icon')[0].style;
            const currentHeight = root.clientHeight;

            if (currentHeight < prevWindowHeight || innerHeight < 600) {
                msgs.scrollTo(0, msgs.scrollTop + prevWindowHeight - currentHeight)
                style.setProperty('padding-bottom', '5px');
            } else if (style.getPropertyValue('padding-bottom') === '5px')
                style.setProperty('padding-bottom', '40px');

            prevWindowHeight = currentHeight;
        })

        //Handling Messages
        socket.on('message', (message) => {
                const item = document.createElement('li');
                item.dir = getTextDirection(message.content);

                item.innerHTML = `${message.memberName}\n${message.content}`;
                list.appendChild(item);
                msgs.scrollTo(0, msgs.scrollHeight)
            }
        );

        socket.on('messages', (data) => {
            if (data.length === 0 || data[0].id === this.oldestMessageId)
                return;

            const dataList = data.reverse().map(m =>
                `<li dir=${getTextDirection(m.content)}>${m.name}\n${m.content}</li>`
            )

            list.insertAdjacentHTML('afterbegin', dataList.join(''));

            if (this.oldestMessageId === undefined)
                msgs.scrollTo(0, msgs.scrollHeight)

            this.oldestMessageId = data[0].id;
        });

        msgs.addEventListener('scroll', () => {
            if (msgs.scrollTop <= 100) getMessages(this.oldestMessageId);
        });

        getMessages();
    }
}