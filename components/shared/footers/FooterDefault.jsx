import React from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const FooterDefault = () => {


    const router = useRouter();

    return (
        <footer className="FooterWebPage">
            <Grid container style={{ width: '100%' }} className="SubFooterWebPage">
                <Grid container style={{ width: '90%' }} className="infoContainerFooterMain">
                    <div className="footerDataMain">
                        <p>HAZ PARTE DE NUESTRO <br /> EQUIPO</p>
                        <div className="footerData">
                            <span onClick={() =>  router.push({pathname: '/my-account'}).then(() => window.location.reload())}>Registrarme</span>
                            <span onClick={() =>  router.push({pathname: '/loginaccount'}).then(() => window.location.reload())}>Iniciar sesión</span>
                            <span onClick={() => router.push({pathname: '/CreateProduct/createproduct'})}>Vender</span>
                            <span onClick={() => router.push({pathname: '/'})}>Comprar</span>
                        </div>
                    </div>

                    <div className="footerDataMain">
                        <p>AYUDA</p>
                        <div className="footerData2">
                            <span onClick={() => router.push({pathname: '/ResolverDudas'})}>Necesito ayuda</span>
                            <span>PQRS</span>
                            <span onClick={() => router.push({pathname: '/ResolverDudas'})}>Centro de ayuda</span>
                            <span>Terminos y condiciones</span>
                            <span>Tratamiento de datos</span>
                        </div>
                    </div>

                    <div className="footerDataMain">
                        <p>SECCIONES POPULARES</p>
                        <div className="footerData2">
                            <span onClick={() => router.push({pathname: '/searchinteractive/searchinteractive'})}>Buscador interactivo </span>
                            <span onClick={() => router.push({pathname: '/CreateProduct/createproduct'})}>Vender</span>
                            <span onClick={() => router.push({pathname: '/'})}>Comprar</span>
                            <span>Categorías</span>
                        </div>
                    </div>

                    <div className="footerDataMain">
                        <p>CONTÁCTANOS</p>
                        <div className="footerData2">
                            <span>PQRS</span>
                            <span>Facebook</span>
                            <span>Instagram</span>
                            <span>Tiktok</span>
                            <span>Youtube</span>
                        </div>
                    </div>
                    <div className="imagenFooterLogo">
                        <img src="https://i.postimg.cc/v8gHVrF9/Logo-Blanco.png" alt="" />
                    </div>
                </Grid>

                <Grid container style={{ width: '100%' }} className="SubInfoMediosPagoFooter">
                    <Grid container style={{ width: '90%' }} className="infoContainerFooter" display={'flex'} justifyContent={'space-between'}>
                        <div className="mainMedioPagoFooter">
                            <p>Medios de pago:</p>
                            <div className="medioPagoFooter">
                                <img src="https://i.postimg.cc/RhCH9GZN/Efecty.png" alt="" />
                                <img src="https://i.postimg.cc/BnRHDxMV/Nequi.png" alt="" />
                                <img src="https://i.postimg.cc/HxgMvTG0/Mastercard.png" alt="" />
                                <img src="https://i.postimg.cc/g0RRKn7k/Bancolombia.png" alt="" />
                                <img src="https://i.postimg.cc/QtJTRvs2/PSE.png" alt="" />
                            </div>
                        </div>
                        <div className="Wompi">
                            <img src="https://i.postimg.cc/Hnf85mt7/Wompi.png" alt="" />
                        </div>
                    </Grid>
                </Grid>

                <Grid container style={{ width: '100%' }} className="DerechosContainerMain">
                    <Grid container style={{ width: '90%' }} className="DerechosContainer" display={'flex'} justifyContent={'center'}>
                        <p>Todos los derechos reservados de Mercado Repuesto 2024©</p>
                    </Grid>
                </Grid>

            </Grid>
        </footer>
    );
};

export default FooterDefault;
