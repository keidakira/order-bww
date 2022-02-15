import React, { createRef, useState } from "react";
import User from "../api/User";
import Input from "../components/Input/Input";
import Button from "../components/UI/Button/Button";

import "./AuthPage.css";

const AuthPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    isNew: false,
    page: 0,
  });

  const userAPI = new User();

  const handleEmail = (e) => {
    setUser((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const handleNext = async () => {
    // If new user, page + 2, else page + 1
    let response = await userAPI.checkUserExists(user.email);

    if (response.status === 200) {
      if (response.data.exists === true) {
        setUser((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
          name: response.data.user.name,
          nickname: response.data.user.nickname,
        }));
      } else {
        setUser((prevState) => ({
          ...prevState,
          page: prevState.page + 2,
          isNew: true,
          name: "",
          nickname: "",
        }));
      }
    } else {
      alert("Some error occured");
    }
  };

  const handlePrev = () => {
    setUser((prevState) => {
      return { ...prevState, page: 0, password: "", name: "" };
    });
  };

  const handleName = (e) => {
    setUser((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handlePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const signupUser = async () => {
    const response = await userAPI.createUser(user);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      window.location.href = "/";
    }
  };

  const loginUser = async () => {
    const response = await userAPI.loginUser({
      email: user.email,
      password: user.password,
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      window.location.href = "/";
    }
  };

  return (
    <div className="login-signup-container">
      <div className="content">
        <div>
          <p className="title p-center">
            Hey {user.nickname === "" ? "there" : user.nickname}!
          </p>
        </div>
        <div>
          <div
            id="screen-1"
            style={{ display: `${user.page === 0 ? "block" : "none"}` }}
          >
            <Input
              placeholder="Email"
              value={user.email}
              onChange={handleEmail}
            />
            <Button type="submit" onClick={handleNext}>
              Next
            </Button>
          </div>
          <div
            className="login-screen"
            style={{ display: `${user.page === 1 ? "block" : "none"}` }}
          >
            <Input
              placeholder="Password"
              value={user.password}
              type="password"
              onChange={handlePassword}
            />
            <Button type="submit" onClick={loginUser}>
              Login
            </Button>
            <p className="p-center a-link" onClick={handlePrev}>
              Back to login
            </p>
          </div>
          <div
            id="signup-screen"
            style={{ display: `${user.page === 2 ? "block" : "none"}` }}
          >
            <Input placeholder="Name" value={user.name} onChange={handleName} />
            <Input
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handlePassword}
            />
            <Button type="submit" onClick={signupUser}>
              Finish Signup
            </Button>
            <p className="p-center a-link" onClick={handlePrev}>
              Back to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
