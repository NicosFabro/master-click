const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: { origin: "*" },
});
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

let usersConnected = 0;
let numClicks = 0;

let clicksPerUser = new Map();

// escuchar conexiones
io.on("connection", (socket) => {
    usersConnected++;

    // evento para saber quien es el username del socket abierto y emite el
    // username y usersConnected
    socket.on("iam", (username) => {
        socket.broadcast.emit("usuario conectado", {
            username,
            usersConnected,
        });
        socket.username = username;
        socket.emit("numero de usuarios", {
            usersConnected,
            numClicks,
        });
    });

    socket.on("click", () => {
        numClicks++;

        // Utilizo `socket.id` porque cualquier persona podría poner el nombre de usuario en la urlParams
        if (clicksPerUser[socket.id] != null) {
            clicksPerUser[socket.id]++;
        } else {
            clicksPerUser[socket.id] = 1;
        }
        io.emit("new click", {
            numClicks,
            clicksPerUser,
            usersConnected,
        });
        console.log(clicksPerUser)
    });

    socket.on("reset", () => {
        numClicks = 0;
        for (let entry in clicksPerUser) {
            clicksPerUser[entry] = 0;
        }
        // console.log(clicksPerUser.size);
        io.emit("callbackReset", {
            numClicks,
            clicksPerUser
        });
    });

    // detecta la desconexión y emite un evento al cliente con el username desconectado
    socket.on("disconnect", () => {
        usersConnected--;
        socket.broadcast.emit("usuario desconectado", {
            username: socket.username,
            usersConnected: usersConnected,
        });
    });
});

const port = process.env.PORT || 3000;

http.listen(port);
