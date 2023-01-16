import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AllUsers from "./AllUsers"
import ChatBox from "./ChatBox"
import profile from "../img/contact.png"
import chatIcon from "../img/chat.png"
import users from "../img/users.svg"
import Loader from "./Loader"

const Home = () => {
  let navigate = useNavigate()
  let token, currentUser, profileUser

  const user = JSON.parse(localStorage.getItem("user"))

  const [allUsers, setAllUsers] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [userSelected, setUserSelected] = useState({})
  const [chat, setChat] = useState("")
  const [messages, setMessages] = useState([])
  const [textSearch, setTextSearch] = useState("")
  // const [userSearch, setUserSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMessage, setIsLoadingMessage] = useState(false)
  const [showAllUsers, setShowAllUsers] = useState(false)

  // connexion to home page
  if (user) {
    token = user.data.token
    currentUser = user.data.id
    profileUser = user.data.userAvatar
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/users/home",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("errors", err)
        navigate("/")
      })
  }, [])
  useEffect(() => {
    setIsLoading(true)
    axios({
      method: "GET",
      url: `http://localhost:3001/users/${currentUser}`,
    })
      .then((users) => {
        setAllUsers(users)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("we can't get users", err)
      })
  }, [])

  const handleUsers = () => {
    setShowAllUsers(true)
  }
  const logout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }
  const handleSearch = (event) => {
    setTextSearch(event.target.value)
  }
  return (
    <>
      <div className="app_wrapper">
        {/* <!-- the side bard component like --> */}
        <div className="sidebar">
          <div className="top_sidebar">
            {profileUser ? (
              <div className="profile_minimum">
                <img src={profileUser} alt="" className="cover" />
              </div>
            ) : (
              <div className="profile_minimum">
                <img src={profile} alt="" className="cover" />
              </div>
            )}

            <div className="side_list">
              <div className="list">
                <i className="las la-comment-dot"></i>
              </div>
            </div>
          </div>
          <div>
            <img src={chatIcon} alt="" className="chat-icon" />
          </div>
          <div>
            <img
              src={users}
              alt=""
              className="chat-icon"
              onClick={handleUsers}
            />
          </div>
          <div className="bottom_sidebar">
            <div className="sign_out" onClick={logout}>
              <i className="las la-sign-out-alt"></i>
            </div>
          </div>
        </div>

        {/* <!-- the user list component like --> */}
        <div className="user_list">
          <div className="search">
            <i className="las la-search"></i>
            <input
              type="text"
              className="input_blank"
              value={textSearch}
              onChange={handleSearch}
              // onKeyDown={handleSearch}
            />
            <i className="las la-ellipsis-v"></i>
          </div>

          <div className="recent_users">
            <h5 className="little_title mb-4">All users</h5>
            {isLoading ? (
              <Loader />
            ) : (
              <AllUsers
                setIsLoadingMessage={setIsLoadingMessage}
                currentUser={currentUser}
                setShowChat={setShowChat}
                allUsers={allUsers}
                setUserSelected={setUserSelected}
                userSelected={userSelected}
                setChat={setChat}
                chat={chat}
                setMessages={setMessages}
                messages={messages}
                textSearch={textSearch}
                showAllUsers={showAllUsers}
              />
            )}
          </div>
        </div>

        {showChat && (
          <ChatBox
            isLoadingMessage={isLoadingMessage}
            userSelected={userSelected}
            currentUser={currentUser}
            setMessages={setMessages}
            chat={chat}
            messages={messages}
          />
        )}
      </div>
    </>
  )
}

export default Home
