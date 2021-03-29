var coll = document.getElementsByClassName("collapsible");
var i;
let innerHtmlHreats = "";

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

export function drowHearts(heartRate) {
    for (let i = 0; i < heartRate; i++) {
        //drow heart
        innerHtmlHreats += "<img src='/img/heart.png'>"
    }
    document.getElementById("heart-rate").innerHTML = innerHtmlHreats;
    document.getElementById("heart-rate").style.marginTop = "50px";
    document.getElementById("heart-rate").style.marginBottom = "50px";
    innerHtmlHreats = "";
    heartRate = localStorage.getItem('heart-rate');
}