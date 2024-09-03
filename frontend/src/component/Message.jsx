import React from "react";

export default function Message({ text, sent }) {
    return (
        <>
            <div className={` mb-[15px] ${sent ? 'flex justify-end' : 'flex justify-start'}`}>
                <div className={`max-w-[70%] p-[10px] rounded-[10px] ${sent ? "bg-[#3498db] text-white rounded-br-none " : "bg-[#eaeaea] rounded-bl-none "} `}>
                    {text}
                </div>
            </div>
        </>
    )
}
