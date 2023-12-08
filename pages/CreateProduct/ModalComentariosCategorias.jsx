import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";

function ModalComentariosCategorias({ shown, close, categoria }) {
    console.log("CATEGORIA : ", categoria);
    const [textoLubricantesFluidos, setTextoLubricantesFluidos] = useState(
        "Acá podrás vender productos como: aceites, líquido de frenos, liquido refrigerante, grasas, aceite de caja, aceite para transmisión, entre otros…"
    );
    const [textoEsteticos, setTextoEsteticos] = useState(
        "Acá podrás vender productos como: jabones, ceras, quita rayones, ambientadores, siliconas, toallas, restauradores de partes negras, polichadoras, aspiradoras, hidrolavadoras, entre otros…"
    );
    const [textoIluminacion, setTextoIluminacion] = useState(
        "Acá podrás vender productos como: bombillos, exploradoras, fusibles, sensores, cámaras de reversa, entre otros…"
    );
    const [textoLlantasRines, setTextoLlantasRines] = useState(
        "Acá podrás vender productos como: llantas y rines…"
    );
    const [textoKitCarretera, setTextoKitCarretera] = useState(
        "Acá podrás vender productos como: kit de carreteras, extintores, botiquines, elementos de seguridad vial, señalización, crucetas, compresor de aire, gatos hidráulicos, cables de baterías, arrancadores, cargadores baterías, tacones y pernos de seguridad, entre otros…"
    );
    const [textoBaterias, setTextoBaterias] = useState(
        "Acá podrás vender productos como: Baterías..."
    );
    const [textoPlumillas, setTextoPlumillas] = useState(
        "Acá podrás vender productos como: Plumillas."
    );
    const [textoAccesoriosInterior, setTextoAccesoriosInterior] = useState(
        "Acá podrás vender productos como: cojinería, tapates, forros para sillas, forros timón, tapetes, parasol, cables, cargadores, porta celulares, sillas para bebés, entre otros…"
    );
    const [textoAccesoriosExterior, setTextoAccesoriosExterior] = useState(
        "Acá podrás vender productos como: maletas de techo, portabicicletas, tiros de arrastre, equipo de viaje y ampliación de capacidad de carga y forros carros, entre otros…"
    );
    const [textoSonido, setTextoSonido] = useState(
        "Acá podrás vender productos como: radios, pantallas de video, amplificadores y parlantes, GPS, entre otros…"
    );

    const [mostrarTexto, setMostrarTexto] = useState("");
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        if (categoria == 1) {
            setMostrarTexto(textoEsteticos);
            setTitulo("Estéticos y cuidados del vehículo");
        } else if (categoria == 2) {
            setMostrarTexto(textoAccesoriosInterior);
            setTitulo("Accesorios interior");
        } else if (categoria == 3) {
            setMostrarTexto(textoAccesoriosExterior);
            setTitulo("Accesorios exterior");
        } else if (categoria == 4) {
            setMostrarTexto(textoSonido);
            setTitulo("Sistemas de sonido y entretenimiento");
        } else if (categoria === 5) {
            setMostrarTexto(textoIluminacion);
            setTitulo(
                "Iluminación, exploradoras y partes eléctricas genéricas"
            );
        } else if (categoria === 6) {
            setMostrarTexto(textoLubricantesFluidos);
            setTitulo("Lubricantes y fluidos");
        } else if (categoria === 7) {
            setMostrarTexto(textoLlantasRines);
            setTitulo("Llantas y rines");
        } else if (categoria === 8) {
            setMostrarTexto(textoBaterias);
            setTitulo("Baterías");
        } else if (categoria === 9) {
            setMostrarTexto(textoPlumillas);
            setTitulo("Plumillas");
        } else if (categoria === 10) {
            setMostrarTexto(textoKitCarretera);
            setTitulo("Herramientas y kit de carretera");
        } else {
            setMostrarTexto("por definir");
            setTitulo("Pendiente");
        }
    }, [categoria]);

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={11} lg={11} md={11} sm={11} className="mb-10">
                            <div className="tamañotextotitulocategorias">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>

                <div className="ml-20 mr-30">
                    <h3 className=" textomodalinfpocategorias">
                        {mostrarTexto}
                    </h3>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalComentariosCategorias;
