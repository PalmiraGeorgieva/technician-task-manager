import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Tasks from './pages/Tasks/Tasks';
import CreateTask from './pages/CreateTask/CreateTask';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TaskDetails from './pages/TaskDetails/TaskDetails';
import EditTask from './pages/EditTask/EditTask';

function App() {
  return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="tasks/create" element={<CreateTask />} />
                    <Route path="tasks/:taskId" element={<TaskDetails />} />
                    <Route path='tasks/:taskId/edit' element={<EditTask />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

            </Route>
        </Routes>
  );
}

export default App;
