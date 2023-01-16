/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios"
import React from "react"
import profile from "../img/contact.png"

const AllUsers = ({
  setIsLoadingMessage,
  setShowChat,
  allUsers,
  setUserSelected,
  currentUser,
  setChat,
  setMessages,
  userSearch,
  textSearch,
  showAllUsers,
}) => {
  const selectUser = (user) => {
    setShowChat(true)
    setUserSelected(user)
    setIsLoadingMessage(true)
    axios({
      method: "POST",
      url: `http://localhost:3001/chat/${currentUser}/${user._id}`,
    })
      .then((data) => {
        if (data.data.messages.length > 0) {
          setMessages(data.data.messages)
          setChat(data.data.messages[0].chatId)
          setIsLoadingMessage(false)
        }
        if (data.data.messages.length == 0) {
          setMessages(data.data.messages)
          setChat(data.data.chatId)
          setIsLoadingMessage(false)
        }
      })
      .catch((err) => {
        console.log("error to get chat", err)
      })
  }
  if (textSearch.trim()) {
    const filteredUsers = allUsers.data
      .filter((user) => {
        return user.username.toLowerCase().includes(textSearch)
      })
      .map((user) => {
        return (
          <div
            key={user._id}
            className="user"
            onClick={() => selectUser(userSearch)}
          >
            <div className="profile_mini">
              <img src={profile} alt="" className="cover" />
            </div>
            <div className="chatt_details">
              <div className="bold">{user.username}</div>
            </div>
          </div>
        )
      })
    return filteredUsers
  } else if (showAllUsers) {
    const users = allUsers?.data?.map((user) => {
      return (
        <div key={user._id} className="user" onClick={() => selectUser(user)}>
          {user.urlAvatar ? (
            <div className="profile_minimum">
              <img src={user.urlAvatar} alt="" className="cover" />
            </div>
          ) : (
            <div className="profile_minimum">
              <img src={profile} alt="" className="cover" />
            </div>
          )}

          <div className="chatt_details">
            <div className="bold">{user?.username}</div>
          </div>
        </div>
      )
    })
    return users
  }
}

export default AllUsers
