import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import search from "../images/search.svg"
import profile from "../images/mesch.jpg"
import exit from "../images/exit.svg"
import { useState } from 'react'
import { format } from "timeago.js"
import {io} from "socket.io-client"
import { useRef } from 'react'
import AllUsers from './allUsers'
import ChatBox from './ChatBox'



const Home = () => {

    let navigate = useNavigate()

    let token, currentUser

    const [logged, setLogged] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
  
  
    

    console.log(currentUser)

 
    const [chats, setChats] = useState({})
    const [userData, setUserData] = useState({})
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState({})
    const [newMessage, setNewMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [visible, setVisible] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [userSelected, setUserSelected] = useState({})

    const socket = useRef()

    // useEffect(() => {

    //     socket.current = io("http://localhost:8800")
    //     socket.current.emit("new-user", currentUser)
        
    //     socket.current.on("get-users", (users) => {

    //         setOnlineUsers(users.userId)
    //         console.log("online",users)
    //     })
    // },[currentUser])

    // get chat
    // useEffect(() => {

    //         setLogged(true)
    //             axios({
    //                 method: 'get',
    //                 url: `http://localhost:3001/chat/${currentUser}`,
    //             })
    //                 .then((data) => {
    //                     setChats(data)
                     
    //                 })
    //                 .catch((err) => {
    //                     console.log("err", err)
    //                 })
             
        
        
   
    // }, [logged])
    
    
    // useEffect(() => {
    //     if (Object.keys(chats).length > 0) {
    //         console.log("chats",chats.data[0].members)
    //     }
    // }, [chats])
  
    // get user
   

    // useEffect(() => {
    //     if (Object.keys(chats).length > 0) {


    //         const userId = chats.data[0]?.members?.find((id) => id !== currentUser)
    //         axios({
    //             method: 'get',
    //             url: `http://localhost:3001/users/${userId}`,
    //         })
    //             .then((data) => {
    //                 // console.log("user",data)
    //                 setUserData(data.data)

    //             })
    //             .catch((err) => {
    //                 console.log("err", err)

    //             })
    //     }
    // }, [chats])
    
    // get messages

    // useEffect(() => {

    //     if (Object.keys(chats).length > 0) {
    //         axios({
    //             method: 'get',
    //             url: `http://localhost:3001/message/${chats.data[0]?._id}`,
    //         })
    //             .then((data) => {
    //                 setMessages(data)
    //                 // console.log("messages", data)


    //             })
    //             .catch((err) => {
    //                 console.log("err", err)

    //             })
    //     }
    

    // }, [chats])
    
    //  console.log("messages", messages.data)
       
    // const handleChange = (newMessage) => {
    //            setNewMessage(newMessage)
    // }

    // const handleSend = (event) => {
    //     event.preventDefault()
        
    //     const message = {
    //         senderId: currentUser,
    //         text: newMessage,
    //         chatId: chats.data[0]?._id
    //     }

    //     // send message to db
    //     axios({
    //         method: 'post',
    //         url: `http://localhost:3001/message/`,
    //         data : message
    //     })
    //         .then(() => {
               
    //             // console.log("messages", data)


    //         })
    //         .catch((err) => {
    //             console.log("err", err)

    //         })
    //     setNewMessage("")
    //     setMessages([...messages,message])
        
    // }
    
     // connexion to home
    if (user) {
        token = user.data.token
        currentUser = user.data.id   
    }
    useEffect(() => {

        // const user = JSON.parse(localStorage.getItem('user'))
        // const token = user.data.token
        
        axios({
            method: 'get',
            url: 'http://localhost:3001/users/home',
            headers: {
                Authorization: token
            }
        })
            .then((res) => {

                console.log(res)
            })
            .catch((err) => {
                console.log("errors", err)
                navigate("/users/login")
            })
    }, [])

 
    
// get users
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/users/${currentUser}`,
        })
            .then((data) => {

                setAllUsers(data)



            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [])
    return (
          <div className="home">
             <div className="left">
                 <div className="left-user-profile">
                     <div className='profile-img' >
                         <img src={profile} alt="profile user" className='profile-user' />
                     </div>
                     <div >
                         <img src={exit} alt="" className='exit' />
                     </div>
                 </div>
                 <div className="left-chat">
                     <div className="left-search-bar">
                         <div className='left-img-search' >
                             <img src={search} alt="search user" />
                         </div>
                         <div className='left-div-search'>
                             <input type="text" className='left-input' placeholder="Search a user" />
                         </div>
                     </div>
                     <div className="left-recent-chat">
                        {/* dispay all users */}
                          <AllUsers currentUser={currentUser} setVisible={setVisible}  allUsers={allUsers} setUserSelected={setUserSelected} />                     

                     </div>
                 </div>
            </div>
            {
               
                visible && <ChatBox userSelected={userSelected} currentUser={currentUser} />
          }
        </div>
    
            )
        }

    


export default Home


