const balloonImages = [
    'Symbol100001.png',
    'Symbol100002.png',
    'Symbol100003.png',
    'Symbol100004.png',
    'Symbol100005.png',
    'Symbol100006.png',
    'Symbol100007.png',
    'Symbol100008.png',
    'Symbol100009.png',
    'Symbol100010.png'
];

const alphabets = [
    'Symbol10001.png',
    'Symbol10002.png',
    'Symbol10003.png',
    'Symbol10004.png',
    'Symbol10005.png',
    'Symbol10006.png',
    'Symbol10007.png',
    'Symbol10008.png',
    'Symbol10009.png',
    'Symbol10010.png',
    'Symbol10011.png',
    'Symbol10012.png',
    'Symbol10013.png',
    'Symbol10014.png',
    'Symbol10015.png',
    'Symbol10016.png',
    'Symbol10017.png',
    'Symbol10018.png',
    'Symbol10019.png',
    'Symbol10020.png',
    'Symbol10021.png',
    'Symbol10022.png',
    'Symbol10023.png',
    'Symbol10024.png',
    'Symbol10025.png',
    'Symbol10026.png'
];

let release = 0;
let i = 0;

// Function to preload images
function preloadImages(imageArray, folder) {
    const preloadedImages = [];
    imageArray.forEach(image => {
        const img = new Image();
        img.src = `assets/${folder}/${image}`;
        preloadedImages.push(img);
    });
    return preloadedImages;
}

// Preload balloon and alphabet images
const preloadedBalloonImages = preloadImages(balloonImages, 'balloonsImg');
const preloadedAlphabetImages = preloadImages(alphabets, 'alphabets');


function setupBalloon(balloon) {
    
    let posX = 183;
    let posY = 165;
    let yBuffer = Math.random();
    let xBuffer = Math.random();
    let velocityX = 2 * xBuffer; // Horizontal speed (pixels per frame)
    let velocityY = 1 * yBuffer;
    let animationFrameId; // Declare animationFrameId here
    
    setInterval(() => {
        yBuffer = Math.random() * 10;
        xBuffer = Math.random() * 10;
    }, 3000);
    
    if(release == 3){
        balloon.style.zIndex = '0';
        balloon.classList.add('active');
        release = 0;
    }
    
    if(balloon.classList.contains('active')){    
        function moveBalloon() {
            const balloonWidth = balloon.offsetWidth;
            const balloonHeight = balloon.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Update position
            posX += velocityX;
            posY += velocityY;
            
            // Check collision with left or right walls
            if (posX + balloonWidth > viewportWidth || posX < 0) {
                velocityX = -velocityX; // Reverse direction on X axis
                if (velocityY < 0) {
                    velocityY = -velocityY * Math.random() * 2;
                }
            }
            
            // Check collision with top or bottom walls
            if (posY + balloonHeight > viewportHeight || posY < 0) {
                velocityY = -velocityY;
            }
            
            // Apply new position
            balloon.style.right = posX + 'px';
            balloon.style.bottom = posY + 'px';
            
            // Save the animation frame ID so it can be canceled later
            animationFrameId = requestAnimationFrame(moveBalloon);
        }
        
        // Start the animation for this balloon
        moveBalloon();
        
        balloon.addEventListener("click", (event) => {
            balloon.style.transition = ".5s ease";
            balloon.style.opacity = 0;
            balloon.style.scale = 2;
            
            // Stop the animation
            cancelAnimationFrame(animationFrameId);
            // Update score
            i += 1;
            document.getElementById("score").innerText = i;
            setTimeout(() => {
                balloon.remove();
            }, 500);
        });
    }else{
        // Randomly select an image for each balloon
        const randomIndex = Math.floor(Math.random() * balloonImages.length);
        const randomImage = balloonImages[randomIndex];
        
        const randomAIndex = Math.floor(Math.random() * alphabets.length);
        const randomAImage = alphabets[randomAIndex];
        
        // Set the background image of the balloon
        balloon.style.backgroundImage = `url('assets/balloonsImg/${randomImage}')`;
        balloon.style.backgroundSize = 'cover'; // Optional: Ensure the image covers the entire balloon
        
        balloon.style.setProperty('--alpha-image', `url('assets/alphabets/${randomAImage}')`);
        balloon.style.setProperty('--alpha-size', 'contain');
    }
}

// Apply setup to all existing balloons
document.querySelectorAll('#balloon').forEach(balloon => {
    setupBalloon(balloon);
});


let releaseBalloon;
function floatBalloon(){
        const createBalloon = document.createElement("div");
        createBalloon.id = "balloon";
        createBalloon.style.position = "absolute";
        document.body.appendChild(createBalloon);
        
        releaseBalloon = createBalloon;
        
        setupBalloon(releaseBalloon);
}
floatBalloon();

//on click pump
const body = document.getElementById("body");
const handle = document.getElementById("handle");
const pump = document.getElementById("pump-container");

// Function to handle the press action (mousedown/touchstart)
function handlePress(event) {

    release++;
    //handle transition
    handle.classList.add('pressed');
    pump.classList.add('pressed');

    //balloon transition
    if(release == 1){
        releaseBalloon.style.transition = "scale .7s";
        releaseBalloon.style.scale = ".3 .4";
    }else if(release == 2){
        releaseBalloon.style.bottom = 162+'px';
        releaseBalloon.style.scale = ".65 .7";
    }else if(release == 3){
        releaseBalloon.style.transition = "scale .3s";
        releaseBalloon.style.scale = "1";
    }

    if(release == 3){
        setupBalloon(releaseBalloon);
        floatBalloon();
    }
    
}

// Function to handle the release action (mouseup/touchend)
function handleRelease(event) {
    handle.classList.remove('pressed');
    pump.classList.remove('pressed');

}


body.addEventListener("mousedown", handlePress);
body.addEventListener("touchstart", handlePress);
body.addEventListener("mouseup", handleRelease);
body.addEventListener("touchend", handleRelease);



// custome cursor
function cursormove(event){
    const { clientX, clientY } = event;
    
    cursor.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`
      },
      { duration: 700, fill: "forwards",easing: "ease-in-out"}
    );
}
document.addEventListener("mousemove", cursormove);
document.addEventListener("click", cursormove);



window.addEventListener("mouseout", (event) =>{
    cursor.style.display = "none";
})
window.addEventListener("mouseover", (event) =>{
    cursor.style.display = "block";
})