import React from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import "./navbar.css";
import { useState, useEffect } from "react";

function Navbar({ socket2 }) {
  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(()=>{
    socket2.on("getNotification", (user) => {
        console.log("getNotification : "+user);
      setNotification(()=>[user]);
    });
  },[socket2]);
  
  
  const displayNotification = () => {
    return <span>{`${notification} liked your post`}</span>;
  };
  const mark_as_read=()=>{
    setOpen(!open);
    setNotification([]);
  }
  return (
    <>
      <div className="container">
        <div className="navbar">
          <h1 className="app_name">Aswanth app</h1>
          <div className="icon_container">
            <div className="icon" onClick={() => setOpen(!open)}>
              {notification.length>0&&<div className="counter">{notification.length}</div>}
              <NotificationsActiveOutlinedIcon />
            </div>
            <div className="icon">
              <MessageOutlinedIcon />
            </div>
            <div className="icon">
              <SettingsIcon />
            </div>
          </div>
        </div>
        {open && <div className="notification">
            {displayNotification()}
            <button className="mark_as_read" onClick={()=>mark_as_read()}>Mark as read</button>
            </div>}
      </div>
    </>
  );
}

export default Navbar;
