import React,  { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";

const HomeSevenTopBanner = (props) => {
    const { setSelectedForm } = props;
    const dispatch = useDispatch();
    const [datosUsuario, setDatosUsuario] = useState([]);

    const userlogged = useSelector((state) => state.userlogged.userlogged);
   
    const vender = () => {
        console.log("DATOS USUARIO : ", userlogged)
        if (userlogged.idinterno === 0){
            Swal.fire({
                showCancelButton: false,
                showConfirmButton: false,
                html: `<h1>Mercado Repuesto</h1>
            <hr/>
            <br />
            <h2>Vive una experiencia diferente en la compra o venta de tu repuesto</h2>
            <hr/>
            <a href="/my-account">
                <h2 style="color:#FAB900">Soy nuevo</h2>
            </a>
            <hr/>
            <a href="/loginaccount">
                <h2 style="color:#2D2E83">Ya tengo una cuenta</h2>
            </a>
            <hr/>
            `,
            });

        }else
        setSelectedForm("login")
    };

    const comprar = () => {
        setSelectedForm("login")
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
                            <Card className="cardcomprar" style={{ width: "15rem", height: "7rem" }}>
                                <Card.Body >
                                    <Card.Title
                                        className="textbotoncompravende"
                                        onClick={comprar}>
                                        COMPRAR TU REPUESTO
                                        <br/>
                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="cardvender" style={{ width: "15rem", height: "7rem" }}>
                                <Card.Body>
                                    <Card.Title
                                        className="textbotoncompravende"
                                        onClick={vender}>
                                        VENDER TU REPUESTO
                                        <br/>
                                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <h2 className="textorepuestosstock"  >Repuestos en Sctock : 12,345 </h2>
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
