# 🍳 Meal Master – Recipe Finder

**Live Demo:** [https://meal-master-recipe-finder-one.vercel.app/](https://meal-master-recipe-finder-one.vercel.app/)

## 🔰 Project Description
Meal Master is a web application that helps users search for recipes using a public API. Users can enter a meal name and get a list of recipes with images and basic details. They can also view full cooking instructions for each recipe.

## 🎯 Objective
The objective of this project is to demonstrate API integration using React and display real-time data on a webpage. It also focuses on dynamic content rendering, component-based state management, and responsive UI design.

## 🌐 API Used
This project uses TheMealDB API:
https://www.themealdb.com/api.php

Main endpoints used:
- Search meals: `https://www.themealdb.com/api/json/v1/1/search.php?s=`
- Lookup meal by ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`

## ✨ Features Implemented
- Search meals using API (`fetch`)
- Display meal data dynamically using React hooks (`useState`)
- Show meal image, name, and category
- View full recipe instructions
- Loading indicators while fetching data
- Fully responsive layout for different screen sizes (mobile, tablet, desktop)

## 🛠️ Technologies Used
- React (Vite)
- JSX / JavaScript (Fetch API)
- CSS (Grid & Flexbox)

## ▶️ How to Run the Project Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/arpitbanna/meal-master-recipe-finder.git
   ```

2. Open the project folder:
   ```bash
   cd meal-master-recipe-finder
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Responsiveness
The layout is designed using responsive CSS Grid (`auto-fit`, `minmax`) and Flexbox containers, which automatically adjust and wrap elegantly for mobile, tablet, and desktop screens. 

## 📅 Status
Completed – API successfully integrated and application restructured natively into React.

## 🔮 Future Improvements
- Add filter and sort options
- Add a shopping list or favorites feature
- Expand UI design themes
