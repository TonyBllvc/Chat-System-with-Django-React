import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { API_URL } from "../api";
import { useToast } from "@chakra-ui/react";

// Incomplete and inactive. 
// Finish this later 
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  async function handleSubmit(e) {
    e.preventDefault();

    const registerPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(API_URL + "register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        // Await parsing of JSON response
        const json = await response.json();

        if (response.ok || response.status === 201) {
          resolve(json?.message || "Registration successful!");
        } else {
          const errorDetail = json?.detail || "An unknown error occurred.";
          // Handle specific error cases if the response has details.
          if (typeof errorDetail === "object") {
            // Assume `detail` is an object with field-specific errors.
            const errorMessages = Object.values(errorDetail).flat().join(", ");
            reject(errorMessages);
          } else {
            // Handle general error messages.
            reject(errorDetail);
          }
        }
      } catch (error) {
        reject(error || "Network error or server is down.");
      }
    });

    toast.promise(registerPromise, {
      success: {
        title: "Registration successful",
        description: await registerPromise.then((msg) => msg),
        status: "success",
        duration: 5000,
        isClosable: true,
      },
      error: {
        title: "Registration failed",
        description: await registerPromise.catch((err) => err),
        status: "error",
        duration: 5000,
        isClosable: true,
      },
      loading: {
        title: "Registering...",
        description: "Please wait while we process your registration.",
        status: "loading",
        duration: null, // Keeps the loading toast visible until resolved
        isClosable: false,
      },
    });
  }

  return (
    <>
      <div className="text-center container mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <TextField
              type="text"
              variant="outlined"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              required
            />
          </div>
          <div className="mt-3">
            <TextField
              type="text"
              variant="outlined"
              label="First Name"
              value={formData.first_name}
              onChange={handleChange}
              id="first_name"
              required
            />
          </div>
          <div className="mt-3">
            <TextField
              type="text"
              variant="outlined"
              label="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              id="last_name"
              required
            />
          </div>
          <div className="mt-3">
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              required
            />
          </div>
          <div className="mt-3">
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
