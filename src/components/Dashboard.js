import React, { useEffect, useState } from 'react'
import {  Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { auth, db } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import "./dashboard.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddForm from './AddForm'
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    // Get all the forms submitted by user
    const [forms, setForms] = useState([])

    // Get all the business available on the website
    const [business, setBusiness] = useState([])

    function getForms() {
        const formCollectionRef = collection(db, 'UserForm')
        const currentUid = currentUser.uid

        getDocs(formCollectionRef)
        .then((res) => {
            console.log(res.docs);
            const frms = res.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            console.log(frms)
            const filteredForms = frms.filter((form) => form.data.UID === currentUid);
            setForms(filteredForms);
        })
        .catch((err) => console.log(err.message));
    }

    function getBusinesses() {
        const formCollectionRef = collection(db, 'BusinessForm')
        getDocs(formCollectionRef)
        .then((res) => {
            console.log(res.docs);
            const frms = res.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            setBusiness(frms);
        })
        .catch((err) => console.log(err.message));
    }


    useEffect(() => {
        getForms()
        getBusinesses()
    }, [])

    useEffect(() => {
        console.log(forms)
    }, [forms])

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
            {/* Modal */}
            <div className="modal fade" id="addFormModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Query</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <AddForm />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* <strong>Email:</strong> {currentUser.email} */}
                <button type="button" className="query-button" data-bs-toggle="modal" data-bs-target="#addFormModal">
                    QUERY
                </button>
                <div className="main-container">
                    {business.map(form => (
                        <div className="business-card" key={form.id}>
                            <img className="img" src={form.data.Image} />
                            <p className="service-type">
                                {form.data.ServiceType.map((service, index) => (
                                    <span className="service-type-individual" key={index}>
                                        #{service}
                                        {index !== form.data.ServiceType.length - 1 && ' '}
                                    </span>
                                ))}
                            </p>
                            <div className="business-info">
                                <div className="company-name">
                                    <HomeIcon className="icon"/>
                                    <p>{form.data.CompanyName}</p>
                                </div>
                                <div className="address">
                                    <LocationOnIcon className="icon"/>
                                    <p>{form.data.Address}</p>
                                </div>
                                <p>
                                    <Link to={`/details/${form.id}`}>
                                        <button className="circle-button"><RemoveRedEyeIcon/></button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </>
    )

}