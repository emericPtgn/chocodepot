let menuToggle = document.getElementById("menuToggle")
let menuMobile = document.getElementById("menuMobile")


menuToggle.addEventListener("click", function () {
    var navBar = document.getElementById("navBar");
    navBar.classList.toggle("menu-visible")
})
