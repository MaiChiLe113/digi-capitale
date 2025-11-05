A software application for managing services for D' Capitale residental area.

The project includes:
1. backend (using php)
  /api - main api directory logic
    /config 
     database (api call connect to the database)
    index.php - main entry point, router for api
    .htaccess - apache server - rewrite URL of Form sent
  /models - database tables use for CRUD (in php)
  /controllers - Logic handler
  
2. database
  sql file

3. frontend (using react)
 /components - For reusable UI components (Buttons, Header, Footer, BackButton, NavBar, Card, Form(Input, Title, Send Butto, DeleteButton, EditButton))
 /pages - (Home, LogIn, SignUp,..)
 /services (Handle API call and external communications)
 /utils

Example flow for a login feature:

Page (pages/Login.js) - Displays the login form
Component (components/Form/Input.js) - Reusable input fields
Utils (utils/validation.js) - Validates email/password format
Service (services/authService.js) - Sends login request to PHP backend
Backend processes and returns response
Page handles the response and redirects user