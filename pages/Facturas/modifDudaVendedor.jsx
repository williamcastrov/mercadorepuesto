import Container from "../../components/layouts/Container"
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react"; 
import axios from 'axios'; 
import { URL_BD_MR } from "../../helpers/Constants"; 
import ModalMensajes from "../mensajes/ModalMensajes";  

export default function modifDudaVendedor() {


    const [dudaVendedor, setDudaVendedor] = useState(null);
    const [nombres, setNombres] = useState([]);
    const [descripciones, setDescripciones] = useState([]); 
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal


    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);



    //funcion para obtener duda del vendedor
    useEffect(() => {
        const dudasVendedor = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "126",
                });
                console.log(res.data);
                setDudaVendedor(res.data);
                if (res.data.listaresoldudasvende.length > 0) {
                    setNombres(res.data.listaresoldudasvende.map(item => item.nombre));
                    setDescripciones(res.data.listaresoldudasvende.map(item => item.descripcion));
                }
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        dudasVendedor();
    }, []);

    //Función para actualizar datos
    const actualizarDatos = async (id, nombre, descripcion) => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "127",
                params: {
                    id,
                    nombre,
                    descripcion,
                },
            });
            console.log(res.data);
            setTituloMensajes('Datos guardados');
            setTextoMensajes('Los datos se han guardado correctamente.');
            setShowModal(true);
        } catch (error) {
            console.error("Error al actualizar los datos", error);
        }
    };


    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container" >
                            <div className="ps-page__header" > </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='TitleOpVend'>
                                        <p>Modificar dudas vendedor</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainFacturacion" container style={{ width: isMdDown ? '100%' : '90%' }}>

                                    {dudaVendedor && dudaVendedor.listaresoldudasvende.sort((a, b) => a.id - b.id).map((item, index) => (
                                        <div className="modifDudaVendedorContainer" key={item.id}>
                                            <input className="InputFormsUsers" type="text" value={nombres[index]} onChange={(e) => setNombres(nombres.map((nombre, i) => i === index ? e.target.value : nombre))} />
                                            <textarea value={descripciones[index]} onChange={(e) => setDescripciones(descripciones.map((descripcion, i) => i === index ? e.target.value : descripcion))} />
                                            <button onClick={() => actualizarDatos(item.id, nombres[index], descripciones[index])}>Guardar</button>
                                        </div>
                                    ))}

                                </Grid>
                                <ModalMensajes
                                    shown={showModal}
                                    close={handleModalClose}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}