import React, { useState } from 'react'
import axios from 'axios'

const AddUser = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = (event) => {

        event.preventDefault()

        // check if all fields are empty
        if ((event.target[0].value === "") || (event.target[1].value === "") ||
            (event.target[2].value === "")) {
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            console.log("veuillez remplir tous les champs")
        }
        else {
            let body = {
                username,
                password,
                confirmPassword
            }
            axios({
                method: 'post',
                url: 'http://localhost:3001/users/register',
                data: body
            })
                .then((res) => {
                    console.log("res", res)
                })
                .catch((err) => {
                    console.log("err", err)
                })
        }
        setUsername("")
        setPassword("")
        setConfirmPassword("")

    }

    return (
        <div className='main'>
            <img src="girl-logging.svg" className='img-illustration' alt="" />
            <div className='form-card'>
                <h1 className='title'>Create your account</h1>
                <form action="/users" onSubmit={register}>
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
                    <div className='text-input'>
                        <input type="password" placeholder='Repeat your password'
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value)
                            }} />
                    </div>
                    <div><button className='btn-sign-up'>Sign Up</button></div>
                </form>
            </div>
        </div>
    )
}

export default AddUser

