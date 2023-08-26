import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'


export default function Register() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { register } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await register(auth, emailRef.current.value, passwordRef.current.value)
            // redirect to index
            navigate("/index");

        } catch (e) {
            console.log(e)
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <div className="left-content">
                    
                    </div>
                    <div className="right-content">
                        <Card className="login-card">
                            <Card.Body>
                                <h2 className="text-center mb-4">Register your account</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}> 
                                    <Form.Group className="email mt-2" id="email">
                                        <Form.Control className="email-entry" type="email" placeholder="Email" ref={emailRef} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="password mt-3" id="password">
                                        <Form.Control className="password-entry" type="password" placeholder="Password" ref={passwordRef} required></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="confirm-password mt-3" id="password-confirm">
                                        <Form.Control className="confirm-password-entry" type="password" ref={passwordConfirmRef} placeholder="Confirm Password" required></Form.Control>
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100 mt-3 login-button" type="submit">Log In</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Need an account? <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}