import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import ShopBestSellers from "~/components/partials/shop/ShopBestSellers";
import { useRouter } from "next/router";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },

    {
        id: 2,
        text: "Shop",
    },
];

const ShopScreen = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGrid, withList } = useProductGroup();
    const Router = useRouter();
    const { query } = Router;
    let products = "";

    useEffect(() => {
        const queries = {
            _limit: 24,
        };
        getProducts(queries);
    }, []);

    if (productItems && productItems.length > 0) {
        if (query) {
            if (query.layout === "list") {
                products = withList(productItems, loading, 4);
            } else if (query.layout === "grid") {
                products = withGrid(productItems, loading, 4);
                switch (query.columns) {
                    case "2":
                        products = withGrid(productItems, loading, 2);
                        break;
                    case "3":
                        products = withGrid(productItems, loading, 3);
                        break;
                    default:
                        products = withGrid(productItems, loading, 4);
                        break;
                }
            } else {
                products = withGrid(productItems, loading, 4);
            }
        } else {
            products = withGrid(productItems, loading, 4);
        }
    }

    return (
        <Container title="Shop">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Shop
                            <sup>
                                (
                                {productItems && productItems.length > 0
                                    ? productItems.length
                                    : 0}
                                )
                            </sup>
                        </h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar">
                            <div className="ps-layout__left">
                                <SidebarShop />
                            </div>
                            <div className="ps-layout__right">
                                <ShopBestSellers />
                                <Shop classes="ps-shop--grid">{products}</Shop>
                                <PromotionSecureInformation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ShopScreen;
