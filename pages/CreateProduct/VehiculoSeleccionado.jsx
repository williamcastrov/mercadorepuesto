import React, { useRef, useState, useEffect } from "react";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
    Tooltip,
    Overlay,
} from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import { useDispatch, useSelector } from "react-redux";

function VehiculoSeleccionado(props) {
    const {
        tipoVeh,
        marcaVeh,
        annoVeh,
        modeloVeh,
        carroceriaVeh,
        cilindrajesVeh,
        transmisionVeh,
        traccionVeh,
        combustibleVeh,
        setNumeroVehiculo,
        numeroVehiculo,
        tamano,
        setTamaño,
        editarVehiculo,
        setEditarVehiculo,
        mostrarDatosVehiculos,
        setMostrarDatosVehiculos,
        duplicarVehiculo,
        setDuplicarVehiculo,
        setLoading,
        loading,
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const targetedit = useRef(null);
    const targetcopy = useRef(null);
    const [cambia, setCambia] = useState(false);

    const [vehiculos, setVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    const [nombreMarca, setNombreMarca] = useState("");

    // Lee modelos de los Vehiculos del state
    const datoscrearproductosmodelos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    //console.log("MODELOS CREAR PRODUCTOS : ", datoscrearproductosmodelos);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductoscilindrajes = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    useEffect(() => {
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));
        setListMarcas(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));
        setListCarrocerias(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        setListModelos(datoscrearproductosmodelos);
        setListCilindrajes(datoscrearproductoscilindrajes);
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        setLoading(true);
        setCambia(true);
    }, []);

    useEffect(() => {
        if (cambia) {
            const newNombreMarca = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (Number.parseInt(row.id) === Number.parseInt(marcaVeh)) {
                        setNombreMarca(row.text);
                    }
                });
            setLoading(false);
            setCambia(false);
        }
    }, [cambia]);

    const editarDatosVehiculos = () => {
        setNumeroVehiculo(numeroVehiculo);
        setTamaño("col-12 col-md-6");
        setEditarVehiculo(true);
        setMostrarDatosVehiculos(false);
        //setLoading(true);
    };

    const duplicarDatosVehiculos = () => {
        setDuplicarVehiculo(!duplicarVehiculo);
        setLoading(true);
        setNumeroVehiculo(numeroVehiculo);
        setCambia(true);
        //console.log("NUMERO VEHICULO : ", numeroVehiculo);
    };

    return (
        <div className="mt-4">
            {numeroVehiculo === 1 ? (
                <div>
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <div className="ps-form__input mostrarvehiculoseleccionado">
                                {numeroVehiculo}
                                {tipoVeh} {marcaVeh} {nombreMarca} {annoVeh}{" "}
                                {modeloVeh}
                                {carroceriaVeh} {cilindrajesVeh} {" cc"}{" "}
                                {transmisionVeh} {traccionVeh}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input ml-70 textoeditardatosvehiculo">
                                <i
                                    onClick={() => editarDatosVehiculos()}
                                    class="ml-1 mt-1 fa fa-edit d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetedit}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
                            </div>

                            <Overlay
                                className=""
                                target={targetedit.current}
                                show={showEdit}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Editar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input ml-70 textoeditardatosvehiculo">
                                <i
                                    onClick={() => duplicarDatosVehiculos()}
                                    class="mt-1 fa fa-copy d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetcopy}
                                    onMouseOver={() => setShowCopy(true)}
                                    onMouseOut={() => setShowCopy(false)}></i>
                            </div>
                            <Overlay
                                target={targetcopy.current}
                                show={showCopy}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Duplicar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            ) : 
            numeroVehiculo === 2 ? (
                <div>
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <div className="ps-form__input mostrarvehiculoseleccionado">
                                {numeroVehiculo}
                                {tipoVeh} {marcaVeh} {nombreMarca} {annoVeh}{" "}
                                {modeloVeh}
                                {carroceriaVeh} {cilindrajesVeh} {" cc"}{" "}
                                {transmisionVeh} {traccionVeh}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input ml-70 textoeditardatosvehiculo">
                                <i
                                    onClick={() => editarDatosVehiculos()}
                                    class="ml-1 mt-1 fa fa-edit d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetedit}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
                            </div>

                            <Overlay
                                className=""
                                target={targetedit.current}
                                show={showEdit}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Editar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input ml-70 textoeditardatosvehiculo">
                                <i
                                    onClick={() => duplicarDatosVehiculos()}
                                    class="mt-1 fa fa-copy d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetcopy}
                                    onMouseOver={() => setShowCopy(true)}
                                    onMouseOut={() => setShowCopy(false)}></i>
                            </div>
                            <Overlay
                                target={targetcopy.current}
                                show={showCopy}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Duplicar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            ) : null
            }
        </div>
    );
}

export default VehiculoSeleccionado;
