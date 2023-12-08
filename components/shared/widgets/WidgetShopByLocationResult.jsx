import React, { useEffect, useState } from "react";
import ModalLocationResult from "../../../pages/mensajes/ModalLocationResult";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import ModalMensajesCity from "../../../pages/mensajes/ModalMensajesCity";
import { Box, Grid } from "@mui/material";

//let ciudades = [];
//let ciudadessel = [];

let ciudadesAlt = [];
let ciudadesselAlt = [];

const WidgetShopByLocationResult = (props) => {
    const {
        cantidadPrdCiudad,
        setActivar,
        PrdCiudadUno,
        PrdCiudadDos,
        setSelected,
        marcaSelected,
        setmarcaSelected,
        setActivaCiudad,
        activaCiudad,
        itemSel,
        setitemSel,
        setCerrarFiltro,
        cerrarFiltro,
        setEraseCitySel,
        eraseCitySel,
        setCitySelected,
        citySelected,
        filtroCond,
        setIrInicio,
        setActCiy,
        setPaginaSel,
        setitemIni,
        setItemFin,
        setclearFiltroCity,
    } = props;

    const [cantidadCiudades, setCantidadCiudades] = useState(0);
    const [mostrarMas, setMostrarMas] = useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    const [showModalMensajesCity, setShowModalMensajesCity] = useState(false);
    const [tituloMensajesCity, setTituloMensajesCity] = useState("");
    const [textoMensajesCity, setTextoMensajesCity] = useState("");
    const [textoBoton, setTextoBoton] = useState("Cerrar");

    const [cambia, setCambia] = useState(false);
    const [activarCity, setActivarCity] = useState(false);

    const [abrirModal, setAbrirModal] = useState(false);

    const [ciudades, setCiudades] = useState([]);
    const [ciudadesSel, setCiudadesSel] = useState([]);
    const [classCity, setClassCity] = useState("form-group");

    //console.log("CANTDA : ", cantidadPrdCiudad)

    useEffect(() => {
        if (cerrarFiltro) {
            setCiudades([]);
            setCiudadesSel([]);
            ciudadesAlt = [];
            ciudadesselAlt = [];
            setCerrarFiltro(false);
        }
    }, [cerrarFiltro]);

    const limpiarFiltro = () => {
        setActivar("habilitar");
        setCiudades([]);
        setCitySelected([]);
        setCiudadesSel([]);
        ciudadesAlt = [];
        ciudadesselAlt = [];
        setCerrarFiltro(false);
        setSelected([]);
        setActivaCiudad(false);
        setActCiy(true);
        setIrInicio(true);
        setPaginaSel(1);
        setitemIni(1);
        setItemFin(40);
        setclearFiltroCity(true);
    };

    useEffect(() => {
        let long = cantidadPrdCiudad.length;
        setCantidadCiudades(long);
        if (long > 5) setMostrarMas(true);
    }, [cantidadPrdCiudad]);

    useEffect(() => {
        ciudadesAlt = [];
        ciudadesselAlt = [];
    }, []);

    useEffect(() => {
        if (activarCity) {
            setActivarCity(false);
            setActivar("habilitar");
        }
    }, [activarCity]);

    const activarAyuda = () => {
        setActivar("deshabilitar");
        setShowModalMensajes(true);
        setTituloMensajes("Ubicación de los productos");
        setTextoMensajes("");
        setSelected([]);
        setCiudades([]);
        setCiudadesSel([]);
        ciudadesAlt = [];
        ciudadesselAlt = [];
        setActivaCiudad(false);
        setitemSel(100000000);
        setmarcaSelected("");
        setIrInicio(true);
        setPaginaSel(1);
        setitemIni(1);
        setItemFin(40);
        //return;
    };

    useEffect(() => {
        if (abrirModal) {
            setShowModalMensajesCity(true);
            setTituloMensajesCity("Filtro por Ubicación");
            setTextoMensajesCity(
                "Puedes escoger un maximo de cuatro ciudades!"
            );
            setActivar("deshabilitar");
            setAbrirModal(false);
            return;
        }
    }, [abrirModal]);

    useEffect(() => {
        if (ciudadesAlt.length > 4) {
            setActivar("deshabilitar");
            setShowModalMensajesCity(true);
            setTituloMensajesCity("Filtro por Ubicación");
            setTextoMensajesCity(
                "Puedes escoger un maximo de cuatro ciudades!"
            );
            //setActivar("deshabilitar");
            return;
        }
    }, [ciudadesAlt.length]);

    const filtrar = () => {
        if (ciudadesAlt.length > 4) {
            setActivar("deshabilitar");
            setShowModalMensajesCity(true);
            setTituloMensajesCity("Filtro por Ubicación");
            setTextoMensajesCity(
                "Puedes escoger un maximo de cuatro ciudades!"
            );

            return;
        } else {
            if (ciudadesselAlt.length > 0 && ciudadesAlt.length > 0) {
                setCitySelected(ciudadesselAlt);
                //setSelected(ciudadesAlt);
                setActCiy(true);
                setActivaCiudad(true);
                setIrInicio(true);
                setPaginaSel(1);
                setitemIni(1);
                setItemFin(40);
                //ciudades = [];
                //setActivar("habilitar");
            }
        }
    };

    const control = () => {
        //setCambia(!cambia);
    };

    useEffect(() => {
        if (eraseCitySel > 0) {
            if (ciudades.includes(eraseCitySel)) {
                let idcity = ciudades;
                let idcitysel = citySelected;

                setSelected([]);
                setCiudades([]);
                setCiudadesSel([]);
                ciudadesAlt = [];
                ciudadesselAlt = [];

                let idcitydos = [];
                let idcitydossel = [];

                idcity &&
                    idcity.map((row, index) => {
                        if (row != eraseCitySel) {
                            idcitydos.push(row);
                            setmarcaSelected("");
                        }
                    });

                idcitysel &&
                    idcitysel.map((row, index) => {
                        if (parseInt(row.idciu) != parseInt(eraseCitySel)) {
                            idcitydossel.push(row);
                            setmarcaSelected("");
                        }
                    });

                setCiudades(idcitydos);
                setCiudadesSel(idcitydossel);
                setSelected(idcitydossel);
                setCitySelected(idcitydossel);

                setCambia(!cambia);
                setEraseCitySel(0);
            }
        }
    }, [eraseCitySel]);

    const SelectCity = (item, ciudad, nombreciu) => {
        //console.log("CUDA : ", item, ciudad, nombreciu);
        if (ciudades.includes(ciudad)) {
        } else {
            setitemSel(item);
            setmarcaSelected("subrayartexto");
            //setActivaCiudad(!activaCiudad);
            ciudadesAlt.push(item);
            setCiudades(ciudadesAlt);

            //setActCiy(true);
            let row = {
                id: item,
                idciu: ciudad,
                nombreciu: nombreciu,
            };
            ciudadesselAlt.push(row);
            //setCitySelected(ciudadesselAlt);
            //setCiudadesSel(ciudadesselAlt);
        }
    };
    
    //console.log("CIUDADES : ", cantidadPrdCiudad, ciudades);
    
    return (
        <aside className="widget widget_shop widget_rating">
            <ModalMensajesCity
                shown={showModalMensajesCity}
                close={setShowModalMensajesCity}
                titulo={tituloMensajesCity}
                mensaje={textoMensajesCity}
                setActivarCity={setActivarCity}
                textoBoton={textoBoton}
                tipo="6"
            />

            <ModalLocationResult
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                setActivar={setActivar}
                PrdCiudadUno={PrdCiudadUno}
                PrdCiudadDos={PrdCiudadDos}
                setSelected={setSelected}
                marcaSelected={marcaSelected}
                setmarcaSelected={setmarcaSelected}
                ciudades={ciudades}
                setCiudades={setCiudades}
                ciudadesSel={ciudadesSel}
                setCiudadesSel={setCiudadesSel}
                setActivaCiudad={setActivaCiudad}
                setAbrirModal={setAbrirModal}
                setCitySelected={setCitySelected}
            />
            <div className="tamañotextotitulocondicion">Por ubicación</div>
            <div className="widget__content tamañotextofiltroresultcondicion">
                <div>
                    {cantidadPrdCiudad &&
                        cantidadPrdCiudad.map((item, index) => {
                            return (
                                <div className={classCity}>
                                    {index < 5 ? (
                                        <div
                                            onMouseEnter={() => control()}
                                            className="mt-3"
                                            onClick={() =>
                                                SelectCity(
                                                    index,
                                                    item.ciudad,
                                                    item.nombre_ciu
                                                )
                                            }>
                                            {cambia || !cambia ? (
                                                ciudades.includes(index) ? (
                                                    <Row className="mtmenos25">
                                                        <Col
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <i
                                                                className="iconochecklocation fa fa-check-square-o"
                                                                aria-hidden="true"></i>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={12}
                                                            md={7}
                                                            lg={7}>
                                                            <div className="tamañoletra11">
                                                                {
                                                                    item.nombre_ciu
                                                                }{" "}
                                                            </div>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="tamañoletra11">
                                                                (
                                                                {
                                                                    item.productosciudad
                                                                }
                                                                )
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    <Row className="mtmenos25">
                                                        <Col
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div
                                                                className="iconochecklocation fa fa-square-o"
                                                                aria-hidden="true"></div>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={12}
                                                            md={7}
                                                            lg={7}>
                                                            <div className="tamañoletra11">
                                                                {
                                                                    item.nombre_ciu
                                                                }{" "}
                                                            </div>
                                                        </Col>
                                                        <Col
                                                            item
                                                            xs={12}
                                                            md={1}
                                                            lg={1}>
                                                            <div className="tamañoletra11">
                                                                (
                                                                {
                                                                    item.productosciudad
                                                                }
                                                                )
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    <div className="mtmenos5">
                        <div
                            className="textomostrarmas"
                            onClick={() => activarAyuda()}>
                            Mostrar más
                        </div>
                        <Row>
                            <Col xs={5} sm={5} md={5} lg={5}>
                                <Button
                                    variant="outline-light"
                                    onClick={() => limpiarFiltro()}
                                    className="limpiarfiltrocity">
                                    Limpiar
                                </Button>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <Button
                                    variant="outline-light"
                                    onClick={() => filtrar()}
                                    className="confirmarcity">
                                    Aceptar
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default WidgetShopByLocationResult;
