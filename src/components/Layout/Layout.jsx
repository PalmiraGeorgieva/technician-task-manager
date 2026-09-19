import { Outlet, useLocation } from 'react-router-dom';
import backgroundImage from "../../assets/images/home-technician.png";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import "./Layout.css";

function Layout() {
    const location = useLocation();

   const hasBackground =
    location.pathname === "/dashboard" || "/login" || "/register" ||
    location.pathname.startsWith("/tasks");

    return (
        <div className='app-layout'>
            <Header />

            <main
                className="main-content"
                style={
                    hasBackground
                        ? {
                            backgroundImage: `
                             linear-gradient(
                                rgba(255, 255, 255, 0.72),
                                rgba(255, 255, 255, 0.72)
                             ),
                             url(${backgroundImage})
                              `,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }
                        : {}
                }
            >
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;