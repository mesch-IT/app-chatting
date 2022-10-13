// import axios from 'axios'
import React from 'react'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import search from "../images/search.svg"
import profile from "../images/mesch.jpg"
import exit from "../images/exit.svg"

const Home = () => {

    // let navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     axios({
    //         method: 'get',
    //         url: 'http://localhost:3001/users/home',
    //         headers: {
    //             Authorization: token
    //         }
    //     })
    //         .then((res) => { 
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log("err", err)
    //             navigate("/users/login")
    //         })
    // }, [])
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
                        <div className='title-h3'><h3>Recent</h3></div>
                        <div className="container-profile">
                            <div><img src={profile} alt="" className='profile-users' /></div>
                            <div className="container-body">
                                <div><h3>Meschack</h3></div>
                                <div className='recent-message'><p>Salut</p></div>
                            </div>

                        </div>
                        <div className='separate'> <hr /></div>
                        <div className="container-profile">
                            <div><img src={profile} alt="" className='profile-users' /></div>
                            <div className="container-body">
                                <div><h3>Rainbow</h3></div>
                                <div className='recent-message'><p>Hi</p></div>
                            </div>

                        </div>
                        <div className='separate'> <hr /></div>
                        <div className="container-profile">
                            <div><img src={profile} alt="" className='profile-users' /></div>
                            <div className="container-body">
                                <div><h3>Marcel</h3></div>
                                <div className='recent-message'><p>Hey!</p></div>
                            </div>

                        </div>
                        <div className='separate'> <hr /></div>

                    </div>
                </div>
            </div>
            <div className="right">
                <div className="container-profile">
                    <div><img src={profile} alt="" className='profile-users' /></div>
                    <div className="container-body">
                        <div><h3>Meschack</h3></div>
                        <div className='recent-message'><p>Online</p></div>
                    </div>

                </div>
                <div className='separate'> <hr /></div>
                <div className="messages">

                    <div className='me'><p>Hi</p></div>
                    <div className='other'><p>How are you??</p></div>
                    <div className='me'><p>Hi</p></div>
                    <div className='other'><p>How are you??</p></div>
                    <div className='me'><p>Hi</p></div>
                    <div className='other'><p>How are you??</p></div>
                </div>
                <div className='separate'> <hr /></div>

                {/* <div>
                    <input type="text" className='input-send-message' />
                </div> */}

            </div>
        </div>
    )
}

export default Home
