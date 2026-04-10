# MealMaster

A recipe finder app built with React. Search for meals, save your favorites, and browse recipes — all powered by TheMealDB API.

## What it does

You type a meal name, it fetches recipes from the API and shows them in a nice card layout. You can click on any card to see the full recipe with instructions. Pretty straightforward.

## Features

- Search meals by name (debounced so it doesn't hit the API on every keystroke)
- Filter results by category
- Favorite/unfavorite meals — saved in localStorage so they persist on refresh
- Dark mode toggle (also persisted)
- Infinite scroll — loads more cards as you scroll down
- Skeleton loading placeholders while data is being fetched
- Friendly error and empty states
- Fully responsive

## Tech Stack

- React 19
- Vite
- Vanilla CSS (no frameworks, just CSS variables + glassmorphism)
- Fetch API
- TheMealDB API (free, no key needed)


## Project Structure

```
src/
├── components/     # Navbar, Card, Loader, Pagination
├── hooks/          # useLocalStorage custom hook
├── utils/          # API calls, debounce helper
├── App.jsx         # Main app logic
└── index.css       # All styles
```

## Notes

- No backend needed — everything runs client-side
- Uses [TheMealDB](https://www.themealdb.com/api.php) free API
- localStorage is used for favorites and theme preference

Built as part of a frontend development project by Arpit Singh Pawar.