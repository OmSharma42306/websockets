import http from "http"; 
import WebSocket,{WebSocketServer} from "ws";
const server = http.createServer(function (req:any,res:any){
    console.log("hello http",req.url);
    res.end("hi i am from http server");
});

const wss = new WebSocketServer({server});
let userCount = 0;
wss.on('connection',function connection(ws){
    ws.on('error',console.error);
    userCount++;
    console.log("New Client Connected!",userCount);
    ws.on('message',function message(data,isBinary){
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        })
    })
    ws.send('Hello message from websockets')
})
server.listen(8080,()=>{
    console.log("Server started.")
})