// backend/src/main/service/captchaService.js

// 不用 svg-captcha，自己寫
// 隨機驗證碼
function randomDigits(length = 5) {	// 方法沒填數值預設 length = 5
  let code = '';
  const digits = '0123456789';
  for (let i = 0; i < length; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return code;
}

// 拆分RGB以隨機顏色(如：(255, 0, 163) => "#ff00a3")
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x =>
    x.toString(16).padStart(2, '0')
  ).join('');
}

// 避免顏色接近127在下面算對比會不明顯
function randChannelAvoidMid() {
  const lowOrHigh = Math.random() < 0.5 ? 0 : 1;
  if (lowOrHigh === 0) {
    return Math.floor(Math.random() * 80);      // 0 ~ 79
  } else {
    return 181 + Math.floor(Math.random() * 75); // 181 ~ 255
  }
}

// 計算對比色
function getContrastColor(r, g, b) {
  return rgbToHex(255 - r, 255 - g, 255 - b);
}

function generateCaptcha() {
  const width = 150;
  const height = 50;
  const code = randomDigits(5);

  // 隨機背景色
  const bgR = randChannelAvoidMid();
  const bgG = randChannelAvoidMid();
  const bgB = randChannelAvoidMid();
  const bgColor = rgbToHex(bgR, bgG, bgB);
  const textColor = getContrastColor(bgR, bgG, bgB);

  // 干擾線條：5～13 條，背景色
//   const lineCount = Math.floor(Math.random() * 9) + 5;
  const lineCount = Math.floor(Math.random() * 42) + 21;
  let lines = '';
  for (let i = 0; i < lineCount; i++) {
    const x1 = Math.floor(Math.random() * width);
    const y1 = Math.floor(Math.random() * height);
    const x2 = Math.floor(Math.random() * width);
    const y2 = Math.floor(Math.random() * height);
    lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${bgColor}" stroke-width="1"/>`;
  }

  // 建立 SVG
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${bgColor}" />
    <text style="user-select: none;" x="50%" y="60%" text-anchor="middle" fill="${textColor}"
          font-size="28" font-family="sans-serif" dominant-baseline="middle">
      ${code}
    </text>
    ${lines}
  </svg>
`;// ${lines}要放在最下面，這樣線條才會在最上層蓋過文字

  return {
    data: svg,
    text: code
  };
}

module.exports = {
  generateCaptcha,
};
