import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navigate() {
  const location = useLocation()
  return (
    <>
      <div className="w-full py-4 bg-slate-600 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-row justify-evenly">
          <div>
            <NavLink to='/' className={location.pathname === '/' ? 'text-blue-400 cursor-pointer border-b-2 border-solid border-blue-400 pb-1' : 'text-white cursor-pointer'}>Home</NavLink>
          </div>
          <div>
            <NavLink to='/register' className={location.pathname === '/register' ? 'text-blue-400 cursor-pointer border-b-2 border-solid border-blue-400 pb-1' : 'text-white cursor-pointer'}>Register</NavLink>
          </div>
          <div>
            <NavLink to='/login' className={location.pathname === '/login' ? 'text-blue-400 cursor-pointer border-b-2 border-solid border-blue-400 pb-1' : 'text-white cursor-pointer'}>Login</NavLink>
          </div>
          <div>
            <NavLink to='/chat' className={location.pathname === '/chat' ? 'text-blue-400 cursor-pointer border-b-2 border-solid border-blue-400 pb-1' : 'text-white cursor-pointer'}>Chat</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
