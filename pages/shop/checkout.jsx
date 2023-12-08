import React, { useEffect, useState, useRef } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { useRouter } from "next/router";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { myNumber } from "../../utilities/ArrayFunctions";

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping-cart",
    },
    {
        text: "Pagar",
    },
];

let undsel = [];

const CheckoutScreen = () => {
    const router = useRouter();
    const irA = useRef(null);
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [prdComprarAhora, setPrdComprarAhora] = useState([]);
    const [itemCompra, setItemCompra] = useState([]);

    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unidadesSelect, setUnidadesSelect] = useState(0);
    const [classUnd, setClassUnd] = useState("btnunidselshoppingcartmenos");
    const [classUndMas, setClassUndMas] = useState("btnunidselshoppingcart");
    const [valorEnvio, setvalorEnvio] = useState(11300);
    const [totalPagar, setTotalPagar] = useState(0);

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);

    useEffect(() => {
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        let undselcompraahora = JSON.parse(
            localStorage.getItem("undselcompraahora")
        );
        setUnidadesSelect(undselcompraahora);

        //"undselcompraahora"
        //console.log("DAITEM : ", datitem);
        if (leeira != 3) setItemCompra(datitem);

        let totalpagar = undselcompraahora * datitem.precio + valorEnvio;
        //console.log("DAT XXXX : ", totalpagar);
        setTotalPagar(totalpagar);

        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "65",
                params,
            })
                .then((res) => {
                    res.data.listardireccionesusuario;
                    //console.log(
                    //    "DIRECIONES : ",
                    //    res.data.listardireccionesusuario
                    //);
                    setDireccionesUsuarios(
                        res.data.listardireccionesusuario[0]
                    );
                    setDireccion(
                        res.data.listardireccionesusuario[0].direccion
                    );
                    setCiudad(
                        res.data.listardireccionesusuario[0].nombreciudad
                    );
                    setDepartamento(
                        res.data.listardireccionesusuario[0].nombre_dep
                    );
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerItems();
    }, [datosusuarios]);

    useEffect(() => {
        const leerItems = async () => {
            if (leeira == 3) {
                let datitem = JSON.parse(
                    localStorage.getItem("itemshoppingcartadd")
                );

                const leerItems = async () => {
                    let params = {
                        idproducto: datitem.idproducto,
                        usuario: datosusuarios.uid,
                    };

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "62",
                        params,
                    })
                        .then((res) => {
                            if (res.data.listaritemcarrito.length > 0) {
                                console.log(
                                    "LEER : ",
                                    res.data.listaritemcarrito
                                );
                                setPrdComprarAhora(res.data.listaritemcarrito);
                                setItemCompra(res.data.listaritemcarrito[0]);
                            } else console.log("ERROR");
                        })
                        .catch(function (error) {});
                };
                leerItems();
            } else {
                let params = {
                    usuario: datosusuarios.uid,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "59",
                    params,
                })
                    .then((res) => {
                        setPrdComprarAhora(res.data.listarcarritocompra);
                        console.log(
                            "DAT SHOPPING CART: ",
                            res.data.listarcarritocompra
                        );

                        res.data.listarcarritocompra &&
                            res.data.listarcarritocompra.map((item, index) => {
                                undsel[index] = item.cantidad;
                            });
                        //ispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                    })
                    .catch(function (error) {
                        console.log("Error leyendo datos carrito de compras");
                    });
            }
        };
        leerItems();
    }, [datosusuarios]);

    const tusDirecciones = (dat) => {
        let ruta = "/shop/youraddresses/";
        router.push(ruta);
    };

    const infoSiguiente = (dat) => {
        localStorage.setItem("totalapagar", JSON.stringify(totalPagar));
        let ruta = "/shop/payment/";
        router.push(ruta);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping" ref={irA}>
                <div className="container">
                    <div className="ml-52">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>

                    <div className="cajacheckout">
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={7} lg={7}>
                                    <div className="titulodireccionenvio">
                                        Dirección de envío
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5} lg={5}>
                                    <div className="titulodireccionenviotres">
                                        Tu producto
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="cajadireccionenvio">
                                                <Grid container spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={1}
                                                        lg={1}>
                                                        <div className="iconlocatecinco">
                                                            <LocationOnIcon
                                                                className="locationoniconaddress"
                                                                style={{
                                                                    fontSize: 30,
                                                                }}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={7}
                                                        lg={7}>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={12}
                                                            lg={12}>
                                                            <div className="textodireccionenvio">
                                                                {direccionesUsuarios
                                                                    ? direccion
                                                                    : null}
                                                            </div>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={12}
                                                            lg={12}>
                                                            <div className="textodireccionenviodos">
                                                                {direccionesUsuarios
                                                                    ? ciudad +
                                                                      ", " +
                                                                      departamento
                                                                          .charAt(
                                                                              0
                                                                          )
                                                                          .toUpperCase() +
                                                                      departamento
                                                                          .slice(
                                                                              1
                                                                          )
                                                                          .toLowerCase()
                                                                    : null}
                                                            </div>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={3}
                                                        lg={3}>
                                                        <div
                                                            className="btnaddaddressdos"
                                                            onClick={() =>
                                                                tusDirecciones()
                                                            }>
                                                            Elegir o agregar una
                                                            nueva dirección
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className="titulodetallesenvio">
                                            Detalles del envío
                                        </div>
                                    </Grid>
                                    {console.log(
                                        "COMPRAR ASAS : ",
                                        prdComprarAhora
                                    )}
                                    {console.log(
                                        "ITEM  COMPRAXXX : ",
                                        itemCompra
                                    )}
                                    {prdComprarAhora.length > 0
                                        ? prdComprarAhora &&
                                          prdComprarAhora.map((item, index) => {
                                              return (
                                                  <div>
                                                      {item.idproducto ==
                                                      itemCompra.idproducto ? (
                                                          <Grid
                                                              container
                                                              alignItems="center"
                                                              spacing={1}>
                                                              <Grid
                                                                  item
                                                                  xs={12}
                                                                  md={12}
                                                                  lg={12}>
                                                                  <div className="cajadetallesenvioprd">
                                                                      <Grid
                                                                          container
                                                                          alignItems="center"
                                                                          spacing={
                                                                              1
                                                                          }>
                                                                          <Grid
                                                                              item
                                                                              xs={
                                                                                  12
                                                                              }
                                                                              md={
                                                                                  1
                                                                              }
                                                                              lg={
                                                                                  1
                                                                              }>
                                                                              <div className="iconlocatecinco">
                                                                                  <LocalShippingIcon
                                                                                      className="locationoniconaddress"
                                                                                      style={{
                                                                                          fontSize: 30,
                                                                                      }}
                                                                                  />
                                                                              </div>
                                                                          </Grid>
                                                                          <Grid
                                                                              item
                                                                              xs={
                                                                                  12
                                                                              }
                                                                              md={
                                                                                  7
                                                                              }
                                                                              lg={
                                                                                  7
                                                                              }>
                                                                              <Grid
                                                                                  item
                                                                                  xs={
                                                                                      12
                                                                                  }
                                                                                  md={
                                                                                      12
                                                                                  }
                                                                                  lg={
                                                                                      12
                                                                                  }>
                                                                                  <div className="textodireccionenviocuatro">
                                                                                      Se
                                                                                      entrega
                                                                                      en
                                                                                      Sabaneta
                                                                                      entre
                                                                                      el
                                                                                      25
                                                                                      y
                                                                                      27
                                                                                      de
                                                                                      octubre
                                                                                  </div>
                                                                              </Grid>
                                                                              <Grid
                                                                                  item
                                                                                  xs={
                                                                                      12
                                                                                  }
                                                                                  md={
                                                                                      12
                                                                                  }
                                                                                  lg={
                                                                                      12
                                                                                  }>
                                                                                  <div className="textocalcularenvio">
                                                                                      Calcular
                                                                                      valor
                                                                                      del
                                                                                      envio
                                                                                  </div>
                                                                              </Grid>
                                                                          </Grid>
                                                                      </Grid>
                                                                  </div>
                                                              </Grid>
                                                          </Grid>
                                                      ) : null}
                                                  </div>
                                              );
                                          })
                                        : null}
                                </Grid>
                                <Grid item xs={12} md={5} lg={5}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="cajaresumenpedidouno">
                                                {prdComprarAhora.length > 0
                                                    ? prdComprarAhora &&
                                                      prdComprarAhora.map(
                                                          (item, index) => {
                                                              return (
                                                                  <div>
                                                                      {item.idproducto ==
                                                                      itemCompra.idproducto ? (
                                                                          <Grid
                                                                              container
                                                                              alignItems="center"
                                                                              spacing={
                                                                                  1
                                                                              }>
                                                                              <Grid
                                                                                  item
                                                                                  xs={
                                                                                      12
                                                                                  }
                                                                                  md={
                                                                                      12
                                                                                  }
                                                                                  lg={
                                                                                      12
                                                                                  }>
                                                                                  <div>
                                                                                      <Grid
                                                                                          container
                                                                                          spacing={
                                                                                              1
                                                                                          }>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  3
                                                                                              }
                                                                                              lg={
                                                                                                  3
                                                                                              }>
                                                                                              <div className="">
                                                                                                  <img
                                                                                                      className="imageshoppingcartuno"
                                                                                                      src={
                                                                                                          URL_IMAGES_RESULTS +
                                                                                                          itemCompra.nombreimagen1
                                                                                                      }
                                                                                                      alt="First slide"
                                                                                                  />
                                                                                              </div>
                                                                                          </Grid>

                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  9
                                                                                              }
                                                                                              lg={
                                                                                                  9
                                                                                              }>
                                                                                              <Grid
                                                                                                  item
                                                                                                  xs={
                                                                                                      12
                                                                                                  }
                                                                                                  md={
                                                                                                      12
                                                                                                  }
                                                                                                  lg={
                                                                                                      12
                                                                                                  }>
                                                                                                  <div className="textoproductocomprauno">
                                                                                                      {
                                                                                                          itemCompra.titulonombre
                                                                                                      }
                                                                                                  </div>
                                                                                              </Grid>
                                                                                          </Grid>
                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  12
                                                                                              }
                                                                                              lg={
                                                                                                  12
                                                                                              }>
                                                                                              <Grid
                                                                                                  container
                                                                                                  spacing={
                                                                                                      1
                                                                                                  }>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          6
                                                                                                      }
                                                                                                      lg={
                                                                                                          6
                                                                                                      }>
                                                                                                      <div className="textocantidadtuptoducto">
                                                                                                          Cantidad:
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          1
                                                                                                      }
                                                                                                      lg={
                                                                                                          1
                                                                                                      }>
                                                                                                      <div className="simbolopesosseis"></div>
                                                                                                  </Grid>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          4
                                                                                                      }
                                                                                                      lg={
                                                                                                          4
                                                                                                      }>
                                                                                                      <div className="undprdresumendos">
                                                                                                          {" "}
                                                                                                          {myNumber(
                                                                                                              1,
                                                                                                              unidadesSelect,
                                                                                                              2
                                                                                                          )}
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                              </Grid>
                                                                                          </Grid>

                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  12
                                                                                              }
                                                                                              lg={
                                                                                                  12
                                                                                              }>
                                                                                              <Grid
                                                                                                  container
                                                                                                  spacing={
                                                                                                      1
                                                                                                  }>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          6
                                                                                                      }
                                                                                                      lg={
                                                                                                          6
                                                                                                      }>
                                                                                                      <div className="textoprecioprdresumendos">
                                                                                                          Precio
                                                                                                          producto:
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          1
                                                                                                      }
                                                                                                      lg={
                                                                                                          1
                                                                                                      }>
                                                                                                      <div className="simbolopesosseis">
                                                                                                          $
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          4
                                                                                                      }
                                                                                                      lg={
                                                                                                          4
                                                                                                      }>
                                                                                                      <div className="precioprdresumendos">
                                                                                                          {" "}
                                                                                                          {myNumber(
                                                                                                              1,
                                                                                                              item.precio,
                                                                                                              2
                                                                                                          )}
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                              </Grid>
                                                                                          </Grid>

                                                                                          <Grid
                                                                                              item
                                                                                              xs={
                                                                                                  12
                                                                                              }
                                                                                              md={
                                                                                                  12
                                                                                              }
                                                                                              lg={
                                                                                                  12
                                                                                              }>
                                                                                              <Grid
                                                                                                  container
                                                                                                  spacing={
                                                                                                      1
                                                                                                  }>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          6
                                                                                                      }
                                                                                                      lg={
                                                                                                          6
                                                                                                      }>
                                                                                                      <div className="textoprecioprdresumentres">
                                                                                                          Precio
                                                                                                          total:
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          1
                                                                                                      }
                                                                                                      lg={
                                                                                                          1
                                                                                                      }>
                                                                                                      <div className="simbolopesossiete">
                                                                                                          $
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                                  <Grid
                                                                                                      item
                                                                                                      xs={
                                                                                                          12
                                                                                                      }
                                                                                                      md={
                                                                                                          4
                                                                                                      }
                                                                                                      lg={
                                                                                                          4
                                                                                                      }>
                                                                                                      <div className="precioprdresumentres">
                                                                                                          {isNaN(
                                                                                                              parseInt(
                                                                                                                  itemCompra.precio *
                                                                                                                      unidadesSelect
                                                                                                              )
                                                                                                          )
                                                                                                              ? myNumber(
                                                                                                                    1,
                                                                                                                    itemCompra.precio *
                                                                                                                        unidadesSelect,
                                                                                                                    2
                                                                                                                )
                                                                                                              : myNumber(
                                                                                                                    1,
                                                                                                                    itemCompra.precio *
                                                                                                                        unidadesSelect,
                                                                                                                    2
                                                                                                                )}
                                                                                                      </div>
                                                                                                  </Grid>
                                                                                              </Grid>
                                                                                          </Grid>
                                                                                      </Grid>
                                                                                  </div>
                                                                              </Grid>
                                                                          </Grid>
                                                                      ) : null}
                                                                  </div>
                                                              );
                                                          }
                                                      )
                                                    : null}
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            lg={12}
                                            onClick={() => infoSiguiente()}>
                                            <div className="botoncontinuardirecciontres">
                                                Siguiente
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutScreen;
