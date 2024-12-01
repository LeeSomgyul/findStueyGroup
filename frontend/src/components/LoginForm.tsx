import React, { useState } from "react";
import { login } from "../services/authService";

const LoginForm: React.FC = () => {
    const [loginId, setLoginId] = useState<string>(""); // 아이디 상태
    const [loginPassword, setLoginPassword] = useState<string>(""); // 비밀번호 상태
    const [loginError, setLoginError] = useState<string>(""); // 에러 메시지 상태

    // 입력 값 유효성 검사
    const validateForm = (): boolean => {
        setLoginError(""); // 에러 메시지 초기화
        if (!loginId.trim()) {
            setLoginError("아이디(이메일)을 입력해 주세요.");
            return false;
        }
        if (!loginPassword.trim()) {
            setLoginError("비밀번호를 입력해 주세요.");
            return false;
        }
        return true;
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // 기본 동작 방지

        if (!validateForm()) return;

        try {
            await login({ loginId, loginPassword }); // API 호출
        } catch (error: any) {
            setLoginError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                id="loginId"
                name="loginId"
                placeholder="아이디"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
            />
            <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder="비밀번호"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
            />
            {loginError && <div className="error-message">{loginError}</div>}
            <button type="submit" id="loginBtn">
                로그인
            </button>
        </form>
    );
};

export default LoginForm;