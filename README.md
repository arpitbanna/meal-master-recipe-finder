# 🍽️ Meal Master

Meal Master is a clean and fully responsive React web application that allows users to instantly search, filter, and discover their next favorite recipes. Powered by Context API architecture principles and TheMealDB, it fetches real-time culinary data to display highly visual recipe cards dynamically.

---

## ✨ Features
- **Real-Time Search**: Search natively across hundreds of meals as you type.
- **Dynamic Categories**: Select dropdown categories that are parsed out algorithmically without hardcoding.
- **Smart Sorting**: Instantly order recipes alphabetically (A-Z or Z-A).
- **Favorites System**: Star your favorite recipes locally and toggle views to display only your curated meals.
- **Light & Dark Mode**: A custom minimal dark mode styling switch for comfortable night browsing.
- **Adaptive Layout**: Gracefully snaps between robust CSS grids for multiple recipes and centered Flexbox staging for single-item results.

## 🛠️ Tech Stack
- **Frontend Framework**: React 19 (via Vite)
- **Styling**: Pure CSS3 variables & Custom Responsive Rules
- **Backend API**: [TheMealDB Free Public API](https://www.themealdb.com/api.php)
- **Package Manager**: npm

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/meal-master.git
   cd meal-master
   ```

2. **Install node modules:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. You can now access the running application by visiting the localhost URL indicated in your terminal (usually `http://localhost:5173`).

---

## 📖 Usage Instructions
- **Browsing**: Hit the Homepage to instantly load a smart default list of curated meals.
- **Searching**: Use the top search bar. The grid will automatically update live as you type text constraints.
- **Filters**: Stack search inputs with Category or Alphabetical sorts from the top Dropdowns.
- **Saving**: Hit the "★ Favorite" button at the base of any recipe card to save it.
- **Toggling Views**: Hit "☆ Show Favorites" beside the sorting inputs to filter the data exclusively to your pinned cards.

---

## 📂 Folder Structure

```text
meal-master/
├── public/                 # Favicons and static assets
├── src/                    
│   ├── App.css             # Component scope style rules and UI variables
│   ├── App.jsx             # Core rendering, API logic, and Hooks 
│   ├── index.css           # Global foundational resets
│   └── main.jsx            # React root injection point
├── package.json            # Configuration and project scripts
├── vite.config.js          # Build configuration settings
└── README.md               # Project documentation
```

---