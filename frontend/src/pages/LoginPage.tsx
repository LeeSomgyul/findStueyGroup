import React from "react";
import LoginForm from "../components/LoginForm";
import logo from "../../assets/logo.svg";

const LoginPage: React.FC = () => {
  return (
      <div>
        <header>
          <div className="navbar">
            <a href="/frontend/public">
              <img src={logo} alt="동네 공부친구 찾기" />
            </a>
          </div>
        </header>
        <h1>로그인</h1>
        <LoginForm />
        <div>
                <span>
                    <a href="/find-id">아이디 찾기</a>
                </span>
        </div>
      </div>
  );
};

export default LoginPage;