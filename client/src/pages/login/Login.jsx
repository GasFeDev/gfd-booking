import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  /* El event.preventDefault() previene el comportamiento por defecto que trae consigo el evento.
  Se usa más comúnmente para evitar que una página se refresque automáticamente al momento de llamar al evento submit en un formulario y para evitar este mismo comportamiento en un evento click

El ejemplo más típico, es cuando creamos un formulario, si tiene un atributo "action" el comportamiento por defecto es redirigir la página hacia la dirección del action, sino por defecto refresca la página actual. Es decir, si necesitas que tu página web no se actualice después del submit, debería colocar event.preventDefault() en la función que maneja el evento. */

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Nombre de usuario"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Contraseña"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Iniciar sesión
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
