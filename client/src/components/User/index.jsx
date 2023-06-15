import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function User({ user }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/user/login");
  };
  return (
    <div className="flex justify-center items-center my-10 gap-2">
      <img
        className="w-[55px] h-[55px] rounded-full"
        src={
          user.img
            ? "http://localhost:4000/" + user.img
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ht6uAZ8wVQMIYM6bihQm-W28f74pl-yv0A&usqp=CAU"
        }
      />
      <div className="ml-6">
        <h3 className="text-xl font-medium">{user.fullName}</h3>
        <p className="font-lg">My acout</p>
      </div>
      <BiLogOut
        onClick={() => handleLogOut()}
        className="text-4xl text-primary"
      />
    </div>
  );
}

export default User;
