import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './index.css'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import image2 from "./images/datas-circle.png";

class AboutPage extends React.Component {
    render() {
        return(
            <div>
                <head>
                    <meta charset='UTF-8'/>
                    <title>DATAS Website</title>
                    <link rel='stylesheet' href='/src/index.css'/>
                    <link rel="icon" href="images/datas-logo.png"/>
                </head>
                <body>
                    <div className='menu-container'>
                        <div className='menu'>
                            <div className="home">
                                <Link className="link-formatting" to="/">
                                    <img className="home-image" src={image2}/>
                                </Link>
                            </div>
                            <div className="right-end">
                            <div className='about'>
                                <Link className="link-formatting" to="/about">About</Link>
                            </div>
                            <div className='people'>
                                <Link class="link-formatting" to="/people">People</Link>
                            </div>
                            <div className="resources">
                                <Link className="link-formatting" to="/resources">Resources</Link>
                            </div>
                            <div className='contact'>
                                <Link className="link-formatting" to="/contact">Contact</Link>
                            </div>
                        </div>
                    </div>
                    </div>

                </body>
            </div>
        )
    }
}

export default AboutPage;