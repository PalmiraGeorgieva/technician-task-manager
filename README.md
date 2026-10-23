# Technicians Task Manager (TTM)

## 1. Project Overview

**Application Name:** Technicians Task Manager (TTM)

**Application Category / Topic:** Task Management System

**Live Demo:** https://technician-task-manager.vercel.app/


<h3 align="center">Tech Stack</h3>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="45" title="React" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="45" title="Vite" alt="Vite" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="45" title="JavaScript" alt="JavaScript" />
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg"  width="45" title="Node.js" alt="Node.js" />
  <img src="https://devicon-website.vercel.app/api/express/original-wordmark.svg?color=%2370B1EC" width="45" color="#70B1EC" title="Express" alt="Express" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="45" title="PostgreSQL" alt="PostgreSQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="45" title="Prisma" alt="Prisma" />
</p>


**Main Purpose:**

Technicians Task Manager is my React project for SoftUni ReactJS
Regular Exam 2026.

Technicians Task Manager is a Single Page Application (SPA) created to organize, assign, and track technicians' work tasks.

The application allows users to create and manage tasks, assign technicians, monitor task progress, and organize daily technical operations. It also supports task comments, enabling registered users to communicate about existing tasks.

## 2. User Access & Permissions

### Guest (Not Authenticated)

Guests can access the public sections of the application:

- Home (`/`)
- Tasks (`/tasks`)
- Task Details (`/tasks/:taskId`)
- Login (`/login`)
- Register (`/register`)

Guests can browse existing tasks and view their details, but cannot create, edit, or delete tasks or submit comments.

The Start button on the Home page redirects guests to Login and authenticated users to the Dashboard.

### Authenticated User

Authenticated users can access
- Home
- Tasks
- Task Details
- Dashboard
- Create Task
- Edit Task (for tasks they own)

Authenticated users can create tasks, assign technicians, update their own tasks, delete their own tasks, and add comments to existing tasks.

Only the task owner can edit or delete that task. Comment deletion is restricted to the comment's author.

## 3. Authentication & Session Handling

### Authentication Flow

The application uses React Context to manage authentication state.

When the application loads, the authentication context checks whether the user has an active session.

Users can register, log in, and log out through the authentication API.

After successful login, the user is redirected to the Home page. The Start button then provides navigation to the Dashboard.

Protected routes prevent unauthenticated users from accessing private functionality.

### Session Persistence

Authentication uses JSON Web Tokens (JWT) stored in HttpOnly cookies.

The frontend includes credentials in authenticated API requests. The authentication context restores the user's session after refreshing the application.

### Logout

The logout functionality ends the authenticated session and updates the application's authentication state.

## 4. Routing Structure

### Route Guards Logic

The application uses React Router and a custom `ProtectedRoute` component.

`ProtectedRoute` checks the authentication state and displays a loading message while the session is being verified.

Unauthenticated users attempting to access protected routes are redirected to `/login`.

### Main Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/tasks` | Tasks | Public |
| `/tasks/:taskId` | Task Details | Public |
| `/login` | Login | Guest |
| `/register` | Register | Guest |
| `/dashboard` | Dashboard | Authenticated |
| `/tasks/create` | Create Task | Authenticated |
| `/tasks/:taskId/edit` | Edit Task | Authenticated task owner |
| `*` | Not Found | Public |

### Nested & Parameterized Routes

The application uses a shared Layout component with nested routes.

Parameterized routes include:

- `/tasks/:taskId` — displays a specific task
- `/tasks/:taskId/edit` — allows the task owner to edit a specific task

React Router hooks such as `useParams` and `useNavigate` are used to manage navigation and route parameters.

## 5. List → Details Flow

### Catalog / List Page

The Tasks page displays task records retrieved from the backend API.

Tasks contain information such as title, description, assigned technician, status, priority, address, and scheduled date.

Task cards also display the number of comments associated with each task.

### Details Page

Users can navigate from the task listing to an individual task's details page.

The application uses the `taskId` URL parameter to identify the selected task.

The details page provides additional information and displays task comments.

