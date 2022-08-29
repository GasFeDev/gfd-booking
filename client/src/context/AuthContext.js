import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  /* El método getItem() de la interfaz Storage devuelve el valor de la clave cuyo nombre se le pasa por parámetro (que contiene el valor de la clave). Si la clave no existe, devuelve null. */
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

/* ###################  useReducer  ############################ */
/* useReducer es un hook de React para actualizar un estado interno por medio de una función llamada reducer. 
Cuando usarlo:
  - Cuando el estado siguiente del "state" depende del estado anterior.
  - Cuando manejas un objeto JSON como state y tienes subvalores dentro de tu mismo objeto.

  DECLARACIÓN DE USEREDUCER
En forma general podemos declarar a este Hook de la siguiente forma.

const [state, dispatch] = useReducer(reducer, initialArg, init);
No obstante, la declaración también depende de como decidamos iniciar el state:

Podemos especificar el estado inicial.
O podemos especificar un estado inicial en forma diferida.

ESPECIFICANDO EL ESTADO INICIAL DE USEREDUCER
La forma más sencilla de inicializar el state es, especificar el objeto del state y pasarlo como segundo parámetro al useReducer.

const [state, dispatch] = useReducer(reducer,initialState);*/

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        /* En los reductores dentro de la caja del interruptor, manejaremos el tipo de acción y actualizaremos la aplicación con action.payload */
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  /* ###################  useEffect  ############################ */
  /* useEffect: ¿Su función? Ejecutar código cada vez que nuestro componente se renderiza.
  Un hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta. */

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    /* El método setItem() de la interfaz Storage, cuando reciba una clave y un valor, añadirá estos al almacén, o actualizará el valor si la clave ya existe. 
    Sintaxis: 
          storage.setItem(keyName, keyValue);
    Parámetros
          keyName
                Un DOMString conteniendo la clave que se quiere crear/actualizar.
          keyValue
                Un DOMString conteniendo el valor que se le quiere dar a la clave que se está creando/actualizando.
    No devuelve valor. */
  }, [state.user]);
  /* [state.user]: Indica, que cuando este parámetro no cambia entonces no volverá a renderizar el efecto. 
  # Si le pasaramos un array vacío como parámetro, le diría a React que nuestro efecto no depende de ningún valor y que, por lo tanto, sólo debería ejecutarse al montarse y desmontarse nuestro componente. */

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* Conclusiones sobre useEffect
Con el hook useEffect podremos ejecutar código cada vez que nuestro componente se renderice (ya sea por una actualización o sea la primera vez). Y no sólo eso. Ya hemos visto que es el sitio ideal para suscribirnos a eventos, ya sea del navegador o de otras fuentes, pero también que podemos manejar las desuscripción para evitar crear memory leaks.

También hemos podido entender que useEffect viene a sustituir en gran parte los ciclos de vida de los componentes que vimos en los componentes que extendían de la clase Component. De hecho, viene a sustituir los ciclos componentWillMount, componentDidMount, componentWillUpdate, componentDidUpdate y componentWillUnmount. Esto nos debería ayudar a generar menos código y hacer nuestros componentes más sencillos. */
