import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar.jsx";
import { posts } from "./data";
import Posts from "./components/posts/Posts.jsx";
import { io } from "socket.io-client";


function App() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [socket,setSocket]=useState('');
  useEffect(()=>{
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);
    socketInstance.emit('newUser',user);
  },[user]);
  return (
    <>
      {user ? (
        <>
          <Navbar socket2={socket} />
          {posts.map((post) => {
            return <Posts post={post} key={post.id}  socket2={socket} userName={user}/>;
          })}
        </>
      ) : (
        <div className="login">
          <h1 className="app_name">Aswanth App</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login_inpt"
            placeholder="username"
          />
          <button onClick={() => setUser(username)} className="login_btn">
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default App;
