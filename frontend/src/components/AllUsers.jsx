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

                console.log("chat id", data.data)
                if (data.data.data) {
                    setChat(data.data.data._id)
                   console.log("chat id",data.data.data)
                  setMessages(data.data.messages)
                }
                if (data.data.messages) {
                    setChat(data.data.messages[data.data.messages.length - 1].chatId)
                   //console.log("chat messages", data.data.messages[0].text)
                       setMessages(data.data.messages)
                 }
              
               
                // if (data.data.messages.length > 0) {
              
                //      setChat(data.data.messages[0].chatId)
                // }
                //    if (data.data.messages.length == 0) {
                 
                //        console.log(data.data)
                //        setMessages(data.data.messages)
                //          setChat(data.data.chatId)
                   
                  
                //  }
              
                
              
            })
            .catch((err) => {
                console.log("error to get chat", err)
            })


    }

  

    const users = allUsers?.data?.map(user => {
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


}

export default AllUsers
