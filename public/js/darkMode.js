let dark = localStorage.getItem('dark') === '1';

if (dark)
    toggleDarkMode(false);

function toggleDarkMode(flip = true) {
    if (flip) {
        dark = !dark;
        localStorage.setItem('dark', dark ? '1' : '0');
    }

    const style = document.documentElement.style;

    const primary = "#1C1C1C";
    const accent = "#F7F7F7";

    const primaryBrighter = "#333333";
    const accentBrighter = "#FFFFFF";

    style.setProperty('--primary-color', dark ? accent : primary);
    style.setProperty('--accent-color', dark ? primary : accent);
    style.setProperty('--primary-color-brighter', dark ? accentBrighter : primaryBrighter);
    style.setProperty('--accent-color-brighter', dark ? primaryBrighter : accentBrighter);
}