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



// socket.on('messages', msgs => {
//
//     msgs.forEach(message => {
//         const item = document.createElement('li');
//         item.textContent = message.content;
//         messages.appendChild(item);
//     });
//
//     window.scrollTo(0, document.body.scrollHeight)
// });

// socket.emit('test', {
//     memberId: localStorage.getItem('memberId'),
//     memberName: localStorage.getItem('memberName'),
//     roomName: localStorage.getItem('roomName'),
//     roomPassword: localStorage.getItem('roomPassword'),
// });

export function room(createRoom = true) {
    const roomName = document.getElementById('roomName');
    const password = document.getElementById('roomPassword');

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


