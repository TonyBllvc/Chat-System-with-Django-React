import React from "react";
import { Outlet } from "react-router-dom";

export default function Body() {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}
