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
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';

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
            <div className="main-container">
                {/* <strong>Email:</strong> {currentUser.email} */}
                <button type="button" className="query-button" data-bs-toggle="modal" data-bs-target="#addFormModal">
                    QUERY
                </button>
                <p className="business-header-container">
                    <h2 className="business-header">Partnership with Local Electronic Repair Shops</h2>
                    <p className="business-subheader">"We provide you with the most reliable & convenient repair shops in Singapore"</p>
                </p>
                <div className="business-container">
                    {business.map(form => (
                        <div className="business-card-outline">
                            <div className="business-card" key={form.id}>
                                <img className="business-img" src={form.data.Image} />
                                <div className="company-name">
                                    <StorefrontOutlinedIcon className="shop-icon"/>
                                    <p>{form.data.CompanyName}</p>
                                </div>
                                <div className="business-info">
                                    <p className="service-type">
                                        <MiscellaneousServicesOutlinedIcon className="service-icon"/>
                                        {form.data.ServiceType.map((service, index) => (
                                            <span className="service-type-individual" key={index}>
                                                {service}
                                                {index !== form.data.ServiceType.length - 1 && ' '}
                                            </span>
                                        ))}
                                    </p>
                                    <div className="address">
                                        <LocationOnIcon className="address-icon"/>
                                        <p>{form.data.Address}</p>
                                    </div>
                                </div>
                                <p className ="business-detail-button">
                                    <Link to={`/details/${form.id}`}>
                                        <button className="circle-button"><RemoveRedEyeIcon/></button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}