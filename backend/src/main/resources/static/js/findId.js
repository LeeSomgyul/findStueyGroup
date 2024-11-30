document.getElementById('findIdForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const resultElement = document.getElementById("findIdResult");
    resultElement.className = "";
    resultElement.innerText = "";

    try {
        const response = await fetch('/find-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        });

        const data = await response.json();

        if (response.ok) {
            resultElement.className = "success";
            resultElement.innerText = `${name}님의 아이디(이메일)은 ${data.email}입니다.`;
        } else {
            resultElement.className = "error";
            resultElement.innerText = data.message;
        }
    } catch (error) {
        // 네트워크 에러 처리
        resultElement.className = "error";
        resultElement.innerText = "서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.";
    }
});
