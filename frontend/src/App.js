import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Home from "./screens";
import Register from "./screens/Register";

export default function App() {

    useEffect(() => {
        AOS.init({
            // Global settings
            once: false,
        });
    }, []);

    // path={`/panel/${openLink}`}
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}




