This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).

## Getting Started

The best way to launch the application is using the [Visual Studio Code Tasks](https://code.visualstudio.com/docs/editor/tasks). In the `vscode/tasks.json` file you can find all the tasks configured for this project.

To launch a task click on the menu `Terminal > Run Task` and select the task to launch (or press `Ctrl+Shift+P` and choose the `Tasks:Run Task` command).

To run the project:

1. Install dependencies using `Install dependencies` task.
2. Start development app using `Start App` task.

## File Structure
```
.
├── .vscode/ - Visual Studio Code configuration files
├── backend/ - Backend App
│ ├── models/ - Handles Mongoose Models
│ ├── routes/ - Handles API calls for routes
│ ├── scripts/ - scripts to publish
│ └── server.js - Configures Port and HTTP Server and Handles Middleware
├── frontend/ - Frontend App
│ ├── public/ - public static files
│ ├── scripts/ - scripts to publish
│ ├── src/ - react app folder
│ │ ├── components - React components for each page
│ │ ├── App.js - React routing
│ └─└── index.js - React root component
└── README.md
```

### Frontend

To start the backend application manually:
  1. Open a terminal and navigate to the `frontend` folder path.
  2. Use `yarn install` or `npm install` to install backend dependencies.
  3. Use `npm start` or `yarn start` to start frontend app in development.

### Backend

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `yarn install` or `npm install` to install backend dependencies.
  3. Use `node server` to start backend app in development.

## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/
- Express - https://expressjs.com/
- Bootstrap CSS - https://getbootstrap.com/
