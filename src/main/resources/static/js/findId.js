document.getElementById('findIdForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

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
            document.getElementById('findIdResult').innerHTML = `<span>아이디(이메일): ${data.email}</span>`;
        } else {
            document.getElementById('findIdResult').innerHTML = `<span class="error">${data.message}</span>`;
        }
    } catch (error) {
        // 네트워크 에러 처리
        document.getElementById('findIdResult').innerHTML = `<span class="error">오류가 발생했습니다. 다시 시도해주세요.</span>`;
    }
});
