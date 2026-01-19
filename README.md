🛒 React E-Commerce Cart Application

A fully functional **E-commerce web application** built using **React.js and CSS**, featuring dynamic product fetching, cart management, filtering, search, authentication pages, and **persistent state using Local Storage**.

The application uses a **Dummy Products API** to simulate real-world e-commerce functionality.

🔗 Live Demo:
👉 https://shop-circle.netlify.app

---

## 🚀 Features

### 🛍️ Product & Browsing

* Fetches products dynamically from a dummy API
* Popular products section
* Single product details page
* Search results page
* Category-based product display

### 🔍 Search & Filters

* Search products by name/keyword
* Filters based on:

  * Price
  * Category (Men / Women)
  * Rating

### 🛒 Cart Functionality

* Add products to cart
* Remove products from cart
* Cart state management
* Persistent cart data using **Local Storage**

### 💳 Billing / Checkout

* Billing page with selected cart items
* Total price calculation
* Clean checkout UI

### 🔐 Authentication Pages

* Login page
* Authentication flow UI (frontend only)

### 💾 Persistence

* Cart and app state stored in **Local Storage**
* Data remains intact after page refresh

### 📱 Responsive UI

* Built using pure CSS
* Optimized for different screen sizes

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** CSS
* **State Management:** React Context API + Reducer
* **Routing:** React Router
* **API:** Dummy Products API
* **Storage:** Browser Local Storage

---

## 📂 Folder Structure

```
src/
│── asset/
│
│── components/
│   ├── Cart.jsx
│   ├── Footer.jsx
│   ├── Login.jsx
│   ├── Navbar.jsx
│   ├── MostLiked.jsx
│   ├── SearchedProducts.jsx
│   ├── SinglePage.jsx
│   ├── Stars.jsx
│   ├── *.css
│
│── context/
│   ├── Context.js
│   └── State.js
│
│── pages/
│   ├── Authentication.js
│   ├── Home.js
│   └── Search.js
│
│── Reducer/
│   └── Reducerfun.js
│
│── utils/
│   └── API.js
│
│── App.js
│── App.css
│── index.js
│── index.css
│── Product.json
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/thedhirajshah13/stop_go_mart
```


3. **Install dependencies**

```bash
npm install
```

4. **Run the application**

```bash
npm start
```

📍 App runs on:
`http://localhost:3000`

---

## 🌐 API Usage

* Products are fetched from a **Dummy Products API**
* API logic handled inside `utils/API.js`

---

## 🧠 State Management

* **Context API** used for global state
* **Reducer pattern** for predictable state updates
* Cart, filters, and product state handled efficiently

---

## 📌 Key Learnings

* Building scalable React components
* Context API + Reducer for state management
* Implementing cart logic and persistence
* Working with APIs and async data
* Structuring a real-world React project
* Improving UX with filters and search

---

## 🔮 Future Improvements

* Backend integration (Node.js / MongoDB)
* User authentication with JWT
* Payment gateway integration
* Order history
* UI improvements with animations

---

## 👨‍💻 Author

**Dhiraj Shah**
Frontend Developer | React | JavaScript


