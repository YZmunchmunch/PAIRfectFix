import React from 'react'
import profilepic from "../images/profile.png"
import "./profile.css"

function Profile() {
    return (
        <img className="profile-content" src={profilepic} />
    )
}

export default Profile