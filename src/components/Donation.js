import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import './donation.css'
import DoneIcon from '@mui/icons-material/Done';
import AddDonation from './AddDonation';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import donor_halloffame from '../images/donor_halloffame.png';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';

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
            <div className="donations-header-container">
                <h2 className="donations-header">Donate Your Devices</h2>
                <p className="donations-subheader">Your donation could benefit the less fortunate!</p>
            </div>
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
                <div className="entire-donation-card">
                    <div className="donations-card">
                        <div className="donations-card-header">
                            <p className="donations-title"><BloodtypeOutlinedIcon className="donation-icon" />Donations</p>
                            <button type="button" className="donate-button" data-bs-toggle="modal" data-bs-target="#addFormModal">
                        Donate Now
                            </button>
                        </div>
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
                    <div className="donations-hof">
                        <p className="donations-hof-title"><AutoAwesomeOutlinedIcon className='donations-hof-icon'/>Hall Of Fame</p>
                        <img className="hof-pic" src={donor_halloffame} />
                    </div>
                </div>
                <div className="donations-faq">
                    <div className="donations-faq-header">
                        <div className="donations-faq-title">
                            <QuizOutlinedIcon className="faq-icon"/>FAQ
                        </div>
                        <div className="donations-questions-card">
                            <div className="donations-questions">
                                Q: How can I start donating my used electronics to support the community?
                            </div>
                            <div className="donations-answers">
                                Donating your used electronics is easy! Start by filling out the donation form on our website with your personal details and of the electronics you wish to donate.
                            </div>
                            <div className="donations-questions">
                                Q: What happens after I submit the donation form?
                            </div>
                            <div className="donations-answers">
                                Once you submit the donation form, you will receive a confirmation email that we have successfully received your application to donate. You will receive a date and time that is required of you to be at home for us to pick up your devices.
                            </div>
                            <div className="donations-questions">
                                Q: How will my donated device be collected?
                            </div>
                            <div className="donations-answers">
                                ur team will arrange a convenient pickup date and location with you via sms. We aim to make the collection process hassle-free and accommodating to your schedule.
                            </div>
                            <div className="donations-questions">
                                Q: What happens after my device is collected?
                            </div>
                            <div className="donations-answers">
                                After collection, your donated device will undergo an inspection process to ensure its usability and condition for the next owner. If the device is deemed usable, it will be sent to a school to benefit a deserving student.
                            </div>
                            <div className="donations-questions">
                                Q: How is the recipient student chosen?
                            </div>
                            <div className="donations-answers">
                                The school's administration will identify students who would benefit most from the donated electronics, ensuring that your contribution reaches those in genuine need. Students may check their eligibility with their corresponding schools.
                            </div>
                            <div className="donations-questions">
                                Q: Can I track the donation process?
                            </div>
                            <div className="donations-answers">
                                Yes, you can! We provide a tracking feature that allows you to monitor the progress of your donated device from collection to distribution.
                            </div>                           
                            <div className="donations-questions">
                                Q: Can I donate more than one device?
                            </div>
                            <div className="donations-answers">
                                Of course! You are welcome to donate multiple devices to support more students in need.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
