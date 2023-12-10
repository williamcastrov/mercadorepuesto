import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import { Row, Col, Dropdown, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesValidar from "../mensajes/ModalMensajesValidar";
import ModalMensajesEliminar from "../mensajes/ModalMensajesEliminar";
import ModalMensajesTipoVehiculo from "../mensajes/ModalMensajesTipoVehiculo";
import axios from "axios";

import ReactTooltip from "react-tooltip";
import { getTypesVehicles } from "../../store/typesvehicles/action";

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it

function MostrarVehiculos(props) {
    const {
        arrayVehiculosTemporal,
        setArrayVehiculosTemporal,
        setIdProducto,
        setcodigoProducto,
        editarProducto,
        setEditarProducto,
        setVehiculoUno,
        setArraySelectEdit,
        setListadoCarrocerias,
        setListadoMarcas,
        setListadoModelos,
        setListadoCilindrajes,
        setDuplicarProducto,
        duplicarProducto,
        numeroVehiculosAgregados,
        setBorrarProducto,
        marcarItem,
        setMarcarItem,
        marcarItemDuplicar,
        setMarcarItemDuplicar,
        setModeloCodigo,
        setCilindrajeCodigo,
        vehiculoUno,
        controlNuevo,
        abrioLatoneria,
    } = props;

    const [continuarRegistro, setContinuarRegistro] = useState(false);
    const [abandonarRegistro, setAbandonarRegistro] = useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);
    const [asignarTipo, setAsignarTipo] = useState(false);
    const [conservarTipo, setConservarTipo] = useState(false);

    //Datos producto seleccionado
    const [idprd, setIdPrd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [editarSelect, setEditarSelect] = useState(
        "form-control cajaiconomostrareditar textoeditardatosvehiculo tamañoiconoadvertencia"
    );
    const [doubleSelect, setDoubleSelect] = useState(
        "form-control cajaiconomostrarduplicar mlmenos12 textoeditardatosvehiculo tamañoiconoadvertencia"
    );
    const [deleteSelect, setDeleteSelect] = useState(false);

    const [showModalMensajesValidar, setShowModalMensajesValidar] =
        useState(false);
    const [showModalMensajesEliminar, setShowModalMensajesEliminar] =
        useState(false);
    const [showModalMensajesTipoVeh, setShowModalMensajesTipoVeh] =
        useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [textoMensajesAlterno, setTextoMensajesAlterno] = useState(false);

    const datoscarrocerias = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_carroceriasvehiculos
    );

    const datosmarcas = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_marcasvehiculos
    );

    const datosmodelos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    const datoscilindrajes = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );
    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);
    

    useEffect(() => {
        if (editarProducto && !duplicarProducto)
            setEditarSelect(
                "form-control cajaiconomostrareditarselect textoeditardatosvehiculo tamañoiconoadvertencia"
            );
        else
            setEditarSelect(
                "form-control cajaiconomostrareditar textoeditardatosvehiculo tamañoiconoadvertencia"
            );
    }, [editarProducto]);

    useEffect(() => {
        if (duplicarProducto && !editarProducto)
            setDoubleSelect(
                "form-control cajaiconomostrarduplicarselect mlmenos12 textoeditardatosvehiculo tamañoiconoadvertencia"
            );
        else
            setDoubleSelect(
                "form-control cajaiconomostrarduplicar mlmenos12 textoeditardatosvehiculo tamañoiconoadvertencia"
            );
    }, [duplicarProducto]);

    const editarDatosVehiculos = (idproducto, codigoproducto) => {
        if (duplicarProducto || vehiculoUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo!"
            );
            return;
        }

        if (editarProducto || vehiculoUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo!"
            );
            return;
        }
        setEditarProducto(true);
        setDuplicarProducto(false);
        setVehiculoUno(false);
        setIdProducto(idproducto);
        setcodigoProducto(codigoproducto);
        setMarcarItem(idproducto);

        let itemselect = [];
        {
            arrayVehiculosTemporal &&
                arrayVehiculosTemporal.map((item) => {
                    if (item.id === idproducto) {
                        setModeloCodigo(item.modelo);
                        setCilindrajeCodigo(item.cilindraje);
                        let row = {
                            anno: item.anno,
                            carroceria: item.carroceria,
                            cilindraje: item.cilindraje,
                            combustible: item.combustible,
                            comparar: item.comparar,
                            estado: item.estado,
                            fecha: item.fecha,
                            id: item.id,
                            idtipoproducto: item.idtipoproducto,
                            marca: item.marca,
                            modelo: item.modelo,
                            selectanno: item.selectanno,
                            selectcarroceria: item.selectcarroceria,
                            selectcilindraje: item.selectcilindraje,
                            selectcombustible: item.selectcombustible,
                            selectmarca: item.selectmarca,
                            selectmodelo: item.selectmodelo,
                            selecttipo: item.selecttipo,
                            selecttraccion: item.selecttraccion,
                            selecttransmision: item.selecttransmision,
                            tipovehiculo: item.tipovehiculo,
                            traccion: item.traccion,
                            transmision: item.transmision,
                        };
                        itemselect.push(row);
                    }
                });
        }
        //console.log("ITEM SELECT : ", itemselect[0].tipovehiculo)
        setArraySelectEdit(itemselect);
        //console.log("DATOS SELECT : ", itemselect)
        let newDetMarcas = [];
        datosmarcas &&
            datosmarcas.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(itemselect[0].tipovehiculo) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(itemselect[0].carroceria)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipoVeh: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDetMarcas.push(item);
                }
            });

        setListadoMarcas(newDetMarcas);

        let newDetMod = [];

        datosmodelos &&
            datosmodelos.forEach((row) => {
                if (
                    Number.parseInt(row.marca) ===
                        Number.parseInt(itemselect[0].marca) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(itemselect[0].carroceria)
                ) {
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipoVeh: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDetMod.push(item);
                }
            });

        //console.log("MODELOS : ", newDetMod);
        setListadoModelos(newDetMod);

        let newDetCilindraje = [];
        datoscilindrajes &&
            datoscilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.modelo) ===
                    Number.parseInt(itemselect[0].modelo)
                ) {
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipoVeh: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.cilindraje,
                        marca: row.marca,
                        modelo: row.modelo,
                    };

                    newDetCilindraje.push(item);
                }
            });
        setListadoCilindrajes(newDetCilindraje);

        let newDet = [];
        datoscarrocerias &&
            datoscarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(itemselect[0].tipovehiculo)
                ) {
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipoVeh: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                        text: row.carroceria,
                    };
                    newDet.push(item);
                }
            });
        setListadoCarrocerias(newDet);
    };

    const duplicarDatosVehiculos = (
        idproducto,
        codigoproducto,
        idmarca,
        idmodelo,
        idcilindraje
    ) => {
        if (idmarca > 299999 || idmodelo > 299999 || idcilindraje > 299999) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, no puedes duplicar un vehículo nuevo!");
            return;
        }
        /*
        alert("ENTRE")
        alert(vehiculoUno)
        alert(controlNuevo)
        return
*/
        if (duplicarProducto || vehiculoUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo!"
            );
            return;
        }

        if (editarProducto || vehiculoUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo!"
            );
            return;
        }

        if (numeroVehiculosAgregados >= 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Número de vehículos no puede ser mayor a 10-0!");
            return;
        }

        setDuplicarProducto(true);
        setEditarProducto(false);
        setVehiculoUno(false);
        setIdProducto(idproducto);
        setcodigoProducto(codigoproducto);
        setMarcarItemDuplicar(idproducto);

        let itemselect = [];
        {
            arrayVehiculosTemporal &&
                arrayVehiculosTemporal.map((item) => {
                    if (item.id === idproducto) {
                        let row = {
                            anno: item.anno,
                            carroceria: item.carroceria,
                            cilindraje: item.cilindraje,
                            combustible: item.combustible,
                            comparar: item.comparar,
                            estado: item.estado,
                            fecha: item.fecha,
                            id: item.id,
                            idtipoproducto: item.idtipoproducto,
                            marca: item.marca,
                            modelo: item.modelo,
                            selectanno: item.selectanno,
                            selectcarroceria: item.selectcarroceria,
                            selectcilindraje: item.selectcilindraje,
                            selectcombustible: item.selectcombustible,
                            selectmarca: item.selectmarca,
                            selectmodelo: item.selectmodelo,
                            selecttipo: item.selecttipo,
                            selecttraccion: item.selecttraccion,
                            selecttransmision: item.selecttransmision,
                            tipovehiculo: item.tipovehiculo,
                            traccion: item.traccion,
                            transmision: item.transmision,
                        };
                        itemselect.push(row);
                    }
                });
        }
        //console.log("ITEM SELECT : ", itemselect[0].tipovehiculo)
        setArraySelectEdit(itemselect);

        let newDetMarcas = [];
        datosmarcas &&
            datosmarcas.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(itemselect[0].tipovehiculo) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(itemselect[0].carroceria)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipoVeh: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDetMarcas.push(item);
                }
            });

        setListadoMarcas(newDetMarcas);

        let newDetMod = [];
        datosmodelos &&
            datosmodelos.forEach((row) => {
                if (
                    Number.parseInt(row.marca) ===
                        Number.parseInt(itemselect[0].marca) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(itemselect[0].carroceria)
                ) {
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipoVeh: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDetMod.push(item);
                }
            });

        //console.log("MODELOS : ", newDetMod);
        setListadoModelos(newDetMod);

        let newDetCilindraje = [];
        datoscilindrajes &&
            datoscilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.modelo) ===
                    Number.parseInt(itemselect[0].modelo)
                ) {
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipoVeh: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.cilindraje,
                        marca: row.marca,
                        modelo: row.modelo,
                    };

                    newDetCilindraje.push(item);
                }
            });
        setListadoCilindrajes(newDetCilindraje);

        let newDet = [];

        datoscarrocerias &&
            datoscarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(itemselect[0].tipovehiculo)
                ) {
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipoVeh: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                        text: row.carroceria,
                    };
                    newDet.push(item);
                }
            });
        setListadoCarrocerias(newDet);
    };

    const eliminarDatos = (idproducto, codigoproducto) => {
        if (duplicarProducto || vehiculoUno || editarProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo!"
            );
            return;
        }

        setMarcarItem(idproducto);
        setIdPrd(idproducto);
        setShowModalMensajesEliminar(true);
        setTituloMensajes("Información del producto");
        setTextoMensajes("¿Seguro que desea eliminar este vehículo ?");
    };

    useEffect(() => {
        setShowModalMensajesEliminar(false);
        if (abandonarEliminar) {
            setAbandonarEliminar(false);
            setMarcarItem(0);
        }

        if (continuarEliminar) {
            const actualizarTemporal = async () => {
                const params = {
                    id: idprd,
                };

                if (duplicarprd == 0) {
                    await axios({
                        method: "post",
                        url: "https://gimcloud.com.co/mrp/api/35",
                        params,
                    })
                        .then((res) => {
                            console.log(
                                "Borra Producto Temporal OK: ",
                                res.data
                            );
                            if (
                                arrayVehiculosTemporal.length == 1 &&
                                abrioLatoneria
                            ) {
                                location.reload();
                            }
                            setBorrarProducto(true);
                            setContinuarEliminar(false);
                        })
                        .catch(function (error) {
                            console.log(
                                "Borra Producto Temporal Error: ",
                                res.data
                            );
                        });
                } else if (duplicarprd == 2) {
                    let nvoarray = [];
                    if(arrayVehiculosTemporal.length == 1){
                        setShowModalMensajes(true);
                        setContinuarEliminar(false);
                        setTituloMensajes("Duplicar publicación");
                        setTextoMensajes(
                            "Heey, no puedes eliminar todos los vehículos!"
                        );
                        return;
                    }

                    arrayVehiculosTemporal &&
                        arrayVehiculosTemporal.map((items) => {
                            if (items.id != idprd) nvoarray.push(items);
                        });
                    setArrayVehiculosTemporal(nvoarray);
                    setBorrarProducto(true);
                    setContinuarEliminar(false);
                }
            };
            actualizarTemporal();
        }
    }, [continuarEliminar, abandonarEliminar]);

    const onEdit = () => {
        setShowEdit(true);
    };
    const offEdit = () => {
        setShowEdit(false);
    };
    const onCopy = () => {
        setShowCopy(true);
    };
    const offCopy = () => {
        setShowCopy(false);
    };
    const onDelete = () => {
        setShowDelete(true);
    };
    const offDelete = () => {
        setShowDelete(false);
    };

    return (
        <div className="mt-2 ml-10">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesValidar
                shown={showModalMensajesValidar}
                setContinuarRegistro={setContinuarRegistro}
                setAbandonarRegistro={setAbandonarRegistro}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesEliminar
                shown={showModalMensajesEliminar}
                setContinuarEliminar={setContinuarEliminar}
                setAbandonarEliminar={setAbandonarEliminar}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesTipoVehiculo
                shown={showModalMensajesTipoVeh}
                setAsignarTipo={setAsignarTipo}
                setConservarTipo={setConservarTipo}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                mensajeAlterno={textoMensajesAlterno}
                tipo="1"
            />
            <div className="mt-3">
               
                {arrayVehiculosTemporal &&
                    arrayVehiculosTemporal.map((item) => {
                        return (
                            <div className="mt-6">
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <div className="ps-form__input mostrarvehiculoseleccionado">
                                            <Row>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    xs={1}>
                                                    {marcarItem == item.id ||
                                                    marcarItemDuplicar ==
                                                        item.id ? (
                                                        <i
                                                            className="mlmenos10 mt-2 textocolor fa fa-check-circle"
                                                            aria-hidden="true"></i>
                                                    ) : null}
                                                </Col>
                                                <Col
                                                    xl={11}
                                                    lg={11}
                                                    md={11}
                                                    xs={11}>
                                                    <div className="mlmenos40 mtmenos10 textomodalinfoproductos">
                                                        {item.selecttipo}{" "}
                                                        {item.selectcarroceria}{" "}
                                                        {item.selectmarca}{" "}
                                                        {item.selectanno}{" "}
                                                        {item.selectmodelo}{" "}
                                                        {item.selectcilindraje}{" "}
                                                        {item.selecttraccion}{" "}
                                                        {item.selectcombustible}{" "}
                                                        {item.selecttransmision}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        {marcarItem == item.id ? (
                                            <div
                                                className={editarSelect}
                                                onMouseEnter={() => onEdit()}
                                                onMouseLeave={() => offEdit()}>
                                                <i
                                                    onClick={() =>
                                                        editarDatosVehiculos(
                                                            item.id,
                                                            item.idtipoproducto
                                                        )
                                                    }
                                                    className="mlrem-3 mt-1 fa fa-edit d-flex justify-content-center"
                                                    data-tip
                                                    data-for="registerEdit"></i>
                                            </div>
                                        ) : (
                                            <div
                                                className="form-control cajaiconomostrareditar textoeditardatosvehiculo tamañoiconoadvertencia"
                                                onMouseEnter={() => onEdit()}
                                                onMouseLeave={() => offEdit()}>
                                                <i
                                                    onClick={() =>
                                                        editarDatosVehiculos(
                                                            item.id,
                                                            item.idtipoproducto
                                                        )
                                                    }
                                                    className="mlrem-3 mt-1 fa fa-edit d-flex justify-content-center"
                                                    data-tip
                                                    data-for="registerEdit"></i>
                                            </div>
                                        )}
                                        {showEdit ? (
                                            <ReactTooltip
                                                className="ubicartooltipproducto"
                                                id="registerEdit"
                                                arrowColor="#2D2E83"
                                                place="top"
                                                effect="solid">
                                                <h3 className="mtmenos10 tamañotextotooltipproducto">
                                                    Editar
                                                </h3>
                                            </ReactTooltip>
                                        ) : null}
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        {marcarItemDuplicar == item.id ? (
                                            <div className={doubleSelect}>
                                                <i
                                                    onClick={() =>
                                                        duplicarDatosVehiculos(
                                                            item.id,
                                                            item.idtipoproducto,
                                                            item.marca,
                                                            item.modelo,
                                                            item.cilindraje
                                                        )
                                                    }
                                                    className="mt-1 fa fa-copy d-flex justify-content-center"
                                                    data-tip
                                                    data-for="registerCopy"
                                                    onMouseEnter={() =>
                                                        onCopy()
                                                    }
                                                    onMouseLeave={() =>
                                                        offCopy()
                                                    }></i>
                                            </div>
                                        ) : (
                                            <div className="form-control cajaiconomostrarduplicar mlmenos12 textoeditardatosvehiculo tamañoiconoadvertencia">
                                                <i
                                                    onClick={() =>
                                                        duplicarDatosVehiculos(
                                                            item.id,
                                                            item.idtipoproducto,
                                                            item.marca,
                                                            item.modelo,
                                                            item.cilindraje
                                                        )
                                                    }
                                                    className="mt-1 fa fa-copy d-flex justify-content-center"
                                                    data-tip
                                                    data-for="registerCopy"
                                                    onMouseEnter={() =>
                                                        onCopy()
                                                    }
                                                    onMouseLeave={() =>
                                                        offCopy()
                                                    }></i>
                                            </div>
                                        )}
                                        {showCopy ? (
                                            <ReactTooltip
                                                className="ubicartooltipproducto"
                                                id="registerCopy"
                                                arrowColor="#2D2E83"
                                                place="top"
                                                effect="solid">
                                                <h3 className="mtmenos10 tamañotextotooltipproducto">
                                                    Duplicar
                                                </h3>
                                            </ReactTooltip>
                                        ) : null}
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="form-control cajaiconomostrareliminar textoeditardatosvehiculo
                                                        tamañoiconoadvertencia">
                                            <i
                                                onClick={() =>
                                                    eliminarDatos(
                                                        item.id,
                                                        item.idtipoproducto
                                                    )
                                                }
                                                className="mt-1 fa fa-trash d-flex justify-content-center"
                                                data-tip
                                                data-for="registerDelete"
                                                onMouseEnter={() => onDelete()}
                                                onMouseLeave={() =>
                                                    offDelete()
                                                }></i>
                                        </div>
                                        {showDelete ? (
                                            <ReactTooltip
                                                className="ubicartooltipproducto"
                                                id="registerDelete"
                                                arrowColor="#2D2E83"
                                                place="top"
                                                effect="solid">
                                                <h1 className="mtmenos10 tamañotextotooltipproducto">
                                                    Eliminar
                                                </h1>
                                            </ReactTooltip>
                                        ) : null}
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default MostrarVehiculos;
