import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { API_URL } from "../api";
import { toast } from "react-toastify";
import withoutAuthentication from "../utils/withoutAuthentication";

function Register() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    // const [success, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}register/`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // Await parsing of JSON response
            const json = await response.json();

            if (response.ok || response.status === 201) {
                toast.success(json?.message || 'Registration successful!');
                // setFormData({
                //     email: '',
                //     first_name: '',
                //     last_name: '',
                //     password: ''
                // });
            } else {
                const errorDetail = json?.detail || 'An unknown error occurred.';
                // Handle specific error cases if the response has details.
                if (typeof errorDetail === 'object') {
                    // Assume `detail` is an object with field-specific errors.
                    const errorMessages = Object.values(errorDetail).flat().join(', ');
                    toast.error(errorMessages);
                    setError(errorMessages);
                } else {
                    // Handle general error messages.
                    setError(errorDetail);
                    toast.error(errorDetail);
                }
            }
        } catch (error) {
            toast.error(error || 'Network error or server is down.');
            setError('Network error or server is down.');
        } finally {
            setLoading(false);
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
                    {/* <div className="mt-3">
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                    </div> */}

                    <div className="mt-3">
                        <Button variant="contained" type="submit" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Save'}
                        </Button>
                    </div>
                    {error && <p className="mt-3 text-red-600 p-4">{error}</p>}
                </form>
            </div>
        </>
    )
}

export default withoutAuthentication(Register)