import React from "react";

function Messages({ members, setMessages, setReceiver, setConversation }) {
  const handleMessage = (conversationId, user) => {
    fetch(`http://localhost:4000/api/message/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((reponse) =>
      reponse.json().then((messageRes) => setMessages(messageRes))
    );
    setReceiver(user);
    setConversation(conversationId);
  };
  return (
    <div className=" h-[67%] overflow-y-auto">
      {members.map((member) => (
        <div>
          <div
            className="flex ml-12 items-center my-8"
            onClick={() => handleMessage(member.conversation, member.user)}
            >
            <img
              className="object-cover w-[45px] h-[45px] rounded-full"
              src={
                member.user.img
                  ? "http://localhost:4000/" + member.user.img
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ht6uAZ8wVQMIYM6bihQm-W28f74pl-yv0A&usqp=CAU"
              }
              alt=""
            />
            <div className="ml-4">
              <h3 className="text-xl font-medium">{member.user.fullName}</h3>
              <p className=" text-sm text-slate-600 font-lg">
                {member.user.email}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;
