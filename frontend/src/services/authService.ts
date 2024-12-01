// 로그인 API 호출
export const login = async (loginData: { loginId: string; loginPassword: string }) => {
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인 중 문제가 발생했습니다.");
    }

    return await response.json();
};

// 중복 확인 API 호출
export const checkDuplicate = async (field: string, value: string): Promise<string> => {
    const response = await fetch(`/check-${field}?${field}=${encodeURIComponent(value)}`);
    if (response.status === 409) {
        throw new Error(`이미 사용 중인 ${field}입니다.`);
    }
    if (!response.ok) {
        throw new Error(`중복 검사 중 문제가 발생했습니다 (${field}).`);
    }
    return `사용 가능한 ${field}입니다.`;
};

// 회원가입 API 호출
export const registerUser = async (userData: Record<string, any>): Promise<void> => {
    const response = await fetch("/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("회원가입 중 문제가 발생했습니다.");
    }
};

// 아이디 찾기 API 호출
export const findId = async (formData: { name: string; phone: string }) => {
    const response = await fetch("/find-id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "서버와의 통신 중 오류가 발생했습니다.");
    }
    return data;
};

