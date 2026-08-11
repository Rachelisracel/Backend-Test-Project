# Backend Developer Internship Test - Node.js (TypeScript)

Chào mừng bạn đến với dự án **Backend Developer Internship Test** tại **CÔNG TY TNHH GENX PK STORY (GXP)**. 

Dự án được triển khai bằng **Node.js**, **Express** và **TypeScript**, áp dụng kiến trúc **Clean Architecture** (tách biệt Controllers, Services, Validators, Routes). Dự án bao gồm đầy đủ **Unit Tests (Vitest)** và đã được **deploy lên Render**.

---

## 📌 Links Dự Án
* **GitHub Repository:** [https://github.com/Rachelisracel/Backend-Test-Project](https://github.com/Rachelisracel/Backend-Test-Project)
* **Production Live API (Render):** [https://backend-test-project-t5e2.onrender.com](https://backend-test-project-t5e2.onrender.com)
* **Tài liệu:** Thư mục `/docs` trong repository.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Language:** Node.js (TypeScript)
* **Framework:** Express.js
* **Validation:** Zod / Joi / class-validator
* **Testing:** Vitest
* **Deployment:** Render

---

## 🏗️ Cấu Trúc Thư Mục (Project Architecture)

```text
.
├── docs/                     # Thiết kế ERD & Danh sách API
├── src/
│   ├── controllers/          # HTTP request handlers
│   ├── services/             # Business logic (Schedule & Invoice)
│   ├── validators/           # Input validation schemas & middlewares
│   ├── routes/               # Express routes
│   ├── middlewares/          # Global error handler
│   ├── utils/                # Helper xử lý date & timezone (Asia/Ho_Chi_Minh)
│   └── app.ts                # Server entry point
├── tests/                    # Unit test suites (15 test cases)
├── package.json
├── tsconfig.json
└── README.md
