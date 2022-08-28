const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)
var users = { };
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on("new-user",(name)=>{
        users[socket.id] = name
        socket.broadcast.emit("user",name)
    })
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
    socket.on('disconnect', ()=>{
        // if someone leaves the chat , let other user know.
           socket.broadcast.emit('leave',users[socket.id]);
           delete users[socket.id];
       });

})