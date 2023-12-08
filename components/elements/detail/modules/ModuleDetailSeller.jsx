import React, { useEffect, useState } from "react";
import Rating from "~/components/elements/Rating";
import { Box, Grid, Button } from "@mui/material";
import SortBySearchInteractiveSeller from "../../../partials/shop/modules/SortBySearchInteractiveSeller";
import axios from "axios";
import Moment from "moment";

const ModuleDetailSeller = (props) => {
    const { product } = props;
    const [listaCalificacionVendedor, setListaCalificacionVendedor] = useState(
        []
    );
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);

    useEffect(() => {
        /*
const datosusuario = JSON.parse(localStorage.getItem("datauser"));
        const fechaactual = Moment(datosusuario.fechacreacion).format(
            "YYYY-MM-DD"
        );
        let fecha = datosusuario.fechacreacion;
        console.log("FECHA : ", fechaactual);
*/
        const leerCalificacionVendedor = async () => {
            let params = {
                uid: product.usuario,
            };

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/50",
                params,
            })
                .then((res) => {
                    setListaCalificacionVendedor(
                        res.data.listarcalificacionvend
                    );
                    let ventas = res.data.listarcalificacionvend.length;
                    //console.log("DAT: ", ventas);
                    setprdVendidos(ventas);

                    let totcalificacion = 0;
                    res.data.listarcalificacionvend &&
                        res.data.listarcalificacionvend.map((row, index) => {
                            totcalificacion =
                                parseInt(totcalificacion) +
                                parseInt(row.calificacion);
                        });
                    let calprd =
                        totcalificacion /
                        res.data.listarcalificacionvend.length;
                    setCalificacionPrd(calprd);
                })
                .catch(function (error) {
                    console.log("Error leyendo calificación al vendedor");
                });
        };
        leerCalificacionVendedor();
    }, []);

    useEffect(() => {
        if (ordenarPor == 1) {
            let ordenafecha = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 2) {
            let ordenafecha = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 3) {
            let ordenacalificacion = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            //console.log("ORDENADO MAYOR : ", result);

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 4) {
            let ordenacalificacion = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });
            //console.log("ORDENADO MENOR : ", result);

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        }
    }, [ordenarPor]);

    return (
        <div className="mtmenos30">
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={4} md={4} lg={4}>
                    <div className="boxdataseller textosellerdos">
                        <Grid
                            container
                            alignItems="center"
                            spacing={1}
                            className="mb-10">
                            <Grid item xs={12} md={12} lg={12}>
                                <h3 className="textoseller">
                                    Vendedor : ABC1234
                                </h3>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Tiempo como vendedor: 8 Meses
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Número de ventas: 113
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Ubicación : Envigado - Antioquia
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={8} md={8} lg={8}>
                    <div className="ml-15 mt-20">
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="ml-25 tamañofuentetab colorbase">
                                        Calificación del vendedor
                                    </a>
                                </Grid>
                            </Grid>

                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={2} md={2} lg={2}>
                                    <a className="tamañoCalificacionvendedor">
                                        {calificacionPrd}
                                    </a>
                                </Grid>

                                {calificacionPrd >= 1 && calificacionPrd < 2 ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinco fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfseller fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 2 &&
                                  calificacionPrd < 3 ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinco fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfseller fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 3 &&
                                  calificacionPrd < 4 ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinconone fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfseller fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 4 &&
                                  calificacionPrd < 5 ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinco fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfseller fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                    </Grid>
                                ) : calificacionPrd >= 5 ? (
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellertres fa fa-cog mt-4 pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellercinco fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                        <Grid xs={1} sm={1} md={1} lg={1}>
                                            <i className="ratingprdinfsellerok fa fa-cog mt-4  pl-2"></i>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                spacing={1}
                                className="ml-0">
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="ml-17 tamañofuentetab colorbase">
                                        {prdVendidos} Calificaciones
                                    </a>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                alignItems="center"
                                spacing={1}
                                className="ml-1 mtmenos15">
                                <Grid item xs={7} md={7} lg={7}>
                                    <a className="textocomentarioscompradores">
                                        Comentarios de los compradores
                                    </a>
                                </Grid>
                                <Grid item xs={5} md={5} lg={5}>
                                    <SortBySearchInteractiveSeller
                                        setOrdenarPor={setOrdenarPor}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="lineacalificacionvendedor"></div>
                                </Grid>
                            </Grid>

                            {listaCalificacionVendedor.length > 0
                                ? listaCalificacionVendedor &&
                                  listaCalificacionVendedor.map(
                                      (item, index) => {
                                          return (
                                              <div>
                                                  {item.calificacion >= 1 &&
                                                  item.calificacion < 2 ? (
                                                      <Grid
                                                          container
                                                          alignItems="center"
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 2 &&
                                                    item.calificacion < 3 ? (
                                                      <Grid
                                                          container
                                                          alignItems="center"
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatronone fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinconone fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4"></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 3 &&
                                                    item.calificacion < 4 ? (
                                                      <Grid
                                                          container
                                                          alignItems="center"
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinconone fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 4 &&
                                                    item.calificacion < 5 ? (
                                                      <Grid
                                                          container
                                                          alignItems="center"
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion >= 5 ? (
                                                      <Grid
                                                          container
                                                          alignItems="center"
                                                          spacing={1}>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                          <Grid
                                                              xs={1}
                                                              sm={1}
                                                              md={1}
                                                              lg={1}>
                                                              <i className="ratingprdinfsellerok fa fa-cog mt-4 "></i>
                                                          </Grid>
                                                      </Grid>
                                                  ) : null}

                                                  <Grid
                                                      container
                                                      alignItems="center"
                                                      spacing={1}>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          <div className="textocomentarioscompradoresdos">
                                                              {item.comentario}
                                                          </div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          <div className="textocomentarioscompradorestres">
                                                              {Moment(
                                                                  item.fechacreacion
                                                              ).format(
                                                                  "YYYY-MM-DD"
                                                              )}
                                                          </div>
                                                      </Grid>
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}>
                                                          <div className="lineacalificacionvendedor"></div>
                                                      </Grid>
                                                  </Grid>
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ModuleDetailSeller;
