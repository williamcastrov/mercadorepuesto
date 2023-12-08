import React, { useEffect, useState } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import Product from "~/components/elements/products/ProductSearchRelated";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import { useSelector, useDispatch } from "react-redux";

const WidgetShopRelatedProductsSearch = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const [classBlock, setClassBlock] = useState('widget widget--shop widget--shop-related-products')

    let blockscreen = useSelector((state) => state.blockscreen.blockscreen);

    useEffect(() => {
        getProducts({ _limit: 2 });
    }, []);

    useEffect(() => {
        if (blockscreen == 1)
            setClassBlock("widget widget--shop widget--shop-related-products deshabilitardos")
        else
            setClassBlock("widget widget--shop widget--shop-related-products")
    }, [blockscreen]);

    let productsView;
    if (productItems && productItems.length > 0) {
        productsView = productItems.map((item, index) =>
            index < 10 ? <Product product={item} key={item.id} /> : null
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
        <div className={classBlock}>
            <br/>
            <div className="tamañotextoproductosrelacionadossearch">Productos Relacionados</div>
            <div className="widget__content">{productsView}</div>
        </div>
    );
};

export default WidgetShopRelatedProductsSearch;
