export default class CreateRoomView {
    constructor() {
        document.title = 'Create Room'
    }

    getHtml = () => `
        <div class="create-room">
            <h1>Create room</h1>
            <form id="createRoomForm">
            <input id="roomName" placeholder="Room name" minlength="1" maxlength="36" required/> 
            <input id="roomPassword" placeholder="Room password" minlength="4" maxlength="16" required/>
            <input type="submit" value="Create" />
            </form>
        </div>
    `;

    init = () =>{
        const createRoomForm = document.getElementById('createRoomForm');
        createRoomForm.addEventListener('submit' , ev => {
            ev.preventDefault();
            room();
        });


    }

}

