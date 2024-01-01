let currentIndex = 0;
let slides = document.querySelectorAll("#carrousel img");
let totalSlides = slides.length;
let progressCircles = document.querySelectorAll(".progressCircle");

function displaySlide(index){
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
    progressCircles.forEach((circle, i) => {
        circle.classList.toggle("active", i === index)
    })
}

function nextSlide(){
    currentIndex = (currentIndex + 1) % totalSlides
    displaySlide(currentIndex);
}

/* function prevSlide(){
    currentIndex = (currentIndex - 1 + totalSlides);
    displaySlide(currentIndex)
} */

displaySlide(currentIndex);
setInterval(nextSlide, 5000)
