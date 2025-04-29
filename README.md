Cosmino News

Cosmino News is a modern, mobile-first, fully responsive social news aggregation platform.  
Users can browse articles by topic, vote on articles, comment, and engage in discussions — similar to Reddit or Hacker News.

Built with a focus on:

- Clean architecture
- Mobile-first responsive design
- Incremental, scalable development
- Professional frontend engineering practices

---

Features

- View all articles sorted by date, votes, or comments
  -Sort and orderarticles dynamically
- Browse by topic (e.g. Coding, Football, Cooking)
- View full article content with vote & comment
- Post, view and delete comments
- Optimistic UI updates with error handling
- Login as a valid user (mocked from backend `/api/users`)
- Vote on articles (upvote/downvote)
- Backend-powered pagination using `limit` & `page` query params
- Total count of articles exposed via API for proper pagination logic
- Fully mobile-first and responsive design
- Accessible and clean user interface with TailwindCSS
- Graceful error handling (404s, network errors, etc.)

---

Project Structure

src/
├── components/ # Reusable UI components (Navbar, ArticleCard, CommentList, etc.)
├── contexts/ # Global context (UserContext for login)
├── pages/ # Application pages (HomePage, ArticlePage, LoginPage, TopicPage, etc.)
├── utils/ # API utilities, date formatting, axios client
├── assets/ # Static assets like the Cosmino News logo
├── App.jsx # Main app structure and routing
├── index.css # Tailwind base styles
├── main.jsx # Application entry point

Getting Started

1. git clone https://github.com/Cosmas-ogo/cosmino-news.git
   cd cosmino-news

2. npm install

3. npm run dev

4. The app will run on http://localhost:5173/

##Tech Stack

React 18

TailwindCSS

Axios

React Router v6

Render.com for backend hosting

Vite (dev server & build tool)

##Future Improvements

Backend-side pagination (limit, page query params)

User authentication (instead of hardcoded login)

Optimistic updates on vote, comment post, comment delete

Like/Dislike comments

Upload article functionality

Dark mode toggle

Accessibility (WAI-ARIA compliance)
