document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");
  const refreshBtn = document.getElementById("refresh");
  const verifyBtn = document.getElementById("verifyBtn");
  const input = document.getElementById("captchaInput");
  const result = document.getElementById("result");

  let captchaText = ""; 

  // 隨機生成驗證碼
  function generateCaptcha() {
    captchaText = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    drawCaptcha(captchaText);
  }

  // 繪製驗證碼
  function drawCaptcha(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空畫布
    ctx.fillStyle = randomColor(200, 255); // 背景顏色
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 繪製文字
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const fontSize = randomNum(30, 50);
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = randomColor(50, 150);
      const x = (i + 1) * (canvas.width / (text.length + 1));
      const y = randomNum(fontSize, canvas.height - 10);
      const angle = randomNum(-30, 30);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // 繪製干擾線
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = randomColor(100, 200);
      ctx.beginPath();
      ctx.moveTo(randomNum(0, canvas.width), randomNum(0, canvas.height));
      ctx.lineTo(randomNum(0, canvas.width), randomNum(0, canvas.height));
      ctx.stroke();
    }

    // 繪製干擾點
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(randomNum(0, canvas.width), randomNum(0, canvas.height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // 隨機生成顏色
  function randomColor(min, max) {
    const r = randomNum(min, max);
    const g = randomNum(min, max);
    const b = randomNum(min, max);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // 隨機生成數字
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 事件綁定
  refreshBtn.addEventListener("click", generateCaptcha);

  verifyBtn.addEventListener("click", function () {
    if (input.value === captchaText) {
      result.textContent = "驗證成功！";
      result.style.color = "green";
    } else {
      result.textContent = "驗證失敗，請再試一次。";
      result.style.color = "red";
    }
  });

  // 初始化驗證碼
  generateCaptcha();
});