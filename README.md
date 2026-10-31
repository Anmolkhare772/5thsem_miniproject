# SyncForge | Real-Time Collaborative Code Editor

**5th Semester Mini Project**  
**Author:** Anmol Khare  
**Repository:** [5thsem_miniproject](https://github.com/Anmolkhare772/5thsem_miniproject)

---

## 📌 Project Overview

**SyncForge** is a web-based real-time collaborative code editor interface built using **React** and **Vite**. It demonstrates client-side collaborative editing fundamentals using an **Operational Transformation (OT)** approach, allowing users to view multi-file project structures, edit code in real time, simulate concurrent collaborator edits (e.g., Rahul and Priya), scrub through edit history, and persist work in browser storage.

---

## ✨ Features

- **Multi-File Project Explorer**: Seamlessly switch between files (`index.js`, `app.js`, `utils.js`, `README.md`).
- **Interactive Code Editor**: Syntax-styled editor area with line numbers and responsive caret tracking.
- **Client-Side Operational Transformation (OT)**: Operation generation and text transformation engine supporting `insert` and `delete` operations.
- **Concurrent Collaborator Simulation**: Simulate incoming edits and operational conflict handling from virtual collaborators (Rahul & Priya).
- **History Scrubbing & Playback**: Operation timeline and step-by-step history replay controls with speed presets.
- **Persistent Local State**: Automatic sync and state preservation using browser `localStorage`.
- **Live Activity Feed**: Real-time log of edits, collaborator operations, and timestamps.

---

## 🛠️ Tech Stack & Requirements

- **Frontend Library**: React 19 (`react`, `react-dom`)
- **Build Tool / Bundler**: Vite 8 with `@vitejs/plugin-react`
- **Languages**: JavaScript (ES Modules), HTML5, CSS3
- **Runtime**: Node.js (version 18+ recommended)
- **Package Manager**: npm (version 9+ recommended)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Anmolkhare772/5thsem_miniproject.git
cd 5thsem_miniproject
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open the local URL displayed in your terminal (usually `http://localhost:5173/` or `http://localhost:5174/`).

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```text
5thsem_miniproject/
├── index.html            # Main HTML document entry point
├── package.json          # Node dependencies and project scripts
├── vite.config.js        # Vite build & plugin configuration
├── requirements.txt      # System and package requirements specification
├── style.css             # Main styling and theme for SyncForge UI
├── README.md             # Project documentation
└── src/
    ├── main.jsx          # React DOM root render
    ├── App.jsx           # Core application UI, state & collaboration logic
    └── logic.js          # Operational Transformation (OT) engine functions
```

---

## 📝 License & Attribution
Academic Mini Project for 5th Semester Computer Science / Engineering. Developed by **Anmol Khare**.
