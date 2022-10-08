function dropdownChanged() {
    var value = document.getElementById("promptType").value;

    if (value === "prompt") {
        document.getElementById("promptInput").classList.remove("disabled");
        document.getElementById("virusInput").classList.add("disabled");
        document.getElementById("gameInput").classList.add("disabled");
    }
    else if (value === "virus") {
        document.getElementById("promptInput").classList.add("disabled");
        document.getElementById("virusInput").classList.remove("disabled");
        document.getElementById("gameInput").classList.add("disabled");
    }
    else if (value === "game") {
        document.getElementById("promptInput").classList.add("disabled");
        document.getElementById("virusInput").classList.add("disabled");
        document.getElementById("gameInput").classList.remove("disabled");
    }
}

function addLine() {
    var value = document.getElementById("promptType").value;
    var line = `{ type:"`;

    if (value === "prompt") {
        line += `prompt", title:"", body:"`;
        line += document.getElementById("promptText").value;
        document.getElementById("promptText").value = "";
        line += `" },\n`;
    }
    else if (value === "virus") {
        line += `virus", title:"Virus", body:"`;
        line += document.getElementById("virusText").value;
        document.getElementById("virusText").value = "";
        line += `", resolution:"`;
        line += document.getElementById("resText").value;
        document.getElementById("resText").value = "";
        line += `", time:`;
        line += document.getElementById("virusTime").value;
        document.getElementById("virusTime").value = 1;
        line += `},\n`;
    }
    else if (value === "game") {
        line += `game", title:"Game", body:"`;
        line += document.getElementById("gameText").value;
        document.getElementById("gameText").value = "";
        line += `" },\n`;
    }

    document.getElementById("promptOutput").innerHTML = document.getElementById("promptOutput").innerHTML + line;
}

function onGenerateLoad() {
    dropdownChanged();
}