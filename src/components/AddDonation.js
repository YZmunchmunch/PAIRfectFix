import React, { useState } from 'react'
import { addDoc, collection,serverTimestamp, toLocaleDateString, toDate } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap"


export default function AddDonation() {

    const [type, setType] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [condition, setCondition] = useState("")
    
    const [salutation, setSalutation] = useState("")
    const [fullName, setFullName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [postalCode, setPostalCode] = useState("")

    const deviceTypeOptions = ['Laptop', 'Desktop', 'Mobile Device', 'Monitor', 'Speaker', 'TV', 'Headset', 'Earpiece', 'Tablet', 'Console', 'SmartWatch'];
    const { currentUser } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        const formCollectionRef = collection(db, 'DonationForm')
        const currentDate = new Date(); // Get the current date and time
        const dateString = currentDate.toLocaleDateString();
        addDoc(formCollectionRef, {
            DeviceType: type,
            DeviceBrand: brand,
            DeviceModel: model,
            DeviceCondition: condition,
            Saluation: salutation,
            FullName: fullName,
            ContactNumber: contactNumber,
            PostalCode: postalCode,
            Date: dateString,
            UID: currentUser.uid
        }).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='donate-form-container'>
            <p>Thank you for donating your device.</p>
            <Form className="donation-form" onSubmit={handleSubmit}>
                <h4 className='form-header'>Device Details</h4>
                <Form.Group className="mb-2" controlId="deviceType">
                <Form.Label>Device Type</Form.Label>
                <Form.Select size='sm' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="laptop" >-Please Select-</option>
                    <option value="laptop">Laptop</option>
                    <option value="tablet">Tablet</option>
                    <option value="mobile">Mobile</option>
                </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-2" controlId="deviceBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control size='sm' value={brand} onChange={(e) => setBrand(e.target.value)} type="brand" placeholder="Enter your Device Brand" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="deviceModel">
                <Form.Label>Model</Form.Label>
                <Form.Control size='sm' value={model} onChange={(e) => setModel(e.target.value)} type="model" placeholder="Enter your Device Model" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="deviceCondition">
                <Form.Label>Condition</Form.Label>
                <Form.Control size='sm' value={condition} onChange={(e) => setCondition(e.target.value)} as="textarea" rows={4} placeholder="Enter a brief description of the condition of the device including any scratches or dents or how long has it been used."/>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formConfirmationCheckbox">
                <Form.Check type="checkbox" label="I declare that all the information provided about the device is true to my knowledge" />
                </Form.Group>
            
                <h4 className='form-header'>My Details</h4>

                <Form.Group className="mb-2" controlId="personSalutation">
                <Form.Label>Salutation</Form.Label>
                <Form.Select size='sm' value={salutation} onChange={(e) => setSalutation(e.target.value)}>
                    <option value="laptop" >-Please Select-</option>
                    <option value="tablet">Dr</option>
                    <option value="mobile">Mr</option>
                    <option value="mobile">Mrs</option>
                    <option value="mobile">Mdm</option>
                    <option value="mobile">Ms</option>
                </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-2" controlId="personFullName">
                < Form.Label>Full Name as in NRIC</Form.Label>
                    <Form.Control size='sm' value={fullName} onChange={e => setFullName(e.target.value)} type="brand" placeholder="Enter Full Name" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="personContactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control size='sm' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} type="model" placeholder="Enter Contact Number" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="personPickUpLocation">
                    <Form.Label>Pick Up Location</Form.Label>
                    <Form.Control className="mt-1" size='sm' type="address" placeholder="Enter your Address" />
                    <Form.Control className="mt-2" size='sm' type="unitNumber" placeholder="Enter your Unit Number" />
                    <Form.Control className="mt-2" size='sm' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="model" placeholder="Enter Postal Code" />
                </Form.Group>
                <p className='agreement-text'>I agree that by filling up this, RETECHNIMATE may collect and use my personal information for donation-related and communication purposes in accordance with the Personal Data Protection Act 2012 and our data protection policy</p>
                <div className='button-container'>
                    <button className='mt-3 mb-3 donate-form-button'>Submit</button>
                </div>
            </Form>
        </div>

    )
}