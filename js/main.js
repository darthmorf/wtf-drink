var menuVisible = false;

var players = [];

var promptIndex = 0;

function onload() {
    alert("Warning!\n\nPlease drink responsibly. By continuing, you agree that you are responsible for any consequences that may result from the use of this site.");
    prompts = shuffle(prompts);   
    saveMenuState(); 
    addEnd();
}

function addEnd() {
    prompts.push({ type:"special", title:"End", body:"Refresh the page to start again!"});
}

function newPrompt() {
    if (players.length < 2)
        return;

    var prompt = prompts[promptIndex];
    promptIndex++;
    var bg = document.getElementById("bg");
    var title = document.getElementById("title");
    var body = document.getElementById("body");

    prompt = allocateNames(prompt);
    prompt = modifyDrinkAmount(prompt);

    if (prompt.type === "virus") {
        bg.classList = "";
        bg.classList.add("bg");
        bg.classList.add("virus");
        bg.classList.add("pointy");

        var resolution = {type:"resolution", title:"Virus Over", body:prompt.resolution};
        var time = parseInt(document.getElementById("virusMultiplier").value) * Math.floor(Math.random() * 6) + 5;
        time++;
        prompts.pop();
        
        if (promptIndex + time >= prompts.length){
            prompts.push(resolution);
        }
        else {
            prompts.splice(promptIndex + time, 0, resolution);
        }
        addEnd();

    }
    else if (prompt.type === "game") {
        bg.classList = "";
        bg.classList.add("bg");
        bg.classList.add("pointy");
        bg.classList.add("game");
    }
    else if (prompt.type === "special") {
        bg.classList = "";
        bg.classList.add("bg");
        bg.classList.add("pointy");
        bg.classList.add("rainbow");
    }
    else if (prompt.type === "resolution") {
        bg.classList = "";
        bg.classList.add("bg");
        bg.classList.add("pointy");
        bg.classList.add("virus");
    }
    else {
        bg.classList = "";
        bg.classList.add("bg");
        bg.classList.add("pointy");
        bg.classList.add("standard");
    }

    title.innerHTML = prompt.title;
    body.innerHTML = prompt.body;
}

function allocateNames(prompt) {
    players = shuffle(players);
    for (var i = 0; i < players.length; i++) {
        prompt.body = prompt.body.replace(new RegExp("@" + i + ";", "g"), players[i]);

        if (prompt.type === "virus") {
            prompt.resolution = prompt.resolution.replace(new RegExp("@" + i + ";", "g"), players[i]);
        }
    }
    return prompt;
}

function modifyDrinkAmount(prompt) {
    var modifier = parseInt(document.getElementById("drinkMultiplier").value);

    while (prompt.body.includes("%;")) {
        prompt.body = prompt.body.replace("%;", "%" + (Math.floor(Math.random() * 3) + 1) + ";");
    }

    while (true) {
        var amount = prompt.body.substring(
            prompt.body.lastIndexOf("%") + 1, 
            prompt.body.lastIndexOf(";")
        );
        
        amount = parseInt(amount);
        if (isNaN(amount)) {
            break;
        }

        prompt.body = prompt.body.replace(new RegExp("%" + amount + ";", "g"), amount * modifier);
    }

    while (true && prompt.type === "virus") {

        while (prompt.resolution.includes("%;")) {
            prompt.resolution = prompt.resolution.replace("%;", "%" + (Math.floor(Math.random() * 3) + 1) + ";");
        }

        var amount = prompt.resolution.substring(
            prompt.resolution.lastIndexOf("%") + 1, 
            prompt.resolution.lastIndexOf(";")
        );
        
        amount = parseInt(amount);
        if (isNaN(amount)) {
            break;
        }

        prompt.resolution = prompt.resolution.replace(new RegExp("%" + amount + ";", "g"), amount * modifier);
    }
    return prompt;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function saveMenuState() {
    var names = document.getElementById("nameInput").value;
    players = names.split("\n");
    players = players.filter(function (el) {
        return el != "";
      });
}


function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menuVisible) {
        fade(menu);
        menuVisible = false;
        saveMenuState();
    }
    else {
        unfade(menu);
        menuVisible = true;
    }
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.classList.add("disabled");
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    element.classList.remove("disabled");
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }

    var fullscreenBtn = document.getElementById("fullscreenBtn");
    fullscreenBtn.classList.remove("fa-expand");
    fullscreenBtn.classList.add("fa-compress");
    fullscreenBtn.onclick = function () { closeFullscreen() };
}

function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }

    var fullscreenBtn = document.getElementById("fullscreenBtn");
    fullscreenBtn.classList.remove("fa-compress");
    fullscreenBtn.classList.add("fa-expand");
    fullscreenBtn.onclick = function () { openFullscreen() };
} 