const socket = io();

const roomName = document.getElementById('roomName');
const password = document.getElementById('password');
const form = document.getElementById('form');
const messages = document.getElementById('messages');
const input = document.getElementById('input');

const p = document.getElementById('p');
p.innerHTML = localStorage.getItem('roomName');

socket.on('save', data => {
    console.log('data : ', data);

    for (const key in data)
        localStorage.setItem(key, data[key]);

    p.innerHTML = localStorage.getItem('roomName');
});

socket.on('error', error => {
    console.log(error);
})

socket.on('message', (message) => {
    console.log("message : ", message.content);

    const item = document.createElement('li');
    item.textContent = message.content;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight)
});

function room(createRoom = true) {
    socket.emit('room', {
        createRoom,
        roomName: roomName.value.trim(),
        roomPassword: password.value.trim()
    });
}

console.log(localStorage.getItem('memberId'))

if (localStorage.getItem('memberId'))
    socket.emit('reconnect', {
        memberId: localStorage.getItem('memberId'),
        memberName: localStorage.getItem('memberName'),
        roomName: localStorage.getItem('roomName'),
        roomPassword: localStorage.getItem('roomPassword'),
    });


form.addEventListener('submit', sendMessage);

function sendMessage(event) {
    if (input.value) {
        socket.emit('message', {
            roomName: localStorage.getItem('roomName'),
            roomPassword: localStorage.getItem('roomPassword'),
            memberId: localStorage.getItem('memberId'),
            memberName: localStorage.getItem('memberName'),
            content: input.value
        });
        input.value = '';

    }
    event.preventDefault();
}

