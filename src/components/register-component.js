import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigation = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [msg, setMsg] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = (e) => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功，將導向到登入頁面");
        navigation("/login");
      })
      .catch((e) => {
        setMsg(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
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
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        {/* <div className="form-group">
          <label htmlFor="password">身份：</label>
          <input
            onChange={handleChangeRole}
            type="text"
            className="form-control"
            placeholder="只能填入student或是instructor這兩個選項其一"
            name="role"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="password">身份：</label>
          <div className="form-check form-check-inline">
            <input
              onChange={handleChangeRole}
              type="radio"
              className="form-check-input"
              id="studentRadio"
              name="role"
              value="student"
            />
            <label className="form-check-label" htmlFor="studentRadio">
              student
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleChangeRole}
              type="radio"
              className="form-check-input"
              id="instructorRadio"
              name="role"
              value="instructor"
            />
            <label className="form-check-label" htmlFor="instructorRadio">
              instructor
            </label>
          </div>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
