const bodyElement = document.querySelector("body");
const backgroundElement = document.querySelector(".background");
const backgroundTravelling = document.querySelector(".backgroundTravelling");
const backgroundMinColor = [85, 83, 76];
const colorScale = 120;
let percScroll = 0;
let targetColor = backgroundMinColor;
let imageRot = 0;

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function rotLeft(){
    imageRot = imageRot-120;
    updateGallery();
}
function rotRight(){
    imageRot = imageRot+120;
    updateGallery();
}

function updateGallery() {
    let imagecontainer = document.querySelector(".imageContainer");
    imagecontainer.style.transform = `perspective(2000px) rotateY(${imageRot}deg)`;
}

function setBehavior(){
    // Updating Gallery
    try{
        updateGallery();
    } catch(error){
        console.log("No media to display.");
    }

    
    // Hide scrollbar if window is at the top
    window.addEventListener('scroll', () => {
        percScroll = Math.min(window.scrollY/window.innerHeight, 1);
        if (window.scrollY == 0) {
            document.querySelector(".Btn").style.visibility = "hidden";
            bodyElement.style.overflowY = "hidden";
        } else {
            document.querySelector(".Btn").style.visibility = "visible";
            bodyElement.style.overflowY = "visible";
        }
        
        let fadeInElements = document.getElementsByClassName('fadeIn');
        let relScreenPos = 0;

        for(let i = 0; i < fadeInElements.length; i++){
            let elementBoundingRect = fadeInElements[i].getBoundingClientRect();
            let scale = 0.4;
            relScreenPos = 1-Math.max(0, Math.min((document.documentElement.scrollTop + elementBoundingRect.y - window.scrollY - window.innerHeight * (1-scale))/(window.innerHeight * scale), 1));

            fadeInElements[i].style.opacity = relScreenPos;
        }
    });
}

setBehavior();