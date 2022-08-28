const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let profile = document.querySelector("#profile")
let messageArea = document.querySelector('.message__area')
let sound = new Audio("music.mp3");
do {
    name = prompt('Please enter your name: ')
    profile.textContent= name
    textarea.name=name
} while(!name)


let send = document.querySelector("#send")

let n;
socket.emit("new-user",name)
socket.on("user",(name)=>{
    alert(name+" is joinig the chat")
})


textarea.addEventListener('click', (e) => {
        n = e.target.name
})

textarea.addEventListener('touchstart', (e) => {
        n = e.target.name
})

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        n = e.target.name
        sendMessage(e.target.value,n)
    }
})

send.addEventListener("click",()=>{
   
    if(textarea.value == ""){
       
    }
    else{
    
    sendMessage(textarea.value,n)
    }
})


// for device like mobile phones
send.addEventListener("touchend",()=>{
   
    if(textarea.value == ""){
       
    }
    else{
    
    sendMessage(textarea.value,n)
    }
})



function sendMessage(message,n) {
    sound.play();
    let msg = {
        user: n,
        message: message.trim()
    }
    // Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
     mainDiv.classList.add(className, 'message')
     let username = document.querySelector('.username')
     let markup = `
     <h4 style="color:white">${msg.user}</h4>
     <p style="blue: #F06D06">${msg.message}</p>
 `
  
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}

// Recieve messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')

    scrollToBottom()
})

socket.on('leave',(name)=>{
    alert(`${name} left the chat`)
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}






















