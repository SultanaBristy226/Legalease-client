# LegalEase - Online Lawyer Hiring Platform

## Live Demo
- **Website**: https://legalease-client-weld.vercel.app
- **API Server**: https://legalease-server-iqg1.onrender.com

---

## Admin Access
- **Email**: bristy@gmail.com
- **Password**: 12345678

---

## About

LegalEase is a full-stack web application that connects clients with verified lawyers. Clients can browse lawyers, hire them, make payments, and leave reviews. Lawyers can manage their profiles, accept/reject hiring requests, and track their earnings. Admins can manage users, view transactions, and access platform analytics.

---

## Features

### Authentication
- Register/Login with JWT
- Role-based access (User, Lawyer, Admin)
- Protected routes

### User Features
- Browse lawyers with search & filter
- View lawyer profiles with details
- Hire lawyers
- Make payments (Placeholder)
- Leave comments & ratings
- Track hiring history
- Update profile

### Lawyer Features
- Create & manage legal profile
- Accept/reject hiring requests
- Track total hires
- View client details

### Admin Features
- Manage users (change roles, delete)
- View all transactions
- Platform analytics dashboard

### UI Features
- Dark/Light mode toggle
- Responsive design (mobile-first)
- Smooth animations (Framer Motion)
- Professional black-white theme

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| React Context API | State Management |
| Framer Motion | Animations |
| Axios | HTTP Client |
| React Icons | Icons |
| Vercel | Deployment |

---

## Project Structure

client/
├── src/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── lawyer/
│   │   │   └── user/
│   │   ├── lawyers/
│   │   └── browse-lawyers/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   └── lib/
│       └── axios.ts
├── public/
├── .env.local
├── package.json
└── README.md

---

## Pages

| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Browse Lawyers | `/browse-lawyers` | Public |
| Lawyer Details | `/lawyers/[id]` | Public |
| Dashboard | `/dashboard` | Private |
| User Dashboard | `/dashboard/user/*` | User only |
| Lawyer Dashboard | `/dashboard/lawyer/*` | Lawyer only |
| Admin Dashboard | `/dashboard/admin/*` | Admin only |

---

## Design System

### Colors
- **Primary**: `#0a0a0a` (Black)
- **Secondary**: `#ffffff` (White)
- **Text Muted**: `#6b6b6b` (Gray)
- **Border**: `#e0e0e0` (Light Gray)

### Fonts
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://legalease-server-iqg1.onrender.com/api
```

---

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
git clone https://github.com/SultanaBristy226/legalease-client.git
cd legalease-client
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

MIT License

---

## Developer

**Sultana Bristy**
- GitHub: https://github.com/SultanaBristy226

---

