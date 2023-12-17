import React, { useEffect, useState } from "react";
import { wrapper } from "../store/store";
import MasterLayout from "~/components/layouts/MasterLayout";
import { CookiesProvider } from "react-cookie";
import { SSRProvider } from "@react-aria/ssr";
import "swiper/swiper-bundle.min.css";
import "antd/dist/antd.compact.min.css";
import "~/public/static/css/bootstrap.min.css";
import "~/public/static/fonts/feather-font/css/iconfont.css";
import "~/public/static/fonts/Linearicons/Font/demo-files/demo.css";
import "~/public/static/fonts/font-awesome/css/font-awesome.min.css";
import "~/public/static/css/style.min.css";
import "~/public/static/css/slick.min.css";
import "~/styles/scss/home-1.scss";
import "~/styles/platform/custom.scss";
import "~/styles/platform/themes/home-one.scss";
import Users from "~/repositories/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../store/userlogged/action";
import { getEditDataFind } from "../store/editdatafind/action";
import { getSelectViewProduct } from "../store/selectviewproduct/action";
import { getDuplicarPrd } from "../store/duplicarprd/action";
import Home from "~/pages/Home/Home";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { getTypesIdentifications } from "../store/typesidentifications/action";
import TypesIdentificationsRepository from "~/repositories/TypesIdentificationsRepository";
import { getDatosGenerales } from "../store/datosgenerales/action";
import DataGeneralRepository from "~/repositories/ReadDatosGenerales";
import { getDataWishList } from "../store/datawishlist/action";
import { getDataFindProducts } from "../store/datafindproducts/action";
import DataFindProducts from "~/repositories/DataFindProducts";
import { URL_BD_MR } from "../helpers/Constants";
import { getWordBase } from "../store/wordbase/action";
import GetWordBase from "~/repositories/getWordBase";

//Firebase
import firebase from "../utilities/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import MyGarage from "~/components/shared/MyGarage/MyGarage";
import axios from "axios";

