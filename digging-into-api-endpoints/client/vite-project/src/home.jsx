import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './index.css'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import image1 from "./images/scifri-photo.jpg";
import image2 from "./images/datas-circle.png";

class HomePage extends React.Component {
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
                    <div className="homepage-container">
                        <img src={image1} className="home-image1"/>
                        <div>
                            <div className="bold-title">
                                Welcome to the DATAS website!
                            </div>
                            <div className="general-text">
                                DATAS (Discussions And Talks About Science) is a student organization at Nueva that aims to foster a community centered on data. This is achieved by hosting "Science Friday," a weekly event featuring guest speakers on engaging topics from quantum gravity to evaluating US trade sanctions in Iran. We also recruit and train members to effectively communicate and interpret data. Guided by our core values of scientific honesty, thorough investigation, and inclusivity, we strive to enhance scientific literacy both within Nueva and beyond.
                            </div>
                        </div>       
                    </div>
                </body>
            </div>
        )
    }
}

export default HomePage;