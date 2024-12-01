import React from "react";
import FindIdForm from "../components/FindIdForm";
import logo from "../../assets/logo.svg";

const FindIdPage: React.FC = () => {
    return (
        <div>
            <header>
                <div className="navbar">
                    <a href="/">
                        <img src={logo} alt="동네 공부친구 찾기" style={{ height: "40px" }} />
                    </a>
                </div>
            </header>
            <h1>아이디 찾기</h1>
            <FindIdForm />
        </div>
    );
};

export default FindIdPage;