import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const country = useRef();
  const city = useRef();
  const phone = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("¡Las contraseñas no coinciden!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        country: password.current.value,
        city: password.current.value,
        phone: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");

        /* Podemos empujar a los usuarios de una página a otra usando history.push. Cuando usamos el método push, solo necesitamos proporcionar la ruta que queremos llevar a nuestros usuarios a usar este método. */
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FedeATravel</h3>
          <span className="loginDesc">Reserva ahora con FedeATravel</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Nombre de usuario"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Correo electrónico"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Contraseña"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Nuevamente ingrese su contraseña"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <input
              placeholder="Ingrese su pais de residencia"
              required
              ref={country}
              className="loginInput"
            />
            <input
              placeholder="Ingrese su ciudad de residencia"
              required
              ref={city}
              className="loginInput"
            />
            <input
              placeholder="Ingrese su teléfono de contacto"
              required
              ref={phone}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
