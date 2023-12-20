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






export default function preguntasSobreMisProductos() {
    const [busqueda, setBusqueda] = React.useState("");
    const [preguntas, setPreguntas] = useState([]);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    //PosiciónTopPage
    const irA = useRef(null);
    //obtener datos usuario actual
    const [UidUser, setUidUser] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [DatosUser, setDatosUser] = useState([]);
    console.log("DAT USER PREGUNTA SOBRE MIS PRODUCTOS : ", datosusuarios.uid);


    const filtrarPreguntasPorBusqueda = (preguntas, busqueda) => {
        return preguntas.filter((pregunta) => {
            const palabrasBusqueda = busqueda.toLowerCase().split(" ");
            const nombreProductoMinusculas = pregunta.nombreProducto.toLowerCase();

            return palabrasBusqueda.every((palabra) =>
                nombreProductoMinusculas.includes(palabra)
            );
        });
    };


    //función para ponerle la ", " a los precios
    function formatearPrecio(precio) {
        return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    //función para obtener mis preguntas a productos
    useEffect(() => {
        const obtenerPreguntas = async () => {
            let params = {
                uidvendedor: UidUser,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "52",
                    params,
                });

                console.log("Respuesta completa: ", res); // Imprime la respuesta completa
                console.log("Estado de la respuesta: ", res.status); // Imprime el estado de la respuesta

                const preguntas = res.data.listarpreguntavend.map((pregunta) => ({
                    id: pregunta.id,
                    idprd: pregunta.idprd,
                    uidcomprador: pregunta.uidcomprador,
                    uidvendedor: pregunta.uidvendedor,
                    fechacreacion: pregunta.fechacreacion,
                    comentario: pregunta.comentario,
                    respuestavenedor: pregunta.respuestavenedor,
                    estado: pregunta.estado,
                    nombreProducto: '', // Agrega esta línea
                    salePrice: '', // Agrega esta línea
                    nombreImagen: '', // Agrega esta línea
                }));

                console.log("Preguntas para mí:", preguntas)
                setPreguntas(preguntas);

                // Llama a la función para cargar las imágenes en paralelo
                const cargarImagenesPromises = preguntas.map((pregunta) =>
                    obtenerNombreProducto(pregunta.idprd)
                );

                // Espera a que todas las imágenes se carguen antes de actualizar el estado
                await Promise.all(cargarImagenesPromises);

            } catch (error) {
                console.error("Error al obtener las preguntas", error);
                console.log("Error.response: ", error.response); // Imprime la respuesta del error
            }
        };

        obtenerPreguntas();
    }, [UidUser]);


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

            console.log("Respuesta completa del producto: ", res); // Imprime la respuesta completa del producto
            console.log("Estado de la respuesta del producto: ", res.status); // Imprime el estado de la respuesta del producto

            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista

            setPreguntas((prevPreguntas) =>
                prevPreguntas.map((pregunta) =>
                    pregunta.idprd === idprd ? { ...pregunta, nombreProducto, salePrice, nombreImagen } : pregunta
                )
            );

        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
            console.log("Error.response del producto: ", error.response); // Imprime la respuesta del error del producto
        }
    }





    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [compras, setCompras] = useState([]);
    const filteredCompras = compras.filter((producto) =>
        producto.titulonombre.toLowerCase().includes(searchTerm.toLowerCase())
    );



    //Seleccionar funcion por mas antiguo o mas nuevo
    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena las preguntas según la opción seleccionada
        if (eventKey === "Más antiguo") {
            setPreguntas([...preguntas].sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion)));
        } else if (eventKey === "Más reciente") {
            setPreguntas([...preguntas].sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion)));
        }
    };

    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMiscomprasPersButton"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));












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
                                        <p>Preguntas sobre mis productos</p>

                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
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
                                    {filtrarPreguntasPorBusqueda(preguntas, busqueda).length > 0 ? (
                                        filtrarPreguntasPorBusqueda(preguntas, busqueda).map((pregunta, index) => (
                                            <Grid key={index} className="contPregResps" container style={{ width: '100%' }}>
                                                <Grid item xs={12} md={6} className="subContTopPreguntas">
                                                    <img src={`${URL_IMAGES_RESULTS}${pregunta.nombreImagen}`} />
                                                    <p className="pNameProductPregRespsts"> {pregunta.nombreProducto}</p>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="subContTopPreguntas subContTopPreguntas2">
                                                    <p>
                                                        ${formatearPrecio(pregunta.salePrice)}
                                                    </p>
                                                    <button
                                                        className='ComprarButton'
                                                        onClick={() => router.push(`/product/${pregunta.idprd}`)}
                                                    >
                                                        Ver publicación
                                                    </button>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="subContEstadoMensaje">
                                                    <div className="pregsRespstMSJ">
                                                        <p>{pregunta.comentario}</p>
                                                        <div className="RespuestaVendedorsubCont">
                                                            <IoMdReturnRight className="returnIcon" />
                                                            <p>Respuesta...</p>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="subContEstadoMensaje">
                                                    <div className="fechaYrespuestaCont">
                                                        <p>{pregunta.fechacreacion.toString().slice(0, 10)}</p>
                                                        <button className='EstadoMsjButton'>Sin respuesta</button>
                                                    </div>
                                                    <div className="buttonsPrgsUsers">
                                                        <button className='ComprarButton'>Responder</button>
                                                        <button className='EliminarPreguntaButton'>Eliminar pregunta</button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <div className="verMasResps">
                                                        <p>Ver más...</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6}></Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <p>No tienes preguntas sobre tus productos aún!</p>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}