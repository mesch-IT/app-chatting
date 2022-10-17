import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const ConnexionPage = () => {
    let navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {
        const token = localStorage.getItem('token')
        axios({
            method: 'get',
            url: 'http://localhost:3001/users/home',
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res)
                navigate("/users/home")
            })
            .catch((err) => {
                console.log("err", err)
                navigate("/users/login")
            })
    }, [])
    
    const login = (event) => { 

        event.preventDefault()
        console.log(username)
        console.log(password)

        let body = {
            username,
            password
        }

        axios({
            method: 'post',
            url: 'http://localhost:3001/users/login',
            data: body
        })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user))
                navigate("/users/home")
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    return (

        <div className='main'>
            <img src="girl-logging.svg" className='img-illustration' alt="" />
            <div className='form-card'>
                <h1 className='title'>Welcome to our chat app</h1>
                <form action="/users" onSubmit={login}>
                    <div className='text-input'>
                        <input type="text" placeholder='Enter your username'
                            value={username}
                            name="username"
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }} />
                    </div>
                    <div className='text-input'>
                        <input type="password" placeholder='Enter your password'
                            value={password}
                            name="password"
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }} />
                    </div>
                    <div><button className='btn-sign-up'>Sign In</button></div>
                    
                </form>
            </div>
        </div>
    )
}

export default ConnexionPage
