import { useState } from "react";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosMenu, IoIosArrowForward } from "react-icons/io";

const CategoryMenu = () => {
  const [categoryMenuExpandStatus, setCategoryMenuExpandStatus] = useState(
    true
  );
  const [mostrarDos, setMostrarDos] = useState("dosnone");
  const [mostrarTres, setMostrarTres] = useState("tresnone");
  const [mostrarCuatro, setMostrarCuatro] = useState("cuatronone");
  const [mostrarCinco, setMostrarCinco] = useState("cinconone");
  const [
    categoryMenuItemExpandStatus,
    setCategoryMenuItemExpandStatus
  ] = useState(false);

  const entreDos = () => {
    setMostrarDos("dosvisible")
  }

  const salirDos = () => {
    setMostrarDos("dosnone")
  }

  const entreTres = () => {
    setMostrarTres("tresvisible")
  }

  const salirTres = () => {
    setMostrarTres("tresnone")
  }

  const entreCuatro = () => {
    setMostrarCuatro("cuatrovisible")
  }

  const salirCuatro = () => {
    setMostrarCuatro("cuatronone")
  }

  const entreCinco = () => {
    setMostrarCinco("cincovisible")
  }

  const salirCinco = () => {
    setMostrarCinco("cinconone")
  }

  return (
    <div className="cero">
      <ul className="uno">
        <li onMouseOver={entreDos} onMouseLeave={salirDos} > <a href="#">Exterior <IoIosArrowForward className="ml-36" /> </a>
          <div className="contenedorsubmenu">
            <ul className={mostrarDos}>
              <br />
              <h2 className="ml-30">Productos Exterior </h2>
              <hr />
              <li><a href="#">Derecha</a></li>
              <li><a href="#">Centro</a></li>
              <li><a href="#">Izquierda</a></li>
              <li><a href="#">No estoy seguro</a></li>
              <br />
            </ul>
          </div>
        </li>
        <li onMouseOver={entreTres} onMouseLeave={salirTres} ><a href="#">Interior <IoIosArrowForward className="ml-40" /> </a>
          <div className="contenedorsubmenu">
            <ul className={mostrarTres}>
              <br />
              <h2 className="ml-30">Productos Interior</h2>
              <hr />
              <li><a href="#">Techo</a></li>
              <li><a href="#">Interior general</a></li>
              <li><a href="#">Consola central</a></li>
              <li><a href="#">No estoy seguro</a></li>
              <br />
            </ul>
          </div>
        </li>
        <li onMouseOver={entreCuatro} onMouseLeave={salirCuatro}><a href="#">Tren Motriz <IoIosArrowForward className="ml-13" /> </a>
          <div className="contenedorsubmenu">
            <ul className={mostrarCuatro}>
              <br />
              <h2 className="ml-30">Productos Tren Motriz</h2>
              <hr />
              <Row>
                <Col>
                  <li><a href="#">Motor</a></li>
                  <li><a href="#">Transmisión</a></li>
                  <li><a href="#">Frenos</a></li>
                  <li><a href="#">Dirección</a></li>
                  <li><a href="#">Suspensión</a></li>
                  <li><a href="#">Caja de cambios</a></li>
                  <li><a href="#">Sistema de embrague</a></li>
                  <li><a href="#">Sistema de inyección</a></li>
                </Col>
                <Col>
                  <li><a href="#">Sistema de refrigeración</a></li>
                  <li><a href="#">Sistema de refrigeración caja</a></li>
                  <li><a href="#">Sistema de escape</a></li>
                  <li><a href="#">Sistema aire acondicionado</a></li>
                  <li><a href="#">Sistema eléctrico accesorios</a></li>
                  <li><a href="#">Sistema de arranque</a></li>
                  <li><a href="#">Sistema de limpia parabrisas</a></li>
                  <li><a href="#">Sistema eléctrico motor</a></li>
                </Col>
              </Row>
              <br />
            </ul>
          </div>
        </li>
        <li onMouseOver={entreCinco} onMouseLeave={salirCinco}><a href="#">Genéricos <IoIosArrowForward className="ml-20" /> </a>
          <div className="contenedorsubmenu">
            <ul className={mostrarCinco}>
              <br />
              <h2 className="ml-30">Productos Genéricos</h2>
              <hr />
              <Row>
                <Col>
                  <li><a href="#">Baterías</a></li>
                  <li><a href="#">Llantas y rines</a></li>
                  <li><a href="#">Plumillas</a></li>
                  <li><a href="#">Iluminación y exploradoras</a></li>
                  <li><a href="#">Partes eléctricas genéricas</a></li>
                </Col>
                <Col>
                  <li><a href="#">Lubricantes y fluidos</a></li>
                  <li><a href="#">Sistema de sonido y entretenimiento</a></li>
                  <li><a href="#">Accesorios interior</a></li>
                  <li><a href="#">Accesorios exterior</a></li>
                  <li><a href="#">Estéticos y cuidado del vehículo</a></li>
                </Col>
              </Row>
              <br />
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
