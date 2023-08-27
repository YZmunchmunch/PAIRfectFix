import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, addDoc, serverTimestamp, where, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import "./postDetails.css"
import { db } from '../firebase';
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';

export default function PostDetails({ id }) {
    const [postDetails, setPostDetails] = useState([])
    const [endPoint, setEndPoint] = useState('')
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])

    function getPostDetails() {
        const formCollectionRef = collection(db, 'UserForm')
        
        getDocs(formCollectionRef)
        .then((res) => {
            const frms = res.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            console.log(id)
            const details = frms.filter((form) => form.id === id);
            console.log(details[0].data)
            setPostDetails(details[0].data);
            setAllComments([]);
            getComments();
        })
        .catch((err) => console.log(err.message));
    }

    function submitComment() {
        const formCollectionRef = collection(db, 'PostComments')

        addDoc(formCollectionRef, { Comment: comment, PostID: id, Date: serverTimestamp() }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    function getComments() {
        const formCollectionRef = collection(db, 'PostComments')
        const commentsQuery = query(formCollectionRef, orderBy('Date', 'asc'));
        getDocs(commentsQuery)
        .then((res) => {
            const frms = res.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            const details = frms.filter((form) => form.data.PostID === id);
            setAllComments(details);
            const commentCount = details.length
            console.log(id)
            if (id) {
                const userFormDocRef = doc(db, 'UserForm', id);
                console.log(userFormDocRef)
                console.log(commentCount)
                // Update the UserForm document with the new comment count
                updateDoc(userFormDocRef, { CommentCount: commentCount })
                    .then(() => {
                    console.log('Comment count updated in UserForm document.');
                    })
                    .catch((error) => {
                    console.error('Error updating comment count:', error);
                    });
            }
        })
    }

    // Sets endPoint as the input from the comment bar
    const onChangeHandler = (e) => {
        setEndPoint(e.target.value);
    };

    // When submit button pressed, the comment is being set as endPoint
    const submitHandler = (e) => {
        e.preventDefault();
        setComment(endPoint); // Set comment to endPoint
        setEndPoint(''); // Clear endPoint (reset the input)
    };

    useEffect(() => {
        getPostDetails()
    }, [id]); // Listen for changes to id

    // Use this effect to log the updated comment value
    useEffect(() => {
        console.log(comment);
        submitComment()
        getComments()
    }, [comment]);

    return (
        <div>
            <div className="details-container">
                <div className="details-card">
                    {postDetails.Image && <img className="details-img" src={postDetails.Image} alt="Issue" />}
                    <h4 className="details-issue"><BugReportSharpIcon style={{ fontSize: '30px' }} />{postDetails.Issue}</h4>
                    <p className={`details-${postDetails.PostType === 'Issue' ? 'postIssue' : postDetails.PostType === 'Solution' ? 'postSolution' : 'postOthers'}`}>{postDetails.PostType}</p>
                    <p className="details-postDescription">{postDetails.Description}</p>
                    <p className="details-deviceType">Device Type: {postDetails.DeviceType}</p>
                    <p className="details-deviceModel">Device Model: {postDetails.DeviceModel}</p>
                </div>
            </div>
            <div className="comments-card">
                <div>
                    {allComments.map(comment => (
                        <div className="comment">
                            <FaceOutlinedIcon className="face-icon" style={{ fontSize: '20px' }}/>{comment.data.Comment}
                        </div>
                    ))}
                </div>
                <form className="form-group" onSubmit={submitHandler}>
                    <div className="input-group mb-3 mt-1">
                        <input type="text" className="form-control" placeholder="Comment" value={endPoint} onChange={onChangeHandler} />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-light">Enter</button>
                        </div>
                    </div>
                </form>    
            </div>
        </div>
    );
}
