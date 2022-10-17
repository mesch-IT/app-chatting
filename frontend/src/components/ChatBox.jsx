import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profile from "../img/contact.png"

const ChatBox = ({ userSelected,currentUser}) => {

    const [chat, setChat] = useState("")
    const [messages, setMessages] = useState([])

    

    // get chat 
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/chat/${currentUser}/${userSelected._id}`,
        })
            .then((data) => {

                    setChat(data.data._id)
                
            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [userSelected])

    

    console.log("chat selected",chat)
   // get messages

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/message/${chat}`,
        })
            .then((data) => {
                setMessages(data)

            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [chat])
    if (Object.keys(messages).length > 0) {
        console.log("messages ", messages)
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
                    <div className="income">
                        <div className="message">Hey there !</div>
                        <div className="timestamp">Today, 2:0pm</div>
                    </div>
                    <div className="income">
                        <div className="message">How are you doing ?</div>
                        <div className="timestamp">Today, 2:0pm</div>
                    </div>
                    <div className="outcome">
                        <div className="message">Hello...</div>
                        <div className="timestamp">Today, 2:0pm</div>
                    </div>
                    <div className="outcome">
                        <div className="message">I'm good and what about you?</div>
                        <div className="timestamp">Today, 2:0pm</div>
                    </div>
                </div>
                <div className="chatt_footer">
                    <div className="d-flex align-items-start">
                        <div className="message_type">
                            <input className="input_blank" name="" rows="2" />
                            <div className="camera">
                                <i className="las la-camera"></i>
                            </div>
                        </div>
                        <button className="btn-core">
                            <i className="las la-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBox
