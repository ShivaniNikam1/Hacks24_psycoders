import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./header.css";
import { useRecoilState } from "recoil";
import { userState } from '../atom/useratom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export function Header()  {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("LogOut Successful");
      setCurrentUser(null); // Reset user state
      navigate("/");
    } catch (err) {
      console.log("Error while logging out", err);
    }
  };

  return (
    <div className="header">
      <div className="header-logo-text">
        <Link style={{ display: "flex" }} to="/">
          <div className="header-logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="header-text">
            <p>Homify</p>
          </div>
        </Link>
      </div>
      <div className="header-pages">
        <ul>
          <li><Link to={`/`}>Home</Link></li>
          {!currentUser ? (
            <li><Link to={`/login`}>Login</Link></li>
          ) : (
            <>
              <li><Link to={`/dashboard`}>Dashboard</Link></li>
              <li><Link to={`/designerList`}>Designers</Link></li>
              <li><Link to={`/chat`}>Chat</Link></li>
              <li><Link to={`/products`}>Shop</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
          <li><Link to={`/services`}>Services</Link></li>
          <li><Link to={`/contact`}>Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}
