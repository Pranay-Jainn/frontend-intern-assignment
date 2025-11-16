Mini Product Dashboard

A responsive, interactive Vanilla JavaScript product dashboard built for the Frontend Internship Assignment, featuring product listing, filtering, sorting, pagination, modal previews, dark/light theme, favorites, offline fallback, and smooth UI animations.

Live Demo
[mini-product-dashboard.netlify.app](https://mini-product-dashboard.netlify.app/)

GitHub Repository
[https://github.com/pranay-jainn/frontend-intern-assignment](https://github.com/Pranay-Jainn/frontend-intern-assignment)

Project Structure
frontend-intern-assignment/
│── index.html
│── styles.css
│── script.js
│── data.json
│── README.md

Setup Instructions
1️. Clone the repository
git clone https://github.com/YOUR-USERNAME/frontend-intern-assignment.git
cd frontend-intern-assignment

2️. Run a local server

Because browsers block local JSON loading from file://, you MUST run a server.

Option A — Using VS Code Live Server
Right-click index.html → Open with Live Server

Option B — Using Python
python -m http.server 5500

Then open:
http://localhost:5500

| Component   | Tech                                |
| ----------- | ----------------------------------- |
| UI          | HTML5 + CSS3                        |
| Logic       | Vanilla JavaScript                  |
| Data Source | FakeStore API + Local JSON fallback |
| Animation   | CSS transitions                     |
| Storage     | localStorage                        |
| Hosting     | Vercel / Netlify / GitHub Pages     |

How It Works
1. API Fetch
App tries to load data from FakeStore API
If API fails → loads local data.json

2. Filtering / Sorting
Filters by:
Search text
Category
Sorting:
Price low → high
Price high → low

3. Pagination
Displays 6 products per page

4. Modal
Clicking a card opens a detailed modal view
Favorite + Add to Cart buttons available inside modal

5. Dark/Light Theme
Saves preference in localStorage
Auto-applies on page load

6. Favorites
Stored using Set() for fast lookups
Persisted in localStorage

Features
 Core Features

Product Fetching from API
Offline fallback (auto loads data.json if API fails)
Async/Await based fetching with proper try/catch handling
Dynamic category filtering
Real-time product search
Sort by price (Low→High / High→Low)

 UI & UX Features
Fully responsive layout
Mobile-optimized navbar
Smooth fade-in animations
Modal with product preview
Skeleton loader while fetching
Dark/Light theme toggle (saved in localStorage)
Favorites system with persistent storage
Image lazy loading for performance

 Favorites

Add/remove products from favorites
Favorites count updates live
Stored in localStorage so they stay even after refresh
