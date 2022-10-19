import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import profile from "../img/contact.png"
import InputEmoji from "react-input-emoji"
import { io } from "socket.io-client"
import ScrollToBottom from "react-scroll-to-bottom"

const ChatBox = ({ userSelected, currentUser }) => {

    const [chat, setChat] = useState("")
    const [messages, setMessages] = useState([])
    const [sendMessage, setSendMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    let receiverId = ""

    let socketData = {}


    useEffect(() => { 

        socket.current = io("http://localhost:8800")

        socket.current.emit("new-user", currentUser)
        
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users)
            console.log(onlineUsers)
        })

    }, [currentUser])
    
    

    // get chat
    useEffect(() => {
        axios({
            method: 'POST',
            url: `http://localhost:3001/chat/${currentUser}/${userSelected._id}`,
        })
            .then((data) => {
                
                setMessages(data)
                setChat(data.data[0].chatId)
                
                
              

            })
            .catch((err) => {
                console.log("error to get chat", err)
            })
     
    }, [userSelected,messages])



    const newMessage = (event) => {
        event.preventDefault()
     


        let body = {
            chatId: chat,
            senderId: currentUser,
            text : sendMessage

        }
        
        axios({
            method: 'POST',
            url: `http://localhost:3001/message/newMessage`,
            data: body

        })
            .then((data) => {
                console.log("message sent successfully", data)
                setMessages([...messages, data.data])
            })
            .catch(err => { 
                console.log("error sending")
            })
      
       
        
    

        
        
        // setSendMessage("")
    }
      // send message to socket server 
   

    useEffect(() => {
      
        receiverId = userSelected._id
        socketData = {
            sendMessage,
            receiverId,
            chat
        }

        socket.current.emit("send-message",socketData)

    }, [sendMessage])
    
    // receive message from socket server

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log("Received message",data)
        })
    },[sendMessage])

    
    const allMessages = messages?.data?.map(message => {

        let statutMessage = currentUser === message.senderId ? 'outcome' : 'income'

        const d = new Date(message.createdAt)
        let date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString()

        return (

            <div key={message._id} className={statutMessage}>
                <div className="message">{message.text}</div>
                <div className="timestamp">{date}</div>
            </div>

        )

    })
    return (
        <>

            {/* <!-- the chatt component like --> */}
            <div className="chatt_box">
                <div className="chatt_header">
                    <div className="profile_mini">
                        <img src={profile} alt="" className="cover" />
                    </div>
                    <div className="chatting_name">
                        <div className="bold fs-5 mb-0">{userSelected.username}</div>
                        <span className="small_light">Online</span>
                    </div>
                </div>
                <ScrollToBottom className="chatt_body">

                    {allMessages}
                   
                </ScrollToBottom>
                <form action="" onSubmit={newMessage}>
                    <div className="chatt_footer">
                        <div className="d-flex align-items-start">
                            <div className="message_type">
                                <input className="input_blank" value={sendMessage}
                                    name="" rows="2"
                                    onChange={(event) => { 
                                        setSendMessage(event.target.value)
                                    }}
                                />
                                <div className="camera">
                                    <i className="las la-camera"></i>
                                </div>
                            </div>
                            <button type='submit' className="btn-core">
                                <i className="las la-paper-plane"></i>
                            </button>
                        </div>
                    </div>
            </form>
            </div>
        </>
    )
}

export default ChatBox
