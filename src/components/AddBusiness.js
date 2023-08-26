import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function CustomMultipleSelect({ options, selectedOptions, setSelectedOptions }) {
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <h3>Select Multiple Options:</h3>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => toggleOption(option)}
          />
          {option}
        </label>
      ))}
      <p>Selected Options: {selectedOptions.join(', ')}</p>
    </div>
  );
}

function imageToBase64(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(image);
  });
}

export default function AddBusiness() {
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [serviceType, setServiceType] = useState([]);
    const [contact, setContact] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [others, setOthers] = useState('');
    const [image, setImage] = useState(null);
    const { currentUser } = useAuth();
    const storage = getStorage();
    const serviceTypeOptions = [
        'Laptop',
        'Desktop',
        'Mobile Device',
        'Monitor',
        'Speaker',
        'TV',
        'Headset',
        'Earpiece',
    ];


  async function handleSubmit(e) {
    e.preventDefault();
    if (address === '' || serviceType.length === 0) {
      return;
    }

    // Upload the image to Firebase Storage
    if (image) {
      try {
        const base64Image = await imageToBase64(image);
        const formCollectionRef = collection(db, 'BusinessForm');
        await addDoc(formCollectionRef, {
          CompanyName: companyName,
          Address: address,
          ServiceType: serviceType,
          Contact: contact,
          OperatingHours: operatingHours,
          Others: others,
          Image: base64Image, // Save the image URL
          UID: currentUser.uid,
        });

        console.log('Image uploaded and form data saved successfully.');
        window.location.reload();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('Please select an image.');
    }
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="company-name">Company Name</label>
          <input className="form-control" id="company-name" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="address">Address</label>
          <input className="form-control" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="serviceType">Service Type</label>
          <CustomMultipleSelect
            options={serviceTypeOptions}
            selectedOptions={serviceType}
            setSelectedOptions={setServiceType}
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="contact">Contact</label>
          <input className="form-control" id="contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="operating-hours">Operating Hours</label>
          <input className="form-control" id="operating-hours" type="text" value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="others">Others</label>
          <input className="form-control" id="others" type="text" value={others} onChange={(e) => setOthers(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="image">Upload an Image</label>
          <input className="form-control" id="image" type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
}
