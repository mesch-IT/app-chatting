import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Connexion = () => {
  let navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fillField, setFillField] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const login = (event) => {
    event.preventDefault()

    if (username == "" || password == "") {
      setFillField(!fillField)
      setErrorMessage("Please fill all fields!")
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } else {
      let body = {
        username,
        password,
      }
      axios({
        method: "POST",
        url: "http://localhost:3001/users/login",
        data: body,
      })
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user))
          navigate("/users/home")
        })
        .catch(() => {
          setFillField(!fillField)
          setErrorMessage("Password or username incorrect!")
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        })
    }
  }

  const createAccount = () => {
    navigate("/users/register")
  }

  return (
    <div className="main">
      {fillField && (
        <div className="alert alert-primary " role="alert">
          {errorMessage}
        </div>
      )}
      <img src="girl-logging.svg" className="img-illustration" alt="" />
      <div className="form-card">
        <h1 className="title">Welcome to our chat app</h1>
        <form action="/users" onSubmit={login}>
          <div className="text-input">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              name="username"
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
          </div>
          <div className="text-input">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
          </div>
          <div>
            <button className="btn-sign-up">Sign In</button>
          </div>
        </form>
        <div>
          <p className="create-account" onClick={createAccount}>
            Create your account here
          </p>
        </div>
      </div>
    </div>
  )
}

export default Connexion
