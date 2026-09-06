# 🧠 ReviseQueue

> **Smart revision. Stronger you.**

ReviseQueue is a lightweight **revision queue web app** built with React and Tailwind CSS.

It helps you maintain a list of questions/topics that need revision and organize them based on their position in the queue.

The idea is simple:

**Add → Revise → Move → Repeat.**

---

## ✨ Features

- ➕ Add questions to the revision queue
- ✏️ Edit questions directly
- 🗑️ Delete questions
- ✅ Mark questions as revised
- ↕️ Move questions to any position in the queue
- 💾 Persist questions using `localStorage`
- 🚫 Maximum queue size of 15 questions
- 🎨 Clean and responsive UI
- ⚡ Fast and lightweight React application

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **Context API**
- **localStorage**

---

## 📸 How It Works

Each question has a position in the revision queue.

For example:

```text
1. CF-2259C
2. LC-115
3. ATC-473_C
4. Merge Intervals
5. DP - Knapsack
```

You can move any question to a different position whenever required.

Once a question has been revised, mark it as revised and continue with the queue.

---

## 🌐 Live Demo

[🔗 Live Demo](https://jmkdevhub.github.io/RevQueue/)

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/JMKdevhub/RevQueue.git
```

### Navigate to the project

```bash
cd RevQueue
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

---

## 👨‍💻 Author

**Devbrat Roy**

Built with ❤️ using React.