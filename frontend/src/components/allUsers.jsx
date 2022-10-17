import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import profile from "../images/mesch.jpg"

const AllUsers = ({ currentUser, setVisible,setUserSelected,allUsers }) => {

    






  

    console.log("alluser", allUsers)

    const handleClick = (user) => {

        console.log("handleClick", )
        setVisible(true)
        setUserSelected(user)

    }

    const users = allUsers?.data?.map(user => {
        return (
            <>
                <div className="container-profile" onClick={() => handleClick(user)}>
                    <div><img src={profile} alt="" className='profile-users' /></div>
                    <div className="container-body">
                        <div><h3>{user?.username}</h3></div>
                    </div>

                </div>
                <div className='separate'> <hr /></div>
            </>
        )
    })

    return (
        users
    )
}

export default AllUsers
