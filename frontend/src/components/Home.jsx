import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from "../img/contact.png"
import AllUsers from './AllUsers'
import ChatBox from './ChatBox'

const Home = () => {

    let navigate = useNavigate()
    let token, currentUser

    const user = JSON.parse(localStorage.getItem('user'))

    const [allUsers, setAllUsers] = useState([])
    const [showChat, setShowChat] = useState(false)
    const [userSelected, setUserSelected] = useState({})
    
    
    // connexion to home page
    if (user) {
        token = user.data.token
            currentUser = user.data.id
    }
  
    useEffect(() => {
      

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
    
    // get all users
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/users/${currentUser}`,
        })
            .then((users) => {
            setAllUsers(users)
            })
            .catch((err) => { 
                console.log("we can't get users", err)
            })
    }, [])
    
    const logout = () => {
        
        localStorage.removeItem('user')
        navigate("/users/login")
        
    }

    return (
          
        <>
        
            <div className="app_wrapper">
                {/* <!-- the side bard component like --> */}
                <div className="sidebar">
                    <div className="top_sidebar">
                        <div className="profile_minimum">
                            <img src={profile} alt="" className="cover" />
                        </div>

                        <div className="side_list">
                            <div className="list">
                                <i className="las la-comment-dot"></i>
                            </div>
                        </div>
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
                        <input type="text" className="input_blank" />
                            <i className="las la-ellipsis-v"></i>
                    </div>

                    <div className="recent_users">
                        <h5 className="little_title mb-4">All users</h5>

                        <AllUsers
                            currentUser={currentUser}
                            setShowChat={setShowChat}
                            allUsers={allUsers}
                            setUserSelected={setUserSelected}
                            userSelected={userSelected}
                            
                        />
                     
                    </div>
                </div>

                {
                    showChat && <ChatBox
                        userSelected={userSelected}
                        currentUser={currentUser}
                     
                    />
                }

            </div>
        </>
         
    )
}

export default Home
