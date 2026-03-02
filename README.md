# 🏥 Serverless Patient Registration System on AWS

A fully serverless web application for managing hospital patient registrations.
This project demonstrates building a scalable and cost-efficient healthcare registration system using AWS managed services.

---

## 🚀 Project Overview

The Serverless Patient Registration System enables hospitals to:

* Register new patients
* View all patient records
* Search patients by ID
* Update patient details
* Host the frontend globally with low latency

The application follows a modern serverless architecture eliminating the need for server management.

---

## 🧱 Architecture

**Frontend**

* Static website hosted on Amazon S3
* Distributed via Amazon CloudFront

**Backend**

* Amazon API Gateway (REST API)
* AWS Lambda (Python)
* Amazon DynamoDB (NoSQL database)

**Security & Networking**

* AWS WAF
* AWS Certificate Manager (ACM)
* Amazon Route 53

---

## 🔄 Application Flow

1. User accesses the web application via CloudFront
2. Frontend sends API requests to API Gateway
3. API Gateway triggers Lambda function
4. Lambda performs CRUD operations on DynamoDB
5. Response is returned to the frontend

---

## ✨ Features

* Serverless architecture
* Patient CRUD operations
* Responsive Bootstrap UI
* CORS enabled API
* CloudFront global delivery
* Low operational cost

---

## 📁 Project Structure

```
.
├── index.html
├── scripts.js
├── patient_data.py
└── deployment-guide.docx
```

---

## 🗄️ DynamoDB Schema

**Table Name:** `patientTable`

| Attribute | Type                   |
| --------- | ---------------------- |
| patientId | String (Partition Key) |

---

## 🔌 API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | /patient             | Create patient     |
| GET    | /patient             | Get all patients   |
| GET    | /patient/{patientId} | Get single patient |
| PUT    | /patient             | Update patient     |

---

## ⚙️ Setup Notes

Update the API base URL in `scripts.js` before running:

```js
const API_BASE_URL = "YOUR_API_GATEWAY_STAGE_URL";
```

---

## 📈 Future Enhancements

* Add authentication with Amazon Cognito
* Implement DynamoDB pagination
* Add input validation
* Add audit logging
* Add appointment scheduling module

---

## 👨‍💻 Author

Your Name

---

## 📜 License

This project is for educational and demonstration purposes.
