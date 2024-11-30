document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("email");
    const checkEmailBtn = document.getElementById("checkEmailBtn");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const phoneInput = document.getElementById("phone");
    const checkPhoneBtn = document.getElementById("checkPhoneBtn");
    const nameInput = document.getElementById("name");
    const birthDateInput = document.getElementById("birthDate");
    const nicknameInput = document.getElementById("nickname");
    const checkNicknameBtn = document.getElementById("checkNicknameBtn");
    const profilePictureInput = document.getElementById("profilePicture");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const phoneError = document.getElementById("phoneError");
    const nameError = document.getElementById("nameError");
    const birthDateError = document.getElementById("birthDateError");
    const nicknameError = document.getElementById("nicknameError");
    const profilePictureError = document.getElementById("profilePictureError");

    const registrationForm = document.getElementById("registrationForm");

    // 중복 확인 결과 저장용 객체
    let validationState = {
        email: false,
        phone: false,
        nickname: false
    };

    // 입력 값이 비어 있는지 확인하는 함수
    function isNotEmpty(value){
        return value && value.trim() !== "";
    }

    // 이메일 형식 유효성 검사 함수
    function isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
    
    // 비밀번호 유효성 검사 함수
    function isPasswordValid(password){
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,15}$/;
        return passwordPattern.test(password);
    }

    // 전화번호 형식 유효성 검사 함수
    function isPhoneValid(phone) {
        const phonePattern = /^[0-9]{11}$/;
        return phonePattern.test(phone);
    }

    // 이름 유효성 검사 함수
    function isNameValid(name) {
        const namePattern = /^[a-zA-Z가-힣]+$/;
        return namePattern.test(name);
    }

    // 생년월일 유효성 검사 함수
    function isBirthDateValid(birthDate) {
        const birthDatePattern = /^[0-9]{8}$/;
        return birthDatePattern.test(birthDate);
    }

    // 닉네임 유효성 검사 함수
    function isNicknameValid(nickname) {
        const nicknamePattern = /^[a-zA-Z0-9가-힣]{1,5}$/;
        return nicknamePattern.test(nickname);
    }

    // 중복 확인 버튼 클릭 이벤트 (이메일)
    checkEmailBtn.addEventListener("click", function() {
        const email = emailInput.value.trim();

        if (!isEmailValid(email)) {
            emailError.textContent = "이메일 형식으로 입력해주세요.";
            validationState.email = false;
            return; // 이메일 형식이 잘못되었으면 중복 검사하지 않음
        } else {
            emailError.textContent = ""; // 올바른 형식이라면 오류 메시지를 제거
        }

        // Fetch API로 중복 확인 요청
        fetch(`/check-email?email=${encodeURIComponent(email)}`)
            .then(response => {
                if (response.status === 409) {
                    validationState.email = false;
                    emailError.textContent = "이미 사용 중인 이메일입니다.";
                } else if (response.ok) {
                    validationState.email = true;
                    emailError.textContent = "사용 가능한 이메일입니다.";
                } else {
                    throw new Error("중복 검사 중 문제가 발생했습니다. 다시 시도해주세요.");
                }
            })
            .catch(error => {
                console.error("중복 검사 요청 중 오류 발생:", error);
                emailError.textContent = error.message;
                validationState.email = false;
        });
    });

    // 전화번호 중복 확인 버튼 클릭 이벤트
    checkPhoneBtn.addEventListener("click", function () {
        const phone = phoneInput.value.trim();

        if (!isPhoneValid(phone)) {
            phoneError.textContent = "전화번호 형식이 잘못되었습니다. 숫자 11자리를 입력해주세요.";
            validationState.phone = false;
            return;
        } else {
            phoneError.textContent = "";
        }

        // Fetch API로 중복 확인 요청
        fetch(`/check-phone?phone=${encodeURIComponent(phone)}`)
            .then(response => {
                if (response.status === 409) {
                    validationState.phone = false;
                    phoneError.textContent = "이미 사용 중인 전화번호입니다.";
                } else if (response.ok) {
                    validationState.phone = true;
                    phoneError.textContent = "사용 가능한 전화번호입니다.";
                } else {
                    throw new Error("중복 검사 중 문제가 발생했습니다. 다시 시도해주세요.");
                }
            })
            .catch(error => {
                console.error("중복 검사 요청 중 오류 발생:", error);
                phoneError.textContent = error.message;
                validationState.phone = false;
            });
    });

    // 닉네임 중복 확인 버튼 클릭 이벤트
    checkNicknameBtn.addEventListener("click", function () {
        const nickname = nicknameInput.value.trim();

        if (!isNicknameValid(nickname)) {
            nicknameError.textContent = "닉네임은 1자에서 5자 이내의 한글, 영문자, 숫자만 가능합니다.";
            validationState.nickname = false;
            return;
        } else {
            nicknameError.textContent = "";
        }

        // Fetch API로 중복 확인 요청
        fetch(`/check-nickname?nickname=${encodeURIComponent(nickname)}`)
            .then(response => {
                if (response.status === 409) {
                    validationState.nickname = false;
                    nicknameError.textContent = "이미 사용 중인 닉네임입니다.";
                } else if (response.ok) {
                    validationState.nickname = true;
                    nicknameError.textContent = "사용 가능한 닉네임입니다.";
                } else {
                    throw new Error("중복 검사 중 문제가 발생했습니다. 다시 시도해주세요.");
                }
            })
            .catch(error => {
                console.error("중복 검사 요청 중 오류 발생:", error);
                nicknameError.textContent = error.message;
                validationState.nickname = false;
            });
    });

    // 가입하기 버튼 클릭 시 폼 유효성 검사 및 서버 전송
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 폼 제출 방지

        if (!validateForm()) {
            return; // 유효성 검사를 통과하지 못한 경우 폼 제출 중지
        }

        // 중복 검사 여부 확인
        if (!validationState.email) {
            emailError.textContent = "이메일 중복 검사를 해주세요.";
            emailInput.focus();
            return;
        }
        if (!validationState.phone) {
            phoneError.textContent = "전화번호 중복 검사를 해주세요.";
            phoneInput.focus();
            return;
        }
        if (!validationState.nickname) {
            nicknameError.textContent = "닉네임 중복 검사를 해주세요.";
            nicknameInput.focus();
            return;
        }

        // 데이터를 담아서 서버로 사용자 등록 요청 보내기
        const userData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
            phone: phoneInput.value.trim(),
            name: nameInput.value.trim(),
            birthDate: birthDateInput.value.trim(),
            nickname: nicknameInput.value.trim(),
            profilePicture: profilePictureInput.files[0] ? profilePictureInput.files[0].name : ""
        };

        fetch("/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("가입 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
            return response.json();
        })
        .then(data => {
            if (data && data.message) {
                alert(data.message); // 가입 성공 메시지
                window.location.href = '/login'; // 가입 성공 시 로그인 페이지로 이동
            }
        })
        .catch(error => {
            console.error("가입 요청 중 오류 발생:", error);
        });
    });


