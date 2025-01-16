// Global Variables for Keys and Sounds
var drumKeys = ["w", "a", "s", "d", "j", "k", "l"];
var soundPaths = {
    "w": "sounds/tom-1.mp3",
    "a": "sounds/tom-2.mp3",
    "s": "sounds/tom-3.mp3",
    "d": "sounds/tom-4.mp3",
    "j": "sounds/snare.mp3",
    "k": "sounds/crash.mp3",
    "l": "sounds/kick-bass.mp3"
};

// Detect Button Press
var totalDrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < totalDrums; i++) {
    document.getElementsByClassName("drum")[i].addEventListener("click", function () {
        var buttonClicked = this.innerHTML;
        makeSound(buttonClicked);
        animateButton(buttonClicked);
    });
}

// Detect Keyboard Press
document.addEventListener("keydown", function (event) {
    makeSound(event.key);
    animateButton(event.key);
});

// Function to Play Sound Based on Key
function makeSound(key) {
    if (soundPaths[key]) {
        var audio = new Audio(soundPaths[key]);
        audio.play();
    } else {
        console.log("Unmapped key: " + key);
    }
}

// Button Animation
function animateButton(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add("pressed");
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100);
    }
}

// Play All Drums Sequentially on Button Click
document.getElementById("playAll").addEventListener("click", function () {
    this.disabled = true; // Disable button during playback

    for (var i = 0; i < drumKeys.length; i++) {
        (function (index) {
            setTimeout(function () {
                var key = drumKeys[index];
                var audio = new Audio(soundPaths[key]);
                audio.play();
                animateButton(key);

                // Re-enable button after last sound
                if (index === drumKeys.length - 1) {
                    document.getElementById("playAll").disabled = false;
                }
            }, i * 70); // Delay between each sound
        })(i);
    }
});
