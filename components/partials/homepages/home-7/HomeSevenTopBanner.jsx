import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { getEditData } from "../../../../store/editdata/action";
import { getAddEdToCart } from "../../../../store/addedtocart/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";

const HomeSevenTopBanner = (props) => {
    const { setSelectedForm } = props;
    const dispatch = useDispatch();
    const [datosUsuario, setDatosUsuario] = useState([]);

    const userlogged = useSelector((state) => state.userlogged.userlogged);

    const vender = () => {
        //console.log("DATOS USUARIO : ", userlogged)
        let item = {
            login: true,
        };
        localStorage.setItem("loginvender", JSON.stringify(item));
        if (userlogged.idinterno === 0) {
            Swal.fire({
                showCancelButton: false,
                showConfirmButton: false,
                html: `<h2>Mercado Repuesto</h2>
            <hr/>
            <br />
            <h4>¡Bienvenido! Para comprar debes ingresar a tu cuenta</h4>
            <hr/>
            <a href="/my-account">
                <h4 style="color:#FAB900">Soy nuevo</h4>
            </a>
            <hr/>
            <a href="/loginaccount">
                <h4 style="color:#2D2E83">Ya tengo una cuenta</h4>
            </a>
            <hr/>
            `,
            });
        } else setSelectedForm("login");
    };

    const comprar = () => {
        let item = {
            login: true,
        };
        localStorage.setItem("loginvender", JSON.stringify(item));
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        setSelectedForm("login");
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        localStorage.setItem("ira", JSON.stringify(0));
        localStorage.setItem("rutaira", JSON.stringify(""));

        let row = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
            cantidad: 0,
        };

        dispatch(getAddEdToCart(row));
        localStorage.setItem("addedtocart", JSON.stringify(row));
        let datprd = [];
        localStorage.setItem("duplicarprd",JSON.stringify(datprd));
        localStorage.setItem("vehproductos",JSON.stringify(datprd));
        dispatch(getDuplicarPrd(0));
    };

    return (
        <div className="ps-top-banners">
            <div className="ps-banner--home-seven">
                <div className="ps-logomr">
                    <img
                        className="ps-logomr"
                        src="/static/img/logomr.png"
                        alt="logo"
                    />
                    <img
                        className="ps-logomr"
                        src="/static/img/banderacolombia.jpg"
                        alt="logo"
                    />
                </div>
                <div className="botoncompravende">
                    <Row>
                        <Col md={4}>
                            <Card
                                className="cardcomprar"
                                style={{ width: "15rem", height: "7rem" }}>
                                <Card.Body>
                                    <Card.Title
                                        className="textbotoncompravende"
                                        onClick={comprar}>
                                        COMPRAR TU REPUESTO
                                        <br />
                                        <i
                                            className="fa fa-cart-plus"
                                            aria-hidden="true"></i>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card
                                className="cardvender"
                                style={{ width: "15rem", height: "7rem" }}>
                                <Card.Body>
                                    <Card.Title
                                        className="textbotoncompravende"
                                        onClick={vender}>
                                        VENDER TU REPUESTO
                                        <br />
                                        <i
                                            className="fa fa-shopping-bag"
                                            aria-hidden="true"></i>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <h4 className="textorepuestosstock">
                    Repuestos en Sctock : 12,345{" "}
                </h4>
            </div>
        </div>
    );
};

export default HomeSevenTopBanner;

/*
 <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src="/static/img/carritodecompra.jpg"
                            />
                            <Card.Body>
                                <Card.Title onClick={prueba}>
                                    Card Title
                                </Card.Title>
                                <Card.Text>
                                    ssss
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
*/
