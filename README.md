# Quickstock React - Frontend

This repository contains the frontend application for Quickstock, a comprehensive inventory management system. Built with React, it provides a user-friendly interface for managing various aspects of stock, sales, purchases, and user roles.

---

## Features

* **Admin Role:** Primarily responsible for **User Management**. This includes maknig user admin.
* **User Role:** Access to core inventory management functionalities, including **Category Management, Product Management, Purchase Management, Sales Tracking, Stock Overview, and Supplier Management**.

---

## Technologies

This project leverages a modern React ecosystem to deliver a robust and responsive user experience:

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool for modern web projects.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **TanStack Query (React Query):** For efficient data fetching, caching, and state management.
* **Axios:** A promise-based HTTP client for making API requests.
* **Formik & Yup:** For form management and validation.
* **React Router DOM:** For declarative routing within the application.
* **Lucide React:** A collection of beautiful, pixel-perfect icons.
* **React Select:** A flexible and customizable select input component.
* **React Toastify:** For easy-to-use notifications.

---

## API Integration

The frontend integrates with a separate backend API to manage all data operations. The base URL for the API is configured via an environment variable.

---

## Future Works

We are continuously working to enhance Quickstock with new features and improvements:

* **Chat between suppliers within the app:** Facilitate direct communication with suppliers.
* **Online payment integration:** Enable seamless online payment processing for sales and purchases.
* **Advanced notification system:** Implement comprehensive notifications for stock alerts, order updates, and more.
* **Advanced analytics:** Provide deeper insights into sales trends, inventory performance, and user activity.
* **UI Enhancement:** Ongoing improvements to the user interface for better aesthetics and usability.

---

## Challenges

During development, we addressed several key challenges:

* **State Management:** Effectively managing complex application state across various components and features, particularly with data fetching and updates.
* **Responsive Design:** Ensuring the application is fully responsive and provides an optimal experience across different devices and screen sizes.
* **API Integration:** Handling various API endpoints, authentication (JWT), and error handling for seamless communication with the backend.

---

## Environmental Variables

To run this project, you need to set up the following environment variable in a `.env` file at the root of the frontend directory:

```dotenv
VITE_API_BASE_URL="http://localhost:5050/api"
```

## Runnign the Application
```bash
npm start
```

---

## Author
Rahul Chaudhari

---

## Appendix

