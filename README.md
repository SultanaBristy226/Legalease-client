# ⚖️ LegalEase - Online Lawyer Hiring Platform

LegalEase is a modern full-stack lawyer hiring platform where users can find verified lawyers, send hiring requests, make secure payments, and leave reviews. Lawyers can manage their professional profiles and hiring requests, while administrators oversee users, transactions, and platform analytics.

## 🌐 Live Demo

- **Website:** https://legalease-client-opal.vercel.app/
- **Backend API:** https://legalease-server-iqg1.onrender.com

---

# 🔑 Demo Credentials

### Admin

```text
Email: bristy@gmail.com
Password: 12345678
```

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Role-based Authorization
- Protected Routes
- Secure Password Hashing

## 👤 User Features

- Register & Login
- Browse Lawyers
- Search & Filter Lawyers
- View Lawyer Details
- Hire Lawyers
- Payment System
- View Hiring History
- Leave Ratings & Reviews
- Update Profile

## 👨‍⚖️ Lawyer Features

- Create Professional Profile
- Edit Lawyer Information
- Accept/Reject Hiring Requests
- Track Total Hires
- Manage Availability

## 👑 Admin Features

- Manage Users
- Change User Roles
- Delete Users
- View All Transactions
- Analytics Dashboard

## 🎨 UI Features

- Responsive Design
- Mobile Friendly
- Dark & Light Theme
- Smooth Animations
- Clean Black & White Interface

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| React Context API | State Management |
| Axios | API Requests |
| Framer Motion | Animations |
| React Icons | Icons |
| Vercel | Deployment |

---

# 📁 Project Structure

```text
client/
│
├── public/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── lawyer/
│   │   │   └── user/
│   │   ├── lawyers/
│   │   ├── browse-lawyers/
│   │   ├── login/
│   │   ├── register/
│   │   └── ...
│   │
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── .env.local
├── package.json
└── README.md
```

---

# 📄 Pages

| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Browse Lawyers | `/browse-lawyers` | Public |
| Lawyer Details | `/lawyers/[id]` | Public |
| Dashboard | `/dashboard` | Private |
| User Dashboard | `/dashboard/user/*` | User |
| Lawyer Dashboard | `/dashboard/lawyer/*` | Lawyer |
| Admin Dashboard | `/dashboard/admin/*` | Admin |

---

# 🎨 Design System

### Colors

| Color | Value |
|--------|-------|
| Primary | `#0A0A0A` |
| Secondary | `#FFFFFF` |
| Muted Text | `#6B7280` |
| Border | `#E5E7EB` |

### Typography

- **Headings:** Playfair Display
- **Body:** Inter

---

# ⚙️ Environment Variables

Create a **.env.local** file.

```env
NEXT_PUBLIC_API_URL=https://legalease-server-iqg1.onrender.com/api
```

---

# 💻 Local Development

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

Clone the repository

```bash
git clone https://github.com/SultanaBristy226/legalease-client.git
```

Navigate to the project

```bash
cd legalease-client
```

Install dependencies

```bash
npm install
```

Create environment file

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 🚀 Production Build

```bash
npm run build
npm start
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push to GitHub

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👩‍💻 Developer

**Sultana Bristy**

- GitHub: https://github.com/SultanaBristy226

---

⭐ **If you like this project, don't forget to give it a star on GitHub!**