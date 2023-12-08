import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";
import DetailDefault from "~/components/elements/detail/DetailDefault";
import useGetProducts from "~/hooks/useGetProducts";
import MyPosts from "./myposts";
import SortByPosts from "../../components/partials/shop/modules/SortByPosts";
import { Box, Grid, Button } from "@mui/material";

const ProductDetailPage = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const { loading, product, getPublicatById } = useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);
    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [datosBuscar, setDatosBuscar] = useState(null);
    const [numeroPublicaciones, setNumeroPublicaciones] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);

    useEffect(() => {
        if (id) {
            //getPublicatById(id);
        }
    }, [id]);

    useEffect(() => {
        //if (product) setNombreProducto(product.name);
    }, [product]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <DetailDefault product={product} />;
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 2,
            text: "Tienda",
            url: "/shop",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    const tituloOnChange = (e) => {
        var strLength = e.length;
        setDatosBuscar(e);
    };

    function handleSubmit(e) {
        //console.log("ON CLICK : ", datosBuscar);
    }

    const newPost = () => {
        Router.push("/CreateProduct/createproduct");
    };

    return (
        <Container title="Product">
            <div className="ps-page ps-page--product">
                <div className="container">
                    <div className="ps-page__header ml-50">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>

                    <Grid container spacing={1}>
                        <Grid item xs={9} md={9} lg={9}>
                            <div className="titulopublicaciones">
                                Mis Publicaciones
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={3}
                            lg={3}
                            onClick={() => newPost()}>
                            <div className="newposts">
                                <a>
                                    Nueva publicación
                                    <i className="iconoadd fa fa-plus-circle"
                                        aria-hidden="true"></i>
                                </a>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4} md={4} lg={4}>
                            <div className="ml-30 mtmenos20 mb-20">
                                <SortByPosts
                                    orderPrice={orderPrice}
                                    setOrderPrice={setOrderPrice}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <div>
                                <input
                                    className="input-group inputbuscarposts"
                                    onChange={(e) =>
                                        tituloOnChange(e.target.value)
                                    }
                                    value={datosBuscar}
                                    type="text"
                                />
                                <div className="iconobuscarpost">
                                    <a
                                        href="#"
                                        onClick={(e) => handleSubmit(e)}>
                                        <i
                                            className="fa fa-search"
                                            aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <div className="numeroprodmyposts">
                                Número de publicaciones: {numeroPublicaciones}
                            </div>
                        </Grid>
                    </Grid>

                    <div className="ps-page__content mt-10">
                        <div className="ps-layout--with-sidebar ps-reverse">
                            <div className="ps-layout__right">
                                <MyPosts
                                    setNumeroPublicaciones={
                                        setNumeroPublicaciones
                                    }
                                    orderPrice={orderPrice}
                                    setOrderPrice={setOrderPrice}
                                    datosBuscar={datosBuscar}
                                    setDatosBuscar={setDatosBuscar}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetailPage;
