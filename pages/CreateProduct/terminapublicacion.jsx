import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { useRouter } from "next/router";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
    Tooltip,
    Overlay,
} from "react-bootstrap";

function terminapublicacion(props) {
    // Lee modelos de los Vehiculos del state
    const router = useRouter();
    const [publicacion, setPublicacion] = useState([]);
    const [linkPublicacion, setLinkPublicacion] = useState(null);

    useEffect(() => {
        setPublicacion(JSON.parse(
            localStorage.getItem("idpublicacion")
        ));
    }, []);

    const leerPublicacion = async () => {
        console.log("PUBLICACION : ", publicacion);
        let dato = publicacion.id;
        router.push("/product/"+dato);
    };

    return (
        <Container title="Mi Cuenta">
            <div className="container">
                <div className="cuadropublicacionproducto mt-20 mb-30">
                    <div className="ml-50 mt-20">
                        <Row>
                            <Col xl={1} lg={1} md={1} sd={1}>
                                <i
                                    className="tamañoiconoterminarpublicacion fa fa-check-circle"
                                    aria-hidden="true"></i>
                            </Col>
                            <Col xl={11} lg={11} md={11} sd={11}>
                                <h1 className="mlmenos50 textoterminapublicacion mt-10 mb-20">
                                    ¡ Publicación realizada con exito !
                                </h1>
                            </Col>
                        </Row>
                        <div className="cuadrointernopublicacionproducto">
                            <h1 className="textoterminapublicacion mb-20">
                                Tu publicación ha sido creada y publicada.
                                <br />
                                Puede tardar algunos minutos en aparecer en los
                                resultados de búsquedas.
                                <br />
                                <br />
                                Recuerda que el titulo de la publicacion es:
                                <br />
                                <br />
                                <h2 className="textoalert">
                                Link de la publicacion es : Se actualiza con la direccion definitiva del sitio web.
                                </h2>
                                <br/>
                                {/*publicacion.titulo*/ }
                            </h1>
                        </div>

                        <div className="mt-20">
                            <Row>
                                <Col xl={7} lg={7} md={7} xs={7}></Col>
                                <Col xl={2} lg={2} md={2} xs={2}>
                                    <Button 
                                        className="ps-btn colordelfondo redondearborde colorbase"
                                        variant="outline-light"
                                    >
                                        {" "}
                                        Ir al inicio
                                    </Button>
                                </Col>
                                <Col xl={2} lg={2} md={2} xs={2}>
                                    <Button
                                        className="ps-btn redondearborde"
                                        onClick={leerPublicacion}>
                                        {" "}
                                        Ver publicación
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default terminapublicacion;
