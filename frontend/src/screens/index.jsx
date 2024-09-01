import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="mb-5">
        Home
      </div>
      <div>
        <Link to='/register' className="bg-blue-600 text-white py-1.5 px-3 text-lg rounded-sm" >
          Register
        </Link>
      </div>
    </>
  );
}
