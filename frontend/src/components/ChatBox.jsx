import React, { useState } from 'react'
import profile from '../images/mesch.jpg'
import { MdPhotoCamera } from "react-icons/md"
import { AiOutlineSend } from "react-icons/ai"
import { useEffect } from 'react'
import axios from 'axios'

const ChatBox = ({ userSelected,currentUser }) => {
    
    console.log("user selected", userSelected)

    const [isChat, setIsChat] = useState("")
    
    //get chat
    useEffect(() => {
             axios({
                    method: 'get',
                    url: `http://localhost:3001/chat/${currentUser}/${userSelected._id}`,
                })
                    .then((data) => {
                   if (data) {
                  
                      setIsChat(data.data._id)
                   }
                    })
                    .catch((err) => {
                        console.log("err", err)
                    })
    }, [])

    // console.log("chat with", isChat)
    // get messages
  
        useEffect(() => {
            axios({
                method: 'get',
                url: `http://localhost:3001/message/${isChat}`,
            })
                .then((data) => {
                   console.log("messages ",data)
                })
                .catch((err) => {
                    console.log("err", err)
                })
        }, [isChat])

    return (
        <div className='conversation'>
            <div style={{ width: "100%" }}>
                <div className="profile-conversation">
                    <img src={profile} alt="mon profile" />
                    <div className='name-receiver'>
                        <h2>{userSelected.username }</h2>
                        <p style={{ textAlign: "center" }}>Online</p>
                    </div>
                </div>
                <div className="bottom"></div>
            </div>
            <div className="discussion"></div>
            <div className="bottom-last"></div>
            <div className="send-message">
                <div className='send-text'>
                    <input type="text" placeholder='text here' />
                    <label htmlFor="file"> <MdPhotoCamera className='icon-camera' /> </label>
                    <input type="file" id='file' style={{ display: "none" }} />
                </div>
                <div className='icon-send'>
                    <AiOutlineSend className='send' />
                </div>

            </div>


        </div>
    )
}

export default ChatBox
