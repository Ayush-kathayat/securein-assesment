# NVD CVE Tracker

## Overview

The **NVD CVE Tracker** is a web application that allows users to fetch and view CVE (Common Vulnerabilities and Exposures) data from the NVD (National Vulnerability Database). The project consists of a **backend API** built with **Node.js and Express** and a **frontend** built using **React with Vite**.

---

## Backend

The backend is responsible for fetching CVE data from the NVD API, storing it in a local database, and serving it via RESTful API endpoints.

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Axios (for API requests)
- Node-cron (for scheduled data fetching)

### API Endpoints

#### 1. **Fetch CVE List**

- **Endpoint:** `GET /api/cves`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `sortField` (default: "published")
  - `sortOrder` (default: "asc")
- **Response:** Returns paginated CVE data.

#### 2. **Fetch CVE by ID**

- **Endpoint:** `GET /api/cves/:cveId`
- **Response:** Returns detailed information about a specific CVE.

#### 3. **Fetch CVEs by Year**

- **Endpoint:** `GET /api/cves/year/:year`
- **Response:** Returns a list of CVEs published in the given year.

#### 4. **Fetch CVEs by CVSS Score**

- **Endpoint:** `GET /api/cves/score/:score`
- **Response:** Returns a list of CVEs with a specified CVSS base score or higher.

---

## Database Schema

- CVEs are stored in MongoDB with fields such as `cveId`, `published`, `lastModified`, `description`, `metrics`, `weaknesses`, and `configurations`.

---

## Automated Data Fetching (Cron Job)

The backend includes a **Node-cron** job that fetches new CVE data from the NVD API daily at midnight and updates the database. This ensures that the database remains up to date with the latest vulnerability information.

For starting the cron job you will have to run the below cmd 
```sh
npm run sync:cve
```

It will fetch all the cve data from the NVD API and store it in the database.if the cve data is same and not updated then it will not store the data in the database.


## ✅ Screenshot of the Cron Job

![Cron Job Execution](https://i.postimg.cc/rsY5vHJZ/securein-3.jpg)
![Cron Job Execution](https://i.postimg.cc/3rLj4yTj/securein-4.jpg)

---

## Frontend

The frontend is built using **React (Vite)** and provides a user-friendly interface for browsing and searching CVEs.

### Technologies Used

- React.js (Vite)
- React Router
- Fetch API / Axios
- Inline CSS for styling

### Features

#### 1. **CVE List Page (`/cves/list`)**

- Displays CVEs in a paginated table.
- Allows sorting by published date and last modified date.
- Includes a "Results Per Page" selection (10, 50, 100) with a scrollable table.
- Clicking on a CVE ID navigates to the **CVE Details Page**.

## ✅ "Screenshot of the CVE List Page"
![CVE List Page](https://i.postimg.cc/fRPbnNYh/securein-1.png)

#### 2. **CVE Details Page (`/cves/:cveId`)**

- Displays detailed information about a CVE, including:
  - Description
  - CVSS Metrics (Severity, Score, Vector String, Exploitability & Impact Score)
  - CPE (Common Platform Enumeration) information
- Fetches data dynamically based on the selected CVE ID.

## ✅ "Screenshot of the CVE Detail Page"
![CVE Details Page](https://i.postimg.cc/GtbLJhnv/securein-2.png)

---

## Pagination & Sorting

- Server-side pagination ensures efficient data handling.
- Sorting is available for published and last modified dates.

---

## Error Handling

- Proper error messages are displayed when API calls fail.
- Loading indicators are used while fetching data.

---

## How to Run the Project

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/nvd-cve-tracker.git
   cd nvd-cve-tracker/backend
    ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:
      ```env
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/nvd_cve_tracker
      ```
4. Run the backend server:
    ```sh
    npm start
    ```
5. The backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```sh
   cd nvd-cve-tracker/frontend
   ```
2. Install dependencies:
   ```sh
    npm install
    ```
3. Run the frontend server:
    ```sh
    npm run dev
    ```
4. The frontend should now be running on `http://localhost:3000`.

---

## Conclusion

The **NVD CVE Tracker** project provides a simple and efficient way to fetch and view CVE data from the NVD. The backend API fetches data from the NVD API and stores it in a MongoDB database, while the frontend provides a user-friendly interface for browsing and searching CVEs. The project demonstrates the use of Node.js, Express, MongoDB, React, and Vite to build a full-stack web application.

---

## For any queries, contact:

- **Ayush Kathayat**
- **kathayatayush789@gmail.com**