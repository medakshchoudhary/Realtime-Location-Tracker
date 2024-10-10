const express = require('express');
const app = express();
const path = require("path");

// setting up socket.io
const http = require("http");

const socketio = require("socket.io")
const server = http.createServer(app);
const io = socketio(server)

io.on("connection", (socket)=>{
    console.log("connected") // check why when inside the send location it is printing double 
    socket.on("send-location", function (data){
        io.emit("receive-location", {id: socket.id, ...data})
    })

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
        console.log("disconnected");
    })
})

// for the views directory
app.set("views", path.join(__dirname, "../frontend/views"));

app.set("view engine", "ejs");
// for the static files directory
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})