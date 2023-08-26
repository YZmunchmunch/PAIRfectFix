import React, { useEffect, useState } from 'react'
import AddBusiness from './AddBusiness'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { auth, db } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs, where, query } from 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function BusinessDashboard() {

    const [error, setError] = useState('')
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    // Get all the forms submitted by user
    const [forms, setForms] = useState([])

    function getBusinesses() {
        const formCollectionRef = collection(db, 'BusinessForm')
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

    useEffect(() => {
        getBusinesses()
    }, [])

    return (
        <>
            {/* Modal */}
        <div className="modal fade" id="addBusinessModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Business</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body"> 
                        <AddBusiness />
                    </div>
                    <div className="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addBusinessModal">
                    Add your business
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Service Type</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Operating Hours</th>
                        <th>Others</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{forms.map(form => <p key={form.id}>{ form.data.CompanyName }</p>)}</td>
                        <td>{forms.map(form => <p key={form.id}>{ form.data.ServiceType}</p>)}</td>
                        <td>{forms.map(form => <p key={form.id}>{form.data.Address}</p>)}</td>
                        <td>{forms.map(form => <p key={form.id}>{form.data.Contact}</p>)}</td>
                        <td>{forms.map(form => <p key={form.id}>{form.data.OperatingHours}</p>)}</td>
                        <td>{forms.map(form => <p key={form.id}>{form.data.Others}</p>)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}