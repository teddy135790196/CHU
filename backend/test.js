const path = require('path');

const fs = require('fs');
const frontPath = path.join(__dirname, '..', 'frontend', 'dist', 'index.html');

fs.access(frontPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`前端目錄不存在: ${frontPath}`);
  } else {
    console.log(`找到前端目錄: ${frontPath}`);
  }
});
