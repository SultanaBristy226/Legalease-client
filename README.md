# LegalEase - Online Lawyer Hiring Platform

## 🌐 Live Demo
- **Website**: https://legalease-client-opal.vercel.app/
- **API Server**: https://legalease-server-iqg1.onrender.com

## 👤 Admin Access
- **Email**: bristy@gmail.com
- **Password**: 12345678

## 📖 About
LegalEase is a full-stack web application that connects clients with verified lawyers. Clients can browse lawyers, hire them, make payments, and leave reviews. Lawyers can manage their profiles, accept/reject hiring requests, and track their earnings. Admins can manage users, view transactions, and access platform analytics.

## ✨ Features
- Register/Login with JWT
- Role-based access (User, Lawyer, Admin)
- Browse lawyers with search & filter
- View lawyer profiles with details
- Hire lawyers
- Make payments (Stripe Integration)
- Leave comments & ratings
- Track hiring history
- Update profile with image upload
- Create & manage legal profile
- Accept/reject hiring requests
- Manage users (change roles, delete)
- View all transactions
- Platform analytics dashboard
- Dark/Light mode toggle
- Responsive design (mobile-first)
- Smooth animations (Framer Motion)
- Professional black-white theme

## 🛠️ Tech Stack
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| React Context API | State Management |
| Framer Motion | Animations |
| Axios | HTTP Client |
| React Icons | Icons |
| Stripe | Payment Processing |
| imgBB | Image Upload |
| Better Auth | Authentication |
| Vercel | Frontend Deployment |
| Render | Backend Deployment |

## 📄 Pages
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

## 🎨 Design System
- **Primary**: `#0a0a0a` (Black)
- **Secondary**: `#ffffff` (White)
- **Text Muted**: `#6b6b6b` (Gray)
- **Border**: `#e0e0e0` (Light Gray)
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)


👩‍💻 Developer

Sultana Bristy - GitHub: https://github.com/SultanaBristy226

Made with ❤️ for LegalEase