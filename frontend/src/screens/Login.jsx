import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { API_URL } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import withoutAuthentication from "../utils/withoutAuthentication";

function Login() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()
    // const [success, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await fetch(`${API_URL}login/`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // Await parsing of JSON response
            const json = await response.json();

            if (response.ok || response.status === 202) {
                toast.success(json?.message || 'Login successful!');
                console.log(json?.data)
                const token = json?.token
                document.cookie = `chip=${token}; path=/`
                // console.log(token)
                // setFormData({
                //     email: '',
                //     password: ''
                // });
                navigate('/chat')
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
                        <TextField type="password" variant="outlined" label='Password' value={formData.password} onChange={handleChange} id='password' required />
                    </div>
                    {/* <div className="mt-3">
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                    </div> */}

                    <div className="mt-3">
                        <Button variant="contained" type="submit" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </div>
                    {error && <p className="mt-3 text-red-600 p-4">{error}</p>}
                </form>
            </div>
        </>
    )
}

export default withoutAuthentication(Login)
// export default Login