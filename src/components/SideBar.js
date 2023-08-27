import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc, increment, getDoc } from 'firebase/firestore'; // Import `updateDoc`, `increment`, and `getDoc` from Firebase
import { SidebarData } from "./SidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";
import logo from "../images/homepagelogo-removebg-preview.png"

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [error, setError] = useState('')

  const showSidebar = () => setSidebar(!sidebar);
  const { logout } = useAuth();
  const navigate = useNavigate()

  async function handleLogout() {
        setError('')

        try {
            await logout(auth)
            navigate("/login")
        } catch {
            setError('Failed to logout')
        }
    }

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="container-main">
          <div className="logo-container">
            <img src={logo} />
          </div>
          <div className="navbar-words">
            {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
              </li>
                );
            })}     
          </div>
          <div className="button-container">
            <Button variant="link" className="signout-button" onClick={handleLogout}>Sign Out</Button>  
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
