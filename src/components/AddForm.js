import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export default function AddForm() {

    const [postType, setPostType] = useState('')
    const [deviceModel, setDeviceModel] = useState('')
    const [deviceType, setDeviceType] = useState('')
    const [issue, setIssue] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);
    const { currentUser } = useAuth()
    const deviceTypeOptions = ['Laptop', 'Desktop', 'Mobile Device', 'Monitor', 'Speaker', 'TV', 'Headset', 'Earpiece'];
    const handleOptionChange = (event) => {
        setDeviceType(event.target.value);
    };
    
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
    async function handleSubmit(e) {
        e.preventDefault()
        if (deviceModel === '') {
            return
        }
        const base64Image = await imageToBase64(image);
        const formCollectionRef = collection(db, 'UserForm')
        addDoc(formCollectionRef, { PostType: postType, DeviceModel: deviceModel, DeviceType: deviceType, Issue: issue, Description: description, Image: base64Image, CommentCount: 0, UID: currentUser.uid }).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-2">
                    <label className="control-label" htmlFor="postType">Post Type</label>
                    <select className="form-select" id="postType" value={postType} onChange={(e) => setPostType(e.target.value)}>
                        <option value="" disabled>-- Select an option --</option>
                        <option value="Issue">Issue</option>
                        <option value="Solution">Solution</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label className="control-label" htmlFor='issue'> Post Title </label>
                    <input className="form-control" id="issue" type="text" value={issue} onChange={(e) => setIssue(e.target.value)}></input>
                </div>
                <div className="form-group mt-2">
                    <label className="control-label" htmlFor='deviceModel'> Device Model </label>
                    <input className="form-control" id="deviceModel" type="text" value={deviceModel} onChange={e => setDeviceModel(e.target.value)}></input>
                </div>
                <div className="form-group mt-2">
                    <label className="control-label" htmlFor='deviceType'> Device Type </label>
                    <select className="form-select" value={deviceType} onChange={handleOptionChange}>
                        <option value="" disabled>-- Select an option --</option>
                        {deviceTypeOptions.map((option, index) => (
                            <option key={index} value={option}>
                        {option}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label className="control-label" htmlFor='description'> Description </label>
                    <input className="form-control" id="description" type="textarea" value={description} onChange={e => setDescription(e.target.value)}></input>
                </div>
                <div className="form-group mt-2">
                    <label className="control-label" htmlFor="image">Upload an Image</label>
                    <input className="form-control" id="image" type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}