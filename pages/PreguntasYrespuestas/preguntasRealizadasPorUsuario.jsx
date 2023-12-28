import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import { Router } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoMdReturnRight } from "react-icons/io";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesEliminar from "../mensajes/ModalMensajesEliminar";



export default function preguntasRealizadasUsuario() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    //PosiciónTopPage
    const irA = useRef(null);
    const [busqueda, setBusqueda] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState(null);

    //obtener datos usuario actual
    const [UidUser, setUidUser] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [DatosUser, setDatosUser] = useState([]);
    const [verMasDisabled, setVerMasDisabled] = useState(false); //estado para manejar el disabled cuando hay o no mas de 2 comentarios
    const [mostrarTodas, setMostrarTodas] = useState({});
    const [contenedorAbierto, setContenedorAbierto] = useState(-1);
    const [tituloMensajes, setTituloMensajes] = useState(''); //titulo modal
    const [textoMensajes, setTextoMensajes] = useState(''); //texto modal 
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [update, setUpdate] = useState(false); // Nuevo estado para forzar la actualización cuando elimino una pregunta 

    //Función para obtener el UID del comprador que nos sirve para mapear sus pregntas
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

    //función para obtener datos del producto que nos manda obtenerPreguntas
    async function obtenerNombreProducto(idprd) {
        let params = {
            idarticulo: idprd,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });

            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista
            const idProductoRuta = res.data[0].id; // Asegúrate de que la imagen exista

            console.log("Id producto ruta:", idProductoRuta)
            setPreguntas((prevPreguntas) =>
                prevPreguntas.map((preguntasGrupo) =>
                    preguntasGrupo.map((pregunta) =>
                        pregunta.idprd === idprd ? { ...pregunta, nombreProducto, salePrice, nombreImagen, idProductoRuta } : pregunta
                    )
                )
            );

        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    //función para obtener mis preguntas a productos
    useEffect(() => {
        const obtenerPreguntas = async () => {
            let params = {
                uidcomprador: UidUser,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "5211",
                    params,
                });

                const preguntasAgrupadas = res.data.listpreguntacompra.reduce((acc, pregunta) => {
                    if (acc[pregunta.idpregunta]) {
                        acc[pregunta.idpregunta].push(pregunta);
                    } else {
                        acc[pregunta.idpregunta] = [pregunta];
                    }
                    return acc;
                }, {});

                // Ordena las preguntas por fecha de creación
                const preguntasOrdenadas = Object.values(preguntasAgrupadas).sort((a, b) => new Date(b[0].fechacreacion) - new Date(a[0].fechacreacion));

                setPreguntas(preguntasOrdenadas);

                // Llama a la función para cargar las imágenes en paralelo
                const cargarImagenesPromises = preguntasOrdenadas.map((preguntas) =>
                    obtenerNombreProducto(preguntas[0].idprd)
                );

                // Espera a que todas las imágenes se carguen antes de actualizar el estado
                await Promise.all(cargarImagenesPromises);

            } catch (error) {
                console.error("Error al obtener las preguntas", error);
            }
        };

        obtenerPreguntas();
    }, [UidUser, update]);

    //función para eliminar pregunta por el idpregunta que nos manda del renderizado
    const eliminarPregunta = (idpregunta) => {
        console.log("Preparando para eliminar pregunta con id:", idpregunta);

        // Guarda el id de la pregunta a eliminar
        setIdPreguntaAEliminar(idpregunta);

        // Muestra el modal de confirmación
        setShowModal2(true);
    };

    const confirmarEliminacion = async () => {
        let params = {
            idpregunta: idPreguntaAEliminar,
        };
  
        await axios({
            method: "post",
            url: URL_BD_MR + "5213",
            params,
        })
            .then((res) => {
                console.log("Pregunta eliminada exitosamente");

                setPreguntas(prevPreguntas => {
                    const nuevasPreguntas = { ...prevPreguntas };
                    delete nuevasPreguntas[idPreguntaAEliminar];
                    return nuevasPreguntas;
                });

                setUpdate(prevUpdate => !prevUpdate); // Cambia el estado de update para forzar una actualización del componente

                // Muestra el modal de confirmación después de eliminar la pregunta
                setShowModal(true);
                setTituloMensajes("Pregunta eliminada");
                let texto = "La pregunta se eliminó correctamente";
                setTextoMensajes(texto);
            })
            .catch(function (error) {
                console.error("Error al eliminar la pregunta", error);
            });

        // Cierra el modal después de la eliminación
        setShowModal2(false);
    };

    const [showModal2, setShowModal2] = useState(false);
    const [idPreguntaAEliminar, setIdPreguntaAEliminar] = useState(null);

    //función para ponerle la ", " a los precios
    function formatearPrecio(precio) {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Seleccionar funcion por mas antiguo o mas nuevo
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setPreguntas(prevPreguntas =>
                [...prevPreguntas].sort((a, b) => new Date(a[0].fechacreacion) - new Date(b[0].fechacreacion))
            );
        } else if (eventKey === "Más reciente") {
            setPreguntas(prevPreguntas =>
                [...prevPreguntas].sort((a, b) => new Date(b[0].fechacreacion) - new Date(a[0].fechacreacion))
            );
        }
    };

    //Button de dropdown
    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMiscomprasPersButton"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));


    // Filtra los IDs de las preguntas basándote en el valor de búsqueda
    const palabrasBusqueda = busqueda.toLowerCase().split(' ');

    const idsPreguntasFiltradas = Object.keys(preguntas).filter(idpregunta =>
        preguntas[idpregunta][0].nombreProducto && palabrasBusqueda.every(palabra =>
            preguntas[idpregunta][0].nombreProducto.toLowerCase().includes(palabra)
        )
    );

    //handlechange para busqueda
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    //usefect para esconder el resto de preguntas en un principio
    useEffect(() => {
        // Inicializar mostrarTodas con todos los contenedores como false
        const inicializarMostrarTodas = Object.keys(preguntas).reduce((acc, idpregunta) => {
            return { ...acc, [idpregunta]: false };
        }, {});
        setMostrarTodas(inicializarMostrarTodas);
    }, [preguntas, update]);


    //función para mostrar todas las preguntas al darle ver más
    const handleVerMasClick = (idpregunta) => {
        setMostrarTodas((prevState) => ({
            ...prevState,
            [idpregunta]: !prevState[idpregunta],
        }));
    };

    useEffect(() => {
        // Función para calcular el estado de verMasDisabled
        const calcularVerMasDisabled = () => {
            // Iterar sobre las claves de preguntas para calcular el estado de verMasDisabled
            Object.keys(preguntas).forEach((idpregunta) => {
                // Obtener las preguntas y respuestas actuales
                const preguntasGrupo = preguntas[idpregunta];
                const preguntasRespuestasOrdenadas = preguntasGrupo.sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion));

                // Verificar si hay más de dos comentarios para deshabilitar el botón "Ver más"
                setVerMasDisabled(prevState => ({ ...prevState, [idpregunta]: preguntasRespuestasOrdenadas.length <= 2 }));
            });
        };

        // Llamar a la función para calcular el estado de verMasDisabled
        calcularVerMasDisabled();
    }, [preguntas, update]);

    //cerrar modal de preguntas realizadas
    const handleModalClose = () => {
        setShowModal(false);
    };

 




    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);



    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='titlesformsUsers'>
                                        <p>Preguntas realizadas</p>
                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            value={busqueda}
                                            onChange={handleBusquedaChange}
                                            placeholder="Buscar en mis preguntas"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f2f6',
                                                padding: '8px',
                                                marginRight: '8px',
                                                width: '90%',
                                                height: '44px',
                                                padding: '10px',
                                                fontSize: '16px',
                                                paddingLeft: '3rem',
                                                color: '#2C2E82',
                                                fontWeight: '500',
                                                '&::placeholder': {
                                                    color: '#3E4089',
                                                    fontWeight: '600',
                                                },
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                                                </InputAdornment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Dropdown style={{ width: '40%' }} onSelect={handleSelect}>
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                                <Dropdown.Item
                                                    eventKey="Más antiguo"
                                                    className="itemsdropdownTdocPersona"
                                                >
                                                    Más antiguo
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Más reciente"
                                                    className="itemsdropdownTdocPersona"
                                                >
                                                    Más reciente
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid>
                                </Grid>

                                <Grid className="contProdcOMPR" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '2rem' }}>



                                    <Grid className="contPregResps" container style={{ width: '100%' }}>
                                        {idsPreguntasFiltradas.length > 0 ? (
                                            idsPreguntasFiltradas.sort().map((idpregunta, indexPregunta) => {
                                                const preguntasGrupo = preguntas[idpregunta];
                                                // Ordena las preguntas y respuestas por fecha
                                                const preguntasRespuestasOrdenadas = preguntasGrupo.sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion));
                                                const mostrarSoloDos = preguntasRespuestasOrdenadas.length <= 2;
                                                const salePrice = formatearPrecio(preguntasGrupo[0].salePrice); // Formatea el precio aquí
                                                const nombreImagen = preguntasGrupo[0].nombreImagen;
                                                const idProductoRuta = preguntasGrupo[0].idProductoRuta;


                                                return (
                                                    <Grid container key={idpregunta} className="contNewPregYrespt">
                                                        <Grid item xs={12} md={6} className="subContTopPreguntas">
                                                            <img src={`${URL_IMAGES_RESULTS}${nombreImagen}`} onClick={() => router.push(`/product/${idProductoRuta}`)} />
                                                            <p className="pNameProductPregRespsts" onClick={() => router.push(`/product/${idProductoRuta}`)}>{preguntasGrupo[0].nombreProducto}</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="subContTopPreguntas subContTopPreguntas2">
                                                            <p className="pricePregRealizs">
                                                                ${salePrice}
                                                            </p>
                                                            <button
                                                                className='ComprarButton'
                                                                onClick={() => router.push(`/product/${idProductoRuta}`)}
                                                            >
                                                                Comprar
                                                            </button>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="chatPregRealizUsers">
                                                            {preguntasRespuestasOrdenadas.slice(0, mostrarTodas[idpregunta] ? undefined : 2).map((preguntaRespuesta, indexRespuesta) => (
                                                                <Grid key={preguntaRespuesta.id} item xs={12} md={12} className="subContEstadoMensaje">
                                                                    <Grid key={preguntaRespuesta.id} item xs={12} md={12} className="subContEstadoMensaje">
                                                                        {indexRespuesta === contenedorAbierto ? (
                                                                            preguntaRespuesta.estado === 81 ? (
                                                                                <div className="RespuestaVendedorsubCont">
                                                                                    <div className="commenteconReturn">
                                                                                        <IoMdReturnRight className="returnIcon" />
                                                                                        <p>{preguntaRespuesta.comentario}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <p className="pregR">{preguntaRespuesta.comentario}</p>
                                                                            )
                                                                        ) : (
                                                                            preguntaRespuesta.estado === 81 ? (
                                                                                <div className="RespuestaVendedorsubCont">
                                                                                    <div className="commenteconReturn">
                                                                                        <IoMdReturnRight className="returnIcon" />
                                                                                        <p>{preguntaRespuesta.comentario}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <p className="pregR">{preguntaRespuesta.comentario}</p>
                                                                            )
                                                                        )}
                                                                        {preguntasRespuestasOrdenadas.length === 1 && preguntaRespuesta.estado === 80 && (
                                                                            <div className="RespuestaVendedorsubCont">
                                                                                <div className="commenteconReturn">
                                                                                    <IoMdReturnRight className="returnIcon" />
                                                                                    <p>Aún no te han respondido...</p>
                                                                                </div>
                                                                            </div>

                                                                        )}
                                                                    </Grid>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="subContEstadoMensaje2">
                                                            <p>{new Date(preguntasGrupo[preguntasGrupo.length - 1].fechacreacion).toISOString().split('T')[0]}</p>
                                                            <div className="buttonsPrgsUsers">
                                                                <button
                                                                    onClick={() => router.push({
                                                                        pathname: './OtraPreg',
                                                                        query: {
                                                                            nombreImagen: nombreImagen,
                                                                            nombreProducto: preguntasGrupo[0].nombreProducto,
                                                                            uidcomprador: preguntasGrupo[0].uidcomprador,
                                                                            uidvendedor: preguntasGrupo[0].uidvendedor,
                                                                            idproducto: preguntasGrupo[0].idProductoRuta,
                                                                        }
                                                                    })}
                                                                    className='ComprarButton'
                                                                >
                                                                    Hacer otra pregunta
                                                                </button>
                                                                <button
                                                                    className='EliminarPreguntaButton'
                                                                    onClick={() => eliminarPregunta(preguntasGrupo[0].idpregunta)}
                                                                >
                                                                    Eliminar pregunta
                                                                </button>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <div className="verMasResps" onClick={() => { if (preguntasRespuestasOrdenadas.length > 2) handleVerMasClick(idpregunta) }} style={{ cursor: mostrarTodas[idpregunta] ? 'pointer' : 'auto' }}>
                                                                <p className={`verMasTexto ${preguntasRespuestasOrdenadas.length > 2 ? 'verMasTextoHover' : ''}`} style={{
                                                                    fontSize: '16px',
                                                                    color: mostrarSoloDos ? '#d4d6e5' : (mostrarTodas[idpregunta] ? '#2D2E83' : '#2D2E83'),
                                                                    fontWeight: 500,
                                                                    fontFamily: '"Jost", sans-serif',
                                                                }} disabled={preguntasRespuestasOrdenadas.length <= 2}>
                                                                    {mostrarTodas[idpregunta] ? 'Ver menos...' : 'Ver más...'}
                                                                </p>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}></Grid>
                                                    </Grid>
                                                );
                                            })
                                        ) : (
                                            <p>No has hecho preguntas aún.</p>
                                        )}
                                    </Grid>






                                    <ModalMensajesEliminar
                                        shown={showModal2}
                                        setContinuarEliminar={confirmarEliminacion}
                                        setAbandonarEliminar={() => setShowModal2(false)}
                                        titulo="Eliminar pregunta"
                                        mensaje="¿Estás seguro de que quieres eliminar esta pregunta?"
                                        tipo="confirmación"
                                    />
                                    <ModalMensajes
                                        shown={showModal}
                                        close={handleModalClose}
                                        titulo={tituloMensajes}
                                        mensaje={textoMensajes}
                                        tipo="error"
                                    />







                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}