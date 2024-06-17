# Expanse Tracker Pro

Expanse Tracker Pro is a comprehensive backend server application designed to manage and secure individual user transactions. Developed using Node.js and Express.js, this project leverages various features and technologies to provide a robust and secure platform for expense tracking.

## Live Demo

Check out the Server application [expense-tracker-pro-server](https://expense-tracker-pro-server.onrender.com/)

## Features

1. **User Authentication and Authorization**
   - **Middleware Implementation**: Auth middleware ensures that each user is authenticated before accessing the system.
   - **JWT Token**: JSON Web Tokens (JWT) are used to secure passwords and authenticate users efficiently.

2. **Password Management**
   - **Secure Password Handling**: Passwords are encrypted using industry-standard practices.
   - **OTP-Based Password Reset**: When a user forgets their password, an OTP-based reset mechanism is provided.
   - **Email Integration**: The Mailtrap API, integrated via the Nodemailer package, sends reset password codes to users' email addresses.

## Technology Stack

1. **Backend Framework**: 
   - **Node.js**: For a scalable and high-performance server-side environment.
   - **Express.js**: To facilitate rapid development and efficient handling of server-side logic.

2. **Database**:
   - **MongoDB**: Chosen for its flexibility and scalability in handling large datasets.

3. **Deployment**:
   - **Render**: Used for hosting the backend server, ensuring high availability and performance.

## Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   
   ```bash
   git clone https://github.com/SarthakYelne/Expense_Tracker_Pro
   cd expense-tracker-pro
   ```
   
2. **Set up the backend**

    ```bash
    npm install
    ```

3. **Start The Server**

   ```bash
   npm start
   ```

## Contributing

Feel free to contribute to this project by opening issues and submitting pull requests. Please follow the project's code of conduct.

---

Feel free to reach out if you have any questions or need further assistance.

Happy Coding! 
