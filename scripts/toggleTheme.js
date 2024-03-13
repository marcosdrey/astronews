const switchTheme = document.querySelector('#switch-theme');

switchTheme.addEventListener('click', () => {
    if(switchTheme.getAttribute('value') === "light") {
        switchTheme.setAttribute("value", "dark");
        document.body.setAttribute("class", "dark")
    } else {
        switchTheme.setAttribute("value", "light");
        document.body.setAttribute("class", "light")
    }
})