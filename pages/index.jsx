import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import HomeOneTopBanners from "~/components/partials/homepages/home-1/HomeOneTopBanners";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import { useDispatch, useSelector } from "react-redux";
import { getVariablesGeneralesMrp } from "../store/variablesgeneralesmrp/action";
import Header from "../components/elements/header/Header";
import CategoriasRecomendadas from "../components/partials/homepages/home-1/CategoriasRecomendadas";
import AyudaUsuarios from "../components/partials/homepages/home-1/AyudaUsuarios";
import ImagenVendedor from "../components/partials/homepages/home-1/ImagenVendedor";
import ElegirMarca from "../components/partials/homepages/home-1/ElegirMarca";
import MasVendidosEstaSemana from "../components/partials/homepages/home-1/MasVendidosEstaSemana";
import RecomendadosParaTi from "../components/partials/homepages/home-1/RecomendadosParaTi";

/*
Sentry.init({
    dsn: "https://1a85abd0b2d24ff2a23301268e18ca91@o427912.ingest.sentry.io/6112792",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
*/

const HomeDefaultPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const variablesgenerales = {
            direccionservidor: "https://gimcloud.com.co",
        };
        dispatch(getVariablesGeneralesMrp(variablesgenerales));
    }, []);

    return (
        <Container header={<HeaderDefault classes="without-border" />}>
            <main id="homepage-one">
                <div className="mbmenos26">
                    <HomeOneTopBanners />
                </div>
                <CategoriasRecomendadas />
                <AyudaUsuarios />
                <ImagenVendedor />
                <ElegirMarca />
                <MasVendidosEstaSemana />
                <RecomendadosParaTi />
            </main>
        </Container>
    );
};

export default HomeDefaultPage;
