/* eslint-disable react/prop-types */
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import ScrollToBottom from "react-scroll-to-bottom"
import profile from "../img/contact.png"
import Loader from "./Loader"
const ChatBox = ({
  isLoadingMessage,
  userSelected,
  // eslint-disable-next-line react/prop-types
  currentUser,
  // eslint-disable-next-line react/prop-types
  setMessages,
  // eslint-disable-next-line react/prop-types
  messages,
  // eslint-disable-next-line react/prop-types
  chat,
}) => {
  const [sendMessage, setSendMessage] = useState("")
  //const [onlineUsers, setOnlineUsers] = useState([])
  const [imageUrl, setImageUrl] = useState({})
  const [fileChosen, setFileChosen] = useState(false)
  const socket = useRef()

  useEffect(() => {
    socket.current = io("http://localhost:8800")

    socket.current.emit("new-user", currentUser)
    socket.current.emit("join-room", chat)

    // socket.current.on("get-users", (users) => {
    //  // setOnlineUsers(users)
    // })
  }, [chat])

  // // send message to socket server

  // receive message from socket server

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setMessages([...messages, data])
    })
  }, [messages])

  const keepImage = (file) => {
    setImageUrl(file[0])
    setFileChosen(true)
  }

  const newMessage = async (event) => {
    event.preventDefault()
    let response, urlImageCloud
    if (fileChosen) {
      const formData = new FormData()
      formData.append("file", imageUrl)
      formData.append("upload_preset", "myImage")
      response = await axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/deuutxkyz/image/upload",
        data: formData,
      })

      urlImageCloud = response.data.secure_url
    }
    let body = {
      chatId: chat,
      senderId: currentUser,
      text: sendMessage,
      urlImageDb: urlImageCloud,
    }
    if (body.text.length > 0 || body.urlImageDb?.length > 0) {
      axios({
        method: "POST",
        url: `http://localhost:3001/message/newMessage`,
        data: body,
      })
        .then((data) => {
          setMessages([...messages, data.data])
          socket.current.emit("send-message", data.data)
        })
        .catch((err) => {
          console.log("error sending", err)
        })
    }

    setSendMessage("")
    setFileChosen(false)
    setImageUrl("")
  }

  // eslint-disable-next-line react/prop-types
  const allMessages = messages?.map((message) => {
    let statutMessage = currentUser === message.senderId ? "outcome" : "income"

    const d = new Date(message.createdAt)
    let date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString()

    return (
      <div key={message._id} className={statutMessage}>
        {message.text ? <div className="message">{message.text}</div> : null}
        <div className="timestamp">{date}</div>
        <div>
          <img src={message.urlImageDb} alt="" className="send-image" />
        </div>
      </div>
    )
  })
  return (
    <>
      {/* <!-- the chatt component like --> */}
      <div className="chatt_box">
        <div className="chatt_header">
          {userSelected.urlAvatar ? (
            <div className="profile_minimum">
              <img src={userSelected.urlAvatar} alt="" className="cover" />
            </div>
          ) : (
            <div className="profile_minimum">
              <img src={profile} alt="" className="cover" />
            </div>
          )}
          <div className="chatting_name">
            <div className="bold fs-5 mb-0">{userSelected.username}</div>
            <span className="small_light">Online</span>
          </div>
        </div>
        {isLoadingMessage ? (
          <Loader />
        ) : (
          <ScrollToBottom className="chatt_body">{allMessages}</ScrollToBottom>
        )}
        <form action="" onSubmit={newMessage}>
          <div className="chatt_footer">
            <div className="d-flex align-items-start">
              <div className="message_type">
                <input
                  className="input_blank"
                  value={sendMessage}
                  name=""
                  rows="2"
                  onChange={(event) => {
                    setSendMessage(event.target.value)
                  }}
                />
                <div className="camera">
                  <label htmlFor="image">
                    <i className="las la-camera" id="camera-send"></i>
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    id="image"
                    onChange={(event) => {
                      keepImage(event.target.files)
                    }}
                  />
                </div>
              </div>
              <button type="submit" className="btn-core">
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
