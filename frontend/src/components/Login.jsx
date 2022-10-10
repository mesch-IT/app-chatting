import React from 'react'

const Login = () => {
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
                    <div><button className='btn-sign-up'>Sign Up</button></div>
                </form>
            </div>
        </div>
    )
}

export default Login
