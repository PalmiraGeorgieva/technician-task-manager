import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import logo from '../../assets/images/logoTtm.png';
import "./Header.css";

function Header() {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <header className='site-header'>
            <NavLink to='/' className='logo'>
            <img src={logo} alt='Technicians Task Manager' className='logo-img'/>
            </NavLink>
            <nav className='main-nav'>
                <NavLink to="/">Home</NavLink> |{" "}
                {isAuthenticated ? (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink> |{" "}
                        <NavLink to="/tasks">Tasks</NavLink> |{" "}
                        <NavLink to="/tasks/create">Create Task</NavLink> |{" "}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink> |{" "}
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;