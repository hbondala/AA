import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {

    const sponsors_image1="images\nea-research-labs.jpeg";
    return (
        <div className="footer-container">
            <section className="footer-info">
                <p className="footer-sponsors">
                    Thanks to our genrous sponsors
                </p>
                <Link to="/" className="navbar-logo" >
                        <img src={sponsors_image1} className="navbar-logo" alt="AEI logo" width="650px" ></img>
                </Link>
            </section>
            
        </div>
    )
}

export default Footer
