import { Outlet } from 'react-router-dom';

import Header from '../../Header/Header';
import Footer from '../Footer/Footer';

function Layout() {
    return (
        <>
        <Header />
        <main className="main-content">
            <Outlet />
        </main>
        <Footer />
        </>
    );
}

export default Layout;