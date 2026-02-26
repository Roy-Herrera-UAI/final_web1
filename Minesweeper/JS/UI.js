"use strict"

function setFace(state) {
    var img = document.getElementById("face");
    if (state === "dead") {
        img.src = "dead.png";
    } else if (state === "win") {
        img.src = "cool.png";
    } else {
        img.src = "smile.png";
    }
}