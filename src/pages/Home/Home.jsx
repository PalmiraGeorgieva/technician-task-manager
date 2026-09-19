import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import homeImage from "../../assets/images/technician-background.png";
import "./Home.css";

function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <main className="home">
            <section className="home-hero">
                <div className="home-content">
                    <p className="home-label">
                        TECHNICIANS TASK MANAGER
                    </p>
                    <h1>
                        Organize.<br />
                        Assign. Track.<br />
                        <span>Get things done.</span>
                    </h1>
                    <p className="home-description">
                        A simple way to manage daily tasks,
                         support your team and keep everything on track.
                    </p>
                    <NavLink
                      to={isAuthenticated ? "/dashboard" : "/login"}
                      className="get-started-btn"
                    >
                        Get Started →
                    </NavLink>
                </div>
                <div className="home-image">
                    <img src={homeImage} alt="Technician managing tasks" />
                </div>
        
            </section>
        </main>
    );
}

export default Home;