// 전체 유효성 검사 함수
    function validateForm() {
        let isValid = true;

        // 이메일 검사
        if (!isNotEmpty(emailInput.value)) {
            emailError.textContent = "입력란이 비어 있습니다.";
            emailInput.focus();
            isValid = false;
        } else if (!isEmailValid(emailInput.value)) {
            emailError.textContent = "이메일 형식이 잘못되었습니다.";
            if (isValid) emailInput.focus();
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        // 비밀번호 검사
        if (!isNotEmpty(passwordInput.value)) {
            passwordError.textContent = "입력란이 비어 있습니다.";
            if (isValid) passwordInput.focus();
            isValid = false;
        } else if (!isPasswordValid(passwordInput.value)) {
            passwordError.textContent = "특수문자, 영문자, 숫자는 필수이며, 6자 이상 15자 이하로 입력해 주세요.";
            if (isValid) passwordInput.focus();
            isValid = false;
        } else {
            passwordError.textContent = "";
        }

        // 비밀번호 확인 검사
        if (!isNotEmpty(confirmPasswordInput.value)) {
            confirmPasswordError.textContent = "입력란이 비어 있습니다.";
            if (isValid) confirmPasswordInput.focus();
            isValid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "비밀번호와 다릅니다.";
            if (isValid) confirmPasswordInput.focus();
            isValid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        // 휴대폰 번호 검사
        if (!isNotEmpty(phoneInput.value)) {
            phoneError.textContent = "입력란이 비어 있습니다.";
            if (isValid) phoneInput.focus();
            isValid = false;
        } else if (!isPhoneValid(phoneInput.value)) {
            phoneError.textContent = "문자를 제외한 숫자 11자리를 입력해주세요.";
            if (isValid) phoneInput.focus();
            isValid = false;
        } else {
            phoneError.textContent = "";
        }

        // 이름 검사
        if (!isNotEmpty(nameInput.value)) {
            nameError.textContent = "입력란이 비어 있습니다.";
            if (isValid) nameInput.focus();
            isValid = false;
        } else if (!isNameValid(nameInput.value)) {
            nameError.textContent = "이름에는 숫자나 특수문자가 포함될 수 없습니다.";
            if (isValid) nameInput.focus();
            isValid = false;
        } else {
            nameError.textContent = "";
        }

        // 생년월일 검사
        if (!isNotEmpty(birthDateInput.value)) {
            birthDateError.textContent = "입력란이 비어 있습니다.";
            if (isValid) birthDateInput.focus();
            isValid = false;
        } else if (!isBirthDateValid(birthDateInput.value)) {
            birthDateError.textContent = "생년월일 8자리를 입력해주세요.";
            if (isValid) birthDateInput.focus();
            isValid = false;
        } else {
            birthDateError.textContent = "";
        }

        // 닉네임 검사
        if (!isNotEmpty(nicknameInput.value)) {
            nicknameError.textContent = "입력란이 비어 있습니다.";
            if (isValid) nicknameInput.focus();
            isValid = false;
        } else if (!isNicknameValid(nicknameInput.value)) {
            nicknameError.textContent = "닉네임은 1자에서 5자 이내의 한글, 영문자, 숫자만 가능합니다.";
            if (isValid) nicknameInput.focus();
            isValid = false;
        } else {
            nicknameError.textContent = "";
        }

        return isValid;
    }
});
