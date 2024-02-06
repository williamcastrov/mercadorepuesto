import { validateEmail } from "../../utilities/Validations"
//import MUI media
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
    Button,
} from "@mui/material";
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from 'react-icons/fi';

import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import TokenRegistroRepository from "../../repositories/TokenRegistroRepository";
import firebase from "../../utilities/firebase";

export default function resetPassword() {


    //Top screen
    const irA = useRef(null);
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    const [password, setPassword] = useState('');
    const [code, setCode] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var code = url.searchParams.get("oobCode");
            setCode(code);
        }
    }, []);

    const handlePasswordReset = () => {
        if (code) {
            firebase.auth().confirmPasswordReset(code, password)
                .then(() => {
                    alert('La contraseña se ha cambiado correctamente.');
                })
                .catch((error) => {
                    alert('Se produjo un error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
                });
        }
    };











    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>Actualizar contraseña</p>
                                </div>


                                <div className="ResetPasswordCont">
                                    <div>
                                        <p>Nueva contraseña</p>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            placeholder="Nueva contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button onClick={handlePasswordReset}>GUARDAR</button>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}