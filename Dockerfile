# Dùng Node phiên bản nhẹ
FROM node:lts-alpine

# Thư mục làm việc trong container
WORKDIR /app

# Copy file cấu hình trước (để cache npm install)
COPY package*.json ./

# Cài thư viện
RUN npm install

# Copy toàn bộ source vào container
COPY . .

# Port mà Vite sẽ chạy
EXPOSE 3000

# Lệnh chạy app với `--host` để truy cập được từ bên ngoài
CMD ["npm", "run", "dev", "--", "--host"]
    