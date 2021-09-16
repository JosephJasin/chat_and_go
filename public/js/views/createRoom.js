import {room} from "../socket_io.js";

export default class CreateRoomView {
    constructor(createRoom = true) {
        document.title = createRoom ? 'Create Room' : 'Join Room';
        this.createRoom = createRoom;
    }

    getHtml = () => `
        <div class="create-room">
            <h1>${this.createRoom ? "Create room" : "Join room"}</h1>
            <form id="createRoomForm">
            <input id="roomName" placeholder="Room name" minlength="1" maxlength="36" required/> 
            <input id="roomPassword" type="password" placeholder="Room password" minlength="4" maxlength="16" required/>
            <button class="wide-button">${this.createRoom ? "Create room" : "Join room"}</button>
            </form>
        </div>
    `;

    init = () => {
        const createRoomForm = document.getElementById('createRoomForm');

        createRoomForm.addEventListener('submit', ev => {
            ev.preventDefault();
            room(this.createRoom);
        });

        const footer = document.getElementsByTagName('footer')[0];
        footer.style.display = 'flex';
    }
}

