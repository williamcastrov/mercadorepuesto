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
    router.push("/search?keyword=sensores de la dirección");
  }

  return (
    <div className="container ">
      <div className="row contenedor">
        <div id="content" className="col-lg-3">
          <div id="menu">
            <ul>
              <li className="has-sub"><a href="#">Exterior <IoIosArrowForward className="ml-45" /> </a>
                <ul>
                  <div className="ml-10">
                    <li><a href="/search?keyword=Ducati">Derecha</a></li>
                    <li><a href="/search?keyword=Chevrolet">Centro</a></li>
                    <li><a href="/search?keyword=Honda">Izquierda</a></li>
                    <li><a href="/search?keyword=Mazda">No estoy seguro</a></li>
                  </div>
                </ul>
              </li>
              <li className="has-sub"><a href="#">Interior <IoIosArrowForward className="ml-50" /> </a>
                <ul>
                  <div className="ml-10">
                    <li><a href="/search?keyword=Ducati">Techo</a></li>
                    <li><a href="/search?keyword=Chevrolet">Interior general</a></li>
                    <li><a href="/search?keyword=Honda">Consola central</a></li>
                    <li><a href="/search?keyword=mazda">No estoy seguro</a></li>
                  </div>
                </ul>
              </li>
              <li className="has-sub"><a href="#">Tren Motriz  <IoIosArrowForward className="ml-20" /> </a>
                <ul>
                  <Row>
                    <Col>
                      <div className="ml-10">
                        <li><a href="/search?keyword=Ducati">Motor</a></li>
                        <li><a href="/search?keyword=Chevrolet">Transmisión</a></li>
                        <li><a href="/search?keyword=Mazda">Frenos</a></li>
                        <li><a href="/search?keyword=Honda">Dirección</a></li>
                        <li><a href="/search?keyword=Ducati">Suspensión</a></li>
                        <li><a href="/search?keyword=Mazda">Caja de cambios</a></li>
                        <li><a href="/search?keyword=Honda">Sistema de embrague</a></li>
                        <li><a href="/search?keyword=Ducati">Sistema de inyección</a></li>
                      </div>
                    </Col>
                    <Col>
                      <div className="ml-10">
                        <li><a href="/search?keyword=Ducati">Sistema de refrigeración</a></li>
                        <li><a href="/search?keyword=Chevrolet">Sistema de refrigeración caja</a></li>
                        <li><a href="/search?keyword=Mazda">Sistema de escape</a></li>
                        <li><a href="/search?keyword=BMW">Sistema aire acondicionado</a></li>
                        <li><a href="/search?keyword=Chevrolet">Sistema eléctrico accesorios</a></li>
                        <li><a href="/search?keyword=Ducati">Sistema de arranque</a></li>
                        <li><a href="/search?keyword=Ducati">Sistema de limpia parabrisas</a></li>
                        <li><a href="/search?keyword=Ducati">Sistema eléctrico motor</a></li>
                      </div>
                    </Col>
                  </Row>
                </ul>
              </li>
              <li className="has-sub"><a href="#">Genéricos <IoIosArrowForward className="ml-27" /> </a>
                <ul>
                  <Row>
                    <Col>
                      <div className="ml-10">
                        <li><a href="/search?keyword=BMW">Baterías</a></li>
                        <li><a href="/search?keyword=Ducati">Llantas y rines</a></li>
                        <li><a href="/search?keyword=Chevrolet">Plumillas</a></li>
                        <li><a href="/search?keyword=Mazda">Iluminación y exploradoras</a></li>
                        <li><a href="/search?keyword=Honda">Partes eléctricas genéricas</a></li>
                      </div>
                    </Col>
                    <Col>
                      <div className="ml-10">
                        <li><a href="/search?keyword=Mazda">Lubricantes y fluidos</a></li>
                        <li><a href="/search?keyword=Chevrolet">Sistema de sonido y entretenimiento</a></li>
                        <li><a href="/search?keyword=Honda">Accesorios interior</a></li>
                        <li><a href="/search?keyword=BMW">Accesorios exterior</a></li>
                        <li><a href="/search?keyword=Ducati">Estéticos y cuidado del vehículo</a></li>
                      </div>
                    </Col>
                  </Row>
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CategoryMenu;
