import React from "react";
import useProduct from "~/hooks/useProduct";
import Link from "next/link";

const ModuleProductImages = ({ product }) => {
    const { thumbnailImages, price } = useProduct();
    return (
        <div className="ps-product__images">
            <Link href="/product/[id]" as={`/product/${product.id}`}>
                <a className="ps-product__overlay"></a>
            </Link>
            {thumbnailImages(product)}
        </div>
    );
};

export default ModuleProductImages;
