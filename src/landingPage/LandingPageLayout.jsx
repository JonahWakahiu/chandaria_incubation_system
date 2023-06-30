import React from 'react'
import {Outlet} from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';

function LandingPageLayout() {
    return (

        <>
            <NavigationBar />
            <Outlet />
            <Footer />
            
        </>
    )
}

export default LandingPageLayout;