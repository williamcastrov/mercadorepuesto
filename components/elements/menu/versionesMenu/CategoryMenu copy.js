import { useState } from "react";
import Link from "next/link";
import { SlideDown } from "react-slidedown";
import { IoIosMenu, IoIosArrowForward } from "react-icons/io";

const CategoryMenu = () => {
  const [categoryMenuExpandStatus, setCategoryMenuExpandStatus] = useState(
    true
  );
  const [
    categoryMenuItemExpandStatus,
    setCategoryMenuItemExpandStatus
  ] = useState(false);

  return (
    <div className="cero">
      <ul className="uno">
        <li><a href="#">Exterior</a>
          <ul>
            <li><a href="#">Derecha</a></li>
            <li><a href="#">Centro</a></li>
            <li><a href="#">Izquierda</a></li>
            <li><a href="#">No estoy seguro</a></li>
          </ul>
        </li>
        <li><a href="#">Tren Motriz</a>
        <ul  >
            <li><a href="#">Techo</a></li>
            <li><a href="#">Interior general</a></li>
            <li><a href="#">Consola central</a></li>
            <li><a href="#">No estoy seguro</a></li>
          </ul>
        </li>
        <li><a href="#">Interior</a>
          <ul  >
            <li><a href="#"></a></li>
            <li><a href="#">Motor</a></li>
            <li><a href="#">Transmisión</a></li>
            <li><a href="#">Frenos</a></li>
            <li><a href="#">Dirección</a></li>
            <li><a href="#">Suspensión</a></li>
            <li><a href="#">Caja de cambios</a></li>
            <li><a href="#">Sistema de embrague</a></li>
            <li><a href="#">Sistema de inyección</a></li>
            <li><a href="#">Sistema de refrigeración</a></li>
            <li><a href="#">Sistema de refrigeración caja</a></li>
            <li><a href="#">Sistema de escape</a></li>
            <li><a href="#">Sistema aire acondicionado</a></li>
            <li><a href="#">Sistema eléctrico accesorios</a></li>
            <li><a href="#">Sistema de arranque</a></li>
            <li><a href="#">Sistema de limpia parabrisas</a></li>
            <li><a href="#">Sistema eléctrico motor</a></li>
          </ul>
        </li>
        <li><a href="#">Genéricos</a>
        <ul >
            <li><a href="#">Lubricantes y fluidos</a></li>
            <li><a href="#">Lubricantes y fluidos</a></li>
            <li><a href="#">Lubricantes y fluidos</a></li>
            <li><a href="#">Lubricantes y fluidos</a></li>
          </ul></li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