Authenticated users can add comments, while comment authors can delete their own comments.

## 6. Data Source & Backend

**Backend Type:** Custom REST API

**Technologies:**

- React and Vite — frontend
- Node.js and Express — backend
- PostgreSQL — relational database
- Prisma ORM — database operations
- JWT and HttpOnly cookies — authentication
- React Context API — shared frontend state

**Hosting:**

- Vercel — React frontend
- Render — Express backend
- Supabase — PostgreSQL database

The frontend communicates with the backend through HTTP requests using the Fetch API.

Task records, user accounts, technician assignments, and comments are stored persistently in PostgreSQL.

**Deployment note:** The Render service may require additional time to respond to the first request after a period of inactivity.

## 7. Data Operations (CRUD)

### Create (POST)

Authenticated users can create new tasks using the Create Task form.

The form collects task information, including title, description, technician assignment, address, status, priority, and date.

The backend associates the new task with the authenticated user.

### Read (GET)

Task data is retrieved from the backend and displayed in the Tasks, Dashboard, and Task Details sections.

The application uses React Context to share task data between components.

### Update (PUT)

Task owners can edit their existing tasks.

The Edit Task form is populated with the selected task's current information.

After a successful API response, the Tasks Context is updated and the user is redirected to the task's details page.

The backend verifies task ownership before allowing an update.

**Inline Task Updates**

Authenticated task owners can update the assigned technician and task status directly from task cards on both the Dashboard and Tasks pages using dropdown menus.

This allows users to manage tasks without navigating to the Edit Task page.

Task ownership permissions are enforced by the backend for these updates as well.

### Delete (DELETE)

Task owners can delete their own tasks.

The backend verifies the authenticated user's ownership before performing the deletion.

Unauthorized update or deletion attempts receive an HTTP 403 response.

### Additional Interaction: Comments

Authenticated users can add comments to existing tasks.

Comments are stored in the database and displayed on the corresponding task details page.

Only comment authors can delete their comments. Comment counts are updated after successful comment operations.

## 8. Forms & Validation

### Forms Used

- Registration form
- Login form
- Create Task form
- Edit Task form
- Add Comment form

### Validation Rules

The application uses controlled React form inputs and client-side validation to prevent invalid submissions.

**Registration Form Validation:**

- **Username:** Required, must contain at least 3 characters, and leading or trailing whitespace is removed.
- **Email:** Required, must match a valid email format, and leading or trailing whitespace is removed.
- **Password:** Required and must contain at least 6 characters.
- **Confirm Password:** Required and must match the password field.

If validation fails, the form submission is prevented and an alert message informs the user about the problem.

After successful validation, the registration data is sent to the backend using a POST request.

The backend also validates the presence of the required registration fields and checks whether the email address is already registered.

If registration succeeds, the form is reset and the user is redirected to the Login page. If the API request fails, an error message is displayed.

**Task Form Validation:**

The Edit Task form validates the required task fields before submitting updates:

- **Title:** Cannot be empty.
- **Description:** Cannot be empty.
- **Date:** Must be selected.

Invalid submissions are prevented and users receive feedback before the update request is sent.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

The application uses several React hooks:

- `useState` — manages component state, form values, loading indicators, and errors.
- `useEffect` — handles side effects such as fetching data and checking authentication sessions.
- `useContext` — provides access to shared authentication and task data.
- `useNavigate` — enables programmatic navigation.
- `useParams` — retrieves dynamic URL parameters.

**Lifecycle Example — TasksProvider**

When `TasksProvider` mounts, a `useEffect` hook initiates requests to the backend to retrieve tasks and technicians.

The fetched data is stored in React state and made available to other components through `TasksContext`.

The provider also manages loading and error states.

**Lifecycle Example — AuthProvider**

When `AuthProvider` mounts, a `useEffect` hook checks whether the user has an active authentication session.

The application sends a request to `/api/auth/me` with credentials included.

Based on the response, the authentication context updates the current user and authentication loading state.

This allows protected routes to wait for session verification before rendering restricted content.

### Context API

The application uses:

