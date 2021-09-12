import CreateRoomView from "./views/createRoom.js";
import HomeView from "./views/home.js";
import ChatView from "./views/chat.js";

const app = document.getElementById('app');

export default function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

function router() {
    let view;
    switch (location.pathname.toLowerCase()) {
        case '/createroom' :
            view = new CreateRoomView();
            break;

        case '/joinroom' :
            view = new CreateRoomView(false);
            break;

        case '/chat' :
            view = new ChatView();
            break;

        default:
            view = new HomeView();
    }
    app.style.setProperty('opacity', '0');

    setTimeout(() => {
        app.innerHTML = view.getHtml();
        view.init();
        app.style.setProperty('opacity', '1');
    }, 300)
}

window.addEventListener('popstate', router);
document.addEventListener("DOMContentLoaded", router);

