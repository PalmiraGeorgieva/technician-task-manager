import "./NotFound.css";
import { NavLink } from "react-router-dom";
import notFoundImage from "../../assets/images/page404.png";

function NotFound() {
    return (
        <main className="not-found">
            <img src={notFoundImage}
             alt="404 Not Found" 
             className="not-found-img" 
             />

            <NavLink to="/" className="home-btn">
                Back to Home
            </NavLink>
        </main>
    );
}

export default NotFound;
