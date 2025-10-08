![Loop](https://www.lloop.ir/icon/favicon.png)

The **Loop UI** is the frontend application for the [Loop Platform](https://lloop.ir/home), built with **React**, **TypeScript**, and **TailwindCSS**.
It provides a modern, responsive interface for user authentication, vendor dashboards, product management, and more — all powered by the [Loop API](https://github.com/mohammadmalekzadeh/loop-api).

---

## ✨ Features

- ⚛️ Built with **React** + **TypeScript**
- 💨 Styled using **TailwindCSS**
- 🔄 **Axios-based API integration** with Loop backend
- 📱 **Responsive** & **PWA-ready** design
- 🧱 Organized modular folder structure
- 🐳 **Dockerized** for easy development and production
- ⚙️ Configurable via `.env`
- ☁️ **Vercel deployment ready**
- 💾 Local service worker for offline support

---

## 📌 Technologies Used

- **Framework:** React.js
- **Styling:** TailwindCSS
- **Build Tool:** Create React App (CRA)
- **Package Management:** npm
- **Language**: JavaScript / TypeScript

---

## 📂 Project Structure

```bash
loop-ui/
│
├── .env.example             # Example environment configuration
├── Dockerfile.dev           # Dockerfile for development
├── Dockerfile.prod          # Dockerfile for production
├── docker-compose.yml       # Docker Compose setup
├── vercel.json              # Vercel deployment config
├── nginx.conf               # Nginx config for production
│
├── public/                  # Public static files
│   ├── icon/                # App icons & favicons
│   ├── vendors/             # Vendor placeholder images
│   ├── manifest.json        # PWA manifest
│   └── index.html           # App entry HTML
│
├── src/                     # Main application source
│   ├── assets/fonts/        # Custom web fonts
│   ├── components/          # Shared UI and layout components
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page-level components (Home, Login, Dashboard, etc.)
│   ├── services/            # API service modules (Axios)
│   ├── styles/              # CSS & animation styles
│   └── utils/               # Utility functions (user session, number conversion, etc.)
│
├── build/                   # Compiled production build
│
└── README.Docker.md         # Docker usage documentation

```

---

![Loop](public/exp/mockup.jpg)

---

## 🧩 Local Development Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mohammadmalekzadeh/loop-ui.git
cd loop-ui
```

### 2️⃣ Create your environment file
```bash
cp .env.example .env
```
*Edit `.env` and set your API base URL, for example:*

### 3️⃣ Install dependencies
```bash
npm install
```

### 4️⃣ Run the development server or 🐳 Run with Docker
```bash
npm run start
```
OR
```bash
docker compose up -d loop-ui-prod
```
*This uses `loop-ui-dev` and mounts your local files for live reloading.*

**Your app will run on:**
- 👉 http://localhost:3000/

---

## 🧱 Deployment

### Build for Production
```bash
npm run build
```
*The production-ready files will be generated in the `/build` directory.*

### Docker
Use the provided `nginx.conf` for optimized production hosting:
```bash
docker build -f Dockerfile.prod -t loop-ui .
docker run -d -p 80:80 loop-ui
```

---

## 💾 Progressive Web App (PWA)

Loop UI supports offline mode and "install as app" via:
- `manifest.json`
- `serviceWorkerRegistration.ts`
*You can test this by visiting the deployed app on Chrome and clicking Install App.*

---
## 📜 License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

## 📬 Contact
Maintained by **Mohammad Malekzadeh**.  
Questions? Issues? Feature requests? Just open an issue or reach out via GitHub!
