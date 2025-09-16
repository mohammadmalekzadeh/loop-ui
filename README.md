# LOOP Startup

**LOOP** is a platform aimed at reducing food waste in Iran, connecting restaurants, stores, and end-users to sell surplus or near-expiry food at discounted prices. Inspired by platforms like Too Good To Go, LOOP helps promote sustainability and reduce unnecessary waste.

---

## 📌 Technologies Used

* **Frontend:** React.js, TailwindCSS
* **Backend:** Python (FastAPI / SQLAlchemy)
* **Database:** PostgreSQL
* **API:** RESTful

---

## 📂 Project Structure

```
loop-startup/
│
├── backend/                # Backend (FastAPI + SQLAlchemy)
│   ├── alembic.ini         # Database migrations
│   ├── main.py             # Entry point
│   ├── requirements.txt
│   ├── app/
│   │   └── v1/
│   │       ├── core/       # Configuration and security
│   │       ├── database/   # DB base, session, init scripts
│   │       ├── deps/       # Dependencies
│   │       ├── models/     # ORM models
│   │       ├── routers/    # API endpoints
│   │       ├── schemas/    # Pydantic schemas
│   │       ├── services/   # Business logic
│   │       └── utils/      # Helper functions
│   └── tests/              # Unit tests
│
├── frontend/                # Frontend (React)
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/fonts/    # Custom fonts
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Pages (Home, Dashboard, About, etc.)
│   │   └── utlis/           # Utility functions
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ✅ Features / Roadmap

* [ ] User authentication (JWT)
* [ ] Seller dashboard
* [ ] Online payment integration
* [ ] Notifications for new requests/orders
* [ ] Mobile app version

---

## 📜 License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

## 📬 Contact
Maintained by **Mohammad Malekzadeh**.  
Questions? Issues? Feature requests? Just open an issue or reach out via GitHub!