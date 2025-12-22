# 🎬 Filmoteka — React Query Movie App

This project is a movie search and browsing application built with **React** and **TanStack Query (React Query)**.  
It demonstrates efficient server state management, pagination, and integration with an external API.

🔗 **Live demo:**  
https://04-filmoteka-valeriia-makushchenko.vercel.app/

---

## 🚀 Project Overview

**Filmoteka** is a front-end application that fetches movie data from the **TMDB (The Movie Database) API**.  
The main goal of this project was to **refactor data fetching logic** using **TanStack Query**, replacing manual state management with a modern server-state solution.

The application allows users to:
- browse movies from the API
- navigate through paginated results
- view dynamically updated content with loading and error states handled by React Query

---

## 🧠 Task Requirements (Assignment)

The project was implemented according to the following requirements:

- Use **TanStack Query** to:
  - store backend responses
  - manage request states (loading, error, success)
- Configure the **QueryClient** at the top level (`src/main.tsx`)
- Use query hooks directly in the `App` component
- Implement **movie pagination** using TMDB API (`page` parameter)
- Handle backend response properties:
  - `results`
  - `total_pages`
- Add pagination UI using **React Paginate**
- Render pagination **only if total pages > 1**

---

## 🛠️ Technologies & Libraries

- **React**
- **TypeScript**
- **TanStack Query (React Query)** — server state management
- **React Paginate** — pagination component
- **TMDB API** — movie data source
- **CSS Modules** — component-scoped styling
- **Vercel** — deployment and hosting

---

## 📄 Pagination Implementation

Pagination is implemented using **React Paginate** with custom styles.

Pagination is rendered **only when more than one page is available**.

```tsx
<ReactPaginate
  pageCount={totalPages}
  pageRangeDisplayed={5}
  marginPagesDisplayed={1}
  onPageChange={({ selected }) => setPage(selected + 1)}
  forcePage={page - 1}
  containerClassName={css.pagination}
  activeClassName={css.active}
  nextLabel="→"
  previousLabel="←"
/>
