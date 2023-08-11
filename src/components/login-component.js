import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigation = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.alert("成功登入");
        setCurrentUser(AuthService.getCurrentUser());
        navigation("/profile");
      })
      .catch((e) => {
        setMsg(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
