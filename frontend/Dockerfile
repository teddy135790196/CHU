# 使用 Node.js 作為基礎映像
FROM node:16-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有源代碼
COPY . .

# 設置環境變數
ENV VUE_APP_API_BASE_URL=${RAILWAY_API_URL:-http://localhost:3000}

# 構建應用
RUN npm run build

# 使用 nginx 來提供靜態文件
FROM nginx:stable-alpine

# 複製構建好的文件到 nginx 目錄
COPY --from=0 /app/dist /usr/share/nginx/html

# 複製 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE ${PORT:-80}

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"] 