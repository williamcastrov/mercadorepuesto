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
import { useSelector } from "react-redux";
import moment from 'moment';


export default function opinionesVendedor() {


    {/* 
    const [diasComoVendedor, setDiasComoVendedor] = useState(0);

    useEffect(() => {
      const obtenerDatosVendedor = async () => {
        let params = {
          uid: datosusuarios.uid,
        };
        try {
          console.log("Enviando solicitud a tuEndPoint con params: ", params);
          const res = await axios({
            method: "post",
            url: URL_BD_MR + "13",
            params,
          });
          console.log("Respuesta recibida de tuEndPoint: ", res.data);
  
          if (res.data && res.data.length > 0) {
            const fechaCreacion = moment(res.data[0].fechacreacion, "YYYY-MM-DD HH:mm:ss");
            
            if (fechaCreacion.isValid()) {
              const fechaActual = moment();
              const diferenciaEnDias = fechaActual.diff(fechaCreacion, 'days');
              setDiasComoVendedor(diferenciaEnDias);
            } else {
              console.error("La fecha de creación no es válida.");
            }
          } else {
            console.error("No se encontraron datos del usuario en tuEndPoint.");
          }
        } catch (error) {
          console.error("Error al leer los datos del usuario en tuEndPoint", error);
          // Maneja el error según tus necesidades
        }
      };
  
      obtenerDatosVendedor();
    }, [datosusuarios]);
*/}



    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const irA = useRef(null);//PosiciónTopPage
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("Datos usuario vendedor: ", datosusuarios)
    const [tiempoComoVendedor, setTiempoComoVendedor] = useState('');
    const [nombreVendedor, setNombreVendedor] = useState(""); //Nombrevendedor
    const [numeroVentas, setNumeroVentas] = useState(0);    //estado para guardar ventas cantidad
    // Estado para almacenar la dirección más reciente
    const [ciudadVendedor, setCiudadVendedor] = useState("");
    const [departamentoVendedor, setDepartamentoVendedor] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    // Estado para almacenar las calificaciones
    const [calificaciones, setCalificaciones] = useState([]);
    // Estado para almacenar la calificación promedio
    const [calificacionPromedio, setCalificacionPromedio] = useState(0);

    
    //Función para obtener, nombre de vendedor, número de ventas y tiempo como vendedor
    useEffect(() => {
        const obtenerDatosVendedor = async () => {
            let params = {
                idvendedor: datosusuarios.uid,
            };
            try {
                console.log("Enviando solicitud a endPoint 106 con params: ", params);
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "106",
                    params,
                });
                console.log("Respuesta recibida del endPoint 106: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listarvtasusuariovende) {
                    // Asumiendo que todos los objetos son ventas del mismo vendedor
                    setNumeroVentas(res.data.listarvtasusuariovende.length);
                    const vendedor = res.data.listarvtasusuariovende[0];
                    const nombreCompleto = `${vendedor.primernombre || ''} ${vendedor.segundoapellido || ''}`.trim();
                    setNombreVendedor(nombreCompleto);
                }
            } catch (error) {
                console.error("Error al leer los datos del vendedor en endPoint 106", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatosVendedor();
    }, [datosusuarios]);

    //Función para calcular el tiempo que lleva como vendedor 
    useEffect(() => {
        const fechaCreacionVendedor = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            try {
                console.log("Enviando solicitud a tuEndPoint con params: ", params);
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                console.log("Respuesta recibida de tuEndPoint: ", res.data);

                if (res.data && res.data.length > 0) {
                    const fechaCreacion = moment(res.data[0].fechacreacion, "YYYY-MM-DD HH:mm:ss");

                    if (fechaCreacion.isValid()) {
                        const fechaActual = moment();
                        const diferenciaEnDias = fechaActual.diff(fechaCreacion, 'days');

                        if (diferenciaEnDias < 365) {
                            setTiempoComoVendedor(`${diferenciaEnDias} días`);
                        } else {
                            const duracion = moment.duration(diferenciaEnDias, 'days');
                            const years = duracion.years();
                            const remainingDays = duracion.days();

                            setTiempoComoVendedor(`${years} año${years !== 1 ? 's' : ''} y ${remainingDays} día${remainingDays !== 1 ? 's' : ''}`);
                        }
                    } else {
                        console.error("La fecha de creación no es válida.");
                    }
                } else {
                    console.error("No se encontraron datos del usuario en tuEndPoint.");
                }
            } catch (error) {
                console.error("Error al leer los datos del usuario en tuEndPoint", error);
                // Maneja el error según tus necesidades
            }
        };

        fechaCreacionVendedor();
    }, [datosusuarios]);

    //Función para obtener dirección mas reciente del usuario
    useEffect(() => {
        const obtenerDireccionVendedor = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                console.log("Enviando solicitud a endPoint 65 con params: ", params);
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "65",
                    params,
                });
                console.log("Respuesta recibida del endPoint 65: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listardireccionesusuario) {
                    // Ordenamos las direcciones por fecha de creación y tomamos la más reciente
                    const direccionesOrdenadas = res.data.listardireccionesusuario.sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
                    setCiudadVendedor(direccionesOrdenadas[0].nombreciudad);
                    setDepartamentoVendedor(direccionesOrdenadas[0].nombre_dep);



                }
            } catch (error) {
                console.error("Error al leer los datos del vendedor en endPoint 65", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDireccionVendedor();
    }, [datosusuarios]);

    //console.log("Ciudad vendedor: ", ciudadVendedor)
    //console.log("Departamento vendedor: ", departamentoVendedor)
    //console.log("Dias como vendedor: ", diasComoVendedor)




    useEffect(() => {
        const obtenerCalificacionesVendedor = async () => {
            let params = {
                uidvendedor: datosusuarios.uid,
            };
            try {
                console.log("Enviando solicitud a endPoint 502 con params: ", params);
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "502",
                    params,
                });
                console.log("Respuesta recibida del endPoint 502: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listarcalprdvendedor) {
                    setCalificaciones(res.data.listarcalprdvendedor);

                    // Calcular la calificación promedio
                    const sumaCalificaciones = res.data.listarcalprdvendedor.reduce((suma, calificacion) => suma + calificacion.calificacion, 0);
                    const promedio = sumaCalificaciones / res.data.listarcalprdvendedor.length;
                    setCalificacionPromedio(promedio);
                }
            } catch (error) {
                console.error("Error al leer los datos del vendedor en endPoint 502", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerCalificacionesVendedor();
    }, [datosusuarios]);






    //Seleccionar funcion por mas antiguo o mas nuevo
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setCalificaciones(prevCalificaciones =>
                [...prevCalificaciones].sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion))
            );
        } else if (eventKey === "Más reciente") {
            setCalificaciones(prevCalificaciones =>
                [...prevCalificaciones].sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion))
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



    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? '100%' : '94%' }}>
                                    <Grid item xs={12} md={4} className="ContOpVendedor" flexDirection={'column'} display={'flex'}>
                                        <div className='TitleOpVend'>
                                            <p>Mis opiniones como vendedor</p>
                                        </div>
                                        <div className='subTitleOpVend'>
                                            <p>Mis opiniones como vendedor</p>
                                        </div>
                                        <div className="conUserOpiVend">
                                            <div className="conUserOpiVendNombre">
                                                <p>Vendedor: {nombreVendedor}</p>
                                            </div>
                                            <div className="conUserOpiVendData">
                                                <p>Tiempo como vendedor:  {tiempoComoVendedor}</p>
                                                <p>Numero de ventas: {numeroVentas}</p>
                                                <p>{ciudadVendedor}, {departamentoVendedor}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} className="maincontCalificOpinionesV" display={'flex'} flexDirection={'column'}>
                                        <div className="vacioOpiniones"></div>

                                        <div className="contCalificOpinionesV">
                                            <div className="PcalifV">
                                                <p>Calificación vendedor</p>
                                            </div>
                                            <div className="SubcontCalificOpinionesV">
                                                <p className="SubcontCalificOpinionesVP"> {calificacionPromedio.toFixed(1)}</p>
                                                <div className="contnumbercalifics">
                                                    <div className="iconsOpinVend">
                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                            <RiSettings5Fill
                                                                key={index}
                                                                size={22}
                                                                className={index <= Math.floor(calificacionPromedio) ? "iconoConfOpiVn colorRojo" : "iconoConfOpiVn"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>{calificaciones.length} calificaciones</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mainOpinionesComentarios">
                                            <div className="subCmainOpiniones">
                                                <p>Comentarios de los compradores:</p>
                                                <Dropdown style={{ width: '27%' }} onSelect={handleSelect} className="dropOpiniones">
                                                    <Dropdown.Toggle
                                                        as={CustomDropdownButton}
                                                        id="dropdown-basic"
                                                    >
                                                        {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="tamañocajaoptionsVendedor">
                                                        <Dropdown.Item
                                                            eventKey="Más antiguo"
                                                            className="itemsdropdownVerVenta"
                                                        >
                                                            Más antiguo
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            eventKey="Más reciente"
                                                            className="itemsdropdownVerVenta"
                                                        >
                                                            Más reciente
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>


                                            <div className="MainComentarios">
                                                {calificaciones.map((calificacion, index) => (
                                                    <div className="subCmainComentarios" key={index}>
                                                        <div className="subCmainComentarios2">
                                                            <div className="subCmainIconos">
                                                                {[1, 2, 3, 4, 5].map((index) => (
                                                                    <RiSettings5Fill
                                                                        key={index}
                                                                        size={18}
                                                                        className={index <= calificacion.calificacion ? "iconoConfOpiVn colorRojo" : "iconoConfOpiVn"}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p>Comentario de la calificación:</p>
                                                            <p>{calificacion.comentario}</p>

                                                            <p>{calificacion.fechacreacion ? calificacion.fechacreacion.slice(0, 10) : ""}</p>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>


                                        </div>


                                    </Grid>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}