function App({ Component, pageProps, props }) {
    const router = useRouter();
    const [selectedForm, setSelectedForm] = useState(null);
    const [user, setUser] = useState(false);
    const [controlHome, setControlHome] = useState("");
    // Arreglo tipos de Marcas de Vehiculos
    const [usuari, setUsuario] = useState([]);
    // Inicializamos el arrego para validar si el usuario esta logueado
    const userlogged = useSelector((state) => state.userlogged.userlogged);
    // Disparar procedimiento que lee Informacion del Usuario
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());
    const [showModal, setShowModal] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");
    const [actualizaVistaProducto, setActualizaVistaProducto] = useState(false);
    const [datosConectores, setDatosConectores] = useState([]);



    //INICIO CODIGO RECONOCER DISPOSITIVOS VINCULADOS AL ENTRAR

    const [device, setDevice] = useState("");
    const [deviceLink, setDeviceLink] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("DAT USER : ", datosusuarios);
    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);
    const [dispositivosVinculados, setDispositivosVinculados] = useState([]);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: null,
        error: null,
    });

    //función para leer y mapear dispVinculados, para comparar
    useEffect(() => {
        const leerDispositivosVinculados = async () => {
            let params = {
                usuario: UidUser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "93",
                params,
            })
                .then((res) => {
                    if (res.data && res.data.listLinkedDevices) {
                        const dispositivos = res.data.listLinkedDevices.map((dispositivo) => {
                            return {
                                id: dispositivo.id,
                                iddispositivo: dispositivo.iddispositivo,
                                usuario: dispositivo.usuario,
                                localizacion: dispositivo.localizacion,
                                fechacreacion: dispositivo.fechacreacion,
                            };
                        });
                        // Almacena los dispositivos vinculados en el estado de tu componente
                        setDispositivosVinculados(dispositivos);
                    } else {
                        console.error("Error: res.data o res.data.listLinkedDevices es undefined");
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerDispositivosVinculados();
    }, [UidUser]);


    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid)
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [datosusuarios]);

    //FunciónParaIdentificar el dispositivo
    useEffect(() => {
        const handleDeviceDetection = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            let array = userAgent.split(" ");
            console.log("XXXXXXX : ", array);

            setDevice(userAgent);
            const isMobile =
                /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
                    userAgent
                );
            const isTablet =
                /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
                    userAgent
                );
            //validacaracteres = preguntaVendedor.substr(i, 1);
            if (isMobile) {
                console.log("ID Dispositivo : ", "Mobile" + array[1] + " ");
                setDevice(
                    "Mobile" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5]
                );
            } else if (isTablet) {
                console.log("ID Dispositivo : ", "Tablet" + array[1] + " ");
                setDevice(
                    "Tablet" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5]
                );
            } else {
                let id = "Desktop" + array[1].substr(1, 10);
                let row = {
                    iddispositivo: id,
                    usuario: datosusuarios.uid,
                    locate: 0,
                    fecha: 0
                }

                console.log("ID Dispositivo : ", row);
                setDevice(
                    "Desktop" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5]
                );
            }
        };

        handleDeviceDetection();
        window.addEventListener("resize", handleDeviceDetection);

        return () => {
            window.removeEventListener("resize", handleDeviceDetection);
        };
    }, [datosusuarios]);

    console.log("DISPOSITIVOS : ", deviceLink);
    //Función para identificar la localizacion
    useEffect(() => {
        const fetchData = async () => {
            try {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            console.log("Latitude:", latitude);
                            console.log("Longitude:", longitude);

                            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAHpKFep5sHSFrTg-98GSpDsgSiKBa9vOI`;
                            console.log("Geocode URL:", geocodeUrl);

                            try {
                                const response = await axios.get(geocodeUrl);

                                if (response.data.results[0]) {
                                    const formattedAddress = response.data.results[0].formatted_address;
                                    console.log("Formatted Address:", formattedAddress);

                                    setLocation({
                                        latitude,
                                        longitude,
                                        address: formattedAddress,
                                        error: null,
                                    });

                                    console.log("Location state updated successfully");
                                } else {
                                    console.error("No results found in geocoding response");
                                    setLocation({ error: "No results found" });
                                }
                            } catch (error) {
                                console.error("Error in geocoding request:", error);
                                setLocation({ error: `Error in geocoding request: ${error.message}` });
                            }
                        },
                        (error) => {
                            console.error("Error getting geolocation:", error);
                            setLocation({
                                latitude: null,
                                longitude: null,
                                error: `Error getting geolocation: ${error.message}`,
                            });
                        }
                    );
                } else {
                    console.log("Geolocation not available");
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: "Geolocation not available",
                    });
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setLocation({
                    latitude: null,
                    longitude: null,
                    error: `Unexpected error: ${error.message}`,
                });
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const enviarDatos = async () => {
            if (device && location.address) {
                // Verifica si el dispositivo ya está en la lista de dispositivos vinculados
                const dispositivoExistente = dispositivosVinculados.find(
                    (dispositivo) => dispositivo.iddispositivo === device
                );

                if (dispositivoExistente) {
                    console.log("El dispositivo ya está vinculado y no se puede agregar de nuevo");
                } else {
                    let params = {
                        iddispositivo: device,
                        usuario: datosusuarios.uid,
                        localizacion: location.address,
                    };
                    try {
                        const res = await axios({
                            method: "post",
                            url: URL_BD_MR + "92",
                            params,
                        });
                        console.log("Se agregó el dispositivo");
                        // Actualiza la lista de dispositivos vinculados
                        setDispositivosVinculados([...dispositivosVinculados, params]);
                    } catch (error) {
                        console.error("Error al enviar los datos", error);
                    }
                }
            }
        };
        enviarDatos();
    }, [device, location, dispositivosVinculados]); // Aquí incluimos 'dispositivosVinculados' en las dependencias del efecto






    //fIN CODIGO RECONOCER DISPOSITIVOS VINCULADOS AL ENTRAR


    // Lee de la base de datos los tipos de Identificación
    useEffect(() => {
        localStorage.removeItem('dataWords');
        let inicia = null;
        localStorage.setItem("placeholdersearch", JSON.stringify(inicia));

        async function typesidentifications(dat) {
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false,
            };
            dispatch(getEditDataFind(editar));
            //localStorage.setItem("editardatosbuscador", JSON.stringify(editar));
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesIdentifications =
                await TypesIdentificationsRepository.getTypesIdentifications(0);
            //console.log("TYPES IDENTIFICATIONS : ", TypesIdentifications);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesIdentifications(TypesIdentifications));
        }
        typesidentifications(0);
        const leeconectores = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "38",
            })
                .then((res) => {
                    //console.log("CONECTORES : ", res.data.listarconectores);
                    let datconectar = res.data.listarconectores;
                    //setDatosConectores(res.data.listarconectores);
                    localStorage.setItem("dataconectores", JSON.stringify(datconectar));
                })
                .catch(function (error) { });
        };
        leeconectores();

        const palabras = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "37",
            })
                .then((res) => {
                    let datwords = res.data.listarpalabras;
                    localStorage.setItem("datawords", JSON.stringify(datwords));
                })
                .catch(function (error) { });
        };
        palabras();

        //lee productos genericos 
        const leeGenericos = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "42",
            }).then((res) => {
                let datagenericos = res.data;
                localStorage.setItem("datagenericos", JSON.stringify(datagenericos));
                //console.log("DAT GENERICOS : ", res.data)
            });
        };
        leeGenericos();
    }, []);

    // Lee Datos generales del sistema MR
    useEffect(() => {
        async function datageneral(dat) {
            // Lee la función creada en repositories - DatosGenerales
            const DataGeneral =
                await DataGeneralRepository.getReadDataGeneral(0);
            //console.log("DATA GENERAL : ", DataGeneral.vgl_categorias)

            // Coloca los datos en state arreglo de categorias
            dispatch(getDatosGenerales(DataGeneral));
            dispatch(getDuplicarPrd(0));
            localStorage.setItem('categorias', JSON.stringify(DataGeneral.vgl_categorias));
            localStorage.setItem('subcategorias', JSON.stringify(DataGeneral.vgl_subcategorias));
            localStorage.setItem("editdata", JSON.stringify(false));
        }
        datageneral(0);
    }, []);

    // Lee de la base de datos buscador especial
    useEffect(() => {
        async function dataproducts(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository

            const datosproductos =
                await DataFindProducts.getDataFindProducts(dat);
            //console.log("LEE OBJETO PRODUCTOS: ", datosproductos);
            // Coloca los datos en state arreglo de categorias
            dispatch(getDataFindProducts(datosproductos[0]));
        }
        //dataproducts(0);
        async function datawordbase(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository

            const datosbasepalabras =
                await GetWordBase.getWordBase(dat);
            //console.log("WORD BASE: ", datosbasepalabras);
            // Coloca los datos en state arreglo de categorias
            dispatch(getWordBase(datosbasepalabras));
        }
        datawordbase(0);
    }, []);

    // Lee de la base de datos los datos de las paginas para navegar desde el menu inicial
    useEffect(() => {
        dispatch(getDuplicarPrd(0));
        var caracteres = "012346789";
        var name = "";
        for (var i = 0; i < 4; i++)
            name += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        //console.log("CODIGO ALEATORIO : ", name);

        async function usuariologueado(dat) {
            //Valida si el Usuario esta logueado en Mercado Repuesto
            const auth = getAuth(firebase);
            //console.log("USUARIO LOGUEADO : ", auth.currentUser);
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;

                    setSelectedForm("login");

                    setUser(true);
                    const leer = async () => {
                        const dat = {
                            uid: user.metadata.createdAt,
                        };

                        const DatosUsuario = await Users.getUsers(dat);

                        if (DatosUsuario.length > 0) {
                            if (DatosUsuario[0].activo === "S") {

                                if (user.metadata.createdAt) {
                                    //console.log("ID USER : ",user.metadata.createdAt)
                                    const leerItems = async () => {
                                        let params = {
                                            usuario: user.metadata.createdAt,
                                        };

                                        await axios({
                                            method: "post",
                                            url: URL_BD_MR + "54",
                                            params,
                                        })
                                            .then((res) => {
                                                //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                                dispatch(getDataWishList(res.data.listaritemdeseos.length));
                                            })
                                            .catch(function (error) {
                                                console.log("Error leyendo preguntas al vendedor");
                                            });
                                    };
                                    leerItems();
                                }

                                setCodigoToken(DatosUsuario[0].token);
                                if (DatosUsuario.length > 0) {

                                    if (DatosUsuario[0].activo === "N") {
                                        setSelectedForm(null);
                                    } else {

                                        setUsuario(DatosUsuario[0]);

                                        const Usuario = {
                                            uid: user.metadata.createdAt,
                                            logged: true,
                                            name: DatosUsuario[0].primernombre,
                                            idinterno: DatosUsuario[0].id,
                                            activo: DatosUsuario[0].activo,
                                            tipoidentificacion:
                                                DatosUsuario[0]
                                                    .tipoidentificacion,
                                            identificacion:
                                                DatosUsuario[0].identificacion,
                                            razonsocial:
                                                DatosUsuario[0].razonsocial,
                                            email: DatosUsuario[0].email,
                                            celular: DatosUsuario[0].celular,
                                            fechatoken:
                                                DatosUsuario[0].fechatoken,
                                        };
                                        //console.log("USUARIO LOGUEADO : ",Usuario);
                                        localStorage.setItem("datauser", JSON.stringify(Usuario));
                                        dispatch(getUserLogged(Usuario));
                                    }
                                } else {
                                    const Usuario = {
                                        uid: user.metadata.createdAt,
                                        logged: true,
                                        name: user.displayName,
                                        idinterno: DatosUsuario[0].id,
                                        activo: DatosUsuario[0].activo,
                                        tipoidentificacion:
                                            DatosUsuario[0].tipoidentificacion,
                                        identificacion:
                                            DatosUsuario[0].identificacion,
                                        razonsocial:
                                            DatosUsuario[0].razonsocial,
                                        token: DatosUsuario[0].token,
                                        email: DatosUsuario[0].email,
                                        celular: DatosUsuario[0].celular,
                                        fechatoken: DatosUsuario[0].fechatoken,
                                    };
                                    dispatch(getUserLogged(Usuario));
                                }
                            } else {
                                // Asignamos Datos al arreglo de Usuarios desde la base de datos
                                const ActualizaDatosUsuario =
                                    await Users.getUsers(dat);

                                if (
                                    ActualizaDatosUsuario[0].activo === "N" ||
                                    ActualizaDatosUsuario[0].activo === "R"
                                ) {

                                    setCodigoToken(DatosUsuario[0].token);
                                    const Usuario = {
                                        uid: user.metadata.createdAt,
                                        logged: false,
                                        name: "",
                                        idinterno: 0,
                                        activo: DatosUsuario[0].activo,
                                        tipoidentificacion:
                                            DatosUsuario[0].tipoidentificacion,
                                        identificacion:
                                            DatosUsuario[0].identificacion,
                                        razonsocial:
                                            DatosUsuario[0].razonsocial,
                                        token: DatosUsuario[0].token,
                                        email: DatosUsuario[0].email,
                                        celular: DatosUsuario[0].celular,
                                        fechatoken: DatosUsuario[0].fechatoken,
                                    };
                                    dispatch(getUserLogged(Usuario));
                                }
                            }
                        }
                    };
                    leer();
                    // Coloca los datos en state arreglo de categorias
                } else {
                    console.log("USUARIO NO ESTA LOGUEADO");
                    setSelectedForm(null);
                    const Usuario = {
                        uid: 0,
                        logged: false,
                        name: "",
                        idinterno: 0,
                        activo: "",
                        tipoidentificacion: 0,
                        identificacion: 0,
                        razonsocial: "",
                        token: 0,
                        email: 0,
                        celular: 0,
                        fechatoken: "",
                    };
                    dispatch(getUserLogged(Usuario));
                }
            });
        }
        usuariologueado(0);
    }, []);

    useEffect(() => {
        setTimeout(function () {
            document.getElementById("__next").classList.add("ps-loaded");
        }, 100);
    });

    const handlerForm = () => {
        if (router.asPath === "/") {
            switch (selectedForm) {
                case "login":
                    return <Component {...pageProps} />;
                default:
                    return <Home setSelectedForm={setSelectedForm} />;
            }
        } else {
            switch (selectedForm) {
                default:
                    return <Component {...pageProps} />;
            }
        }
    };
    //return <Component {...pageProps} />;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validarToken = () => {
        console.log("VALIDAR TOKEN : ", formData.token);
        console.log("CODIGO TOKEN : ", codigoToken);
    };

    return (
        <SSRProvider>
            <CookiesProvider>
                <MasterLayout>{handlerForm()}</MasterLayout>
            </CookiesProvider>
            <Modal dialogClassName="modaltoken" show={showModal}>
                <Modal.Header closeButton>
                    <h2>ACTIVAR CUENTA</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form onChange={onChange}>
                        <div className="ps-form__group">
                            <label className="ps-form__label">
                                Ingresar Codigo :
                            </label>
                            <input
                                className="form-control ps-form__input"
                                name="token"
                                type="text"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xs lg={6}>
                            <div
                                className="ps-btn ps-btn--warning"
                                onClick={validarToken}>
                                Activar Cuenta
                            </div>
                        </Col>
                        <Col xs lg={2}>
                            <Button
                                className="ps-btn ps-btn--warning"
                                onClick={() => setShowModal(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </SSRProvider>
    );
}

function defaultValueForm() {
    return {
        token: "",
    };
}

// <Component {...pageProps} />
export default wrapper.withRedux(App);
