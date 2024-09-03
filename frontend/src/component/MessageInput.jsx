import { Mail } from "@mui/icons-material";
import React, { useState } from "react";

export default function MessageInput() {
  const [input, setInput] = useState('')

  function handleInput(e) {
    setInput(e.target.value)
    
  }

  function handleSendMessage() {
    console.log('submitted')
    
  }
  return (
    <div className="bg-white p-[15px] border-t-[1px] border-solid border-[#e0e0e0] flex items-center ">
      <textarea className="flex-[1] border-none rounder-[5px] p-[10px] resize-none outline-none " placeholder="Type your message" value={input} onChange={handleInput} />
      <button type="button" onClick={handleSendMessage} className="text-[#3498db] border-none rounded-[5px] py-[4px] px-[2px] cursor-pointer ">
        <Mail />
      </button>
    </div>
  );
}
