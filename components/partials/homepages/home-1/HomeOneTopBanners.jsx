import { Grid, } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from "../../../../helpers/Constants";
const HomeOneTopBanners = () => {

    const prevIcon = "https://i.postimg.cc/FsbgSDBn/prevIcon.png"; // Imagen para el botón "anterior"
    const nextIcon = "https://i.postimg.cc/kXPvDkfb/nextIcon.png"; // Imagen para el botón "siguiente" 

    // Componente personalizado para los botones
    const CustomButton = ({ iconUrl }) => (
        <span
            style={{
                display: 'inline-block',
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: 'cover',
                borderRadius: '12px',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            aria-hidden="true"
        />
    );

    const [imagenes, setImagenes] = useState([]);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "129",
                });
                setImagenes(res.data.listimgcarrusel);
            } catch (error) {
                console.error("Error al leer las imágenes", error);
            }
        };
        obtenerImagenes();
    }, []);


    return (
        <section className="section-bannerMR">
            <Grid container style={{ width: '100%', height: 'auto' }}>
                <Grid item xs={6} style={{ padding: 0 }} />
                <Grid item xs={6} style={{ padding: 0 }}>

                    <Carousel slide={false} nextIcon={<CustomButton iconUrl={nextIcon} />} prevIcon={<CustomButton iconUrl={prevIcon} />} nextLabel="" prevLabel="">
                        {imagenes.map((imagen, index) => (
                            <Carousel.Item key={imagen.id} interval={4000}>
                                <img
                                    className="d-block w-100"
                                    src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`}
                                    alt={`Imagen ${index + 1}`}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>


                </Grid>
            </Grid>
        </section>
    );
};

export default HomeOneTopBanners;
