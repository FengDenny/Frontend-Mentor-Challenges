const openMenuButton = document.getElementById("menu-open")
const menuOpened = document.getElementById("opened-menu")
const closeMenuButton = document.getElementById("menu-close")
const overlay = document.getElementById("overlay")


function toggleMenu(show) {
    menuOpened.classList.toggle('show', show);
    menuOpened.classList.toggle('not-show', !show);
    overlay.classList.toggle('show', show);
    overlay.classList.toggle('not-show', !show);
  }

openMenuButton.addEventListener("click", () => toggleMenu(true))
closeMenuButton.addEventListener("click", () => toggleMenu(false)) 
overlay.addEventListener('click', () => toggleMenu(false));