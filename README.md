# Mini Product Dashboard

A responsive and interactive product dashboard built using HTML, CSS, and Vanilla JavaScript for the Frontend Internship Assignment.
It supports product listing, filtering, sorting, pagination, modal previews, dark/light theme switching, persistent favorites, offline fallback, and smooth UI animations.

# Live Demo

https://mini-product-dashboard.netlify.app/

# GitHub Repository

https://github.com/Pranay-Jainn/frontend-intern-assignment

# Project Structure
frontend-intern-assignment/
│── index.html
│── styles.css
│── script.js
│── data.json
│── README.md

# Getting Started
1. Clone the repository
git clone https://github.com/YOUR-USERNAME/frontend-intern-assignment.git
cd frontend-intern-assignment

2. Run a local development server

Modern browsers block JSON loading via the file:// protocol.
To ensure the fallback JSON loads correctly, you must use a local server.

Option A — VS Code Live Server

Right-click index.html → Open with Live Server

Option B — Python HTTP Server
python -m http.server 5500


Then open:
http://localhost:5500

# Technology Stack
| Component   | Technology                          |
| ----------- | ----------------------------------- |
| UI          | HTML5, CSS3                         |
| Logic       | Vanilla JavaScript                  |
| Data Source | FakeStore API + Local JSON Fallback |
| Animations  | CSS Transitions                     |
| Storage     | localStorage                        |
| Hosting     | Netlify / Vercel / GitHub Pages     |


# Application Workflow

1. Data Loading

The application first attempts to fetch product data from the FakeStore API.
If the request fails (offline or network issue), it automatically loads data.json as a fallback.

2. Filtering and Sorting

Users can dynamically filter and sort products:

Search by text

Filter by category

Sort by price (low to high / high to low)

3. Pagination

Displays 6 products per page

Next/Previous buttons update the product grid

4. Product Modal

Clicking a product card opens a detailed modal window

Displays product image, title, description, category, and price

Includes Favorite and Add-to-Cart actions inside the modal

5. Theme Switching

Supports Dark and Light mode

Theme preference is saved in localStorage

Automatically applied on page load

6. Favorites System

Users can mark items as favorite

Favorite state is stored using a JavaScript Set

Persists in localStorage

Favorites count updates instantly

Favorites remain even after page reload

Features Overview
Core Features

Product fetching from a live API

Automatic offline fallback using local JSON

Modern async/await-based data loading

Search filtering and category-based filtering

Sort by price

Pagination system

Data normalization for consistent UI rendering

# UI and UX Features

Fully responsive layout (mobile, tablet, and desktop)

Mobile-optimized navbar and filter controls

Smooth fade-in animations for cards

Modal with detailed product preview

Skeleton loader during data fetch

Theme toggle with persistence

Lazy-loaded product images

Favorites Management

Add and remove favorites

Instant UI update

Persistent storage with localStorage

Favorite status synced between cards and modal
