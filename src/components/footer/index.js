
import { FaLinkedin } from "react-icons/fa";


import { BsTwitterX } from "react-icons/bs";



import "./index.css";

const Footer =()=> {
    return (
        

<div className="footer">
      <div className="footer-content">
          <p>&copy; {new Date().getFullYear()}  WordFlow. All rights reserved.</p>
          <p>You can contact the developer at <a href="mailto:daveeddaveedd@gmail.com">daveeddaveedd@gmail.com</a></p>
          <p>This is a demo version of the WordFlow website, please use it responsibly.</p>
          <p>
            Connect with me: 
            <a href="https://x.com/Daveed53460412" target="_blank" rel="noopener noreferrer"><BsTwitterX /> Twitter</a> | 
            <a href="https://www.linkedin.com/in/g-daveed-365958190/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
          </p>
        </div>
     </div>
    )
}

export default Footer;