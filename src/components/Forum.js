import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc, increment, getDoc } from 'firebase/firestore'; // Import `updateDoc`, `increment`, and `getDoc` from Firebase

import "./dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddForm from './AddForm';
import "./forum.css";
import PostDetails from './PostDetails';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { BiShare } from "react-icons/bi";
import { BiSave } from "react-icons/bi";

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
      {options.map((option) => (
        <label
          key={option}
        >
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => toggleOption(option)}
            style={{ marginRight: '10px' }}
            className="custom-checkbox"
          />
          {option}
        </label>
      ))}
      <p className="filtered-options-display">Filtered: <p>{selectedOptions.join(', ')}</p></p>
    </div>
  );
}


    
export default function Forum() {
    const { currentUser, logout } = useAuth();
    // Get all the forms submitted by the user
    const [forms, setForms] = useState([]);
    const [upvotes, setUpvotes] = useState({}); // Use an object to store upvotes for each form
    // Id of post clicked
    const [selectedId, setSelectedId] = useState(null);
    const [endPoint, setEndPoint] = useState('')
    const [search, setSearch] = useState('')
    const [filteredForms, setFilteredForms] = useState([])
    const [error, setError] = useState('')
    // For filtering side bar
    const deviceTypeOptions = ['Laptop', 'Desktop', 'Mobile Device', 'Monitor', 'Speaker', 'TV', 'Headset', 'Earpiece', 'Tablet', 'Console', 'Smartwatch'];
    const deviceModelOptions = ['Apple', 'Samsung', 'Google', 'XiaoMi', 'Oppo', 'Razer', 'Dell', 'Acer', 'Prism', 'Ducky'];
    const [filterType, setFilterType] = useState([])
    const [filterBrand, setFilterBrand] = useState([])
    const [filterIssue, setFilterIssue] = useState('')

    const navigate = useNavigate()

    async function getFilteredPosts() {
        const formCollectionRef = collection(db, 'UserForm');
        const querySnapshot = await getDocs(formCollectionRef);

        // Convert the query snapshot into an array of form objects
        const allForms = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        const filtered = allForms.filter((form) => {
            // Define a function to check if an array is empty
            const isNonEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

            // Check if filterType and filterModel have selected options
            const filterTypeCondition = isNonEmptyArray(filterType)
                ? filterType.some((type) => form.data.DeviceType.includes(type))
                : true; // If filterType is empty, consider it as true

            const filterBrandCondition = isNonEmptyArray(filterBrand)
                ? filterBrand.some((brand) => form.data.DeviceModel.includes(brand))
                : true; // If filterModel is empty, consider it as true

            // Combine the conditions using logical AND
            return filterTypeCondition && filterBrandCondition;
            })
        .sort((a, b) => {
            // Compare the Upvotes property in descending order
            return b.data.Upvotes - a.data.Upvotes;
        });
        console.log(filtered)
        setFilteredForms(filtered); // Update the filtered forms
    }

    const handleFilterSubmit = (e) => { 
        e.preventDefault();
        getFilteredPosts();

    }

    const onChangeHandler = (e) => {
        setEndPoint(e.target.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSearch(endPoint);
        setEndPoint('')
    }

    async function getSearchPosts() {
        const lowercaseSearch = search.toLowerCase(); // Convert search query to lowercase
        const formCollectionRef = collection(db, 'UserForm');
        const querySnapshot = await getDocs(formCollectionRef);

        // Convert the query snapshot into an array of form objects
        const allForms = querySnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        const filtered = allForms.filter((form) => {
            // Compare search query to form data (convert to lowercase for case-insensitive search)
            return (
                form.data.Issue.toLowerCase().includes(lowercaseSearch) ||
                form.data.DeviceModel.toLowerCase().includes(lowercaseSearch) ||
                form.data.DeviceType.toLowerCase().includes(lowercaseSearch) ||
                form.data.Description.toLowerCase().includes(lowercaseSearch) ||
                form.data.PostType.toLowerCase().includes(lowercaseSearch)
            );
        })
        .sort((a, b) => {
            // Compare the Upvotes property in descending order
            return b.data.Upvotes - a.data.Upvotes;
        });
        console.log(filtered)
        setFilteredForms(filtered); // Update the filtered forms

    }

    useEffect(() => {
        // Call getSearchPosts when search state changes
        getSearchPosts();
    }, [search]);



    function getForms() {
        const formCollectionRef = collection(db, 'UserForm');

        getDocs(formCollectionRef)
            .then((res) => {
                console.log(res.docs);
                const frms = res.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }));
                console.log(frms);
                //const filteredForms = frms.filter((form) => form.data.UID === currentUid);
                setForms(frms);
                // Initialize upvotes for each form to 0
                const initialUpvotes = {};
                frms.forEach((form) => {
                    initialUpvotes[form.id] = 0;
                });
                setUpvotes(initialUpvotes);
            })
            .catch((err) => console.log(err.message));
    }

    // Fetch upvote counts from the database and update the state
    async function fetchUpvotes() {
        const formCollectionRef = collection(db, 'UserForm');

        try {
            const res = await getDocs(formCollectionRef);
            const upvotesData = {};
            
            res.docs.forEach((doc) => {
                const data = doc.data();
                upvotesData[doc.id] = data.Upvotes || 0; // Default to 0 if Upvotes is undefined
            });

            setUpvotes(upvotesData);
        } catch (error) {
            console.error('Error fetching upvotes:', error);
        }
    }

    // Update the upvotes in the database and state
    async function upvoteHandler(id) {
        try {
            // Update the upvotes in the database by incrementing by 1
            const formDocRef = doc(db, 'UserForm', id);
            await updateDoc(formDocRef, {
                Upvotes: increment(1),
            });

            // Update the upvotes in the state by incrementing by 1
            setUpvotes((prevUpvotes) => ({
                ...prevUpvotes,
                [id]: prevUpvotes[id] + 1,
            }));
        } catch (error) {
            console.error('Error upvoting:', error);
        }
    }

    function getDetail(id) {
        setSelectedId(id);
    }

    async function handleLogout() {
        setError('')

        try {
            await logout(auth)
            navigate("/login")
        } catch {
            setError('Failed to logout')
        }
    }

    useEffect(() => {
        getForms();
        fetchUpvotes(); // Fetch upvotes when the component mounts
    }, []);

    useEffect(() => {
        const detailsModal = document.getElementById('detailsModal');
        detailsModal.addEventListener('hidden.bs.modal', () => {
            setSelectedId(null); // Reset selectedId when the modal is hidden
        });
    }, []);

    // Add a useEffect to reset selectedId when forms change
    useEffect(() => {
        setSelectedId(null);
    }, [forms]);

    return (
        <>
            {/* Details Modal */}
            <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Post Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <PostDetails id={selectedId} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Post Modal */}
            <div className="modal fade" id="addFormModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <AddForm />
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-bar">
                <div className="search-bar">
                    <form onSubmit={onSubmitHandler}>
                        <div className="input-group mb-3 mt-1">
                            <SearchOutlinedIcon style={{ fontSize: '25px', color: 'rgb(200, 200, 200)' }} className="search-icon"/>
                            <input type="text" className="search-input" placeholder="Search" value={endPoint} onChange={onChangeHandler}/>
                        </div>
                    </form>
                </div>
                <button type="button" className="query-button" data-bs-toggle="modal" data-bs-target="#addFormModal">
                    Add Post
                </button>
                <Button variant="link" className="logout-button" onClick={handleLogout}>Log Out</Button>
            </div>
            <div className="forum-container"> 
                <div className="forum-posts">
                    <div className="scrollable-content">
                        {/* {console.log(filteredForms)} */}
                        {filteredForms.map(form => (
                            <div className="post-card">
                                <div className="post-vote">
                                    <button className="upvote-button" onClick={() => upvoteHandler(form.id)}>
                                        <ArrowCircleUpOutlinedIcon style={{ fontSize: '48px', color: 'rgb(200, 200, 200)' }}/>
                                    </button>
                                    <p style={{ fontSize: '30px', color: 'rgb(200, 200, 200)' }}>{upvotes[form.id]}</p>
                                </div>
                                <button type="button" onClick={() => getDetail(form.id)} className="details-button" data-bs-toggle="modal" data-bs-target="#detailsModal" key={form.id}>
                                    <div className="post-container">
                                        <div className="post-details">
                                            <div className='post-header'>
                                                <div className='post-header-words'>
                                                    <h4 className="post-issue">{form.data.Issue}</h4>
                                                    <p className={`post-${form.data.PostType === 'Issue' ? 'postIssue' : form.data.PostType === 'Solution' ? 'postSolution' : 'postOthers'}`}>{form.data.PostType}</p>
                                                    <p className="post-deviceModel">Model: { form.data.DeviceModel }</p>
                                                    <p className="post-deviceType">Type: {form.data.DeviceType}</p>
                                                </div>
                                                <div className='image-container'>{form.data.Image && <img className="img-issue" src={form.data.Image} alt="Issue" />}</div>
                                                
                                            </div>
                                            
                                            <p className="post-description-forum"> {form.data.Description}</p>
                                           
                                            <div className='post-footer-container'>
                                            	<p className="post-comment-count"><ModeCommentOutlinedIcon style={{ fontSize: '15px', marginRight: '5px' }} />{ form.data.CommentCount } Comments</p>
												<p className='post-comment-count' ><BiShare style={{ fontSize: '15px', marginRight: '5px' }} />Share</p>
												<p className='post-comment-count' ><BiSave style={{ fontSize: '15px', marginRight: '5px' }} />Save</p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='filter-container'>
                        <form onSubmit={handleFilterSubmit}>
                            <div className="form-group mt-2">
                                <label className="filterForm-filterType control-label" htmlFor="filterType">Device Type</label>
                                <CustomMultipleSelect
                                    options={deviceTypeOptions}
                                    selectedOptions={filterType}
                                    setSelectedOptions={setFilterType}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label className="filterForm-filterModel control-label" htmlFor='filterModel'> Device Brand </label>
                                <CustomMultipleSelect
                                    options={deviceModelOptions}
                                    selectedOptions={filterBrand}
                                    setSelectedOptions={setFilterBrand}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
                                    <button type="submit" className="filter-button btn btn-success"><FilterAltOutlinedIcon /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
