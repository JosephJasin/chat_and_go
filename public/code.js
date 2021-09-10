const socket = io();

const roomName = document.getElementById('roomName');
const password = document.getElementById('password');
const form = document.getElementById('form');
const messages = document.getElementById('messages');
const input = document.getElementById('input');

const p = document.getElementById('p');
p.innerHTML = localStorage.getItem('roomName');

socket.on('save', data => {
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

socket.on('messages', msgs => {

    msgs.forEach(message => {
        const item = document.createElement('li');
        item.textContent = message.content;
        messages.appendChild(item);
    });

    window.scrollTo(0, document.body.scrollHeight)
});

socket.emit('test', {
    memberId: localStorage.getItem('memberId'),
    memberName: localStorage.getItem('memberName'),
    roomName: localStorage.getItem('roomName'),
    roomPassword: localStorage.getItem('roomPassword'),
});

function room(createRoom = true) {
    socket.emit('room', {
        createRoom,
        roomName: roomName.value.trim(),
        roomPassword: password.value.trim()
    });
}

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

function toggleDarkMode() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const primary = style.getPropertyValue('--primary-color')
    const accent = style.getPropertyValue('--accent-color')

    console.log(primary , accent)

    root.style.setProperty('--primary-color', accent);
    root.style.setProperty('--accent-color', primary);
}