**AuthContext**
- Authenticated user
- Authentication status
- Authentication loading state

**TasksContext**
- Task collection
- Task state updates
- Technician data

These contexts allow components to access shared state without passing data through multiple component levels.

### Component Styling

The application uses external CSS files for component and page styling.

Reusable components include Header, Footer, Layout, TaskCard, StatCard, ProtectedRoute, and TaskComments.

## 10. Typical User Flow

1. A visitor opens the Home page and selects Start. If unauthenticated, they are redirected to Login.
2. The user logs in and returns to Home, then selects Start to access the Dashboard.
3. The user opens the Tasks page, reviews existing tasks, and creates a new task.
4. The user can open Task Details, update or delete their own tasks, and participate in task discussions through comments.

## 11. Error & Edge Case Handling

### Authentication Errors

Protected routes redirect unauthenticated users to Login.

Unauthorized task editing displays an Access Denied message.

The backend returns HTTP 403 for unauthorized task modifications.

### Network or Data Errors

API operations use error handling to catch unsuccessful requests.

For example, failed task updates display an error message to the user.

### Empty or Missing Data States

The Tasks page handles loading, error, and empty-list states.

- While task data is loading, a loading message is displayed.
- If an API request fails, an error message is displayed.
- If no tasks are available, the page displays "No tasks have been created yet."
- When tasks are available, they are rendered using reusable `TaskCard` components.

The Edit Task page displays a loading state while retrieving the selected task. If the task cannot be found, an appropriate message is displayed.

The application also includes a Not Found page for unmatched routes.

---

## Installation & Local Development

The application consists of a React frontend, a Node.js/Express backend, and a PostgreSQL database managed with Prisma ORM.

### 1. Clone the Repository

```bash
git clone https://github.com/PalmiraGeorgieva/technician-task-manager.git
cd technician-task-manager
```

### 2. Install Dependencies

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```dotenv
DATABASE_URL="your_postgresql_connection_string"
DIRECT_URL="your_direct_postgresql_connection_string"
JWT_SECRET="your_secure_random_secret"
NODE_ENV="development"
```

- `DATABASE_URL` — PostgreSQL connection used by Prisma Client.
- `DIRECT_URL` — PostgreSQL connection used by Prisma CLI for migrations.
- `JWT_SECRET` — secret key used to sign authentication tokens.
- `NODE_ENV` — determines the authentication cookie settings for development and production.

Create a `.env` file in the frontend project root:

```dotenv
VITE_API_URL="http://localhost:5000"
```

The frontend uses `VITE_API_URL` to communicate with the Express REST API.

**Security:** Never commit `.env` files, database credentials, or JWT secrets to the repository.

### 4. Set Up Prisma

The backend uses Prisma ORM 7 with the `@prisma/adapter-pg` driver adapter.

From the `server` directory, generate the Prisma Client:

```bash
npx prisma generate
```

Apply the existing database migrations:

```bash
npx prisma migrate deploy
```

These commands require a correctly configured PostgreSQL database connection.

### 5. Start the Backend

From the `server` directory, start the Express development server:

```bash
npm run dev
```

Alternatively, start the server without watch mode:

```bash
npm start
```

The backend runs locally on port `5000`.

The API provides the following route groups:

- `/api/tasks` — task-related operations
- `/api/users` — user-related operations
- `/api/auth` — authentication and session management

CORS is configured to allow requests from `http://localhost:5173` and the deployed Vercel frontend.

To verify that the backend is running, open:

`http://localhost:5000/`

Expected response:

```json
{
  "message": "TTM API is running!"
}
```

### 6. Start the Frontend

Open a second terminal in the project root directory:

```bash
npm run dev
```

Vite starts the React development server and displays its local URL in the terminal.

### 7. Build for Production

Create an optimized frontend production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```
---

## Deployment

**Frontend:** https://technician-task-manager.vercel.app

**Backend:** https://technician-task-manager-api.onrender.com

**Database:** Hosted PostgreSQL on Supabase

**Source Code:** https://github.com/PalmiraGeorgieva/technician-task-manager
