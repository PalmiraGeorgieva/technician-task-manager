import { useState } from "react";
import { useNavigate, NavLink, Form } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./Login.css";
import { API_URL } from "../../config/api.js";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""

    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
           ...formData,
           [name]: value

        });

    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const email = formData.email.trim();

        if(!email) {
            alert("Please enter your email!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            alert("Please enter a valid email address!");
            return;
        }

        if(formData.password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                   method: "POST",
                   headers: {
                    "Content-Type": "application/json"
                   },
                   credentials: "include",
                   body: JSON.stringify({
                    email,
                    password: formData.password
                   }),
                }
                
            );

             const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            login(data);

            setFormData({
                email: "",
                password: ""
            });

            navigate("/");

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
       
    };

    return (
        <section className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <p className="auth-switch">
                    Don't have an account?{" "}
                    <NavLink to="/register">Register here</NavLink>
                </p>
            </form>

        </section>
    );
}

export default Login;