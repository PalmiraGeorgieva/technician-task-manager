import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./Login.css";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.email) {
            alert("Please enter your email!");
            return;
        }

        if (!formData.email.includes("@")) {
            alert("Please enter a valid email!");
            return;
        }

        if(!formData.password) {
            alert('Please enter your password!');
            return;
        }

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("User not found. Please register first.");
            return;
        }
        if(
            formData.email !== savedUser.email || 
            formData.password !== savedUser.password
        ) {
            alert("Invalid email or password.")
            return;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert("Please enter a valid email address!");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        login();

        setFormData({
            email: "",
            password: "",
        });
       

        navigate("/dashboard");
    }

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
            </form>

        </section>
    );
}

export default Login;