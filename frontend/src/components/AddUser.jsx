import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import profile from "../img/contact.png"
const AddUser = () => {
  let navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatarProfile, setAvatarProfile] = useState("")
  const [fileChosen, setFileChosen] = useState(false)
  const [imageUrl, setImageUrl] = useState({})
  const [fillField, setFillField] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const register = async (event) => {
    event.preventDefault()

    // check if all fields are empty
    if (
      event.target[0].value === "" ||
      event.target[1].value === "" ||
      event.target[2].value === ""
    ) {
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      setFillField(!fillField)
      setErrorMessage("Please fill all fields!")
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } else if (password != confirmPassword) {
      setFillField(!fillField)
      setErrorMessage("passoword doesn't match !")
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } else if (username.trim().length < 3) {
      setFillField(!fillField)
      setErrorMessage("please username must have at least 3 characters !")
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } else if (password.trim().length < 4) {
      setFillField(!fillField)
      setErrorMessage("please password must have at least 4 characters !")
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } else {
      let response, urlAvatar
      if (fileChosen) {
        const formData = new FormData()
        formData.append("file", imageUrl)
        formData.append("upload_preset", "myImage")
        response = await axios({
          method: "POST",
          url: "https://api.cloudinary.com/v1_1/deuutxkyz/image/upload",
          data: formData,
        })

        urlAvatar = response.data.secure_url
      }
      let body = {
        username,
        password,
        urlAvatar,
      }
      axios({
        method: "post",
        url: "http://localhost:3001/users/register",
        data: body,
      })
        .then((res) => {
          console.log("res", res)
          navigate("/")
        })
        .catch((err) => {
          console.log("err", err.response)
        })
    }
    setUsername("")
    setPassword("")
    setConfirmPassword("")
  }

  const keepImage = (file) => {
    setAvatarProfile(URL.createObjectURL(file[0]))
    setImageUrl(file[0])
    setFileChosen(true)
  }
  return (
    <div className="main">
      {fillField && (
        <div className="alert alert-primary " role="alert">
          {errorMessage}
        </div>
      )}
      <div className="form-card">
        <h1 className="title">Create your account</h1>
        <form onSubmit={register}>
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
          <div className="text-input">
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(event) => {
                setConfirmPassword(event.target.value)
              }}
            />
          </div>
          <div className="avatar">
            <div className="camera">
              <label htmlFor="image">
                <h1 className="profile-pic">Choose a profile picture</h1>
              </label>
            </div>
            <div>
              <input
                type="file"
                id="image"
                onChange={(event) => {
                  keepImage(event.target.files)
                }}
              />
            </div>
            {avatarProfile ? (
              <div className="profile_minimum">
                <img src={avatarProfile} alt="" className="cover" />
              </div>
            ) : (
              <div className="profile_minimum">
                <img src={profile} alt="" className="cover" />
              </div>
            )}
          </div>
          <div>
            <button className="btn-sign-up">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
