export default class HomeView {
    constructor() {
        document.title = 'Home';
    }

    getHtml = () =>
        `
     <div class="home">
        <h1>Create a private room for discussion without showing your name</h1>
        <div>
        <button onclick="navigateTo('createRoom')">Create room</button>
        <button onclick="">Join room</button>
        </div> 
    </div>
     `;

    init = () =>{

    }
}