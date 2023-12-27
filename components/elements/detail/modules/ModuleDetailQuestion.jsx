import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, useMediaQuery} from "@mui/material";
import ModalMensajesQuestionSeller from "../../../../pages/mensajes/ModalMensajesQuestionSeller";
import axios from "axios";
import { URL_BD_MR } from "../../../../helpers/Constants";
import { FaCheckCircle } from "react-icons/fa";
import ModalMensajes from "../../../../pages/mensajes/ModalMensajes";
import { useRouter } from "next/router";
 
 

// Change your description content here
const ModuleDetailQuestion = ({ product }) => {
    const [mostrarMas, setMostrarMas] = useState(false);
    const [preguntaVendedor, setPreguntaVendedor] = useState(null);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [actualiza, setActualiza] = useState(false);
    const [listaPreguntasVendedor, setListaPreguntasVendedor] = useState([]);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [confirmationOpen, setConfirmationOpen] = useState(false); 
    const [comentario, setComentario] = useState('');
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false);
    console.log("producto de module detail:", product.usuario)

 

    const verMas = () => {
        setMostrarMas(true);
    };

    const verMenos = () => {
        setMostrarMas(false);
    }; 


    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    console.log('uidcomprador:', datosusuarios.uid);
    console.log('uidvendedor:', product.usuario);
    console.log('idproducto:', product.id);

    const palabrasProhibidas = ["www", "carrera", "avenida", "#", "N°", "@", ".com", ".co", ".net", "contactanos", "contacto", "llama", "llamar", "telefono", "celular", "movil", "email", "gmail"];


    const validarComentario = () => {
        // Verifica que el comentario no esté vacío
        if (comentario.length === 0) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Tu mensaje está vacío. Por favor, escribe tu pregunta.');
            setShowModal(true);
            return false;
        }

        // Verifica que el comentario no sea demasiado largo
        if (comentario.length > 130) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
            setShowModal(true);
            return false;
        }

        // Verifica que el comentario no contenga palabras prohibidas
        for (let palabra of palabrasProhibidas) {
            if (comentario.toLowerCase().includes(palabra)) {
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
                setShowModal(true);
                return false;
            }
        }

        // Verifica que el comentario no contenga 5 números seguidos
        const numerosSeguidos = comentario.match(/\d{5,}/);
        if (numerosSeguidos) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
            setShowModal(true);
            return false;
        }

        return true;
    };


    const enviarPregunta = async () => {
        if (!validarComentario()) {
            return;
        }

        const idpregunta = Math.floor(Math.random() * 10000000); // Genera un número aleatorio de hasta 7 dígitos

        let params = {
            idprd: product.id, // Reemplaza esto con el idprd correspondiente
            uidcomprador: datosusuarios.uid,
            uidvendedor: product.usuario,
            idpregunta: idpregunta.toString(),
            comentario: comentario,
            estado: 80
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "51", // Reemplaza esto con la URL correcta
                params,
            });

            // Aquí puedes manejar la respuesta del servidor
            console.log(res.data);

            setComentario("");


            setTituloMensajes('Pregunta enviada');
            setTextoMensajes('Tu Pregunta ha sido enviada al vendedor');
            setShowModal(true);

        } catch (error) {
            console.error("Error al enviar la pregunta", error);
        }
    };

    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };
 




    return (
        <div className="mlmenos8 mtmenos15">
            <ModalMensajesQuestionSeller
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <Dialog
                className='dialogDatsGuardados'
                open={confirmationOpen}
                PaperProps={{
                    style: {
                        width: isMdDown ? '80%' : '35%',
                        backgroundColor: 'white',
                        border: '2px solid gray',
                        padding: '1.4rem',
                        borderRadius: '10px'
                    },
                }}
            >
                <DialogTitle className='dialogtitleDtsGUardados' >
                    <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                    <p className='dialogtituloP'>Pregunta enviada con exito!</p>
                </DialogTitle>
                <DialogContent className='dialogContentDatsGuardados'>
                    <p className='PdialogContent'>Tu pregunta fue enviada con exito.</p>
                </DialogContent>
                <DialogActions className='DialogActionsDatsGuardados'>
                    <div className='div1buttonDialog' >
                        <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('./preguntasRealizadasPorUsuario')} >
                            Ir a mis preguntas
                        </button>
                    </div>
                    <div className='div1buttonDialog' >
                        <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                            Ir al inicio
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
            <ModalMensajes
                shown={showModal}
                close={handleModalClose}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="error"
            />
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <a className="ml-10 tamañofuentetab colorbase">
                        Escribe tu pregunta para el vendedor aquí
                    </a>
                </Grid>
            </Grid>

            <Grid container alignItems="center" spacing={1}>
                <p>{product.id}</p>
                <Grid item xs={8} md={8} lg={8}>
                    <input
                        className="inputquestionseller"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div
                        className="botonsendquestionseller"
                        onClick={enviarPregunta}>
                        <a className="textoenviar">Enviar</a>
                    </div>
                </Grid>
            </Grid>

            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <div className="textorecuerda">
                        * Recuerda que para poder seguir siendo tu apoyo en el
                        proceso de compra debes abstenerte de escribir
                        información de contacto como telefono, direcciones,
                        correos electrónicos, entre otros.
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1} className="mt-10">
                <Grid item xs={12} md={12} lg={12}>
                    <a className="ml-10 tamañofuentetab colorbase">
                        Preguntas ya realizadas
                    </a>
                </Grid>
            </Grid>

            {listaPreguntasVendedor.length > 0
                ? listaPreguntasVendedor &&
                listaPreguntasVendedor.map((item, index) => {
                    return (
                        <div>
                            <div>
                                {index < 3 ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <a className="textopreguntavendedor">
                                                {item.comentario} ?
                                            </a>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textorespuestavendedor">
                                                {item.respuestavenedor}
                                            </div>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </div>
                            <div>
                                {index > 2 && mostrarMas ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <a className="textopreguntavendedor">
                                                {item.comentario} ?
                                            </a>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="textorespuestavendedor">
                                                {item.respuestavenedor}
                                            </div>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </div>
                        </div>
                    );
                })
                : null}

            {!mostrarMas ? (
                <p
                    className="mt-10 ml-10 subrayartextoclicaqui apuntador"
                    onClick={() => verMas()}>
                    Ver mas...
                </p>
            ) : (
                <div>
                    <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        className="ml-1 mt-1">
                        <Grid item xs={12} md={12} lg={12}>
                            <p
                                className="subrayartextoclicaqui apuntador"
                                onClick={() => verMenos()}>
                                Ver menos...
                            </p>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default ModuleDetailQuestion;
