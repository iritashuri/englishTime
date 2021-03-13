user = JSON.parse(user);
if (user.level == "A1") {
    start("level1");
}
else
    start("level2");


function start(level) {
    document.getElementById(level).style.display = "block";
    document.getElementById(user.level).className = document.getElementById(user.level).className + " active";
}

function openLevels(evt, level) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        console.log(tablinks[i].className);
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(level).style.display = "block";
    evt.currentTarget.className += " active";
}