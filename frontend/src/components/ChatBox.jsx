import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import profile from "../img/contact.png"
import InputEmoji from "react-input-emoji"
import { io } from "socket.io-client"
import ScrollToBottom from "react-scroll-to-bottom"

const ChatBox = ({
    userSelected,
    currentUser,
    setMessages,
    messages,
    chat
}) => {

    const [sendMessage, setSendMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socketData, setSocketData] = useState({})
    const socket = useRef()
    let receiverId = ""

   

    useEffect(() => { 

        socket.current = io("http://localhost:8800")

        socket.current.emit("new-user", currentUser)
        
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users)
            
        })

    }, [currentUser])
    
    // // send message to socket server 


    // useEffect(() => {

    //      if (socketData.textSend !== "") {
    //          socket.current.emit("send-message", socketData)
    //      }
     
        
        

    // }, [socketData])
    // receive message from socket server

    useEffect(() => {
        socket.current.on("receive-message", (data) => {

            console.log("socket", data)

            setMessages(prevState => [...prevState, data])
            // setMessages(prevstate => ({
            //     ...prevstate,
            //     data
            // }))
        })

    }, [])

 



    
    
    const newMessage = (event) => {
        event.preventDefault()
     


        let body = {
            chatId: chat,
            senderId: currentUser,
            receiverId : userSelected._id,
            text : sendMessage

        }
        
        axios({
            method: 'POST',
            url: `http://localhost:3001/message/newMessage`,
            data: body

        })
            .then((data) => {
                

                setMessages([...messages, data.data])
                // setSocketData(prevState => ({
                //     ...prevState,
                //       data : data.data
                // }))
                // setSocketData(data.data)
            
                
           
                // setSocketData(prevState => ({
                //     ...prevState,
                //     textSend: data.data.text,
                //     receiverId: userSelected._id
                // }))

                
                
            })
            .catch(err => { 
                console.log("error sending")
            })
       
     
        setSendMessage("")
       
      
    }
  
  
    
    
    useEffect(() => {

        socket.current.emit("send-message", messages)
    }, [messages])

 
    //console.log("from socket", messages)

    const allMessages = messages?.map(message => {

        

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
