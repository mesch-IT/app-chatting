import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profile from "../img/contact.png"

const AllUsers = ({
    setShowChat,
    allUsers,
    setUserSelected }) => {
    
  
    const selectUser = (user) => {

        setShowChat(true)
        setUserSelected(user)
   
     
    }

    const users = allUsers?.data?.map(user => {
        return (
            <div key={user._id} className="user" onClick={() => selectUser(user)}>
                <div className="profile_mini">
                    <img src={profile} alt="" className="cover" />
                </div>
                <div className="chatt_details">
                    <div  className="bold">{user?.username}</div>
                </div>
            </div>
        )
          
    })
     

    return (
       users
    )
}

export default AllUsers
