import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m del centro</span>
        <span className="siTaxiOp">Taxi gratuito al aeropuerto</span>
        <span className="siSubtitle">Departamento con aire acondicionado</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Cancelación sin costo </span>
        <span className="siCancelOpSubtitle">
          Puede cancelar más tarde, ¡Asegure este excelente precio hoy!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excelente</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Incluye impuestos y tasas</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">Ver disponibilidad</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
