import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 여부 상태

    return (
        <div>
            {/* 상단 로고 및 메뉴바 */}
            <div className="navbar">
                <Link to="/" className="logo">
                    <img src={logo} alt="동네 공부친구 찾기" />
                </Link>
                <nav>
                    <ul>
                        <li>
                            <Link to="/find-study">스터디 찾기</Link>
                        </li>
                        <li>
                            <Link to="/my-space">나의 학습 공간</Link>
                        </li>
                        <li>
                            <Link to="/community">커뮤니티</Link>
                        </li>
                        <li>
                            <Link to="/event">이벤트</Link>
                        </li>
                        {/* 비로그인 상태 */}
                        {!isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/login">로그인</Link>
                                </li>
                                <li>
                                    <Link to="/join">회원가입</Link>
                                </li>
                            </>
                        )}
                        {/* 로그인 상태 */}
                        {isLoggedIn && (
                            <li>
                                <Link to="/logout">로그아웃</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HomePage;
