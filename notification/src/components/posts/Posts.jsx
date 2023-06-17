import React, {  useState } from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './posts.css';


function Posts({post,socket2,userName}) {
    const [liked,setLiked]=useState(false);
    
    const handleClick=()=>{
        setLiked(!liked);
       socket2.emit("sendNotification",{userName:userName,receiverName:post.username});
   }
 
    return (
      
        <div className="posts">
            <div className="toppost">
            <img src={post.userImg} alt="" className="userImg" />
            <p className="fullname">{post.fullname}</p>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="bottompost">
                <div className="iconleft">
                    {liked?<FavoriteOutlinedIcon className='icon icon_red' onClick={()=>handleClick()}/>:<FavoriteOutlinedIcon className='icon' onClick={handleClick}/>}
                    <CommentOutlinedIcon  className='icon'/>
                    <IosShareOutlinedIcon className='icon'/>
                </div>
                <div className="iconright">
                    <InfoOutlinedIcon className='icon'/>
                </div>
            </div>
        </div>
    )
}

export default Posts
