import React, { useEffect } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import ProductRelated from "~/components/elements/products/ProductRelated";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";

const WidgetShopRelatedProductsResults = (props) => {
    const { numProdRel } = props;
    const { loading, productItems, getProducts } = useGetProducts();

    useEffect(() => {
        getProducts({ _limit: 2 });
    }, []);

    //console.log("NUMRESULT: ", numProdRel);

    let productsView;
    if (productItems && productItems.length > 0) {
        productsView = productItems.map((item, index) =>
            index < numProdRel ? <ProductRelated product={item} key={item.id} /> : null
        );
    } else {
        if (loading) {
            const items = generateTempArray(4).map((item) => (
                <SkeletonProduct key={item} />
            ));
            productsView = (
                <div className="ps-shop-items with-skeleton">{items}</div>
            );
        } else {
            productsView = <p>No hay resultados para tu busqueda.</p>;
        }
    }
    return (
        <div className="pt-20">
            <div className="widget__heading tamañotextotitulocondicion">
                Productos relacionados
            </div>
            <div className="widget__content">{productsView}</div>
        </div>
    );
};

export default WidgetShopRelatedProductsResults;
