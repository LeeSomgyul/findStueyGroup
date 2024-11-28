document.addEventListener("DOMContentLoaded", function() {
    const loginId = document.getElementById("loginId");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");
    const loginBtn = document.getElementById("loginBtn");
    const loginForm = document.getElementById("loginForm");

    // 입력 값이 비어있는지 확인하는 함수
    function isNotEmpty(value){
        return value && value.trim() !== "";
    }

    // 유효성 검사 함수
    function validateLoginForm(){
        loginError.textContent = "";

        if(!isNotEmpty(loginId.value)){
            loginError.textContent = "아이디(이메일)을 입력해 주세요.";
            loginId.focus();
            return false;
        }

        if(!isNotEmpty(loginPassword.value)){
            loginError.textContent = "비밀번호를 입력해 주세요.";
            loginPassword.focus();
            return false;
        }

        return true;
    }

    // 로그인 버튼 클릭 시 폼 유효성 검사 및 서버 전송
    loginForm.addEventListener("submit", function(event){
        event.preventDefault(); // 기본 폼 제출 방지

        //유효성 검사
        if(!validateLoginForm()){
            return;// 유효성 검사를 통과하지 못한 경우 폼 제출 중지
        }

        // 사용자 인증 요청 보내기
        const loginData = {
            loginId: loginId.value.trim(),
            loginPassword: loginPassword.value.trim(),
        };

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            // 응답이 JSON 형식인지 확인
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json().then(data => {
                    if (!response.ok) {
                        throw new Error(data.message || "로그인 중 문제가 발생했습니다.");
                    }
                    return data;
                });
            } else {
                throw new Error("서버에서 올바르지 않은 응답이 반환되었습니다.");
            }
        })
        .then(data => {
            if (data.message === "로그인 성공") {
                // 로그인 성공 후 리다이렉트
                window.location.href = "/"; // 성공 시 리다이렉트할 페이지로 이동
            }
        })
        .catch(error => {
            console.error("로그인 요청 중 오류 발생:", error);
            loginError.textContent = error.message; // 로그인 버튼 위에 에러 메시지 표시
        });
    });
});