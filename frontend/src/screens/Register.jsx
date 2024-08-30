import React from "react";
import { Button, TextField } from "@mui/material";

export default function Register() {
    return (
        <>
            <div className="text-center container mt-8">
                
                <div className="mt-3">
                    <TextField type="text" variant="outlined" label='Email' id='email' />
                </div>
                <div className="mt-3">
                    <TextField type="text" variant="outlined" label='First Name' id='email' />
                </div>
                <div className="mt-3">
                    <TextField type="text" variant="outlined" label='Last Name' id='email' />
                </div>
                <div className="mt-3">
                    <TextField type="password" variant="outlined" label='Password' id='password' />
                </div>
                <div className="mt-3">
                    <Button variant="contained">
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}
