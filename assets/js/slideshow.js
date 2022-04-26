let slideIndex = 1;
showSlides(slideIndex);
let timer = setInterval(increaseSlide,4000);

function plusSlides(n){
    showSlides(slideIndex+=n);
    clearInterval(timer);
    timer = setInterval(increaseSlide,4000);
}

function increaseSlide(){
    showSlides(++slideIndex);
}

function showSlides(n){
    let i;
    let slides = document.getElementsByClassName("slides");
    // reset counter ifs
    if(n > slides.length){
        slideIndex = 1;
    }

    if(n < 1){
        slideIndex = slides.length;
    }

    // run through the images
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";  // show the current image
}