import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { API_URL } from "../api";
import { useToast } from "@chakra-ui/react";

export default function Register() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    // const [success, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(API_URL + 'register/', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // Await parsing of JSON response
            const json = await response.json();

            if (response.ok || response.status === 201) {
                setError(json?.message || 'Registration successful!');
            } else {
                const errorDetail = json?.detail || 'An unknown error occurred.';
                // Handle specific error cases if the response has details.
                if (typeof errorDetail === 'object') {
                    // Assume `detail` is an object with field-specific errors.
                    const errorMessages = Object.values(errorDetail).flat().join(', ');
                    setError(errorMessages);
                } else {
                    // Handle general error messages.
                    setError(errorDetail);
                }
            }
        } catch (error) {
            setError(error || 'Network error or server is down.');
        }
    }

    return (
        <>
            <div className="text-center container mt-8">
                <form onSubmit={handleSubmit} >
                    <div className="mt-3">
                        <TextField type="text" variant="outlined" label='Email' value={formData.email} onChange={handleChange} id='email' required />
                    </div>
                    <div className="mt-3">
                        <TextField type="text" variant="outlined" label='First Name' value={formData.first_name} onChange={handleChange} id='first_name' required />
                    </div>
                    <div className="mt-3">
                        <TextField type="text" variant="outlined" label='Last Name' value={formData.last_name} onChange={handleChange} id='last_name' required />
                    </div>
                    <div className="mt-3">
                        <TextField type="password" variant="outlined" label='Password' value={formData.password} onChange={handleChange} id='password' required/>
                    </div>
                    <div className="mt-3">
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
