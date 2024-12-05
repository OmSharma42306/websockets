import { useEffect, useState } from 'react'



function App() {
  const [socket,setSocket] = useState<WebSocket | any>(null);
  const [messages,setMessages] = useState<string>("");
  const [inputMessages,setInputMessages] = useState("");
  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () =>{
      console.log("Socket Created.")
      setSocket(socket);
    }

    // receiving message from socket-server to client.
    socket.onmessage = (messages) =>{
        console.log(messages);
        setMessages(messages.data);
      // setMessages(messages);
    }


  },[])
  if(!socket){
    return <div>
      Connecting to Socket Server....
    </div>
  }
  
  return (
    <>
      <div>
        {messages}
        <div>
          <input type="text" placeholder='Enter Message' onChange={(e)=>{
            setInputMessages(e.target.value);
          }} />
  
        </div>
        <button onClick={()=>{
          socket.send(inputMessages);
        }}>send message</button>
        </div>
    </>
  )
}

export default App
