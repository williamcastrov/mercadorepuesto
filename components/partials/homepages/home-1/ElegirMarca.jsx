import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { HiChevronLeft } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";


import Acura from '../../../../public/static/img/Marcas/acura.png';
import Alfaromeo from '../../../../public/static/img/Marcas/AlfaRomeo.png';
import Bajaj from '../../../../public/static/img/Marcas/bajaj.png';

SwiperCore.use([Navigation, Pagination]);



const ElegirMarca = () => {

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    const marcas = [
        { nombre: 'Bmw', imagen: 'https://i.postimg.cc/cCMM7V3D/bmw.png' },
        { nombre: 'Chevrolet', imagen: 'https://i.postimg.cc/xT26kPmx/chevrolet.png' },
        { nombre: 'Dodge', imagen: 'https://i.postimg.cc/W4GKzbpK/dodge-Nuevo.png' },
        { nombre: 'Ford', imagen: 'https://i.postimg.cc/B6FCb8nf/ford.png' },
        { nombre: 'Citroen', imagen: 'https://i.postimg.cc/8PmtLrB1/citroen.png' },
        { nombre: 'Honda', imagen: 'https://i.postimg.cc/bYb6N5ZS/honda.png' },
        { nombre: 'Jeep', imagen: 'https://i.postimg.cc/9QX1bFJy/jeep.png' },
        { nombre: 'Mercedes-benz', imagen: 'https://i.postimg.cc/rsLNr8D0/mercedes.png' },
        { nombre: 'Audi', imagen: 'https://i.postimg.cc/xdhR9GYP/audi.png' },
        { nombre: 'Cupra', imagen: 'https://i.postimg.cc/LsnDdQdX/cupra.png' },
    ];

    const marcasDos = [
        { nombre: 'Acura', imagen: Acura},
        { nombre: 'Alfa romeo', imagen: Alfaromeo },
        { nombre: 'Bajaj', imagen: Bajaj },
        { nombre: 'Bugatti', imagen: '../../../../public/static/img/Marcas/Bugatti.png' },
        { nombre: 'Ducati', imagen: '../../../../public/static/img/Marcas/Ducati.png' },
        { nombre: 'Fiat', imagen: '../../../../public/static/img/Marcas/fiat.png' },
        { nombre: 'Foton', imagen: '../../../../public/static/img/Marcas/foton.png' },
        { nombre: 'Freightliner', imagen: '../../../../public/static/img/Marcas/freightliner.png' },
        { nombre: 'Gmc', imagen: '../../../../public/static/img/Marcas/Gmc.png' },
        { nombre: 'Harley', imagen: '../../../../public/static/img/Marcas/HaerleyDavinson.png' },
    ];

    const marcasTres = [
        { nombre: 'Hino', imagen: '../../../../public/static/img/Marcas/hino.png' },
        { nombre: 'Hyunday', imagen: '../../../../public/static/img/Marcas/Hyunday.png' },
        { nombre: 'Isuzu', imagen: '../../../../public/static/img/Marcas/isuzu.png' },
        { nombre: 'Kenworth', imagen: '../../../../public/static/img/Marcas/kenworth.png' },
        { nombre: 'Kia', imagen: '../../../../public/static/img/Marcas/Kia.png' },
        { nombre: 'Ktm', imagen: '../../../../public/static/img/Marcas/ktm.png' },
        { nombre: 'Lamborghini', imagen: '../../../../public/static/img/Marcas/Lambo.png' },
        { nombre: 'Mitsubishi', imagen: '../../../../public/static/img/Marcas/Mitsubishi.png' },
        { nombre: 'Nissan', imagen: '../../../../public/static/img/Marcas/Nissan.png' },
        { nombre: 'Tesla', imagen: '../../../../public/static/img/Marcas/Tesla.png' },
    ];

    const marcasCuatro = [
        { nombre: 'Porsche', imagen: '../../../../public/static/img/Marcas/posrsche.png' },
        { nombre: 'Ram', imagen: '../../../../public/static/img/Marcas/Ram.png' },
        { nombre: 'Renault', imagen: '../../../../public/static/img/Marcas/Renault.png' },
        { nombre: 'Royal enfield', imagen: '../../../../public/static/img/Marcas/RoyalEnfield.png' },
        { nombre: 'Suzuki', imagen: '../../../../public/static/img/Marcas/suzuki.png' },
        { nombre: 'Toyota', imagen: '../../../../public/static/img/Marcas/toyota.png' },
        { nombre: 'Triumph', imagen: '../../../../public/static/img/Marcas/triumph.png' },
        { nombre: 'Volvo', imagen: '../../../../public/static/img/Marcas/Volvo.png' },
        { nombre: 'Wolkswagen', imagen: '../../../../public/static/img/Marcas/wolkswagen.png' },
        { nombre: 'Yamaha', imagen: '../../../../public/static/img/Marcas/yamaha.png' },
    ];


    useEffect(() => {
        setLoaded(true);
    }, []);



    return (
        <div className="mainContElejirMarca">
            <div className="ContElejirMarca">
                <div ref={navigationPrevRef} className="BotonPrev"><HiChevronLeft /></div>
                <div ref={navigationNextRef} className="BotonSig"><HiChevronRight /></div>
                {loaded && (
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                    >
                        {[marcas, marcasDos, marcasTres, marcasCuatro].map((marcas, slideIndex) => (
                            <SwiperSlide key={slideIndex}>
                                <div className="subContElejirMarca">
                                    {marcas.map((marca, index) => (
                                        <div key={index} className="contBallMarcas">
                                            <div className="BallcontBallMarcas">
                                                <img src={marca.imagen} alt="" className="ImgBall" />
                                            </div>
                                            <div className="contBallName">
                                                <p>{marca.nombre}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default ElegirMarca;
