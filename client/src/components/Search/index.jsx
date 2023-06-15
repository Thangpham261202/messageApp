import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Emoji from "../EmojiPicker";
function Search({
  search,
  setresultSearch,
  setSearch,
  user,
  resultSearch,
  setMessages,
  showEmojiPicker,
  setEmojiPicker,
}) {
  const handleSearch = () => {
    fetch(`http://localhost:4000/api/search/${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((reponse) => reponse.json().then((res) => setresultSearch(res)));
    setSearch("");
  };
  const createConversation = () => {
    fetch("http://localhost:4000/api/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: user._id,
        receiverId: resultSearch._id,
      }),
    }).then((reponse) =>
      reponse.json().then((res) =>
        fetch(`http://localhost:4000/api/message/${res}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((reponse) =>
          reponse.json().then((messageRes) => setMessages(messageRes))
        )
      )
    );
    setresultSearch(null);
  };
  return (
    <div className="w-[25%] h-full bg-[#dfe1f0]">
      <div className="mx-10 my-8">
        <h3 className="text-primary text-3xl mb-4">Search</h3>
        <div className="flex justify-center items-center gap-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" rounded-md p-[7px] w-[90%]"
            type="text"
          />
          <AiOutlineSearch
            onClick={() => handleSearch()}
            className=" text-xl w-10 h-10 p-[5px] flex justify-center items-center rounded-full bg-slate-50"
          />
        </div>
        {resultSearch ? (
          <div
            className="flex items-center my-8"
            onClick={() => createConversation()}
          >
            <img src={"http://localhost:4000/" + resultSearch.img} />
            <div className="ml-4">
              <h3 className="text-xl font-medium">{resultSearch.fullName}</h3>
              <p className=" text-sm text-slate-600 font-lg">
                {resultSearch.email}
              </p>
            </div>
          </div>
        ) : (
          <div>Không tìm thấy</div>
        )}
      </div>
      <Emoji
        showEmojiPicker={showEmojiPicker}
        setEmojiPicker={setEmojiPicker}
      />
    </div>
  );
}

export default Search;
