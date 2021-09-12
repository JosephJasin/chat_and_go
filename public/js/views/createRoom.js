import {room} from "../socket_io.js";
import navigateTo from "../navigator.js";

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
            <input id="roomPassword" placeholder="Room password" minlength="4" maxlength="16" required/>
            <input type="submit" value="Create" />
            </form>
        </div>
    `;

    init = () => {
        const createRoomForm = document.getElementById('createRoomForm');

        const roomName = document.getElementById('roomName');

        createRoomForm.addEventListener('submit', ev => {
            ev.preventDefault();
            room(this.createRoom);
        });
    }
}

