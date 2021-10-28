import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css'


function Navbar() {
    const [click,setClick] = useState(false);
    const [button,setButton] =useState(true);
    const aeitransimage="images/aeitransparent.png"

    const handleClick=()=> setClick(!click);
    const closeMobileMenu = ()=> setClick(false);

    const showButton=()=>{
        if(window.innerWidth<=960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    window.addEventListener('resize',showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img src={aeitransimage} className="navbar-logo" alt="AEI logo" width="650px" ></img>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times':'fas fa-bars'}/>
                    </div>
                    <ul className={click?'nav-menu active':'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/visulisations" className="nav-links" onClick={closeMobileMenu}>
                                Visulisations
                            </Link>
                        </li>
                        <li>
                            <Link to="/aboutus" className="nav-links" onClick={closeMobileMenu}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contactus" className="nav-links" onClick={closeMobileMenu}>
                                Contact US
                            </Link>
                            
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'> SIGN UP</Button> }
                </div>
            </nav>
        </>
    )
}

export default Navbar
