import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-left">
                <Link to="/about">About Deakin</Link>
            </div>

            <div className="footer-center">
                <Link to="/connect">Connect with Us</Link>
            </div>

            <div className="footer-right">
                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
            </div>

        </footer>
    );
}

export default Footer;