import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from 'shortid';

export default function index() {


    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal



    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleImagen = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            const extension = '.' + reader.result.substring(
                reader.result.indexOf("/") + 1,
                reader.result.indexOf(";base64")
            );
            setImageName(shortid.generate().substring(0, 11) + extension);
        };
        reader.readAsDataURL(file);
    };

    const handleenviar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imagen', image);
        formData.append('nombreimagen', imageName);
        formData.append('numeroimagenes', 1);

        const res = await axios.post('URL_BD_MR' + '129', formData);

        console.log(res.data);
    };





    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? '100%' : '89%' }} display={'flex'} flexDirection={'column'}>
                                    <div className='TitleOpVend'>
                                        <p>Subir imagenes carrusel</p>
                                    </div>
                                    <div>
                                        <form onSubmit={handleenviar}>
                                            <input type="file" onChange={handleImagen} />
                                            <button type="submit">Enviar imagen</button>
                                        </form>
                                    </div>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}