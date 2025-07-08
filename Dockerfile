# Tahap 1: Base Image - Memulai dari lingkungan yang sudah ada Node.js
FROM node:20-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Salin skema Prisma agar 'prisma generate' bisa berjalan saat instalasi
COPY prisma ./prisma

# Install semua dependensi aplikasi
RUN npm install

# Salin semua sisa kode aplikasi ke dalam direktori kerja
COPY . .

# (Jika Anda menggunakan TypeScript) Build aplikasi Anda
# Pastikan script "build" ada di package.json Anda
RUN npm run build

# Buka port yang digunakan oleh aplikasi di dalam container (misalnya, port 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi ketika container dimulai
CMD ["node", "dist/api/index.js"]