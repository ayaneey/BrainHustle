# BrainHustle

> BrainHustle is a mobile-friendly GCSE revision app designed to help students practise Math, English, and Science through interactive quizzes, a personalised dashboard, and an integrated calendar. What began as a personal learning project evolved into a real-world tool to support revision and track progress.

## 🛠️ Tech Stack:

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📸 App Screenshots

### Landing Page - Clean & Simple

<img width="1502" alt="Screenshot 2025-06-13 at 22 05 31" src="https://github.com/user-attachments/assets/8529ff97-8be5-427b-92db-5ce9ffcedafd" />

### Quiz Interface

<img width="1047" alt="Screenshot 2025-06-13 at 23 40 10" src="https://github.com/user-attachments/assets/79a25d65-ba4a-41bf-8702-d061cfec6f9c" />

---

## ✨ About Brain-Hustle

BrainHustle is a GCSE-focused revision app that helps students practice Maths, English, and Science through topic-based quizzes. It features a personalised dashboard to track quiz attempts, monitor progress, and manage results with a clean, mobile-friendly layout. It also includes a built-in study calendar that lets students schedule sessions with events saved reliably across devices. The app aims to make revision organised, easy to access, and truly helpful.

## 🎯 The Story

As a former teacher turned aspiring developer, I started BrainHustle as a way to build up my technical skills and experiment with real-world tools. At first, it was just a side project — something fun to tinker with as I learned more about coding. But the more time I spent on it, the more I realised it had the potential to actually help students.

Driven by the idea of giving back to the learners I used to teach, I decided to take the app seriously. I began putting real effort into every feature — from structuring the quiz experience to designing a user-friendly dashboard and calendar system. I poured countless hours into development, problem-solving, and debugging.

BrainHustle became more than just a learning exercise for me — it became something purposeful. Something that, I hope, makes studying a little more engaging and accessible for others.

---

## ✨ What did the app teach me?

Building this project taught me more than just technical skills — it pushed me to grow as a developer. I ran into real problems, solved them through persistence, and gained practical experience along the way. Below are some key milestones that shaped my learning and development.

##

### Logging in via Clerk

I initially built a custom login system with bcrypt, JWT, and session cookies, but managing user sessions and protected routes became complex and difficult to scale. After struggling with session expiration issues, I switched to Clerk, which taught me how to simplify authentication with a reliable third-party service while securing routes and customizing the UI to match my design.

**What it taught me:**

- Protect routes easily (both client and server)
- Access user session data securely
- Customise pre-built auth components

##

### Database Relationships with Prisma & MongoDB

In the beginning, I stored all data in MongoDB, but without linking it to a specific user. I didn’t fully understand how to make each user's content private and unique to them. Through learning and experimentation, I figured out how to use one-to-many relationships in Prisma and apply foreign keys in MongoDB to associate quiz attempts, calendar events, and to-do lists with individual users.

**What it taught me:**

- How to structure user-specific data using `userId`
- Set up one-to-many relationships in Prisma
- Filter database queries by the current user
- Keep each user’s data private and separate

---

## Future Plans

Here are some future improvements and expansions planned for Brain Hustle:

- Further GCSE subjects will be added, including Geography, History, and French, just to name a few.
- To implement badges or achievements to motivate consistent studying.
- To incorporate a dark mode toggle for better user experience during late-night studying.

---

## 🏃‍♂️ Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/brainhustle.git

# Install dependencies
npm install

# Set up your environment variables
cp .env.example .env.local
# Add your MongoDB connection string and Clerk keys

# Run database migrations
npx prisma db push

# Start the development server
npm run dev
```

Visit http://localhost:3000 to start exploring.

## 🔗 Links

- **Live App**: [brainhustle.vercel.app](https://brainhustle.vercel.app)

---
