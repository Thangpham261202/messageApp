import React, { useEffect, useState } from "react";
import User from "../../components/User/index";
import Messages from "../../components/Messages/index";
import Message from "../../components/Message/index";
import Search from "../../components/Search/index";
import EmojiPicker from "emoji-picker-react";
import Emoji from "../../components/EmojiPicker";
function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [resultSearch, setresultSearch] = useState("");
  const [conversation, setConversation] = useState("");
  const [receiver, setReceiver] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [EmojiPicker, setEmojiPicker] = useState("");
  useEffect(() => {
    const reponse = fetch(
      `http://localhost:4000/api/conversation/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((reponse) =>
      reponse.json().then((meberRes) => setMembers(meberRes))
    );
  }, []);
  /* console.log(receiver.id); */

  return (
    <div className=" bg-[#E0ECDE] h-screen flex justify-center items-center">
      <div className=" bg-white rounded-lg w-[1300px] h-[90%] flex drop-shadow-lg overflow-hidden ">
        <div className="w-[25%] bg-[#dfe1f0] h-full ">
          <User user={user} />
          <hr className="border-black" />
          <div className="ml-5 text-2xl text-primary">Messages</div>
          <Messages
            members={members}
            setMessages={setMessages}
            setReceiver={setReceiver}
            setConversation={setConversation}
          />
        </div>
        <Message
          user={user}
          setMessages={setMessages}
          receiver={receiver}
          message={message}
          setMessage={setMessage}
          conversation={conversation}
          messages={messages}
          setUsers={setUsers}
          users={users}
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
          EmojiPicker={EmojiPicker}
          setEmojiPicker={setEmojiPicker}
        />
        <Search
          search={search}
          setresultSearch={setresultSearch}
          setSearch={setSearch}
          user={user}
          resultSearch={resultSearch}
          setMessages={setMessages}
          showEmojiPicker={showEmojiPicker}
          setEmojiPicker={setEmojiPicker}
        />
      </div>
    </div>
  );
}

export default Dashboard;
