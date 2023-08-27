import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import './donation.css'
import DoneIcon from '@mui/icons-material/Done';
import AddDonation from './AddDonation';

export default function Donation() {
    
    const [donationCount, setDonationCount] = useState('')
    const [donations, setDonations] = useState([])
    const { currentUser } = useAuth()

    function getDonations() {
        const formCollectionRef = collection(db, 'DonationForm')
        
        getDocs(formCollectionRef)
        .then((res) => {
            const frms = res.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            const details = frms.filter((form) => form.UID === currentUser.id);
            console.log(details)
            setDonations(details);
        })
        .catch((err) => console.log(err.message));
    }

     useEffect(() => {
        getDonations()
    }, []);

    return (
        <>
            <div className="donation-container">
                <div className="modal fade" id="addFormModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Donation Form</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddDonation />
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="top-bar">
                    <button type="button" className="query-button" data-bs-toggle="modal" data-bs-target="#addFormModal">
                        Donate
                    </button>
                </div>
                <div className="donations-card">
                    <p className="donations-title">Donations</p>
                    <p className="donations-count"><DoneIcon className="tick-icon" style={{ fontSize: '15px' }} />0 donations so far</p>
                    <table className="table donation-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Device Type</th>
                                <th scope="col">Model</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className="donation-table-body">
                            {donations.map((donation, index) => (
                            <tr key={donation.data.id}>
                                <td>{index + 1}</td>
                                {console.log(donation.data.Date)}
                                <td>{donation.data.Date}</td>
                                <td>{donation.data.DeviceType}</td>
                                <td>{donation.data.DeviceModel}</td>
                                <td>
                                    <div className="donation-table-status">Pending</div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )




}
