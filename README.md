# TaskMaster

## Description

Welcome to **TaskMaster**, a powerful and user-friendly web application designed to help you manage your tasks efficiently. With TaskMaster, you can create an account, add your todos, update them, and keep track of your productivity. Whether you're managing personal tasks or work-related projects, TaskMaster provides a seamless experience to help you stay organized and focused.

### Key Features:

- User authentication: Create an account and securely log in to your personalized dashboard.

- Create, update, and delete todos: Easily manage your tasks with a simple and intuitive interface.

- Responsive design: Access your tasks from any device, ensuring you stay productive on the go.

## Technologies Used

- **Frontend**: React.js

- **Backend**: Express.js

- **Runtime**: Node.js

- **Database**: MongoDB

- **Authentication**: JSON Web Token (JWT)

- **Input Validation**: Zod

- **Password Encryption**: bcryptjs

## Setup Instructions

To set up the TaskMaster project on your local machine, follow these steps:

1.  **Clone the Git Repository**:

    ```bash

    git clone https://github.com/yourusername/taskmaster.git
    cd taskmaster

    ```

2.  **Install dependencies**:

        # For the frontend
        	cd frontend
        	npm install

        # For the backend
        	cd backend
        	npm install

3.  **Setup ENV variables**:

        # For frontend
        cd frontend
        echo. > .env
        // Add env variable
        VITE_BACKEND_URL = 'http://localhost:3000/api/v1'

        #For backend
        cd backend
        echo. > .env
        DATABASE_URL="your mongodb connection url"
        JWT_SECRET="your jwt secret"
        PORT=3000

4.  **Start backend server**:

        cd backend
        node Index.js

5.  **Start frontend server**:

        cd frontend
        npm run dev

**All Done! Your project is ready to run locally**
