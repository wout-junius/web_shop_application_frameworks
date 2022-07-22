import React, { useContext, useState } from "react";

import "./../GeneralPage.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const ctx = useContext(AuthContext)

  const onFinish = (values: {username: string, password: string}) => {
    let data = new FormData();
    data.append("username", values.username)
    data.append("password", values.password)
    fetch(process.env.REACT_APP_API_URI + "/login", {
      method: "POST",
      body: data
    }).then(res => res.json).then((data) => {
      console.log(data);
    }).catch(error => {
      console.log(error);
      
    })
  };
  return (
    <div className="background">
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <LoginForm onFinish={onFinish} errorMessage={errorMessage} />
      </div>
    </div>
  );
}

