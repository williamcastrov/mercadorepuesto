import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const selectedvehicle = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [productoSeleccionado, setProductoSeleccionado] = useState(false);

    // Asignamos Datos seleccionado en el buscador interactivo

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const enviadatoslocalstorage = () => {
        localStorage.setItem(
            "datostiposvehiculos",
            JSON.stringify(datosbuscarproductos.vgl_tiposvehiculos)
        );
        localStorage.setItem(
            "datosmarcasvehiculos",
            JSON.stringify(datosbuscarproductos.vgl_marcasvehiculos)
        );
        localStorage.setItem(
            "datoscarroceriasvehiculos",
            JSON.stringify(datosbuscarproductos.vgl_carroceriasvehiculos)
        );
        localStorage.setItem(
            "datosannosvehiculos",
            JSON.stringify(datosbuscarproductos.vgl_annosvehiculos)
        );
        comprainteractiva();
    };

    const regresarAlBuscador = () => {
        localStorage.clear();
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };
    //<h3 className="titulocarroceria">Tu vehículo es:</h3>
    return (
        <div className="carroceriasedan">
            <ButtonGroup>
                <div className="espacioborde">
                    <Button className="botondatosbuscadorizquierda">
                        {datosbuscadorinteractivo.nombretipovehiculo}
                    </Button>
                    <Button className="botondatosbuscador">
                        {datosbuscadorinteractivo.nombrecarroceria}
                    </Button>
                    <Button className="botondatosbuscador">
                        {datosbuscadorinteractivo.nombremarca}
                    </Button>
                    <Button className="botondatosbuscador">
                        {datosbuscadorinteractivo.nombreaño1}
                    </Button>
                    <Button className="botondatosbuscador">
                        {datosbuscadorinteractivo.nombremodelo1}
                    </Button>
                    <Button className="botondatosbuscador">
                        {datosbuscadorinteractivo.nombrecilindraje1}
                    </Button>
                    <Button className="botondatosbuscador">
                        {datosbuscadorinteractivo.nombreTipoCombustibe}
                    </Button>
                    <Button className="botondatosbuscadorderecha">
                        {datosbuscadorinteractivo.nombretransmision}
                    </Button>
                    <Button
                        className="botonregresar"
                        onClick={() => regresarAlBuscador()}>
                        <i
                            className="fa fa-2x fa-pencil colorflecha"
                            aria-hidden="true"></i>
                    </Button>
                </div>
            </ButtonGroup>
        </div>
    );
};
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default selectedvehicle;
