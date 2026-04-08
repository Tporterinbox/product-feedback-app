# 📘 Product Feedback API Documentation

Base URL: `https://REPLACE-THIS-WITH-YOUR-DEPLOYED-URL.onrender.com`

## Overview

| Resource         | Method | Endpoint                      | Description                              |
|------------------|--------|-------------------------------|------------------------------------------|
| `suggestions`    | GET    | /get-all-suggestions          | Retrieves all suggestions from the database.            |
| `suggestions`    | GET    | /get-suggestions-by-category  | Retrieves all suggestion by category          |
| `suggestions`    | POST   | /add-one-suggestion           | Adds a new suggestion to the database           |

---

### 🔹 GET `/get-all-suggestions`

**Description:** Retrieves all users in the system ordered by id.



**Example Response:**
[
  {
    "id": 1,
    "feedback_title": "Headline title",
    "category": "Ui",
    "feedback_detail": allow users to skip suggestions"
  },
  {
    "id": 1,
    "feedback_title": "title",
    "category": "Ux",
    "feedback_detail": "users should be able to add email"
  },
]

Write the data returned by this endpoint. ----> an array of objects is returned.
Think about its data type (String, Object, Array of Objects, etc.)
Use spaces/indents to format the data if it is an array or object. 
```

---

### 🔹 GET `/get-suggestions-by-category/:category`

**Description:** Retrieves all suggestion by category

**Example Response:**

[
  {
    "id": 1,
    "category": "Ui",
  },
  {
    "id": 1,
    "category": "Ux",
  },
]
```
Write the data returned by this endpoint. ----> an array of objects is returned.
Think about its data type (String, Object, Array of Objects, etc.)
Use spaces/indents to format the data if it is an array or object. 
```

---

### 🔹 POST `/add-one-suggestion`

**Description:**  Adds a new suggestion to the database 

**Example Request Body:**
{
  "feedback_title": "Headline title",
  "category": "Bug",
  "feedback_detail": "change the color from purple to blue"
}
```
Write the data required in the request body. -----> object
Think about its data type (String, Object, Array of Objects, etc.)
Use spaces/indents to format the data if it is an array or object. 
```

**Example Response:**
Success! Suggestion has been added.

```
Write the data returned by this endpoint. ----> Object is returned 
Think about its data type (String, Object, Array of Objects, etc.)
Use spaces/indents to format the data if it is an array or object. 
```
---

