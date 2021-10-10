import {room} from "../socket_io.js";

export default class CreateRoomView {
    constructor(createRoom = true) {
        this.createRoom = createRoom;
        document.title = this.title = createRoom ? 'Create Room' : 'Join Room';
    }

    getHtml = () => `
        <div class="create-room">
            <h1>${this.title}</h1>
            <form id="createRoomForm">
                <input id="roomName" placeholder="Room name" minlength="1" maxlength="36" required/> 
                <input id="roomPassword" type="password" placeholder="Room password" minlength="4" maxlength="16" required/>
                <button class="wide-button">${this.title}</button>
            </form>
        </div>
    `;

    init = () => {
        document.getElementById('createRoomForm')
            .addEventListener('submit', ev => {
                ev.preventDefault();
                room(
                    this.createRoom,
                    document.getElementById('roomName').value.trim(),
                    document.getElementById('roomPassword').value.trim()
                );
            });
    }
}