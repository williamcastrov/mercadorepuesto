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

function App({ Component, pageProps }) {
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
                url: URL_BD_MR+"38",
            })
                .then((res) => {
                    //console.log("CONECTORES : ", res.data.listarconectores);
                    let datconectar = res.data.listarconectores;
                    //setDatosConectores(res.data.listarconectores);
                    localStorage.setItem("dataconectores", JSON.stringify(datconectar));
                })
                .catch(function (error) {});
        };
        leeconectores();

        const palabras = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR+"37",
            })
                .then((res) => {
                    let datwords = res.data.listarpalabras;
                    localStorage.setItem("datawords", JSON.stringify(datwords));
                })
                .catch(function (error) {});
        };
        palabras();

        //lee productos genericos 
        const leeGenericos = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR+"42",
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
                               
                                if(user.metadata.createdAt){
                                    //console.log("ID USER : ",user.metadata.createdAt)
                                    const leerItems = async () => {
                                        let params = {
                                            usuario: user.metadata.createdAt,
                                        };
                            
                                        await axios({
                                            method: "post",
                                            url: URL_BD_MR+"54",
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
