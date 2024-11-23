document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("email");
    const checkEmailBtn = document.getElementById("checkEmailBtn");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const phoneInput = document.getElementById("phone");
    const nameInput = document.getElementById("name");
    const birthDateInput = document.getElementById("birthDate");
    const nicknameInput = document.getElementById("nickname");
    const profilePictureInput = document.getElementById("profilePicture");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const phoneError = document.getElementById("phoneError");
    const nameError = document.getElementById("nameError");
    const birthDateError = document.getElementById("birthDateError");
    const nicknameError = document.getElementById("nicknameError");
    const profilePictureError = document.getElementById("profilePictureError");


    // 이메일 유효성 검사
    emailInput.addEventListener("blur", function() {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "이메일 형식으로 입력해주세요.";
        } else {
            emailError.textContent = "";
        }
    });

    // 중복 검사 버튼 클릭 이벤트
       checkEmailBtn.addEventListener("click", function() {
           const email = emailInput.value;

           // Fetch API로 GET 요청 보내기
           fetch(`/check-email?email=${encodeURIComponent(email)}`)
               .then(response => response.json()) // 서버 응답을 JSON으로 파싱
               .then(data => {
                   // 서버로부터 받은 JSON 데이터에서 메시지를 가져와 표시
                   emailError.textContent = data.message;
               })
               .catch(error => {
                   console.error("중복 검사 요청 중 오류 발생:", error);
                   emailError.textContent = "중복 검사 중 문제가 발생했습니다. 다시 시도해주세요.";
               });
       });

    // 비밀번호 유효성 검사
    passwordInput.addEventListener("blur", function() {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,15}$/;
        if (passwordInput.value.length < 6) {
            passwordError.textContent = "6자 이상 입력해 주세요.";
        } else if (!passwordPattern.test(passwordInput.value)) {
            passwordError.textContent = "특수문자, 영문자, 숫자는 필수입니다.";
        } else {
            passwordError.textContent = "";
        }
    });

    // 비밀번호 확인 유효성 검사
    confirmPasswordInput.addEventListener("blur", function() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = "비밀번호와 다릅니다.";
        } else {
            confirmPasswordError.textContent = "";
        }
    });

    // 휴대폰 유효성 검사
    phoneInput.addEventListener("input", function() {
        if (/[^0-9]/.test(phoneInput.value)) {
            phoneError.textContent = "숫자만 입력 가능합니다.";
        } else {
            phoneError.textContent = "";
        }
    });

    // 이름 유효성 검사
    nameInput.addEventListener("input", function() {
        if (/\d/.test(nameInput.value)) {
            nameError.textContent = "이름에는 숫자가 포함될 수 없습니다.";
        } else {
            nameError.textContent = "";
        }
    });

    // 생년월일 유효성 검사
    birthDateInput.addEventListener("input", function() {
        if (/[^0-9]/.test(birthDateInput.value)) {
            birthDateError.textContent = "숫자만 입력 가능합니다.";
        } else {
            birthDateError.textContent = "";
        }
    });

    // 닉네임 유효성 검사
    nicknameInput.addEventListener("input", function() {
        if (/[^a-zA-Z0-9가-힣]/.test(nicknameInput.value)) {
            nicknameError.textContent = "닉네임은 한글, 영문자, 숫자만 가능합니다.";
        } else {
            nicknameError.textContent = "";
        }
    });

    // 프로필 이미지 유효성 검사
    profilePictureInput.addEventListener("change", function() {
        const file = profilePictureInput.files[0];
        if (file && !file.type.startsWith("image/")) {
            profilePictureError.textContent = "이미지 형식 파일만 등록 가능합니다.";
        } else {
            profilePictureError.textContent = "";
        }
    });
});
