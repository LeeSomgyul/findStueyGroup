import React from "react";
import JoinForm from "../components/JoinForm";
import logo from "../assets/logo.svg";

const JoinPage: React.FC = () => {

    return(
        <div>
            <header>
                <div className="navbar">
                    <a href="/">
                        <img src={logo} alt="동네 공부친구 찾기" />
                    </a>
                </div>
            </header>
            <h1>회원가입</h1>
            <JoinForm/>
            <div>
        <span>
          <a href="/login">로그인</a>
        </span>
            </div>
        </div>
    );
};

export default JoinPage;