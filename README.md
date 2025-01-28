# User Management Web Application
### A simple web application built using React.js that allows users to view, add, edit, and delete user details from a mock backend API. This project interacts with the JSONPlaceholder API to simulate CRUD operations (Create, Read, Update, Delete).

# Features
### View Users: 
    Displays a list of users with details such as ID, First Name, Last Name, Email, and Department.
### Add Users: 
    Allows adding a new user with the necessary details.
### Edit Users: 
    Allows editing the details of an existing user.
### Delete Users: 
    Allows deleting a user from the list.
### Error Handling: 
    Includes error handling for API failures and form validation.

# Published URL on Render
### Link to the website: https://user-dashboard-gnmc.onrender.com

# Technologies Used:
### React.js: For building the user interface.
### Axios: For handling API requests.
### JSONPlaceholder: A free mock backend API for demonstration.
### AntDesign: For responsive design.
# Setup and Installation
    Prerequisites
    Node.js and npm installed on your machine.
    
## Steps to Run Locally:
### Clone the repository:
    git clone https://github.com/yourusername/user-management-app.git
    go to the Project Directory
    
### Install dependencies:
    npm install
    Run the application:

### Start the Application:
    npm run dev
    The application will be accessible at http://localhost:5173.

# API Details
## This app interacts with the JSONPlaceholder API for simulating backend interactions. Below are the endpoints used:

    GET /users: Fetches all user details.
    POST /users: Adds a new user.
    PUT /users/{id}: Updates an existing user.
    DELETE /users/{id}: Deletes a user

# Dynamic Functionalities:
### View Users
    Displays a list of users with the following details: ID, Name, Email, and Department.
### Add User
    A form that allows the user to input new user details. Once submitted, the user is added to the list.
### Edit User
    Clicking "Edit" on a user loads their current details in the form, allowing modifications. Changes are sent via a PUT request to update the user.
### Delete User
    Clicking "Delete" on a user removes them from the list by sending a DELETE request.
### Error Handling
    If any API request fails (due to network issues, server errors, etc.), an error message will be displayed.

# Future Improvements:
#### Add infinite scrolling to handle large user lists.
#### Integrate a real backend for actual data storage.
#### Improve form validation.
#### Enhance UI with animations or transitions.

# Challenges and Way Forward:
During development, I faced challenges in simulating a real backend experience with JSONPlaceholder, but it was an excellent opportunity to practice handling CRUD operations with mock data. With more time, I would implement additional features like infinite scrolling and integrate with a real backend.
