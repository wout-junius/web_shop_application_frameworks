import React, { useContext, useState } from "react";

import "./../GeneralPage.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const ctx = useContext(AuthContext)

  const onFinish = (values: {username: string, password: string}) => {
    let data = new FormData();
    data.append("username", values.username)
    data.append("password", values.password)
    fetch("/login", {
      method: "POST",
      body: data
    }).then(res => res.json())
    .then((data: {refresh_token: string, acces_token: string, error: string}) => {
      if(data.error) {
        setErrorMessage(data.error)
      }else{
      ctx.login(data.acces_token);
      navigate("/");
      }
      
    }).catch(error => {
      setErrorMessage(error);
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

