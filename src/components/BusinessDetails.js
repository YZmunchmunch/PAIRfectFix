import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import "./businessDetails.css"
import { db } from '../firebase';

export default function BusinessDetails() {
    const { id } = useParams();
    const [businessDetails, setBusinessDetails] = useState([])

    function getBusinessDetails() {
        const formCollectionRef = collection(db, 'BusinessForm')
        
        getDocs(formCollectionRef)
        .then((res) => {
            console.log(res.docs);
            const frms = res.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            const details = frms.filter((form) => form.id === id);
            console.log(details)
            setBusinessDetails(details);
        })
        .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getBusinessDetails()
    }, [])

    return (
        <div className="details-container">
            <div>
                <h2>Business Details</h2>
                <p>Company Name: {businessDetails.map(form => <p key={form.id}>{form.data.CompanyName}</p>)}</p>
                <p>Service Type: {businessDetails.map(form => <p key={form.id}>{form.data.ServiceType}</p>)}</p>
                <p>Address: {businessDetails.map(form => <p key={form.id}>{form.data.Address}</p>)}</p>
                <p>Contact: {businessDetails.map(form => <p key={form.id}>{form.data.Contact}</p>)}</p>
                <p>Opening Hours: {businessDetails.map(form => <p key={form.id}>{form.data.OpeningHours}</p>)}</p>
                <p>Others: {businessDetails.map(form => <p key={form.id}>{form.data.Others}</p>)}</p>
            </div>
        </div>
    );
}