import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
function Form({ isSignInPage }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState("");
  const handleSumbit = async (e) => {
    const formData = new FormData();

    {
      !isSignInPage && formData.set("fullName", fullName);
    }
    formData.set("email", email);
    formData.set("password", password);
    {
      !isSignInPage && formData.set("file", files[0]);
    }
    console.log(formData.get("fullName"));
    e.preventDefault();
    const reponse = await fetch(
      `http://localhost:4000/api/${isSignInPage ? "login" : "register"}`,
      /*  "http://localhost:4001/post", */
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    const dataRes = await reponse.json();
    console.log(dataRes);
    if (dataRes.token) {
      localStorage.setItem("token", dataRes.token);
      localStorage.setItem("user", JSON.stringify(dataRes));
      navigate("/");
    } else if (reponse.status === 400) {
      alert(dataRes);
    } else if (dataRes.fullName && reponse.status === 200) {
      alert("Tạo tài khoản thành công");
      navigate("/user/login");
    }
  };
  console.log(files);
  return (
    <div className=" bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-[7px] flex flex-col items-center justify-center ">
        <div className="text-3xl font-bold">
          Chào mừng {isSignInPage && "trở lại"}
        </div>
        <div className="text-xl font-semibold">
          {isSignInPage ? "Đăng nhập" : "Đăng kí"}
        </div>
        <form action="" onSubmit={(e) => handleSumbit(e)}>
          {!isSignInPage && (
            <Input
              label="label"
              name="Họ và tên"
              placeholder="Vui lòng nhập họ và tên ..."
              className="pl-3 mb-5 block w-[350px]"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          )}
          <Input
            label="label"
            name="Email"
            placeholder="Vui lòng nhập email ..."
            className="pl-3 mb-5 block w-[350px]"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label="label"
            name="Password"
            placeholder="Vui lòng nhập password ..."
            className="pl-3 mb-5 block w-[350px]"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!isSignInPage && (
            <Input type="file" onChange={(e) => setFiles(e.target.files)} />
          )}
          <Button
            label={isSignInPage ? "Đăng nhập" : "Đăng kí"}
            className="rounded-md w-[350px] bg-indigo-600 px-3"
          />
        </form>
        <div className="mt-2 ">
          {isSignInPage ? "Tạo tài khoản ngay" : "Bạn đã có tài khoản"}
          <span
            onClick={() =>
              navigate(`/user/${isSignInPage ? "register" : "login"}`)
            }
            className="italic text-blue-300 underline decoration-solid"
          >
            {isSignInPage ? "Đăng kí" : "Đăng nhập"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form;
