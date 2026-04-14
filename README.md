# Multi-Step Onboarding Form

## Overview

This project is a multi-step onboarding form built using React. It collects company information across three steps with validation, file uploads, and persistent state.

---

## Features

- Multi-step form (Step 1, Step 2, Step 3)
- State management using Redux Toolkit
- Data persistence using Redux Persist
- Schema validation using Zod
- File upload with preview support
- File persistence using IndexedDB
- Dynamic dropdowns (Country → State)
- Final submission screen displaying collected data

---

## Architecture & Approach

### State Management

- Used Redux Toolkit to manage form data across steps
- Each step updates only its relevant part of the state
- `currentStep` controls navigation

### Persistence

- Used Redux Persist with localStorage to retain form data on refresh

### Validation

- Used Zod schemas for step-wise validation
- Integrated with react-hook-form using `zodResolver`

### File Handling

- Files are stored in IndexedDB (not Redux)
- Only metadata (id, name, type) is stored in Redux
- On reload, file is retrieved using id and preview is recreated

### Dynamic Dropdown

- Country and State are loaded from local JSON files
- State options are filtered based on selected country

---

## Folder Structure

src/
│── components/
│ ├── steps/
│ ├── ui/
│── redux/
│── schemas/
│── mocks/

---

## Notes

- No backend API was provided, so a final review screen is used to display submitted data
- After submission, Redux state is cleared to reset the form
- If the page is refreshed after submission, user is redirected to the start

---

## 🛠 Tech Stack

- React + TypeScript
- Redux Toolkit
- React Hook Form
- Zod
- IndexedDB (via idb)
- Tailwind CSS

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

## 💬 Challenges Faced

- Handling file persistence using IndexedDB
- Managing Redux state updates without overwriting data
- Ensuring consistent data flow across steps

---

## 📌 Future Improvements

- Add backend API integration
- Improve UI with animations
- Add review step before submission
