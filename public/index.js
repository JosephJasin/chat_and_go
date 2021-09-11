import HomeView from "./views/home.js";
import CreateRoomView from "./views/createRoom.js";

import './socket_io.js';

const app = document.getElementById('app');

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

function router() {
    let view;
    switch (location.pathname.toLowerCase()) {
        case '/createroom' :
            view = new CreateRoomView();
            break;

        default:
            view = new HomeView();
    }
    app.style.setProperty('opacity', '0');

    setTimeout(()=>{
        app.innerHTML = view.getHtml();
        view.init();
        app.style.setProperty('opacity', '1');
    } , 300)
}

window.addEventListener('popstate',  router);
document.addEventListener("DOMContentLoaded",  router);
window.navigateTo = navigateTo;

function toggleDarkMode() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const primary = style.getPropertyValue('--primary-color')
    const accent = style.getPropertyValue('--accent-color')

    const primaryBrighter = style.getPropertyValue('--primary-color-brighter')
    const accentBrighter = style.getPropertyValue('--accent-color-brighter')


    console.log(primary, accent)

    root.style.setProperty('--primary-color', accent);
    root.style.setProperty('--accent-color', primary);

    root.style.setProperty('--primary-color-brighter', accentBrighter);
    root.style.setProperty('--accent-color-brighter', primaryBrighter);
}

window.toggleDarkMode = toggleDarkMode;


