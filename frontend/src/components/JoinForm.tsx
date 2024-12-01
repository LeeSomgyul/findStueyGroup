// JoinForm.tsx
import React, { useState } from "react";
import { checkDuplicate, registerUser } from "../services/authService";

const JoinForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        name: "",
        birthDate: "",
        nickname: "",
        profilePicture: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        name: "",
        birthDate: "",
        nickname: "",
    });

    const [validationState, setValidationState] = useState({
        email: false,
        phone: false,
        nickname: false,
    });

    // 입력값 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 중복 확인 요청
    const handleCheckDuplicate = async (field: string) => {
        try {
            const message = await checkDuplicate(field, formData[field as keyof typeof formData]);
            setValidationState((prev) => ({ ...prev, [field]: true }));
            setErrors((prev) => ({ ...prev, [field]: message }));
        } catch (error: any) {
            setValidationState((prev) => ({ ...prev, [field]: false }));
            setErrors((prev) => ({ ...prev, [field]: error.message }));
        }
    };

    // 폼 제출
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = Object.values(validationState).every((state) => state === true);
        if (!isValid) {
            alert("모든 중복 확인을 완료해주세요.");
            return;
        }

        try {
            await registerUser(formData);
            alert("회원가입이 완료되었습니다.");
            // 회원가입 성공 후 동작 추가
        } catch (error: any) {
            alert(error.message || "회원가입 중 문제가 발생했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="email">아이디(이메일)</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <button type="button" onClick={() => handleCheckDuplicate("email")}>중복 확인</button>
                <span className="error-message">{errors.email}</span>
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <span className="error-message">{errors.password}</span>
            </div>
            <div>
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                />
                <span className="error-message">{errors.confirmPassword}</span>
            </div>
            <div>
                <label htmlFor="phone">휴대폰</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <button type="button" onClick={() => handleCheckDuplicate("phone")}>중복 확인</button>
                <span className="error-message">{errors.phone}</span>
            </div>
            <div>
                <label htmlFor="name">이름(실명)</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <span className="error-message">{errors.name}</span>
            </div>
            <div>
                <label htmlFor="birthDate">생년월일 8자리</label>
                <input
                    type="text"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                />
                <span className="error-message">{errors.birthDate}</span>
            </div>
            <div>
                <label htmlFor="nickname">닉네임(최대 5자)</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                />
                <button type="button" onClick={() => handleCheckDuplicate("nickname")}>중복 확인</button>
                <span className="error-message">{errors.nickname}</span>
            </div>
            <div>
                <label htmlFor="profilePicture">프로필</label>
                <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files?.[0]?.name || "" })}
                    accept="image/*"
                />
            </div>
            <button type="submit">가입하기</button>
        </form>
    );
};

export default JoinForm;