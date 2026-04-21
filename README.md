# 📝 Product Feedback App
📌 Project Description & Purpose
This project is a feedback app that allows users to offer suggestions and report bugs

🚀 Live Site
Here's the link to view the live app: https://product-feedback-app-tee.netlify.app/

# 🖼️ Screenshots:
Screenshots of the Product Feedback App
<img width="795" height="604" alt="Screenshot 2026-04-18 at 8 07 09 PM" src="https://github.com/user-attachments/assets/b5afd83a-87a7-4cbb-8076-6acdf2060dbd" />


<img width="795" height="719" alt="Screenshot 2026-04-18 at 8 07 37 PM" src="https://github.com/user-attachments/assets/3a46c70f-e80d-41e0-b344-09f5334e2bb0" />


# ✨ Features
This is what you can do on the app:
Users can view and submit suggestions about the company's new product. After completing the suggestion form users can see their suggestions and other suggestions on the home page.

# 🛠️ Tech Stack
Frontend

- Languages: HTML, CSS, JavaScript
- Framework: React
- Deployment: Netlify

Server/API

- Languages: Node.js
- Framework: Express
- Deployment: Render
- Dev Tools: Postman for API Testing

Database

- Languages: PostgreSQL
- Deployment: Neon

 ## The Tech Stack

These are all the technologies  used to build your full-stack application: 

| Component | Language | Framework | Deployment | Dev Tools |
|-----------|------------|----------------|------------|-------|
| Frontend  | HTML, CSS, JavaScript | React         | Netlify   |      |
| Server/API | Node.js     | Express       | Render    | Postman for API testing |
| Database  | PostgreSQL |               | Neon    |   


  
# API Documentation
These are the API endpoints I built:
- /api/get-all-suggestions
- api/get-suggestions-by-category/:category
- /api/add-one-suggestion

 Here's the link to the full API documentation: https://github.com/Tporterinbox/product-feedback-app/blob/main/api-documentation.md

# 🗄️ Database Schema
Here’s the SQL I used to create my tables:
```CREATE TABLE suggestions (
 
id SERIAL PRIMARY KEY,
feedback_title VARCHAR NOT NULL,
category VARCHAR NOT NULL,
feedback_detail VARCHAR NOT NULL
);


INSERT INTO suggestions (feedback_title, category,feedback_detail)

VALUES
('Headline title', 'Ui', 'allow users to skip suggestions'),
('title', 'Ux', 'users should be able to add email'),
('description', 'Bug', 'change the color from purple to blue');
```

# 💭 Reflections
What I learned: How to trouble shoot backend and frontend connectivity.

What I'm proud of: The completion of this project and deployment to the internet

What challenged me: Learning all the connectivity of the backend and front end.

Future ideas for how I'd continue building this project: Add email fields on the form so that users can be contacted in the future with surveys on their user experiences.

# 🙌 Credits & Shoutouts
Greatful for all of the developers that taught me how to code. 
__________________________________________________________________________________________



