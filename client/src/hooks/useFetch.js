import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;

/* Con el estado de la aplicación representado en la URL, todo lo que teníamos que hacer era traducir esos accesorios en solicitudes para obtener los datos reales de los servicios de back-end. Para hacer esto, construimos una nueva biblioteca llamada React Refetch. De manera similar a los enlaces de React Redux, los componentes se envuelven en un conector y se les asigna una función pura para seleccionar datos que se inyectan como accesorios cuando se monta el componente. La diferencia es que, en lugar de seleccionar los datos del almacén global, React Refetch extrae los datos de los servidores remotos. La otra diferencia notable es que debido a que los datos se recuperan automáticamente cuando se monta el componente, no es necesario iniciar acciones manualmente para obtener los datos en el almacén en primer lugar. De hecho, no hay tienda en absoluto. Todo el estado se mantiene como accesorios inmutables, que en última instancia son controlados por la URL. Cuando la URL cambia, los accesorios cambian, lo que vuelve a calcular las solicitudes, se recuperan nuevos datos y se reinyectan en los componentes. Todo esto se hace de manera simple y declarativa sin tiendas, sin devoluciones de llamadas, sin acciones, */
