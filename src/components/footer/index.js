
import { FaLinkedin,FaCopyright } from "react-icons/fa";


import "./index.css";

const Footer =()=> {
    return (
        <div className="footer-container">
            <h3>Owner: Daveed Gangi</h3>
            <div>
            Social Link:&nbsp;
            <a rel="noreferrer" href="https://www.linkedin.com/in/g-daveed-365958190/" target="_blank"><FaLinkedin /></a>
            </div>    
            <p><FaCopyright /> 2024 Blog Post App. All rights reserved.</p>
        </div>
    )
}

export default Footer;