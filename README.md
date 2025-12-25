# 📄 PDF JSON Task

A **Vite + React + TypeScript** application that demonstrates an end-to-end flow of converting **JSON data into an editable UI and generating a PDF with a large sidebar-style PDF viewer**.

---

## 🎯 Objective

- Load JSON data
- Store data in `localStorage`
- Display and edit profile details
- Generate a PDF from edited data
- Preview the PDF in a **large viewer (50% screen width)**

---

## 🚀 Features

- JSON → LocalStorage → UI flow
- Editable fields (name, role, experience, skills)
- Dynamic PDF generation
- Large sidebar PDF viewer (50% of screen)
- Full-height PDF preview
- No backend dependency

---

## 🎥 Demo Video

👉 **[Click here to watch the demo video](https://github.com/user-attachments/assets/685fed17-0946-4aaa-b95d-4ccb0b18b9a3)**

> Note: GitHub does not render video previews when wrapped in markdown links.  
> The demo is provided as a clickable link.

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- jsPDF
- HTML iframe (PDF preview)
- localStorage

---

## 📂 Application Flow

1. JSON data is loaded on application start
2. Data is stored in `localStorage`
3. React reads data into typed state
4. User edits profile information
5. Updated data is saved back to `localStorage`
6. PDF is generated dynamically
7. PDF is displayed in a large sidebar viewer

---

## ▶️ How to Run the Project

```bash
npm install
npm run dev
