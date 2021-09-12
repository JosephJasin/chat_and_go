import './socket_io.js';
import './navigator.js';

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


