import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    let navigate = useNavigate()

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
            })
            .catch((err) => {
                console.log("err", err)
                navigate("/users/login")
            })
    }, [])
    return (
        <div>
            <h1>HOME PAGE</h1>
        </div>
    )
}

export default Home
