import React, { useState } from "react";
import { findId } from "../services/authService";

const FindIdForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    const [resultMessage, setResultMessage] = useState<string>("");
    const [resultClass, setResultClass] = useState<string>("");

    // 입력값 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResultMessage("");
        setResultClass("");

        try {
            const data = await findId(formData);
            setResultClass("success");
            setResultMessage(`${formData.name}님의 아이디(이메일)은 ${data.email}입니다.`);
        } catch (error: any) {
            setResultClass("error");
            setResultMessage(error.message || "서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">전화번호</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit" id="findIdBtn">아이디 찾기</button>
            <div id="findIdResult" className={resultClass}>{resultMessage}</div>
        </form>
    );
};

export default FindIdForm;