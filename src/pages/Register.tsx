import React, {  useState } from "react";
import { Alert } from "antd";
import "./../GeneralPage.css";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onFinish = (values: RegisterFormData) => {
    console.log("Received values of form: ", values);
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(res => res.json())
    .then((data: any) => {
      console.log(data);
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setErrorMessage("");
        navigate("/login");
      }
    }
    ).catch(error => {
      console.log(error);
    }
    );
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
        <div>
          <h1>Register</h1>
          {error(errorMessage)}
          <RegisterForm onFinish={onFinish} />
        </div>
      </div>
    </div>
  );
}

const error = (error: string | undefined) => {
  if (error) {
    return (
      <Alert
        message={error}
        type="error"
        showIcon
        style={{
          marginBottom: "1em",
        }}
      />
    );
  }
};

export default Register;


interface RegisterFormData{
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}