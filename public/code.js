const socket = io();

const roomName = document.getElementById('roomName');
const password = document.getElementById('password');

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

function room(createRoom = true) {
    socket.emit('room', {
        createRoom,
        roomName: roomName.value.trim(),
        roomPassword: password.value.trim()
    });
}

if (localStorage.getItem('memberID'))
    socket.emit('reconnect', {
        memberId: localStorage.getItem('memberID'),
        memberName: localStorage.getItem('memberName'),
        roomName: localStorage.getItem('roomName'),
        roomPassword: localStorage.getItem('roomPassword'),
    });

// socket.on('msg', (message) => {
//     console.log("msg : " , message.content);
//
//     const messages = document.getElementById('messages');
//     const item = document.createElement('li');
//     item.textContent = message.content;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight)
// });


// const form = document.getElementById('form');
// form.addEventListener('submit', sendMessage);
//
// function sendMessage(event) {
//     const input = document.getElementById('input');
//
//     if (input.value) {
//         socket.emit('msg', {
//             ID: localStorage.getItem('ID'),
//             roomID: localStorage.getItem('roomID'),
//             password: localStorage.getItem('password'),
//             content: input.value
//         });
//         input.value = '';
//
//     }
//
//     event.preventDefault();
// }
//
