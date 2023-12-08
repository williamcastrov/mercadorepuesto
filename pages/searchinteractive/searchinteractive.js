import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useDispatch, useSelector } from "react-redux";
import { getTypesVehicles } from "../../store/typesvehicles/action";
import { getEditDataFind } from "../../store/editdatafind/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import { MultiSelect } from "react-multi-select-component";
import { getDataSearchInteractive } from "../../store/datasearchinteractive/action";
import { getDataSelectSearch } from "../../store/dataselectsearch/action";
import { getEditData } from "../../store/editdata/action";

import ReactTooltip from "react-tooltip";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
        &#x25bc;
    </a>
));

let dato = [];
let controltraccion = 0;

const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchdos"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value)}
                //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                { }
            </div>
        );
    }
);

const CustomMenuModels = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañofinditemssearchmodels"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value)}
                //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                { }
            </div>
        );
    }
);

function SearchInteractive() {
    const router = useRouter();
    const controlAnno = useRef();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());

    const [showEdit, setShowEdit] = useState(false);

    const [listTiposVehiculos, setListtiposVehiculos] = useState([]);
    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );
    const [listAnnosVehiculos, setListAnnosVehiculos] = useState([]);

    // Arreglo version de motores segun modelo Selecciondo
    const [tipoVehiculo, setTipoVehiculo] = useState(0);
    const [carroceriaVehiculo, setCarroceriaVehiculo] = useState(0);
    const [marcaVehiculo, setMarcaVehiculo] = useState(0);
    const [annoVehiculo, setAnnoVehiculo] = useState([]);
    const [modeloVehiculo, setModeloVehiculo] = useState([]);
    const [cilindrajeVehiculo, setCilindrajeVehiculo] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [tipoCombustible, setTipoCombustible] = useState(0);
    const [tipoTransmision, setTipoTransmision] = useState(0);
    const [tipoTraccion, setTipoTraccion] = useState(0);

    const [alertarTipo, setAlertarTipo] = useState("textoalertdos");
    const [alertarCarroceria, setAlertarCarroceria] = useState("textoalertdos");
    const [alertarMarca, setAlertarMarca] = useState("textoalertdos");
    const [alertarModelo, setAlertarModelo] = useState("textoalertdos");

    const [mostrarTransmision, setMostrarTransmision] = useState("mostrar-div");
    const [mostrarTraccion, setMostrarTraccion] = useState("mostrar-div");
    const [mostrarCombustible, setMostrarCombustible] = useState("mostrar-div");

    //const [disabledTipo, setDisabledTipo] = useState(false);
    const [disabledCarroceria, setDisabledCarroceria] = useState(false);
    const [disabledMarca, setDisabledMarca] = useState(false);
    const [disabledModelo, setDisabledModelo] = useState(false);
    const [disabledAnno, setDisabledAnno] = useState("habilitar");
    const [disabledCilindraje, setDisabledCilindraje] = useState(false);
    const [disabledCombustible, setDisabledCombustible] = useState(false);
    const [disabledTransmision, setDisabledTransmision] = useState(false);
    const [disabledTraccion, setDisabledTraccion] = useState(false);

    const [alertaTipo, setAlertaTipo] = useState("");
    const [alertaCarroceria, setAlertaCarroceria] = useState("");
    const [alertaMarca, setAlertaMarca] = useState("");
    const [alertaModelos, setAlertaModelos] = useState("");

    const [nombreTipoVeh, setNombreTipoVeh] = useState("Tipo Vehículo");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState("Carrocería");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("Marca");
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("Año");
    const [nombreModeloVeh, setNombreModeloVeh] = useState("Modelo");
    const [nombreModeloBase, setNombreModeloBase] = useState("");
    const [LongitudModelo, setLongitudModelo] = useState(0);
    const [nombreCilindrajeVeh, setNombreCilindrajeVeh] = useState("Cilindraje");
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState("Transmisión");
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState("Combustible");
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState("Tracción");

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [textoMensajesAlterno, setTextoMensajesAlterno] = useState(false);
    const [activar, setActivar] = useState(false);
    const [open, setOpen] = useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [marcas, setMarcas] = useState([]);
    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda
    const [modelos, setModels] = useState([]);
    // Arreglo carrocerias de los Vehiculos segun Tipo Selecciondo
    const [carrocerias, setCarrocerias] = useState([]);
    // Disparar procedimiento que lee los Tipos de Vehiculos
    const [classTransmision, setClassTransmision] = useState("alinearizquierda dropdownsearchinteractiveothers");
    const [classTraccion, setClassTraccion] = useState("ml-5 alinearizquierda dropdownsearchinteractiveothers");
    const [classCombustible, setClassCombustible] = useState("alinearizquierda dropdownsearchinteractivecombustible");
    const [classCilindraje, setClassCilindraje] = useState("alinearizquierda dropdownsearchinteractivecilindraje");

    const [cambioCilindraje, setCambioCilindraje] = useState(false);
    const [cambioTransmision, setCambioTransmision] = useState(false);
    const [cambioCombustible, setCambioCombustible] = useState(false);
    const [cambioTraccion, setCambioTraccion] = useState(false);
    const [datSearchInte, setDatSearchInte] = useState([]);

    let editardatosbuscador = [];

    editardatosbuscador = useSelector(
        (state) => state.editdatafind.editdatafind
    );

    useEffect(() => {
        //Lee datos editar variables sistema tren motriz
        if (editardatosbuscador) {
            if (editardatosbuscador.editarCilindraje) {
                setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindrajealert")
                setCambioCilindraje(true);
            } else
                setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje")

            if (editardatosbuscador.editarCombustible) {
                setClassCombustible("alinearizquierda dropdownsearchinteractivealert")
                setCambioCombustible(true);
            } else
                setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible")

            if (editardatosbuscador.editarTraccion) {
                setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothersalert")
                setCambioTraccion(true);
            } else
                setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers")

            if (editardatosbuscador.editarTransmision) {
                setClassTransmision("alinearizquierda dropdownsearchinteractiveothersalert")
                setCambioTransmision(true);
            } else
                setClassTransmision("alinearizquierda dropdownsearchinteractiveothers")
        }
    }, [editardatosbuscador]);

    let datosmodelosvehiculos = [];
    datosmodelosvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );
    let datosannos = [];
    datosannos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_annosvehiculos
    );
    let datoscilindrajevehiculos = [];
    datoscilindrajevehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );
    let datasearchinteractive = [];
    datasearchinteractive = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    let editardatos = [];
    editardatos = useSelector(
        (state) => state.editdata.editdata.editar
    );
    const [url, setUrl] = useState(
        "https://gimcloud.com.co/files/mercadorepuesto/buscador/"
    );

    useEffect(() => {
        let editdat = JSON.parse(localStorage.getItem("editdata"));
        let data = JSON.parse(
            localStorage.getItem("datasearchinteractive")
        );
        localStorage.setItem(
            "annoselect",
            JSON.stringify("")
        );
        setListtiposVehiculos(
            JSON.parse(localStorage.getItem("datostiposvehiculos"))
        );
        setListMarcasVehiculos(
            JSON.parse(localStorage.getItem("datosmarcasvehiculos"))
        );
        setListCarroceriasVehiculos(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        setListAnnosVehiculos(
            JSON.parse(localStorage.getItem("datosannosvehiculos"))
        );

        if (editardatos || editdat) {
            console.log("EDITASAS : ", datasearchinteractive.length)

            if (datasearchinteractive.length == 0) {
                setDatSearchInte(datasearchinteractive)
            } else {
                setDatSearchInte(data)
            }
            setDisabledCarroceria(false);
            setDisabledMarca(false);
            setDisabledModelo(false);
            setDisabledAnno("habilitar");
            setDisabledCilindraje(false);
            setDisabledCombustible(false);
            setDisabledTransmision(false);
            setDisabledTraccion(false);

            setTipoVehiculo(data.idvehiculo);
            setCarroceriaVehiculo(data.idcarrorecia);
            setMarcaVehiculo(data.idmarca);
            setAnnoVehiculo(data.codigoaño);
            setModeloVehiculo(data.codigomodelo);
            setCilindrajeVehiculo(data.codigocilindraje);
            setTipoCombustible(data.codigocombustible);
            setTipoTransmision(data.codigotransmision);
            setTipoTraccion(data.codigotraccion);

            setNombreTipoVeh(data.nombretipovehiculo);
            setNombreCarroceriaVeh(data.nombrecarroceria);
            setNombreMarcaVeh(data.nombremarca);

            //if (data && data.annosseleccionado.length === 0)
            if (data)
                setNombreAnnoVeh(["Año"])
            else
                setNombreAnnoVeh(data.annosseleccionado);

            setNombreModeloVeh(data.nombremodelo);
            setNombreCilindrajeVeh(data.nombrecilindraje);
            setNombreCombustibleVeh(data.nombretipocombustible);

            //alert(data.idvehiculo)

            if (data.idvehiculo != 3 && data.idvehiculo != 4) {
                setNombreTransmisionVeh(data.nombretransmision);
                setNombreTraccionVeh(data.nombretraccion);
            } else {
                setNombreTransmisionVeh("");
                setNombreTraccionVeh("");
                setNombreCombustibleVeh("");
                setDisabledTransmision(true);
                setDisabledTraccion(true);
                setDisabledCombustible(true);
                setMostrarTransmision("ocultar-div");
                setMostrarTraccion("ocultar-div");
                setMostrarCombustible("ocultar-div");
            }

            if (data.idvehiculo != 1 && data.idvehiculo != 3 &&
                data.idvehiculo != 6) {
                setNombreTraccionVeh(data.nombretraccion);
            } else {
                setNombreTraccionVeh("");
                setDisabledTraccion(true);
                setMostrarTraccion("ocultar-div");
            }

            setMarcas(data.tiposmarcas);
            setModels(data.tiposmodelos);
            setCarrocerias(data.tiposcarrocerias);
            setCilindrajes(data.tiposcilindrajes)
        }

        //console.log("DATOS AÑOS : ", datosannos)
        //setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        if (datosannos)
            setAnnos(datosannos);
    }, [editardatos, datasearchinteractive]);

    const colocarDatosState = () => {
        let nombretraccionsel;
        let item = {
            idproducto:0,
            nombreimagen1:"",
            titulonombre:"",
            cantidad: 0,
        };
        localStorage.setItem(
            "addedtocart",
            JSON.stringify(item)
        );

        if (tipoVehiculo == 3 || tipoVehiculo == 6 || tipoVehiculo == 1) {
            console.log(tipoVehiculo)
            nombretraccionsel = "Tracción 4x4";
        } else
            nombretraccionsel = nombreTraccionVeh;

        if (cambioCilindraje && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje && cambioCombustible) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y combustible de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje && cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y tracción de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato cilindraje de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioCombustible && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos combustible y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCombustible && cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos combustible y tracción de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCombustible) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato combustible de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioTraccion && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos tracción y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de transmisión de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de tracción de tu vehículo, es necesario para continuar."
            );
            return;
        }
        //localStorage.removeItem("datasearchinteractive");
        let editar = {
            editarCombustible: false,
            editarTraccion: false,
            editarTransmision: false,
            editarCilindraje: false
        };

        dispatch(getEditDataFind(editar));
        if (!tipoVehiculo) {
            setAlertaTipo("textoalertdos")
        }

        if (!carroceriaVehiculo) {
            setAlertaCarroceria("textoalertdos")
        }

        if (!marcaVehiculo) {
            setAlertaMarca("textoalertdos")
        }

        if (!modeloVehiculo || modeloVehiculo.length === 0) {
            setAlertaModelos("textoalert")
        }

        if (!tipoVehiculo && !carroceriaVehiculo && !marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos tipo de vehículo, carroceria, marca y modelo son necesarios para continuar."
            );
            return;
        }

        if (!carroceriaVehiculo && !marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos carroceria, marca y modelo de tu vehículo son necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos marca y modelo del vehículo son necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo && !modeloVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos marca y modelo del vehículo son necesarios para continuar."
            );
            return;
        }

        if (!modeloVehiculo || modeloVehiculo.length === 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato modelo del vehículo es necesarios para continuar."
            );
            return;
        }

        if (!tipoVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo del vehículo, es necesarios para continuar."
            );
            return;
        }

        if (!carroceriaVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de carroceria del vehículo, es necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato marca del vehículo, es necesarios para continuar."
            );
            return;
        }

        let marcasSeleccionadas = "";
        const detNombreAnno = [];
        let annoSeleccionadas = "";
        let modeloSeleccionadas = "";
        let cilindrajeSeleccionadas = "";
        let combustibleSeleccionadas = "";
        let transmisionSeleccionadas = "";
        let traccionSeleccionadas = "";

        if (marcaVehiculo.length > 0) {
            marcasSeleccionadas = marcaVehiculo;
        }

        for (var i = 0; i < annoVehiculo.length; i++) {
            detNombreAnno.push(annoVehiculo[i].anovehiculo);
            annoSeleccionadas = annoSeleccionadas + annoVehiculo[i].anovehiculo + "; ";
        }

        if (detNombreAnno.length > 0)
            setNombreAnnoVeh(detNombreAnno);

        if (modeloVehiculo.length > 0) {
            modeloSeleccionadas = modeloVehiculo;
        }

        if (cilindrajeVehiculo.length > 0) {
            cilindrajeSeleccionadas = cilindrajeVehiculo;
        }

        if (tipoCombustible.length > 0) {
            combustibleSeleccionadas = tipoCombustible;
        }

        if (tipoTransmision.length > 0 || nombreTransmisionVeh != "Transmisión") {
            if ("Automática" == nombreTransmisionVeh) {
                transmisionSeleccionadas = 1
            } else
                if ("Manual" == nombreTransmisionVeh) {
                    transmisionSeleccionadas = 2
                } else {
                    transmisionSeleccionadas = tipoTransmision;
                }
        }

        if (tipoTraccion.length > 0) {
            traccionSeleccionadas = tipoTraccion;
        }

        localStorage.setItem(
            "tipovehselect",
            JSON.stringify(tipoVehiculo)
        );

        const DatosBuscadorInteractivo = {
            idvehiculo: tipoVehiculo,
            idcarrorecia: carroceriaVehiculo,
            idmarca: marcaVehiculo,
            codigoaño: annoVehiculo,
            codigomodelo: modeloVehiculo,
            codigocilindraje: cilindrajeVehiculo,
            codigocombustible: tipoCombustible,
            codigotransmision: tipoTransmision,
            codigotraccion: tipoTraccion,
            nombretipovehiculo: nombreTipoVeh,
            nombrecarroceria: nombreCarroceriaVeh,
            nombremarca: nombreMarcaVeh,
            nombreanno: nombreAnnoVeh,
            nombremodelo: nombreModeloVeh,
            nombrecilindraje: nombreCilindrajeVeh,
            nombretipocombustible: nombreCombustibleVeh,
            nombretransmision: nombreTransmisionVeh,
            nombretraccion: nombretraccionsel,
            marcasseleccionadas: marcasSeleccionadas,
            annosseleccionado: annoSeleccionadas,
            modelosseleccionados: modeloSeleccionadas,
            cilindrajesseleccionados: cilindrajeSeleccionadas,
            combustiblesseleccionados: combustibleSeleccionadas,
            transmisionesseleccionadas: transmisionSeleccionadas,
            traccionesseleccionadas: traccionSeleccionadas,
            tiposvehiculos: listTiposVehiculos,
            tiposcarrocerias: carrocerias,
            tiposmarcas: marcas,
            tiposmodelos: modelos,
            tiposcilindrajes: cilindrajes,
        };

        let transmisionselect = "";
        let traccionselect = "";
        let cilindrajeselect = "";
        let combustibleselect = "";
        let anosselect = "";

        //console.log("AÑOS : ", nombreAnnoVeh[0])
        if (nombreAnnoVeh[0] != "Año" && nombreAnnoVeh[0] != "A")
            anosselect = "; " + detNombreAnno;

        if (nombreTransmisionVeh != "Transmisión")
            transmisionselect = "; " + nombreTransmisionVeh;

        if (nombretraccionsel != "Tracción") {
            traccionselect = "; " + nombretraccionsel;
        }

        if (nombreCilindrajeVeh != "Cilindraje" && nombreCilindrajeVeh)
            cilindrajeselect = "; " + nombreCilindrajeVeh;

        if (nombreCombustibleVeh != "Combustible" && nombreCombustibleVeh)
            combustibleselect = "; " + nombreCombustibleVeh;

        let DatosSeleccionadosBuscador = "";

        if (tipoVehiculo != 4) {
            DatosSeleccionadosBuscador = {
                nombretipovehiculo: nombreTipoVeh,
                nombrecarroceria: "; " + nombreCarroceriaVeh,
                nombremarca: "; " + nombreMarcaVeh,
                nombreanno: anosselect,
                nombremodelo: "; " + nombreModeloVeh,
                nombrecilindraje: cilindrajeselect,
                nombretipocombustible: combustibleselect,
                nombretransmision: transmisionselect,
                nombretraccion: traccionselect
            }
        } else {
            DatosSeleccionadosBuscador = {
                nombretipovehiculo: nombreTipoVeh,
                nombrecarroceria: "; " + nombreCarroceriaVeh,
                nombremarca: "; " + nombreMarcaVeh,
                nombreanno: anosselect,
                nombremodelo: "; " + nombreModeloVeh,
                nombrecilindraje: cilindrajeselect,
                nombretipocombustible: combustibleselect
            }
        }

        dispatch(getDataSelectSearch(DatosSeleccionadosBuscador));
        localStorage.setItem("dataselectsearch", JSON.stringify(DatosSeleccionadosBuscador));
        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatosBuscadorInteractivo);
        dispatch(getDataSearchInteractive(DatosBuscadorInteractivo));
        localStorage.setItem("datasearchinteractive", JSON.stringify(DatosBuscadorInteractivo));
        let editdata = {
            editar: false
        }

        dispatch(getEditData(editdata));
        mostrarCarroceria();
    };

    const mostrarCarroceria = () => {
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        localStorage.setItem("editdata", JSON.stringify(false));
        localStorage.setItem("activargrilla", JSON.stringify(0));
        if (carroceriaVehiculo == 24) {
            router.push("/searchinteractive/sedan/searchsedan#searchmr");
        } else
            if (carroceriaVehiculo == 8) {
                router.push("/searchinteractive/coupe/searchcoupe#searchmr");
            } else
                if (carroceriaVehiculo == 2) {
                    router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                } else
                    if (carroceriaVehiculo == 3) {
                        router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                    }
                    else
                        if (carroceriaVehiculo == 16) {
                            router.push("/searchinteractive/camionetas/estacadoblechasis/searchestacadoble#searchmr");
                        } else
                            if (carroceriaVehiculo == 17) {
                                router.push("/searchinteractive/camionetas/estacacabinasencilla/searchestacasencilla#searchmr");
                            } else
                                if (carroceriaVehiculo == 20) {
                                    router.push("/searchinteractive/camionetas/volcodoblecabina/searchdoblevolco#searchmr");
                                }
                                else
                                    if (carroceriaVehiculo == 21) {
                                        router.push("/searchinteractive/camionetas/volcocabinasencilla/searchvolcosencilla#searchmr");
                                    } else
                                        if (carroceriaVehiculo == 25) {
                                            router.push("/searchinteractive/camionetas/suvcamperostrespuertas/searchsuvtrespuertas#searchmr");
                                        } else
                                            if (carroceriaVehiculo == 26) {
                                                router.push("/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr");
                                            } else
                                                if (carroceriaVehiculo == 60) {
                                                    router.push("/searchinteractive/camionestrompa/articuladocontrompa/searcharticulado#searchmr");
                                                } else
                                                    if (carroceriaVehiculo == 13) {
                                                        router.push("/searchinteractive/camionestrompa/dobletroquecontrompa/searchdobletroque#searchmr");
                                                    } else
                                                        if (carroceriaVehiculo == 18) {
                                                            router.push("/searchinteractive/camionestrompa/gruacontrompa/searchgrua#searchmr");
                                                        } else
                                                            if (carroceriaVehiculo == 35) {
                                                                router.push("/searchinteractive/camionestrompa/sencillocontrompa/searchsencillo#searchmr");
                                                            } else
                                                                if (carroceriaVehiculo == 31) {
                                                                    router.push("/searchinteractive/camionestrompa/volquetadoblecontrompa/searchvolquetadoble#searchmr");
                                                                } else
                                                                    if (carroceriaVehiculo == 32) {
                                                                        router.push("/searchinteractive/camionestrompa/volquetasencillacontrompa/searchvolquetasencilla#searchmr");
                                                                    } else
                                                                        if (carroceriaVehiculo == 1) {
                                                                            router.push("/searchinteractive/camionessintrompa/articuladosintrompa/searcharticulado#searchmr");
                                                                        } else
                                                                            if (carroceriaVehiculo == 10) {
                                                                                router.push("/searchinteractive/camionessintrompa/cuatromanos/searchcuatromanos#searchmr");
                                                                            } else
                                                                                if (carroceriaVehiculo == 84) {
                                                                                    router.push("/searchinteractive/camionessintrompa/dobletroquesintrompa/searchdobletroque#searchmr");
                                                                                } else
                                                                                    if (carroceriaVehiculo == 87) {
                                                                                        router.push("/searchinteractive/camionessintrompa/gruasintrompa/searchgrua#searchmr");
                                                                                    }
                                                                                    else
                                                                                        if (carroceriaVehiculo == 7) {
                                                                                            router.push("/searchinteractive/camionessintrompa/sencillosintrompa/searchsencillo#searchmr");
                                                                                        }
                                                                                        else
                                                                                            if (carroceriaVehiculo == 123) {
                                                                                                router.push("/searchinteractive/camionessintrompa/volquetadoblesintrompa/searchvolquetadoble#searchmr");
                                                                                            }
                                                                                            else
                                                                                                if (carroceriaVehiculo == 125) {
                                                                                                    router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                                                                                                }
                                                                                                else
                                                                                                    if (carroceriaVehiculo == 124) {
                                                                                                        router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                                                                                                    } else
                                                                                                        if (carroceriaVehiculo == 126) {
                                                                                                            router.push("/searchinteractive/camionetas/suvcamperoscincopuertas/searchsuvcincopuertas#searchmr");
                                                                                                        } else
                                                                                                            if (carroceriaVehiculo == 121) {
                                                                                                                router.push("/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencilla#searchmr");
                                                                                                            } else
                                                                                                                if (carroceriaVehiculo == 4) {
                                                                                                                    router.push("/searchinteractive/vansybuses/bus/searchbus#searchmr");
                                                                                                                } else
                                                                                                                    if (carroceriaVehiculo == 122) {
                                                                                                                        router.push("/searchinteractive/vansybuses/buseta/searchbuseta#searchmr");
                                                                                                                    } else
                                                                                                                        if (carroceriaVehiculo == 30) {
                                                                                                                            router.push("/searchinteractive/vansybuses/vans/searchvans#searchmr");
                                                                                                                        } else
                                                                                                                            if (carroceriaVehiculo == 5) {
                                                                                                                                router.push("/searchinteractive/motos/calle/searchcalle#searchmr");
                                                                                                                            } else
                                                                                                                                if (carroceriaVehiculo == 12) {
                                                                                                                                    router.push("/searchinteractive/motos/deportiva/searchdeportiva#searchmr");
                                                                                                                                } else
                                                                                                                                    if (carroceriaVehiculo == 14) {
                                                                                                                                        router.push("/searchinteractive/motos/enduro/searchenduro#searchmr");
                                                                                                                                    } else
                                                                                                                                        if (carroceriaVehiculo == 22) {
                                                                                                                                            router.push("/searchinteractive/motos/scooter/searchscooter#searchmr");
                                                                                                                                        } else
                                                                                                                                            if (carroceriaVehiculo == 28) {
                                                                                                                                                router.push("/searchinteractive/motos/touring/searchtouring#searchmr");
                                                                                                                                            }


    };

    let combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    if (tipoVehiculo == 4) {
        combustible = [
            { label: "Gasolina – Eléctrico", value: 4 },
        ];
    } else {
        combustible = [
            { label: "Gasolina", value: 1 },
            { label: "Diesel", value: 2 },
            { label: "Gasolina – Gas", value: 3 },
            { label: "Gasolina – Eléctrico", value: 4 },
        ];
    }

    const transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    const traccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    const tracciondos = [
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    const handleChange = (selectedOptions) => {
        setAlertarTipo("textoalertdos");
        setAlertarCarroceria("textoalertdos");
        setAlertarMarca("textoalertdos");
        setAlertarModelo("textoalertdos");
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");
        setAlertaTipo("");
        setAlertarTipo("");
        setCarroceriaVehiculo(0);
        setMarcaVehiculo(0);
        //setAnnoVehiculo([]);
        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setModels([]);
        setMarcas([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setNombreCarroceriaVeh("Carrocería");
        setNombreMarcaVeh("Marca");
        setNombreAnnoVeh("Año");
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        setNombreCombustibleVeh("Combustible");
        // setMostrarCombustible("ocultar-div");
        // setNombreCombustibleVeh("");

        if (selectedOptions == 3 || selectedOptions == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setMostrarCombustible("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setNombreCombustibleVeh("");
        } else if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 4 ||
            selectedOptions == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            setNombreTransmisionVeh("Transmisión");
            setNombreCombustibleVeh("Combustible");
            setMostrarCombustible("mostrar-div");
            setDisabledTransmision(false);
            setDisabledCombustible(false);
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            setMostrarCombustible("mostrar-div");
            setNombreTransmisionVeh("Transmisión");
            setNombreTraccionVeh("Tracción");
            setNombreCombustibleVeh("Combustible");
            setDisabledTransmision(false);
            setDisabledTraccion(false);
            setDisabledCombustible(false);
        }

        setTipoVehiculo(selectedOptions);
        const tipovehiculo = {
            idtipovehiculo: selectedOptions,
        };

        async function readtypevehicle(tipovehiculo) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            listTiposVehiculos &&
                listTiposVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(tipovehiculo.idtipovehiculo)
                    ) {
                        setNombreTipoVeh(row.label);
                    }
                });
        }
        readtypevehicle(tipovehiculo);

        const newDet = [];
        //console.log("TIPO : ", tipovehiculo)
        if (tipovehiculo.idtipovehiculo != 4) {
            listCarroceriasVehiculos.forEach((row) => {
                if (
                    parseInt(row.tipovehiculo) ===
                    parseInt(selectedOptions)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipovehiculo: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                    };
                    newDet.push(item);
                }
            });
        } else {
            listCarroceriasVehiculos.forEach((row) => {

                if (
                    parseInt(row.tipovehiculo) ===
                    parseInt(selectedOptions)
                ) {
                    if (row.id == 8 || row.id == 24 || row.id == 26 ||
                        row.id == 124 || row.id == 125 || row.id == 126) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipovehiculo: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                        };
                        newDet.push(item);
                    }
                }
            });
        }

        setCarrocerias(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setAlertaCarroceria("");
        setAlertarCarroceria("");
        setCarroceriaVehiculo(selectedOptions);

        if ((selectedOptions == 16 ||
            selectedOptions == 21 ||
            selectedOptions == 17 ||
            selectedOptions == 20) &&
            controltraccion == 1)
            setNombreTraccionVeh("Tracción")

        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        setMarcaVehiculo(0);
        //setAnnoVehiculo([]);
        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setModels([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setNombreMarcaVeh("Marca");
        //setNombreAnnoVeh("Año...");
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        setAlertarMarca("textoalertdos");
        setAlertarModelo("textoalertdos");

        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        const newDet = [];
        listMarcasVehiculos &&
            listMarcasVehiculos.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehiculo) &&
                    Number.parseInt(row.carroceria) ===
                    Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipovehiculo: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setMarcas(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        setAlertaMarca("");
        setAlertarMarca("");
        // Asignamos la marca del Vehiculo Seleccionado por el usuario
        setMarcaVehiculo(selectedOptions);

        //setAnnoVehiculo([]);
        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        //setNombreAnnoVeh("Año");
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");
        setAlertarModelo("textoalertdos");

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        const newDet = [];
        datosmodelosvehiculos &&
            datosmodelosvehiculos.forEach((row) => {
                if (
                    parseInt(row.tipovehiculo) ===
                    parseInt(tipoVehiculo) &&
                    parseInt(row.marca) ===
                    parseInt(selectedOptions) &&
                    parseInt(row.carroceria) ===
                    parseInt(carroceriaVehiculo)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipovehiculo: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDet.push(item);
                }
            });
        setModels(newDet);
    };

    const handleChangeModels = (selectedOptions) => {
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        setAlertaModelos("");
        setAlertarModelo("");
        setModeloVehiculo(selectedOptions);
        //setAnnoVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        //setNombreAnnoVeh("Año...");
        setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        if (selectedOptions.length > 0) {
            const newDet = [];
            datoscilindrajevehiculos &&
                datoscilindrajevehiculos.forEach((row) => {
                    if (
                        parseInt(row.tipovehiculo) ===
                        parseInt(tipoVehiculo) &&
                        parseInt(row.carroceria) ===
                        parseInt(carroceriaVehiculo) &&
                        parseInt(row.modelo) ===
                        parseInt(selectedOptions)
                    ) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            cilindraje: row.cilindraje,
                            tipovehiculo: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            modelo: row.modelo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                        };
                        newDet.push(item);
                    }
                });
            setCilindrajes(newDet);
        }
    };

    const handleChangeAnno = (selectedOptions) => {
        //console.log("AÑOS SELEC: ",selectedOptions)
        setAnnoVehiculo(selectedOptions);

        let nombres = [];
        selectedOptions &&
            selectedOptions.map((row, index) => {
                nombres.push(row.label)
            });

        setNombreAnnoVeh(nombres);

        if (selectedOptions.length === 0) {
            setAnnoVehiculo([]);
            setNombreAnnoVeh("Año")
        }

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeCilindraje = (selectedOptions) => {
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setCambioCilindraje(false);
        if (selectedOptions.length > 0) {
            //console.log("VERSION MOTOR SELECCIONADO : ", selectedOptions);
            setCilindrajeVehiculo(selectedOptions);
        }
        /*
                setNombreTransmisionVeh("Transmisión");
                setNombreCombustibleVeh("Combustible");
                setNombreTraccionVeh("Tracción");
        */
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeCombustible = (selectedOptions) => {
        //console.log("COMBUSTIBLE : ", selectedOptions);
        setTipoCombustible(selectedOptions);
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setCambioCombustible(false);
        /*
                setNombreTraccionVeh("Tracción");
                setNombreTransmisionVeh("Transmisión");
        */
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTipoTransmision(selectedOptions);
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setCambioTransmision(false);

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
        } else {
            setMostrarTraccion("mostrar-div");
            //setNombreTraccionVeh("Tracción");
            //setDisabledTraccion(false);
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTipoTraccion(selectedOptions);
        controltraccion = selectedOptions;
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");
        setCambioTraccion(false);
    };

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0].header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useOnClickOutside(controlAnno, () => setOpen(false));

    // Control maximo de caracteres en modles
    useEffect(() => {
        if (nombreModeloVeh != "Modelo") {
            let longtexto = "";

            if (nombreModeloVeh)
                longtexto = nombreModeloVeh.length;

            if (longtexto > 15)
                longtexto = 15;

            let numero = "";
            dato = "" + nombreModeloVeh;
            let vid;
            let cont;

            for (var i = 0; i < longtexto; i++) {
                if (vid != "." || cont != "..") {
                    vid = dato.substr(i, 1);
                    cont = dato.substr(i, 2);
                    numero = numero + vid;
                }
            }
            //alert(numero)
            let modelo = "";
            if (longtexto >= 15)
                modelo = numero + "...";
            else
                modelo = numero;
            setLongitudModelo(longtexto);
            setNombreModeloVeh(modelo);
        }
    }, [nombreModeloVeh]);

    // Control maximo de caracteres en marcas
    useEffect(() => {
        if (nombreMarcaVeh != "Marca") {
            let longtexto = nombreMarcaVeh.length;
            if (longtexto > 13)
                longtexto = 13;

            let numero = "";
            dato = "" + nombreMarcaVeh;
            let vid;

            for (var i = 0; i < longtexto; i++) {
                if (vid != ".") {
                    vid = dato.substr(i, 1);
                    numero = numero + vid;
                }
            }
            //alert(numero)
            let marca = "";
            if (longtexto >= 13)
                marca = numero + "...";
            else
                marca = numero;
            setNombreMarcaVeh(marca);
        }
    }, [nombreMarcaVeh]);

    const onEdit = () => {
        if (nombreModeloVeh != "Modelo")
            setShowEdit(true);
    };
    const offEdit = () => {
        if (nombreModeloVeh != "Modelo")
            setShowEdit(false);
    };
    const asignaNombreModelo = (nombre) => {
        setNombreModeloBase(nombre);
        setNombreModeloVeh(nombre);
    }

    return (
        <Container title="Mi Cuenta">
            <div id="general" className="ps-page ps-page--inner">
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <div className="row">
                    <div className="ml-188 col-md-6">
                        <div className="ps-page__header"></div>
                        <div className="ps-form--review">
                            <div className="titulotextobuscadorinteractivo">
                                Buscador Interactivo
                            </div>
                            <div className="ps-form__group searchContainer">
                                <div className="searchContainerMargin">
                                    <div className="form-control ps-form__input">
                                        <Row>
                                            <Col xs={3} sm={3} md={3} lg={3} >
                                                <Dropdown
                                                    onSelect={handleChange}
                                                >
                                                    <Dropdown.Toggle
                                                        className="alinearizquierda dropdownsearchinteractive"
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        <Row>
                                                            <Col xs={1} sm={1} md={1} lg={1} >
                                                                <h3 className={alertarTipo}> * </h3>
                                                            </Col>
                                                            <Col xs={10} sm={10} md={10} lg={10}
                                                                className={alertaTipo}
                                                            >
                                                                {nombreTipoVeh}
                                                            </Col>
                                                        </Row>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        className="optionssearchinteractive">
                                                        {listTiposVehiculos &&
                                                            listTiposVehiculos.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.id
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreTipoVeh(item.text)}
                                                                        >
                                                                            {
                                                                                item.text
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col xs={2} sm={2} md={3} lg={3} >
                                                <Dropdown
                                                    onSelect={handleChangeCarroceria}
                                                >
                                                    <Dropdown.Toggle
                                                        className="mlmenos20 alinearizquierda searchcarrocerias"
                                                        variant="outline-light"
                                                        disabled={disabledCarroceria}
                                                        id="dropdown-basic">
                                                        <Row>
                                                            <Col xs={1} sm={1} md={1} lg={1} >
                                                                <h3 className={alertarCarroceria}> * </h3>
                                                            </Col>
                                                            <Col xs={10} sm={10} md={10} lg={10}
                                                                className={alertaCarroceria}
                                                            >
                                                                {nombreCarroceriaVeh}
                                                            </Col>
                                                        </Row>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        variant="outline-light"
                                                        className="optionssearchinteractivecarrocerias">
                                                        {carrocerias &&
                                                            carrocerias.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.value
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreCarroceriaVeh(item.label)}
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col xs={2} sm={2} md={3} lg={3} >
                                                <Dropdown
                                                    onSelect={handleChangeBrand}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        className="ml-40 alinearizquierda 
                                                                   dropdownsearchinteractivebrand"
                                                        disabled={disabledMarca}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        <Row>
                                                            <Col xs={1} sm={1} md={1} lg={1} >
                                                                <h3 className={alertarMarca}> * </h3>
                                                            </Col>
                                                            <Col xs={10} sm={10} md={10} lg={10}
                                                                className={alertaMarca}
                                                            >
                                                                {nombreMarcaVeh}
                                                            </Col>
                                                        </Row>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractive">
                                                        {marcas &&
                                                            marcas.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.id
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreMarcaVeh(item.text)}
                                                                        >
                                                                            {
                                                                                item.text
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <div className={disabledAnno} >
                                                <Col xs={2} sm={2} md={2} lg={2}>
                                                    <MultiSelect
                                                        options={annos}
                                                        value={annoVehiculo}
                                                        enabled="false"
                                                        onChange={handleChangeAnno}
                                                        enableSearch="true"
                                                        className="ml-3 dropdown-heading-anno-search size-anno-search"
                                                        labelledBy="Año"
                                                        //disabled="true"
                                                        overrideStrings={{
                                                            selectSomeItems: nombreAnnoVeh,
                                                            allItemsAreSelected:
                                                                "Todos los años",
                                                            search: "Buscar",
                                                            selectAll:
                                                                "Todos"
                                                        }}
                                                    />

                                                </Col>
                                            </div>
                                        </Row>
                                    </div>
                                    <br />
                                    <div className="form-control ps-form__input">
                                        <Row>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <Dropdown
                                                    onSelect={handleChangeModels}
                                                    onMouseEnter={() => onEdit()}
                                                    onMouseLeave={() => offEdit()}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledModelo}
                                                        className="alinearizquierda dropdownsearchinteractivemodels"
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        <Row>
                                                            <Col xs={1} sm={1} md={1} lg={1} >
                                                                <h3 className={alertarModelo}> * </h3>
                                                            </Col>
                                                            <Col xs={10} sm={10} md={10} lg={10}
                                                                className={alertaModelos}
                                                            >
                                                                {showEdit && LongitudModelo > 13 ? (
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary
                                                                                       botontextocompletomoldeo
                                                                                       sinborder"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="Tooltip on top">
                                                                            {nombreModeloBase}
                                                                        </button>
                                                                        <div className="mtmenos24 cajatextocompletomoldeo">
                                                                            {nombreModeloVeh}
                                                                        </div>
                                                                    </div>
                                                                ) : nombreModeloVeh
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenuModels}
                                                        variant="outline-light"
                                                        className="optionssearchinteractivemodelos"
                                                    >
                                                        {modelos &&
                                                            modelos.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="optionssearchinteractivemodels"
                                                                            eventKey={
                                                                                item.id
                                                                            }
                                                                            onClick={() =>
                                                                                asignaNombreModelo(item.label)}
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>

                                            <Col xs={2} sm={2} md={2} lg={2} className="mlmenos20" >
                                                <Dropdown
                                                    onSelect={handleChangeCilindraje}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledCilindraje}
                                                        className={classCilindraje}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreCilindrajeVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {cilindrajes &&
                                                            cilindrajes.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.id
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreCilindrajeVeh(item.cilindraje)}
                                                                        >
                                                                            {
                                                                                item.cilindraje
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col xs={2} sm={2} md={2} lg={2} className="ml-20">
                                                <div className={mostrarCombustible} >
                                                    <Dropdown
                                                        onSelect={handleChangeCombustible}
                                                    >
                                                        <Dropdown.Toggle
                                                            onclick={CustomToggle}
                                                            disabled={disabledCombustible}
                                                            className={classCombustible}
                                                            variant="outline-light"
                                                            id="dropdown-basic">
                                                            {nombreCombustibleVeh}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="optionssearchinteractiveannos">
                                                            {combustible &&
                                                                combustible.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                eventKey={
                                                                                    item.value
                                                                                }
                                                                                onClick={() =>
                                                                                    setNombreCombustibleVeh(item.label)}
                                                                            >
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </Col>
                                            {
                                                //AQUI
                                            }
                                            <Col xs={2} sm={2} md={2} lg={2} className="ml-25">
                                                <div className={mostrarTransmision} >
                                                    <Dropdown
                                                        onSelect={handleChangeTransmision}
                                                    >
                                                        <Dropdown.Toggle
                                                            onclick={CustomToggle}
                                                            disabled={disabledTransmision}
                                                            className={classTransmision}
                                                            variant="outline-light"
                                                            id="dropdown-basic">
                                                            {nombreTransmisionVeh}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="optionssearchinteractiveannos">
                                                            {transmision &&
                                                                transmision.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                eventKey={
                                                                                    item.value
                                                                                }
                                                                                onClick={() =>
                                                                                    setNombreTransmisionVeh(item.label)}
                                                                            >
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </Col>
                                            <Col xs={2} sm={2} md={2} lg={2} className="mlmenos5">
                                                <div className={mostrarTraccion} >
                                                    <Dropdown
                                                        onSelect={handleChangeTraccion}
                                                    >
                                                        <Dropdown.Toggle
                                                            onclick={CustomToggle}
                                                            disabled={disabledTraccion}
                                                            className={classTraccion}
                                                            variant="outline-light"
                                                            id="dropdown-basic">
                                                            {nombreTraccionVeh}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="optionssearchinteractiveannos">
                                                            {
                                                                carroceriaVehiculo != 16 &&
                                                                    carroceriaVehiculo != 21 &&
                                                                    carroceriaVehiculo != 17 &&
                                                                    carroceriaVehiculo != 20 ?
                                                                    traccion &&
                                                                    traccion.map(
                                                                        (item) => {
                                                                            return (
                                                                                <Dropdown.Item
                                                                                    className="itemsdropdowncustom"
                                                                                    eventKey={
                                                                                        item.value
                                                                                    }
                                                                                    onClick={() =>
                                                                                        setNombreTraccionVeh(item.label)}
                                                                                >
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </Dropdown.Item>
                                                                            );
                                                                        }
                                                                    )
                                                                    :
                                                                    tracciondos &&
                                                                    tracciondos.map(
                                                                        (item) => {
                                                                            return (
                                                                                <Dropdown.Item
                                                                                    className="itemsdropdowncustom"
                                                                                    eventKey={
                                                                                        item.value
                                                                                    }
                                                                                    onClick={() =>
                                                                                        setNombreTraccionVeh(item.label)}
                                                                                >
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </Dropdown.Item>
                                                                            );
                                                                        }
                                                                    )

                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-20 ml-205">
                    <Row>
                        <Col xs={12} sm={12} md={8} lg={8} >
                            <h3 className="textobuscadorintecractivo">
                                ** Las imágenes a continuación son con fines ilustrativos, por ello pueden no
                                corresponder exactamente con tu vehículo.
                            </h3>
                        </Col>

                        <Col xs={3} sm={3} md={3} lg={3} >
                            <div className="mt-0 ml-25 ps-btn redondearborde"
                                onClick={colocarDatosState}
                            >
                                Buscar Producto
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
}

function defaultValueForm() {
    return {
        codigo: 0,
        codigolatint: 0,
    };
}

// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default SearchInteractive;