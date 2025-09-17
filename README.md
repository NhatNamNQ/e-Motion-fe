# e-Motion Frontend

This is the frontend for the e-Motion project, built with React and Vite. It provides the user interface and interacts with the backend services.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.x or later is recommended)
- [npm](https://www.npmjs.com/) (which comes with Node.js)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development purposes.

### 1. Clone the Repository

If you haven't already, clone the project to your local machine.

```bash
git clone <your-repository-url>
cd e-Motion-fe
```

### 2. Install Dependencies

This command will install all the necessary packages required for the project.

```bash
npm install
```

### 3. Run the Development Server

To start the local development server, run the following command. The server supports hot-reloading, so changes in the code will be reflected in the browser instantly.

```bash
npm run dev
```

By default, the application will be available at **http://localhost:5173**.

## Available Scripts

This project comes with several useful scripts defined in `package.json`:

- `npm run dev`: Starts the development server.
- `npm run build`: Bundles the app into static files for production. The output is in the `dist/` directory.
- `npm run preview`: Starts a local server to preview the production build.
- `npm run lint`: Lints the codebase to find and fix stylistic and syntax errors.
- `npm run format`: Formats all code using Prettier.
