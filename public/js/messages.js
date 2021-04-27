export function goodJobMessage() {
    document.getElementById("message").innerHTML = "כל הכבוד";
    document.getElementById("message").style.display = "block";


    setTimeout(function () {
        //document.getElementById("message").innerHTML = '';
        document.getElementById("message").style.display = "none";
    }, 3000);
}

export function ExalentMessage() {
    document.getElementById("message").innerHTML = "מצויין , המשך כך";
    document.getElementById("message").style.display = "block";


    setTimeout(function () {
        //document.getElementById("message").innerHTML = '';
        document.getElementById("message").style.display = "none";
    }, 3000);
}

export function keepGoingMessage() {
    document.getElementById("message").innerHTML = "לומדים מכל טעות";
    document.getElementById("message").style.display = "block";


    setTimeout(function () {
        //document.getElementById("message").innerHTML = '';
        document.getElementById("message").style.display = "none";
    }, 3000);
}