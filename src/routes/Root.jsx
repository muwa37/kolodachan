import React from 'react';
import { Outlet} from "react-router-dom";
import Navbar from '../components/wrapper/Navbar';
import Footer from '../components/wrapper/Footer';

const Root = () => {
    return (
        <div>
            <Navbar/>
                root route
                <Outlet/>
            <Footer/>
        </div>
    )
}

export default Root;