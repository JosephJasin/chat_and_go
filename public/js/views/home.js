import navigateTo from "../navigator.js";

export default class HomeView {
    constructor() {
        document.title = 'Home';
    }

    getHtml = () =>
        `
     <div class="home">
        <h1>Create a private room for discussion without showing your name</h1>
        <div>
        <button id="createRoomButton" class="wide-button">Create room</button>
        <button id="joinRoomButton" class="wide-button">Join room</button>
        </div> 
    </div>
     `;

    init = () => {
        const createRoomButton = document.getElementById('createRoomButton');
        const joinRoomButton = document.getElementById('joinRoomButton');

        createRoomButton.onclick = () => navigateTo('/createRoom');
        joinRoomButton.onclick = () => navigateTo('/joinRoom');
    }
}