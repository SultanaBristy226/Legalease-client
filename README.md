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

## 🔧 Environment Variables
### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=https://legalease-server-iqg1.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51TtVDiQoBM8Y2HdjCses2NgssM1VApdCXtxtHBwE8ph0cz7faUVqEjv6SMjJAECRKOvs82BY5Uh0zFQyCNqjt51U00byboYkLR
NEXT_PUBLIC_IMGBB_API_KEY=c0e22748a4cfc9526aebdd7f231469cb

Server (.env)
env

MONGODB_URI=mongodb+srv://legalease_admin:bristy1234@cluster0.soltoyz.mongodb.net/legalease?appName=Cluster0
JWT_SECRET=mysecretkey12345
PORT=5000
CLIENT_URL=https://legalease-client-opal.vercel.app
STRIPE_SECRET_KEY=sk_test_51TtVDiQoBM8Y2HdjW08ekXIF2GSs3MAckwm5WEqKJoQhh3QjfOccUbxDrXo7feknUgpHlFMkm2OC8rOguphnWQCc00A7dtgDTc

📦 NPM Packages Used
Frontend Packages
Package	Version	Purpose
next	16.2.9	React Framework
typescript	^5.0.0	Type Safety
tailwindcss	^4.0.0	Styling
framer-motion	^11.0.0	Animations
axios	^1.7.0	HTTP Client
react-icons	^5.0.0	Icons
better-auth	^1.0.0	Authentication
@stripe/stripe-js	^4.0.0	Payment Processing
@stripe/react-stripe-js	^3.0.0	Stripe React Components
Backend Packages
Package	Version	Purpose
express	^4.19.0	Web Framework
mongoose	^8.5.0	MongoDB ODM
jsonwebtoken	^9.0.0	JWT Authentication
bcryptjs	^3.0.0	Password Hashing
stripe	^16.8.0	Payment Processing
cors	^2.8.5	CORS Middleware
dotenv	^16.4.0	Environment Variables
cookie-parser	^1.4.6	Cookie Parser
nodemon	^3.1.0	Development Server
Dev Dependencies
Package	Purpose
nodemon	Auto-restart server
@types/node	TypeScript types for Node
@types/react	TypeScript types for React
@types/react-dom	TypeScript types for React DOM
eslint	Code linting
eslint-config-next	Next.js ESLint config
🚀 Local Development
bash

git clone https://github.com/SultanaBristy226/legalease-client.git
cd legalease-client
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
npm run dev

Build for Production
bash

npm run build
npm start

🤝 Contributing

    Fork the repository

    Create feature branch (git checkout -b feature/AmazingFeature)

    Commit changes (git commit -m 'Add some AmazingFeature')

    Push to branch (git push origin feature/AmazingFeature)

    Open a Pull Request


👩‍💻 Developer

Sultana Bristy - GitHub: https://github.com/SultanaBristy226

Made with ❤️ for LegalEase