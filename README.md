# Skill Test Backend MiniLemon

This is the backend for a note-taking application built with Express.js.

This project follows a clean architecture approach, which aims to separate concerns and create a maintainable and scalable codebase. Here's a brief explanation of the structure:

NOTE: Implementing hard delete as per test requirements.
In a production environment, a soft delete approach (e.g., setting an 'is_deleted' flag or a 'deleted_at' timestamp)
Would be the preferred best practice for data recovery and audit trail purposes.

## Architecture:
```mermaid
graph TD
    A[Presentation Layer] -->|Handles Requests| B[Routes]
    B -->|Calls Controllers| C[Controllers]
    C -->|Processes Logic| D[Services]
    D -->|Accesses Data| E[Repositories]
    E -->|Interacts with DB| F[Prisma ORM]

    subgraph Domain Layer
        D
    end

    subgraph Data Layer
        E
        F
    end
```

### 📁 Project Structure  

This project follows a clean and organized structure, ensuring maintainability and scalability. Below is an overview of the main directories and files:  

### 📂 Root Directories  
- **`api/`** - Entry point for the API, responsible for initializing and configuring the server.  
- **`prisma/`** - Contains database schema and migration files.  
- **`public/`** - Serves static files used by the application.  
  - **`swagger-ui/`** - Assets for API documentation using Swagger UI.  
- **`src/`** - Main source code directory.  

### 📂 Source Code (`src/`)  
#### 🏗️ Architecture Layers  
- **`controllers/`** - Handles HTTP requests and responses.  
- **`routes/`** - Defines API endpoints and connects them to controllers.  
- **`services/`** - Contains business logic and core application functionality.  
- **`repositories/`** - Manages database operations and interactions.  
- **`models/`** - Defines data structures and database models.  

#### 🔧 Supporting Modules   
- **`utils/`** - Utility functions to support the application.  
- **`types/`** - TypeScript type definitions for better type safety.  
- **`docs/`** - OPEN API documentation.

## 🛠️ Configuration Files  
- **`package.json`** - Project manifest file.
- **`tsconfig.json`** - TypeScript configuration file.  
- **`vercel.json`** - Configuration for deployment on Vercel.  

## API Endpoints

## 📚 Dokumentasi API
Berikut adalah ringkasan endpoint yang tersedia. Untuk detail lengkap, kunjungi **[Halaman Swagger](https://skill-test-be-minilemon.vercel.app/api-docs)**.

<details>
<summary><code>GET /users</code> - <strong>Mendapatkan Semua Pengguna</strong></summary>

-   **Deskripsi:** Mengambil daftar semua pengguna yang ada di sistem.
-   **Headers:** `Authorization: Bearer <TOKEN>` (Wajib)
-   **Contoh cURL:**
    ```bash
    curl -X GET '[https://skill-test-be-minilemon.vercel.app/api/users](https://skill-test-be-minilemon.vercel.app/api/users)' \
    -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'
    ```
</details>

<details>
<summary><code>POST /users</code> - <strong>Membuat Pengguna Baru</strong></summary>

-   **Deskripsi:** Mendaftarkan seorang pengguna baru ke dalam sistem.
-   **Request Body:** (`application/json`)
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "no_hp": "081234567890",
      "status": true,
      "departement": "Technology"
    }
    ```
-   **Contoh cURL:**
    ```bash
    curl -X POST '[https://skill-test-be-minilemon.vercel.app/api/users](https://skill-test-be-minilemon.vercel.app/api/users)' \
    -H 'Content-Type: application/json' \
    -d '{
          "name": "John Doe",
          "email": "john.doe@example.com",
          "no_hp": "081234567890",
          "status": true,
          "departement": "Technology"
        }'
    ```
</details>

<details>
<summary><code>GET /users/{id}</code> - <strong>Mendapatkan Pengguna Berdasarkan ID</strong></summary>

-   **Deskripsi:** Mengambil detail satu pengguna spesifik berdasarkan ID-nya.
-   **Headers:** `Authorization: Bearer <TOKEN>` (Wajib)
-   **Path Parameters:** `id` (integer) - ID unik dari pengguna.
-   **Contoh cURL:**
    ```bash
    curl -X GET '[https://skill-test-be-minilemon.vercel.app/api/users/1](https://skill-test-be-minilemon.vercel.app/api/users/1)' \
    -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'
    ```
</details>

<details>
<summary><code>PUT /users/{id}</code> - <strong>Memperbarui Pengguna</strong></summary>

-   **Deskripsi:** Memperbarui data seorang pengguna spesifik berdasarkan ID-nya.
-   **Headers:** `Authorization: Bearer <TOKEN>` (Wajib)
-   **Path Parameters:** `id` (integer) - ID unik dari pengguna yang akan diperbarui.
-   **Request Body:** (`application/json`)
    ```json
    {
      "name": "John Doe Updated",
      "email": "john.doe.new@example.com",
      "no_hp": "081111111111",
      "status": false,
      "departement": "Marketing"
    }
    ```
-   **Contoh cURL:**
    ```bash
    curl -X PUT '[https://skill-test-be-minilemon.vercel.app/api/users/1](https://skill-test-be-minilemon.vercel.app/api/users/1)' \
    -H 'Authorization: Bearer <YOUR_JWT_TOKEN>' \
    -H 'Content-Type: application/json' \
    -d '{
          "name": "John Doe Updated",
          "status": false
        }'
    ```
</details>

<details>
<summary><code>DELETE /users/{id}</code> - <strong>Menghapus Pengguna</strong></summary>

-   **Deskripsi:** Menghapus seorang pengguna spesifik dari sistem berdasarkan ID-nya.
-   **Headers:** `Authorization: Bearer <TOKEN>` (Wajib)
-   **Path Parameters:** `id` (integer) - ID unik dari pengguna yang akan dihapus.
-   **Respons Sukses:** `204 No Content` (Tidak ada body respons).
-   **Contoh cURL:**
    ```bash
    curl -X DELETE '[https://skill-test-be-minilemon.vercel.app/api/users/1](https://skill-test-be-minilemon.vercel.app/api/users/1)' \
    -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'
    ```
</details>

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/christian-siahaan26/skill-test-be-minilemon
```

2. Navigate to the project directory:

```sh
cd skill-test-backend
```

3. Install dependencies:

```sh
npm install
```

### Database Setup

#### ERD

```mermaid
erDiagram
    USER {
        Int id
        String name
        String email
        String no_hp
        Boolean status
        String departement
        DateTime createdAt
        DateTime updatedAt
    }
```

1. Migrate prisma database:

```sh
npx prisma migrate dev
```

### Running the Server

1. Start the development server:

```sh
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
