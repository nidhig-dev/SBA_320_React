# 📰 React + Vite News Application

A dynamic and responsive news website built using **React**, powered by the **NewsAPI**. This application features multiple pages displaying top headlines, business news, sports news, and allows keyword-based news searches. Each page includes a **carousel-style navigation** for browsing news articles, and a **“Read More”** feature for viewing full articles.

---

## 📁 Features

* **4 Main Pages**:

  * 🏠 **Home** – Displays top trending headlines.
  * 💼 **Business** – Displays all the latest business-related news.
  * 🏅 **Sports** – Shows all the lates sports news.
  * 🔍 **Search** – Allows users to search news articles by keyword.

* **Navigation**:

  * Each page includes **Prev** and **Next** buttons for navigating through a carousel of news articles.
  * A **Read More** link opens the full article in a new tab or detailed page.

* **Routing**:

  * Built using `react-router-dom`, each page has its route.
  * A **Page Not Found** page is shown when a non-existent route is accessed.

* **API Integration**:

  * Uses the [NewsAPI](https://newsapi.org/) to fetch real-time news data.
  * API key is managed via environment variables (`.env`).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm create vite@latest . 
npm i react-router-dom
npm i axios
npm i dotenv

```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add API key:

```env
VITE_API_KEY=api_key
```

### 4. Run the Application

```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🧩 Technologies Used

| Tech               | Purpose                                      |
| ------------------ | -------------------------------------------- |
| React              | UI Library                                   |
| Vite               | Fast bundler and dev environment             |
| Axios              | HTTP client for fetching API data            |
| react-router-dom   | Routing for multi-page SPA                   |
| dotenv             | Manage environment variables securely        |
| useState/useEffect | React hooks for state and side effects       |
| useRef             | To handle input references (for Search page) |
| Custom CSS         | Styling and responsiveness                   |

---

## 🔧 Project Structure

```bash
src/
├── components/
│   └── NavBar.jsx│   
├── pages/
│   ├── Business.jsx
│   ├── Home.jsx
│   ├── Missing.jsx
│   ├── Search.jsx
│   └── Sports.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx

```
---

## ✅ Project Requirements Checklist

* [✅] React app with real-world use-case.
* [✅] Uses external API (NewsAPI).
* [✅] Displays fetched data in UI.
* [✅] Uses `useState` and `useEffect`.
* [✅] Includes at least 3 distinct routes.
* [✅] Well-documented README.
* [✅] 12–15 meaningful git commits.
* [✅] Clean, responsive CSS.

---

## 💡 Example API Call

```js
const response = await axios.get(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
```

---

## 🛠 Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Runs the dev server           |

---

## 🧪 Testing the 404 Page

Visit a non-existent route like:

```
http://localhost:5173/some-random-page
```

You should see the custom "Page Not Found" screen.

---

## 🙌 Acknowledgements

* [NewsAPI](https://newsapi.org/)
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)

---
