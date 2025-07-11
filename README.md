# 🎬 CineVerse

![Vite](https://img.shields.io/badge/vite-%5E7.0-blue)
![React](https://img.shields.io/badge/react-19-blue)
![Typecript](https://img.shields.io/badge/typescript-5.x-blue)
![License](https://img.shields.io/github/license/arnoldagaba/CineVerse)

> Cineverse is a beautifully designed movie discovery app built with Vite, React, and Typescript.
> It leverages TMDB API to let you explore popular, top-rated, upcoming movies, search titles, see detailedactor profiles, and save your favorites - all with a stunning dark/light theme.

---

## 🚀 Features

✅ Browse popular, top-rated, and upcoming movies  
✅ Detailed movie pages with trailers & cast  
✅ Actor profiles with known movies  
✅ Search movies with debounce & dynamic grid  
✅ Add/remove favorites (persisted in localStorage)  
✅ Responsive design + dark mode toggle  
✅ SEO optimized with meta tags & social previews  
✅ Smooth page transitions (framer-motion)  
✅ Trailer modal overlays for immersive experience

---

## ⚙ Tech Stack

- 🚀 [Vite](https://vitejs.dev/) + React 18 + TypeScript
- 💅 Tailwind CSS (dark mode & responsive)
- 🔥 React Query (TanStack Query v5) for data fetching & caching
- 🎥 TMDB API for movies, cast, and trailers
- ✨ Framer Motion for animations
- 🧭 React Router for routing
- ⚡ ESLint + Prettier for code quality
- 🌐 React Helmet Async for SEO

---

## 📸 Screenshots

> (Add screenshots here — e.g. home, details, dark mode. Use relative paths or hosted images.)

---

## 🚀 Getting Started

### 🛠 Install dependencies

```bash
pnpm install
```

## ⚙ Setup environment variables

Create a .env file in the root with your TMDB API key:

```bash
VITE_TMDB_API_KEY=your_tmdb_key_here
```

## 🚀 Run locally

```bash
pnpm dev
```

Visit: <http://localhost:5173>

## 🏗 Build for production

```bash
pnpm build
```

Then preview

```bash
pnpm preview
```

## 🌐 Deployment

Optimized for platforms like Vercel or Netlify:

```bash
pnpm install -g vercel
vercel
```

OR

```bash
pnpm install -g netlify-cli
netlify deploy
```

## ❤️ Credits

- 🎬 Data provided by The Movie Database (TMDB).
- This product uses the TMDB API but is not endorsed or certified by TMDB.

## 📄 License

MIT

## 🚀 Author

Made with ❤️ by [Arnold Agaba](https://github.com/arnoldagaba)
