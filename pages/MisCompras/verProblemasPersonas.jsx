import Container from "../../components/layouts/Container";
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    InputAdornment,
    TextField,
    InputBase,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AiOutlineRight } from "react-icons/ai";
import { IoIosCamera } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import ModalMensajes from "../mensajes/ModalMensajes";
import { RiSettings5Fill } from "react-icons/ri";
import { SlPaperClip } from "react-icons/sl";
import { LuSendHorizonal } from "react-icons/lu";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";


export default function verProblemasPersonas() {

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const [messages, setMessages] = useState([]);


    const [users, setUsers] = useState({});

    // Función para leer usuarios
    const leerUsuarios = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}13`,
            });

            const usuarios = response.data;

            // Crear un objeto donde la clave es el uid y el valor es el objeto del usuario
            const usuariosObj = usuarios.reduce((obj, usuario) => {
                obj[usuario.uid] = usuario;
                return obj;
            }, {});

            // Actualizar el estado con los usuarios recibidos
            setUsers(usuariosObj);
        } catch (error) {
            console.error("Error leyendo usuarios:", error);
        }
    };

    // Efecto para cargar usuarios al montar
    useEffect(() => {
        leerUsuarios();
    }, []);
    // Función para leer mensajes
    const leerMensajes = async () => {
        let params = {
            estado: 31,
        };

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}84`,
                params,
            });

            const mensajes = response.data.listarmensajes;

            // Obtener el nombre y apellido del usuario para cada mensaje
            const mensajesConNombres = await Promise.all(
                mensajes.map(async (mensaje) => {
                    const { nombreUsuario, apellidoUsuario, correo } = await obtenerNombreUsuario(mensaje.usuarioenvia);
                    return { ...mensaje, nombreUsuario, apellidoUsuario, correo };
                })
            );

            // Ordenar los mensajes por fecha de creación
            const mensajesOrdenados = mensajesConNombres.sort(
                (b, a) => new Date(a.fechacreacion) - new Date(b.fechacreacion)
            );

            // Actualizar el estado con los mensajes recibidos
            setMessages(mensajesOrdenados);
        } catch (error) {
            console.error("Error leyendo mensajes:", error);
        }
    };

    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, []);


    // Función para obtener el nombre y apellido del usuario
    async function obtenerNombreUsuario(uid) {
        let params = {
            uid: uid,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });

            const nombreUsuario = res.data[0].primernombre;
            const apellidoUsuario = res.data[0].segundonombre;
            const correo = res.data[0].email;

            return { nombreUsuario, apellidoUsuario, correo};

        } catch (error) {
            console.error("Error al obtener el nombre del usuario", error);
        }
    }



    return (
        <>
            <div ref={irA}>
                <div>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid container>
                                        <Grid className="subcprinccalific" item xs={12} md={7} sx={{ width: isMdDown ? "100%" : "90%", }} flexDirection={"column"}>
                                            <div className="titleTproblema">
                                                <p>Problemas de los usuarios</p>
                                            </div>
                                            <Grid container className="VerProblemasPersonasCont" item xs={12} md={12} flexDirection={"column"}>

                                                {messages.map((mensaje) => (
                                                    <div key={mensaje.id} className="SubContsVerProblemasPersonasCont">
                                                        <div className="DataUsersVerProblemas">
                                                            <p className="DataUserSendProblem">Datos del comprador que envía el problema:</p>
                                                            <div className="NombreUserEnvíaProblema">
                                                                <p className="NombreUserEnvíaProblema1">Usuario envía el problema:</p>
                                                                <p>{mensaje.nombreUsuario} {mensaje.apellidoUsuario}</p>
                                                            </div>
                                                            <div className="NombreUserEnvíaProblema">
                                                                <p className="NombreUserEnvíaProblema1">Email de  usuario que envía el problema:</p>
                                                                <p> {mensaje.correo}</p>
                                                            </div>
                                                            <div className="NombreUserEnvíaProblema">
                                                                <p className="NombreUserEnvíaProblema1">Descripción problema con el producto:</p>
                                                                <p>{mensaje.comentario}</p>
                                                            </div>
                                                        </div>
                                                        <div className="DataUsersVerProblemas">
                                                            <p className="DataUserSendProblem">Datos del vendedor y del producto:</p>
                                                            <div className="NombreUserEnvíaProblema">
                                                                <p className="NombreUserEnvíaProblema1">Nombre del producto con problema:</p>
                                                                <p>Persiana Ford Escpe Gasolina modelo 2023 </p>
                                                            </div>
                                                            <div className="NombreUserEnvíaProblema">
                                                                <p className="NombreUserEnvíaProblema1">Vendedor del producto con problema:</p>
                                                                <p>William Castro</p>
                                                            </div>
                                                            <div className="NombreUserEnvíaProblema">
                                                                <p className="NombreUserEnvíaProblema1">Email del vendedor del producto con problema:</p>
                                                                <p>WilliamCatro@gmail.com</p>
                                                            </div>
                                                        </div>
                                                        <div className="ImgProblemasUsuarios">
                                                            <img src={`${URL_IMAGES_RESULTS}${mensaje.nombreimagen1}`} alt={mensaje.nombreimagen1} />
                                                            {mensaje.nombreimagen2 && <img src={URL_BD_MR + mensaje.nombreimagen2} alt="Imagen 2" />}
                                                            {mensaje.nombreimagen3 && <img src={URL_BD_MR + mensaje.nombreimagen3} alt="Imagen 3" />}
                                                            {mensaje.nombreimagen4 && <img src={URL_BD_MR + mensaje.nombreimagen4} alt="Imagen 4" />}
                                                            {mensaje.nombreimagen5 && <img src={URL_BD_MR + mensaje.nombreimagen5} alt="Imagen 5" />}
                                                        </div>
                                                        {/* Asegúrate de manejar correctamente los casos en los que la imagen pueda ser null */}
                                                        <div className="fechaProblemaEnvíado">
                                                            <p className="titleFechaProblema">Fecha envío del problema: </p>
                                                            <p>{mensaje.fechacreacion.toString().slice(0, 10)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Container>

                </div>
            </div>
        </>
    )
}