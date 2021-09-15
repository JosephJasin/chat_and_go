import navigateTo from "./navigator.js";

export const socket = io();

socket.on('save', data => {
    for (const key in data)
        localStorage.setItem(key, data[key]);

    navigateTo('/chat');
});

socket.on('error', error => {
    const snackbar = document.getElementById('snackbar');

    snackbar.textContent = error;

    snackbar.style.setProperty('opacity', '1');
    snackbar.style.setProperty('transform', 'translateY(-50px)')

    setTimeout(() => {
        snackbar.style.setProperty('opacity', '0');
        snackbar.style.setProperty('transform', 'translateY(50px)');

    }, 4000);
})

export function room(createRoom = true) {
    const roomName = document.getElementById('roomName').value.trim();
    const password = document.getElementById('roomPassword').value.trim();

    if (!createRoom && localStorage.getItem('roomName') === roomName
        && localStorage.getItem('roomPassword') === password) {

        reconnect(true);

    } else {
        socket.emit('room', {
            createRoom,
            roomName: roomName,
            roomPassword: password
        });
    }
}

if (localStorage.getItem('memberId'))
    reconnect();

export function reconnect(manual = false) {
    socket.emit('reconnect', {
        manual,
        memberId: localStorage.getItem('memberId'),
        memberName: localStorage.getItem('memberName'),
        roomName: localStorage.getItem('roomName'),
        roomPassword: localStorage.getItem('roomPassword')
    });
}

export function sendMessage(content) {
    content = content.trim();

    if (content.length === 0)
        return;

    socket.emit('message', {
        roomName: localStorage.getItem('roomName'),
        roomPassword: localStorage.getItem('roomPassword'),
        memberId: localStorage.getItem('memberId'),
        memberName: localStorage.getItem('memberName'),
        content: content
    });
}

export function getMessages(lastId = undefined) {
    socket.emit('messages', {
        lastId,
        roomName: localStorage.getItem('roomName'),
        roomPassword: localStorage.getItem('roomPassword'),
        memberId: localStorage.getItem('memberId'),
        memberName: localStorage.getItem('memberName'),
    });
}


