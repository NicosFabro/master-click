let sendButton = document.querySelector("#sendButton");
let resetButton = document.querySelector("#resetButton");
let textMessage = document.querySelector("#textMessage");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");

const urlParams = new URLSearchParams(window.location.search);

const socket = io();

socket.on("usuario conectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha conectado"
    );
    d.appendChild(t);

    usersConnected.innerText = data.usersConnected;
});

socket.on("usuario desconectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha desconectado!"
    );
    d.appendChild(t);

    usersConnected.innerText = data.usersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", urlParams.get("user"));
});

socket.on("numero de usuarios", (data) => {
    usersConnected.innerText = data.usersConnected;
    numClicksText.innerHTML = data.numClicks;
    average.innerText = data.numClicks / data.usersConnected;
});
socket.on("new click", (data) => {
    numClicksText.innerText = data.numClicks;
    clicksUserTxt.innerText = data.clicksPerUser[socket.id] || 0;
    average.innerText = data.numClicks / data.usersConnected;
    positionAvg.innerText = data.clicksPerUser[socket.id] < (data.numClicks / data.usersConnected) ? "debajo" : "encima"
});

socket.on("callbackReset", (data) => {
    numClicksText.innerText = data.numClicks;
    clicksUserTxt.innerText = data.clicksPerUser[socket.id] || 0;
    average.innerText = 0;
    positionAvg.innerText = "debajo";
});

sendButton.onclick = () => {
    socket.emit("click", "");
};

resetButton.onclick = () => {
    socket.emit("reset", "");
};
