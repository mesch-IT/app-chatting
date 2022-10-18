import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profile from "../img/contact.png"
import InputEmoji from "react-input-emoji"

const ChatBox = ({ userSelected, currentUser }) => {

    const [chat, setChat] = useState("")
    const [messages, setMessages] = useState([])
    const [sendMessage,setSendMessage] = useState("")




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
     
    }, [userSelected])

    

    // // get messages

    // useEffect(() => { 
    //     axios({
    //         method: 'get',
    //         url: `http://localhost:3001/message/${chat}`,
    //     })
    //         .then((data) => {
    //             setMessages(data)

    //         })
    //         .catch((err) => {
    //             console.log("err", err)
    //         })
    // },[chat])


    const allMessages = messages?.data?.map(message => {
        let statutMessage = currentUser === message.senderId ? 'outcome' : 'income'
        const d = new Date(message.createdAt);
       let date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString()

        return (
            <div key={message._id} className={statutMessage}>
                <div className="message">{message.text}</div>
                <div className="timestamp">{date}</div>
            </div>
        )

    })

    const newMessage = (event) => {
        event.preventDefault()


        let body = {
            chatId: chat,
            senderId: currentUser,
            text : sendMessage

        }
        
        axios({
            method: 'POST',
            url: `http://localhost:3001/message/`,
            data: body

        })
            .then(() => {
                console.log("message sent successfully")
            })
            .catch(err => { 
                console.log("error sending")
            })
        setSendMessage("")
    }
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
                <div className="chatt_body">

                    {allMessages}
                   
                </div>
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
