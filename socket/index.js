import { Server } from "socket.io";

const io = new Server(5000, { 
    cors:[{
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }]
});

let onlineUsers=[];
let addnewUser=(userName,socketid)=>{
    !onlineUsers.some(user=>user.userName===userName)&&
    onlineUsers.push({userName:userName,socketid:socketid})
}
let getUser=receiverName=>onlineUsers.find(user=>user.userName===receiverName);

io.on("connection", (socket) => {
    console.log('connected');
    socket.on('newUser',(userName)=>{
        console.log("inside newUser")
    addnewUser(userName,socket.id);
  })
  socket.on('sendNotification',({userName,receiverName})=>{
    const receiver=getUser(receiverName);
    console.log("inside send notification");
    // onlineUsers.map(user=>console.log(user))
    console.log("Receiver : "+receiver.socketid);
    io.to(receiver.socketid).emit('getNotification',userName);
  })
  socket.on('disconnect',()=>console.log('disconnected'));
});