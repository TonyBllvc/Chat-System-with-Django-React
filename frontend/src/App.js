import { BrowserRouter, Route, Routes, } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Home from "./screens";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Navigate from "./component/Navigate";
import Body from "./component/Body";
import ChatBox from "./screens/ChatBox";

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
                <Navigate />
                <Routes>
                    <Route path='' element={<Body />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/chat" element={<ChatBox />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}




