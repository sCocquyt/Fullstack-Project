import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from "axios"
import MemberDisplay from './people'
import HomePage from './home'
import AboutPage from './about'
import ResourcesPage from './resources'
import ContactPage from './contact'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        {/* <React.StrictMode> */}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="people" element={<MemberDisplay/>}/>
                <Route path="resources" element={<ResourcesPage/>}/>
                <Route path="contact" element={<ContactPage/>}/>
            </Routes>
        {/* </React.StrictMode> */}
    </BrowserRouter>
)
