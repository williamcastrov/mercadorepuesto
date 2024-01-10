import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineRight } from 'react-icons/ai';
import { GrNext } from "react-icons/gr";
import { URL_BD_MR } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import ModalMensajesWishListControl from "../mensajes/ModalMensajesWishListControl";
import { getLeeIra } from "../../store/leeira/action";
import { useParams } from 'react-router-dom';
import BuscarComponente from "./BuscarComponente";
import ModalMensajes from "../mensajes/ModalMensajes";



export default function modificarPreguntas() {
    const [activeIdDos, setActiveIdDos] = useState(null);
    const [activeIndexUno, setActiveIndexUno] = useState(0);
    const [activeIndexDos, setActiveIndexDos] = useState(0);
    const [activeIndexTres, setActiveIndexTres] = useState(0);
    const [active, setActive] = useState(1);
    const [datosNivelUno, setDatosNivelUno] = useState([]);
    const [datosNivelDos, setDatosNivelDos] = useState([]);
    const [datosNivelTres, setDatosNivelTres] = useState([]);
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal


    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "116",
                });
                let idCounter = 1;
                const datosNivelUno = res.data.resolverdudasdos.filter(dato => {
                    if (dato.niveluno === 1) {
                        dato.uniqueId = idCounter++;
                        return true;
                    }
                    return false;
                });
                idCounter = 10; // Comienza a asignar los IDs para datosNivelDos desde 10
                const datosNivelDos = res.data.resolverdudasdos.filter(dato => {
                    if (dato.niveluno === 2) {
                        dato.uniqueId = idCounter++;
                        return true;
                    }
                    return false;
                });
                idCounter = 20; // Ajusta este valor según dónde deban comenzar los IDs para datosNivelTres
                const datosNivelTres = res.data.resolverdudasdos.filter(dato => {
                    if (dato.niveluno === 3) {
                        dato.uniqueId = idCounter++;
                        return true;
                    }
                    return false;
                });
                console.log("Datos nivel 1: ", datosNivelUno)
                console.log("Datos nivel 2: ", datosNivelDos)
                console.log("Datos nivel 3: ", datosNivelTres)
                setDatosNivelUno(datosNivelUno);
                setDatosNivelDos(datosNivelDos);
                setDatosNivelTres(datosNivelTres);
            } catch (error) {
                console.error("Error al leer los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatos();
    }, []); // Se ejecuta cada vez que se actualizan los datos



    // Función para manejar el cambio de los inputs y textareas
    const handleInputChange = (event, index, field, nivel) => {
        let newDatos;
        if (nivel === 1) {
            newDatos = [...datosNivelUno];
        } else if (nivel === 2) {
            newDatos = [...datosNivelDos];
        } else if (nivel === 3) {
            newDatos = [...datosNivelTres];
        }
        newDatos[index][field] = event.target.value;
        if (nivel === 1) {
            setDatosNivelUno(newDatos);
        } else if (nivel === 2) {
            setDatosNivelDos(newDatos);
        } else if (nivel === 3) {
            setDatosNivelTres(newDatos);
        }
    };

    // Función para manejar el evento del botón "Guardar"
    // Crear un objeto de mapeo
    let idMapping = {};

    datosNivelUno.forEach((dato, index) => {
        // Asignar el ID correspondiente a cada dato
        idMapping[dato.niveldos] = index + 1;
    });

    datosNivelDos.forEach((dato, index) => {
        // Continuar asignando los IDs correspondientes
        idMapping[dato.niveldos] = index + 1 + datosNivelUno.length;
    });

    datosNivelTres.forEach((dato, index) => {
        // Continuar asignando los IDs correspondientes
        idMapping[dato.niveldos] = index + 1 + datosNivelUno.length + datosNivelDos.length;
    });

    // Función para manejar el evento del botón "Guardar" 
    const handleSave = async (index, nivel) => {
        const dato = nivel === 1 ? datosNivelUno[index] : nivel === 2 ? datosNivelDos[index] : datosNivelTres[index];

        // Validar los datos
        if (!validarDatos(dato)) {
            return; // No continuar con la función si los datos no son válidos
        }

        // Enviar los datos
        enviarDatos(dato);
    };

    const validarDatos = (dato) => {
        if (!dato.nombreniveldos || !dato.descripcionniveldos) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Admin, nigún campo puede quedar vacio.');
            setShowModal(true);
            return false;
        }
        return true;
    };

    // Enviar los datos
    const enviarDatos = async (dato) => {
        try {
            const datosParaEnviar = { ...dato };
            delete datosParaEnviar.uniqueId;

            // Imprimir los datos que se van a enviar en la consola
            console.log("Datos a enviar: ", datosParaEnviar);

            const res = await axios({
                method: "post",
                url: URL_BD_MR + "118",
                params: {
                    id: dato.uniqueId, // Usar el ID único
                    nombreniveldos: dato.nombreniveldos,
                    descripcionniveldos: dato.descripcionniveldos,
                    descripcionniveltres: dato.descripcionniveltres,
                    descripcionnivelcuatro: dato.descripcionnivelcuatro
                }
            });
            console.log("Datos enviados: ", datosParaEnviar);
            console.log("Respuesta del servidor al enviar datos: ", res.data)
            // Si la solicitud fue exitosa, muestra el modal con un mensaje de éxito
            setTituloMensajes('Datos enviados');
            setTextoMensajes('Los datos se han enviado correctamente.');
            setShowModal(true);
        } catch (error) {
            console.error("Error al actualizar los datos", error);
            // Maneja el error según tus necesidades
        }
    };


    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? '100%' : '89%' }} display={'flex'} flexDirection={'column'}>
                                    <div className='TitleOpVend'>
                                        <p>Modificar dudas e inquietudes</p>
                                    </div>
                                    <div className="contMainResolverDudas ModifMain">
                                        <div className="mainButtonsModifi">
                                            <div className="ButtonsModifi">
                                                <button className={`buttonActiveModif ${active === 1 ? 'active' : ''}`} onClick={() => setActive(1)}>Preguntas mis compras</button>
                                                <button className={`buttonActiveModif ${active === 2 ? 'active' : ''}`} onClick={() => setActive(2)}>Preguntas mis ventas</button>
                                                <button className={`buttonActiveModif ${active === 3 ? 'active' : ''}`} onClick={() => setActive(3)}>Preguntas mis datos</button>


                                            </div>
                                        </div>


                                        {active === 1 && (
                                            <div className="ModifDudasMisCompras">
                                                <div className='TitleOpVend'>
                                                    <p>Modificar dudas de mis compras</p>
                                                </div>
                                                <div className="BotonesEnActivo">
                                                    {datosNivelUno.map((dato, index) => (
                                                        <button
                                                            key={dato.uniqueId}
                                                            onClick={() => setActiveIndexUno(index)}
                                                            className={`botónDN1 ${activeIndexUno === index ? 'botónDN1-activo' : ''}`}
                                                        >
                                                            Mis compras botón {index + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                                {datosNivelUno[activeIndexUno] && (
                                                    <div className='AccionesInputs'>
                                                        <input type="text" className='InputFormsUsers' placeholder="Titulo de duda en mis compras" value={datosNivelUno[activeIndexUno].nombreniveldos} onChange={(e) => handleInputChange(e, activeIndexUno, 'nombreniveldos', 1)} />
                                                        <textarea placeholder="Descripcion de duda en mis compras" value={datosNivelUno[activeIndexUno].descripcionniveldos} onChange={(e) => handleInputChange(e, activeIndexUno, 'descripcionniveldos', 1)} />
                                                        <textarea placeholder="Descripcion nivel tres" value={datosNivelUno[activeIndexUno].descripcionniveltres} onChange={(e) => handleInputChange(e, activeIndexUno, 'descripcionniveltres', 1)} />
                                                        <textarea placeholder="Descripcion nivel cuatro" value={datosNivelUno[activeIndexUno].descripcionnivelcuatro} onChange={(e) => handleInputChange(e, activeIndexUno, 'descripcionnivelcuatro', 1)} />
                                                        <button onClick={() => handleSave(activeIndexUno, 1)}>Guardar</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {active === 2 && (
                                            <div className="ModifDudasMisCompras">
                                                <div className='TitleOpVend'>
                                                    <p>Modificar dudas de mis ventas</p>
                                                </div>
                                                <div className="BotonesEnActivo">
                                                    {datosNivelDos.map((dato, index) => (
                                                        <button
                                                            key={dato.uniqueId}
                                                            onClick={() => setActiveIndexDos(index)}
                                                            className={`botónDN1 ${activeIndexDos === index ? 'botónDN1-activo' : ''}`}
                                                        >
                                                            Mis ventas botón {index + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                                {datosNivelDos[activeIndexDos] && (
                                                    <div className='AccionesInputs'>
                                                        <input type="text" className='InputFormsUsers' placeholder="Titulo de duda en mis compras" value={datosNivelDos[activeIndexDos].nombreniveldos} onChange={(e) => handleInputChange(e, activeIndexDos, 'nombreniveldos', 2)} />
                                                        <textarea placeholder="Descripcion de duda en mis compras" value={datosNivelDos[activeIndexDos].descripcionniveldos} onChange={(e) => handleInputChange(e, activeIndexDos, 'descripcionniveldos', 2)} />
                                                        <textarea placeholder="Descripcion nivel tres" value={datosNivelDos[activeIndexDos].descripcionniveltres} onChange={(e) => handleInputChange(e, activeIndexDos, 'descripcionniveltres', 2)} />
                                                        <textarea placeholder="Descripcion nivel cuatro" value={datosNivelDos[activeIndexDos].descripcionnivelcuatro} onChange={(e) => handleInputChange(e, activeIndexDos, 'descripcionnivelcuatro', 2)} />
                                                        <button onClick={() => handleSave(activeIndexDos, 2)}>Guardar</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {active === 3 && (
                                            <div className="ModifDudasMisCompras">
                                                <div className='TitleOpVend'>
                                                    <p>Modificar dudas de mis datos</p>
                                                </div>
                                                <div className="BotonesEnActivo">
                                                    {datosNivelTres.map((dato, index) => (
                                                        <button
                                                            key={dato.uniqueId}
                                                            onClick={() => setActiveIndexTres(index)}
                                                            className={`botónDN1 ${activeIndexTres === index ? 'botónDN1-activo' : ''}`}
                                                        >
                                                            Mis datos botón {index + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                                {datosNivelTres[activeIndexTres] && (
                                                    <div className='AccionesInputs'>
                                                        <input type="text" className='InputFormsUsers' placeholder="Titulo de duda en mis compras" value={datosNivelTres[activeIndexTres].nombreniveldos} onChange={(e) => handleInputChange(e, activeIndexTres, 'nombreniveldos', 3)} />
                                                        <textarea placeholder="Descripcion de duda en mis compras" value={datosNivelTres[activeIndexTres].descripcionniveldos} onChange={(e) => handleInputChange(e, activeIndexTres, 'descripcionniveldos', 3)} />
                                                        <textarea placeholder="Descripcion nivel tres" value={datosNivelTres[activeIndexTres].descripcionniveltres} onChange={(e) => handleInputChange(e, activeIndexTres, 'descripcionniveltres', 3)} />
                                                        <textarea placeholder="Descripcion nivel cuatro" value={datosNivelTres[activeIndexTres].descripcionnivelcuatro} onChange={(e) => handleInputChange(e, activeIndexTres, 'descripcionnivelcuatro', 3)} />
                                                        <button onClick={() => handleSave(activeIndexTres, 3)}>Guardar</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <ModalMensajes
                                            shown={showModal}
                                            close={handleModalClose}
                                            titulo={tituloMensajes}
                                            mensaje={textoMensajes}
                                            tipo="error"
                                        />
                                    </div>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}