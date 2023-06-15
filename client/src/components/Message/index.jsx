import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
function Message({
  user,
  setMessages,
  receiver,
  message,
  setMessage,
  conversation,
  messages,
  setUsers,
  users,
  setShowEmojiPicker,
  showEmojiPicker,
  EmojiPicker,
  setEmojiPicker,
}) {
  const socket = io.connect("http://localhost:4000");
  useEffect(() => {
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {
      setUsers(users);
      console.log("activeUsers :>> ", users);
    });
  }, [socket]);
  socket.on("getMessage", (data) => {
    setMessages((prev) => [...prev, data]);
  });

  const handleSendMessage = (conversationId) => {
    setMessage((message += EmojiPicker));
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiver.id,
      message,
      conversationId,
    });
    fetch("http://localhost:4000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId,
        senderId: user._id,
        message,
      }),
    });
    setEmojiPicker("");
    setMessage("");
  };
  const handleShowEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  console.log(EmojiPicker);

  return (
    <div className="w-[50%] bg-white h-full flex flex-col items-center drop-shadow-lg ">
      {conversation ? (
        <div className=" w-[75%] gap-[30px] bg-[#dfe1f0] flex justify-center items-center rounded-full my-4 py-2 drop-shadow-lg">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={
              receiver.img
                ? "http://localhost:4000/" + receiver.img
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ht6uAZ8wVQMIYM6bihQm-W28f74pl-yv0A&usqp=CAU"
            }
            alt=""
          />
          <div className="">
            <h3 className="text-lg font-medium">{receiver?.fullName}</h3>
            <p className="font-sm">
              <span
                className={`w-[9px] h-[9px]  inline-block mb-[1px] mr-[6px] rounded-full ${
                  users.find((user) => user?.userId === receiver.id)
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></span>
              {users.find((user) => user?.userId === receiver.id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
          <BiPhoneCall className="text-3xl text-primary" />
        </div>
      ) : (
        <div></div>
      )}

      <div className="w-full h-[75%] overflow-y-auto">
        <div className=" mx-10 my-8">
          {messages?.length ? (
            messages.map((message, index) => {
              if (user._id == message.user.id) {
                return (
                  <div
                    key={index}
                    className="text-white text-right ml-auto p-5 bg-primary rounded-l-xl mb-3 rounded-br-xl max-w-[45%]"
                  >
                    {message.message}
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="p-4 bg-[#dfe1f0] rounded-r-xl rounded-bl-xl max-w-[45%]"
                  >
                    {message.message}
                  </div>
                );
              }
            })
          ) : (
            <div className="flex justify-center my-[200px] text-2xl text-black-600/25 italic">
              {conversation ? "Nhập tin nhắn của bạn" : "Chọn một người bạn"}
            </div>
          )}
        </div>
      </div>
      {/* <input className="w-full" type="text" name="" id="" /> */}
      {conversation ? (
        <div className="w-[90%] h-[7%] flex items-center gap-[11px] mx-7 my-8">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="w-[500px] focus:outline-none pl-4 rounded-lg border-solid border-2 py-3 drop-shadow-lg"
          />
          <BsFillSendFill
            className=" text-[26px] text-primary"
            onClick={() => handleSendMessage(conversation)}
          />
          <AiOutlinePlusCircle
            className="text-[28px]"
            onClick={() => {
              handleShowEmoji();
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Message;
