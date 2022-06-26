import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
//import FeaturedProducts from "~/components/shared/sections/FeaturedProducts";
import BestDealOfWeek from "~/components/partials/homepages/sections/BestDealOfWeek";
//import TopSellers from "~/components/partials/homepages/sections/TopSellers";
//import Subscribe from "~/components/shared/sections/Subscribe";
import FollowInstagram from "~/components/shared/sections/FollowInstagram";
//import LatestProducts from "~/components/partials/homepages/sections/LatestProducts";
import PopularCategories from "~/components/partials/homepages/sections/PopularCategories";
import HomeOnePromotions from "~/components/partials/homepages/home-1/HomeOnePromotions";
import HomeOneTopBanners from "~/components/partials/homepages/home-1/HomeOneTopBanners";
//import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
//import HomeOnePromotionsTwo from "~/components/partials/homepages/home-1/HomeOnePromotionsTwo";
//import Testimonials from "~/components/shared/sections/Testimonials";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useDispatch, useSelector } from "react-redux";
import { getVariablesGeneralesMrp } from "../store/variablesgeneralesmrp/action";

Sentry.init({
    dsn: "https://1a85abd0b2d24ff2a23301268e18ca91@o427912.ingest.sentry.io/6112792",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const HomeDefaultPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const variablesgenerales = {
            direccionservidor: "https://sitbusiness.co"
        };
        dispatch(getVariablesGeneralesMrp(variablesgenerales));
    }, []);

    return (
        <Container header={<HeaderDefault classes="without-border" />}>
            <main id="homepage-one">
                <HomeOneTopBanners />
                <HomeOnePromotions />
                <PopularCategories />
                <BestDealOfWeek />
                <FollowInstagram />
            </main>
        </Container>
    );
};

export default HomeDefaultPage;
