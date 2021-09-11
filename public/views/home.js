export default class HomeView {
    constructor() {
        document.title = 'Home';
    }

    getHtml = () =>
        `
     <h1>Create a private room for discussion without showing your name</h1>
     <div>
        <button onclick="router('createRoom')">Create room</button>
        <button onclick="">Join room</button>
     </div>
     `;
}