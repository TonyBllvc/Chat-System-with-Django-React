import React from "react";
import Message from "../component/Message";
import MessageInput from "../component/MessageInput";
import withAuthentication from "../utils/withAuthentication";

function ChatArea() {
  return (
    <>
      <div className="flex-[3] flex flex-col w-full md:w-3/4">
        <div className="bg-[#3498db] text-white p-[15px] text-center">
          {/* Chat headers */}
        </div>
        <div className="flex-[1] p-[20px] overflow-y-auto">
          <Message text="Hey! How is it going?" sent />
          <Message text="I am good!" received />
        </div>
        <MessageInput />
      </div>
    </>
  );
}

export default ChatArea
// export default withAuthentication(ChatArea);
