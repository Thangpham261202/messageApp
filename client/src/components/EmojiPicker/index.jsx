import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Picker from "emoji-picker-react";
function Emoji({ showEmojiPicker, setEmojiPicker }) {
  const handleEmojiClick = (emojiObject) => {
    setEmojiPicker(emojiObject.emoji);
  };
  return (
    <div>
      {showEmojiPicker && (
        <div className=" w-[300px] h-[400px] flex mx-auto mt-[100px]">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/*  <AiOutlinePlusCircle className="text-[28px]">
        <Picker />
      </AiOutlinePlusCircle> */}
    </div>
  );
}

export default Emoji;
