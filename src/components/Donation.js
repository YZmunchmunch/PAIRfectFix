import React, { useState } from 'react';
import './donation.css'
import DoneIcon from '@mui/icons-material/Done';

export default function Donation() {
    
    const [donationCount, setDonationCount] = useState('')
    return (
        <>
            <div className="donation-container">
                <div className="top-bar">
                    hey
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
                                <th scope="col">Brand</th>
                                <th scope="col">Model</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )




}
