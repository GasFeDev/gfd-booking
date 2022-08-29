import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">FedeATravel</span>
        </Link>
        {user ? (
          <div className="options">
            <span onClick={() => dispatch({ type: "LOGOUT" })}>
              Cerrar Sesión
            </span>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <Link to="/register">Registrarse</Link>
            </button>
            <button className="navButton">
              <Link to="/login">Iniciar Sesión</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
