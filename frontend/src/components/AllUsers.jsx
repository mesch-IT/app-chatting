import axios from "axios"
import React from "react"
import profile from "../img/contact.png"

const AllUsers = ({
  setShowChat,
  allUsers,
  setUserSelected,
  currentUser,
  setChat,
  setMessages,
}) => {
  const selectUser = (user) => {
    setShowChat(true)
    setUserSelected(user)
    axios({
      method: "POST",
      url: `http://localhost:3001/chat/${currentUser}/${user._id}`,
    })
      .then((data) => {
        if (data.data.messages.length > 0) {
          setMessages(data.data.messages)
          setChat(data.data.messages[0].chatId)
        }
        if (data.data.messages.length == 0) {
          console.log(data.data)
          setMessages(data.data.messages)
          setChat(data.data.chatId)
        }
      })
      .catch((err) => {
        console.log("error to get chat", err)
      })
  }

  const users = allUsers?.data?.map((user) => {
    return (
      <div key={user._id} className="user" onClick={() => selectUser(user)}>
        <div className="profile_mini">
          <img src={profile} alt="" className="cover" />
        </div>
        <div className="chatt_details">
          <div className="bold">{user?.username}</div>
        </div>
      </div>
    )
  })

  return users
}

export default AllUsers
