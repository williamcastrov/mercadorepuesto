import React, { } from "react";
import { Grid, } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';

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


    return (
        <section className="section-bannerMR">
            <Grid container style={{ width: '100%', height: 'auto' }}>
                <Grid item xs={6} style={{ padding: 0 }}/>  
                <Grid item xs={6} style={{ padding: 0 }}>

                    <Carousel
                        slide={false}
                        nextIcon={<CustomButton iconUrl={nextIcon} />}
                        prevIcon={<CustomButton iconUrl={prevIcon} />}
                        nextLabel=""
                        prevLabel=""
                    >
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://i.postimg.cc/FFZmVqBM/banner.png"
                                alt="First slide"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://i.postimg.cc/wTQCpmpn/banner2.png"
                                alt="Second slide"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://i.postimg.cc/zGD9XGDv/banner3.png"
                                alt="Third slide"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item interval={4000}>
                            <img
                                className="d-block w-100"
                                src="https://i.postimg.cc/sgvYLs2b/baner-Carro.jpg"
                                alt="four slide"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Carousel.Item>
                    </Carousel>


                </Grid>
            </Grid>
        </section>
    );
};

export default HomeOneTopBanners;
