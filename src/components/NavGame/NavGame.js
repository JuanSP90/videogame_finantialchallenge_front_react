import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./NavGame.css";
import out from "../../images/icons8-logout-100.png";

const NavGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="navGame">
      <div className="navlogo">Finantial Challenge</div>
      <div className={`navitems ${isOpen && "open"}`}>
        <div className="fullNav">
          <Link to={"/Profile"}>Perfil</Link>
          <Link to={"/Ranking"}>Posición</Link>
          <Link to={"/RealState"}>Propiedades</Link>
          <Link to={"/Cash"}>Efectivo</Link>
          <div className="divlogout">
            <div
              className="logout"
              onClick={logout}
              style={{
                backgroundImage: `url(${out})`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={`navtoggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default NavGame;
