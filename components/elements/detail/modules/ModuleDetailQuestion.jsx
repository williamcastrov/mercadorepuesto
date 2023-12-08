import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Button } from "@mui/material";
import ModalMensajesQuestionSeller from "../../../../pages/mensajes/ModalMensajesQuestionSeller";
import axios from "axios";

let validaword = [
    { word: "www" },
    { word: "carrera" },
    { word: "avenida" },
    { word: "#" },
    { word: "N°" },
    { word: "@" },
    { word: ".com" },
    { word: ".co" },
    { word: ".net" },
    { word: "contactanos" },
    { word: "contacto" },
    { word: "llama" },
    { word: "llamar" },
    { word: "telefono" },
    { word: "celular" },
    { word: "movil" },
];

// Change your description content here
const ModuleDetailQuestion = ({ product }) => {
    const [mostrarMas, setMostrarMas] = useState(false);
    const [preguntaVendedor, setPreguntaVendedor] = useState(null);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [actualiza, setActualiza] = useState(false);
    const [listaPreguntasVendedor, setListaPreguntasVendedor] = useState([]);

    useEffect(() => {
        //const datosusuario = JSON.parse(localStorage.getItem("datauser"));
        const grabarPreguntaVendedor = async () => {
            let params = {
                uid: product.usuario,
            };

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/52",
                params,
            })
                .then((res) => {
                    console.log("DAT: ", res.data);
                    setActualiza(false);
                    setListaPreguntasVendedor(res.data.listarpreguntavend);
                })
                .catch(function (error) {
                    console.log("Error leyendo preguntas al vendedor");
                });
        };
        grabarPreguntaVendedor();
    }, [actualiza]);

    const verMas = () => {
        setMostrarMas(true);
    };

    const verMenos = () => {
        setMostrarMas(false);
    };

    const saveQuestion = () => {
        //const datosusuario = JSON.parse(localStorage.getItem("datauser"));

        if (!preguntaVendedor) {
            setShowModalMensajes(true);
            setTituloMensajes("Tu pregunta no cumple con nuestras politicas");
            setTextoMensajes("Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.");
            return;
        }

        let control = false;

        validaword &&
            validaword.map((item, index) => {
                let texto = preguntaVendedor.toLowerCase();
                let valid = texto.includes(item.word);
                if (valid) {
                    control = true;
                    setShowModalMensajes(true);
                    setTituloMensajes("Tu pregunta no cumple con nuestras politicas");
                    setTextoMensajes(
                        "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas."
                    );
                    return;
                }
            });

        let validacaracteres;
        let haycaracterid = false;
        let valornum = "";
        let pagina = "";

        for (var i = 0; i < preguntaVendedor.length; i++) {
            validacaracteres = preguntaVendedor.substr(i, 1);

            //console.log("VALIDA : ", validacaracteres);
            if (
                validacaracteres == 0 ||
                validacaracteres == 1 ||
                validacaracteres == 2 ||
                validacaracteres == 3 ||
                validacaracteres == 4 ||
                validacaracteres == 5 ||
                validacaracteres == 6 ||
                validacaracteres == 7 ||
                validacaracteres == 8 ||
                validacaracteres == 9
            ) {
                console.log("CARACTER : ", validacaracteres);
                valornum = valornum + validacaracteres;
            }

            if (valornum.length > 5) {
                control = true;
                setShowModalMensajes(true);
                setTituloMensajes("Tu pregunta no cumple con nuestras politicas");
                setTextoMensajes(
                    "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas."
                );
                return;
            }

            if (validacaracteres == "@") {
                control = true;
                setShowModalMensajes(true);
                setTituloMensajes("Tu pregunta no cumple con nuestras politicas");
                setTextoMensajes(
                    "Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas."
                );
                return;
            }
        }

        //console.log("PRODC: ", product)
        //console.log("DATOS USUARIO: ", datosusuario)
        if (!control) {
            const grabarPreguntaVendedor = async () => {
                let params = {
                    uid: product.usuario,
                    comentario: preguntaVendedor,
                };

                await axios({
                    method: "post",
                    url: "https://gimcloud.com.co/mrp/api/51",
                    params,
                })
                    .then((res) => {
                        //console.log("DAT: ", res.data);
                        if (res.data.type == 1) {
                            setShowModalMensajes(true);
                            setTituloMensajes("Información del vendedor");
                            setTextoMensajes(
                                "Tu Pregunta ha sido enviada al vendedor"
                            );
                        }
                        setActualiza(true);
                    })
                    .catch(function (error) {
                        console.log("Error grabando pregunta vendedor");
                    });
            };
            grabarPreguntaVendedor();
        }
    };

    const handleChange = (dat) => {
        setPreguntaVendedor(dat);
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
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <a className="ml-10 tamañofuentetab colorbase">
                        Escribe tu pregunta para el vendedor aquí
                    </a>
                </Grid>
            </Grid>

            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={8} md={8} lg={8}>
                    <input
                        className="inputquestionseller"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div
                        className="botonsendquestionseller"
                        onClick={() => saveQuestion()}>
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
