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
