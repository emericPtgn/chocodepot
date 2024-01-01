const dropdownCategorie = document.querySelector(".dropdown-categorie");
const dropdownMenuCategorie = document.querySelector(".dropdown-menu-categorie");

dropdownCategorie.addEventListener("click", () => {
    if(dropdownCategorie.src.includes('fleche-bas.png')) {
        dropdownCategorie.src = `images/fleche-haut.png`;
        dropdownMenuCategorie.style.display = 'block';
    } else {
        dropdownCategorie.src = `images/fleche-bas.png`
        dropdownMenuCategorie.style.display = 'none';
    }
})

const dropdownPrix = document.querySelector(".dropdown-prix");
const dropdownMenuPrix = document.querySelector(".dropdown-menu-prix");

dropdownPrix.addEventListener("click", () => {
    if(dropdownPrix.src.includes('fleche-bas.png')) {
        dropdownPrix.src = `images/fleche-haut.png`;
        dropdownMenuPrix.style.display = 'block';
    } else {
        dropdownPrix.src = `images/fleche-bas.png`
        dropdownMenuPrix.style.display = 'none'
    }
})

const dropdownNote = document.querySelector(".dropdown-note");
const dropdownMenuNote = document.querySelector(".dropdown-menu-note");

dropdownNote.addEventListener("click", () => {
    if(dropdownNote.src.includes('fleche-bas.png')) {
        dropdownNote.src = `images/fleche-haut.png`;
        dropdownMenuNote.style.display = 'block';
    } else {
        dropdownNote.src = `images/fleche-bas.png`
        dropdownMenuNote.style.display = 'none';
    }
})