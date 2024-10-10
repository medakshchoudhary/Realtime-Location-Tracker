const express = require('express');
const app = express();
const path = require("path");

// setting up socket.io
const http = require("http");

const socketio = require("socket.io")
const server = http.createServer(app);
const io = socketio(server)

io.on("connection", (socket)=>{
    console.log("connected")
})


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})