export default class CreateRoomView {
    constructor() {
        document.title = 'Create Room'
    }

    getHtml = () => `
        <input id="roomName"> </input>
        <input id="roomPassword"> </input>
        <button>Create</button>
    `;
}

