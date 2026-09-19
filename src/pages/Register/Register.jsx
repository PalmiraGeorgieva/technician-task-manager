import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
           ...formData,
           [name]: value

        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            alert("Password do not match");
            return;
        }
        if(!formData.username) {
            alert("Please enter your username!");
            return;
        }

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
        if (!formData.confirmPassword) {
            alert('Please confirm your password!');
            return;
        }

        localStorage.setItem("user", JSON.stringify(formData));


        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

        navigate("/login")

        console.log("Registration data", formData);
    }

    return (
        <section className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username}
                        onChange={handleChange} placeholder="Enter your username" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email}
                        onChange={handleChange} placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password}
                        onChange={handleChange} placeholder="Enter your password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
                        onChange={handleChange} placeholder="Confirm your password" />
                </div>
                <button type="submit">Register</button>
            </form>
        </section>
    );
}

export default Register;