# Buyora: E-Commerce Platform 

This project is the foundational frontend for "Buyora," an online marketplace. It serves as the first phase of a progressive full-stack web development project, built purely with HTML, CSS, and JavaScript.

## Concept

The goal of this phase is to build a visually appealing, responsive, and interactive client-side of an e-commerce platform. All data (products, cart) is currently managed in the browser, setting the stage for future backend integration.

## Features Implemented (HTML/CSS/JS Version)

- Multi-Page Navigation: A complete static site structure with 6 distinct pages:
	- Home (with dynamic slider)
	- Products 
	- Product Detail
	- Shopping Cart
	- Login
	- Sign Up

- Dynamic Product Details: Clicking any product passes its ID via a URL parameter (?id=...). JavaScript on the detail page reads this ID and dynamically loads the correct product information from a local "database" (a JS array).

- Persistent Shopping Cart: The shopping cart is fully functional and uses localStorage to persist items even after the browser is closed.
	- Add items from any product grid or detail page.
	- View all items in the cart.
	- Update item quantities.
	- Remove items from the cart.
	- Total price is calculated automatically (with no shipping fees).

- Modern UI/UX:
	- A clean, responsive design that works on desktop and mobile.
	- Non-blocking "toast" notifications for adding items to the cart.
	- Dynamic homepage hero slider.

## Future Backend Integration Plan

This frontend is the blueprint for the next phases of the project:

### Node.js + MySQL Backend

1. Create a REST API with Node.js.
2. Replace the productsData array in `script.js` with a proper products table in a MySQL database.
3. Implement user authentication (login/signup) with JWT (JSON Web Tokens).
4. Move the cart from localStorage to a database, linking it to a userId.

### React.js Frontend

1. Rebuild this entire frontend as a single-page application (SPA) using React.
2. Use React Router for navigation.
3. Manage global state (like cart and user) with Context or Zustand.
4. Fetch all product and user data by making API calls to the new Node.js backend.

---

This repository contains the static frontend files for the project:

- `index.html` — Home page 
- `products.html` — Products listing
- `product-detail.html` — Product details (loads product via ?id=...)
- `cart.html` — Shopping cart
- `login.html`, `signup.html` — Authentication pages (UI only)
- `style.css` — Styles
- `script.js` — Product data, cart logic, and page scripts

## How to use locally

1. Open `index.html` in a browser (double-click or use a local static server).
2. Browse products, view details by clicking a product, and add items to the cart.
3. The cart persists between sessions using `localStorage`.

For a more realistic development experience, run a simple static server (optional):

```
# On Windows (PowerShell), in the project root you can run:
npx http-server -c-1
# then open http://localhost:8080
```

## Notes

- This is a client-side prototype. No server, database, or real authentication is implemented yet.
- The design and structure are intentionally simple to make the future backend integration clear.

---

Prepared as the initial frontend layer of the Buyora project. Future work will migrate data and state to a backend and reimplement the client as a React SPA.

