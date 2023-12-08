import React, { useEffect, useState } from "react";
import ShopSearchInteractive from "~/pages/shopsearchinteractive";
import SearchPhotoMaximize from "~/pages/shopsearchinteractive/searchphotomaximize";
import SearchItemsMaximize from "~/pages/shopsearchinteractive/searchitemsmaximize";
import SearchPhotoItemsMaximize from "~/pages/shopsearchinteractive/searchphotoitemsmaximize";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroupInteractive";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getDataCityPrd } from "../../store/datacityprd/action";
import { getClearLocation } from "../../store/clearlocation/action";
import { getClearCondition } from "../../store/clearcondition/action";
import { Box, Grid, Button } from "@mui/material";

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
        text: "Resultado de la búsqueda",
    },
];

let productosfiltrados = [];
let productosfiltradoscity = [];
let arrayciud = [];
let dataPrdItem = [];
let database = [];

const SearchInteractiveItems = (props) => {
    const {
        zoomTipoVehiculo,
        setZoomTipoVehiculo,
        zoomBusquedaProductos,
        setZoomBusquedaProductos,
        zoomBusquedaItems,
        setZoomBusquedaItems,
        optionSelect,
        setOptionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
    } = props;

    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;
    const [classSearch, setclassSearch] = useState("ps-page ps-page--shopping");
    const [showProductInteractivo, setShowProductInteractivo] = useState(false);
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(10000000);
    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [eraseCitySel, setEraseCitySel] = useState(0);
    const [citySelected, setCitySelected] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [datosBuscar, setDatosBuscar] = useState(null);

    const [filtroCond, setFiltroCond] = useState(0);
    const [condition, setCondition] = useState(null);
    const [marcarCondicion, setMarcarCondicion] = useState("");
    const [itemSelCond, setitemSelCond] = useState(null);

    const [precioMin, setPrecioMin] = useState(1);
    const [precioMax, setPrecioMax] = useState(1);

    const [classCondicion, setClassCondicion] = useState("ml-1 mt-10 mb-0");
    const [classCity, setClassCity] = useState(
        "colorcerrarselectlocation apuntador"
    );
    const [classCitySel, setClassCitySel] = useState(
        "colorxcerrarfiltro apuntador"
    );
    //const [contCond, setContCond] = useState(controlcond);
    //const [dataPrdItem, setDataPrdItem] = useState([]);

    //console.log("QUE BUSCA : ", keyword);
    const { loading, productItems, getProducts } = useGetProducts();
    let dataCitySelect = useSelector((state) => state.cityselect.cityselect);
    const condicionPrd = useSelector(
        (state) => state.selectcondition.selectcondition
    );
    const rangoPrd = useSelector((state) => state.rangosprecio.rangosprecio);
    const changesearchprice = useSelector(
        (state) => state.changesearchprice.changesearchprice
    );

    //className="ps-page ps-page--shopping"

    const { withGrid } = useProductGroup();

    useEffect(() => {
        setCitySelected(dataCitySelect);
    }, [dataCitySelect]);

    useEffect(() => {
        const queries = {
            name_contains: "MAZDA",
        };
        getProducts(queries);
    }, [keyword]);

    let products;

    useEffect(() => {
        if (rangoPrd && rangoPrd != "") {
            setPrecioMin(rangoPrd.preciominimo);
            setPrecioMax(rangoPrd.preciofinal);
        } else {
            setPrecioMin(1);
            setPrecioMax(10000000);
        }
    }, [rangoPrd]);

    useEffect(() => {
        if (!changesearchprice) {
            setPrecioMin(1);
            setPrecioMax(10000000);
        }
        /*
        if (rangoPrd && rangoPrd != "") {
            setPrecioMin(rangoPrd.preciominimo);
            setPrecioMax(rangoPrd.preciofinal);
        } else {
            setPrecioMin(1);
            setPrecioMax(10000000);
        }
        */
    }, [changesearchprice]);

    if (productItems && productItems.length > 0) {
        arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        database = productItems;

        if (condicionPrd && citySelected) {
            if (condicionPrd == 0 && citySelected.length == 0) {
                dataPrdItem = database;
            }
        } else dataPrdItem = productItems;

        //console.log("PRDXXXXX : ", dataPrdItem);

        let allprdciud = [];
        let itemciud = [];

        productItems &&
            productItems.map((row, index) => {
                let validar;
                validar = prdciudaduno.includes(row.ciudad);
                if (!validar) {
                    prdciudaduno.push(row.ciudad);
                }
            });

        prdciudaduno &&
            prdciudaduno.map((item) => {
                let numciudades = 0;
                let nombre = "";
                let ind = 0;
                productItems &&
                    productItems.map((row, index) => {
                        if (item == row.ciudad) {
                            numciudades = parseInt(numciudades) + 1;
                            nombre = row.nombreciudad;
                            ind = index;
                        }
                    });

                let reg = {
                    id: ind,
                    ciudad: item,
                    nombre_ciu: nombre,
                    cantidad: numciudades,
                };
                arrayciud.push(reg);
            });

        // Coloca los datos en state arreglo de años de los vehiculos
        dispatch(getDataCityPrd(arrayciud));
        //console.log("CIUDADES : ", arrayciud);
        productosfiltrados = [];
        productosfiltradoscity = [];

        if (condicionPrd > 0) {
            productItems &&
                productItems.map((item) => {
                    if (condicionPrd == item.condition) {
                        productosfiltrados.push(item);
                    }
                });
        } else productosfiltrados = productItems;

        if (citySelected) {
            if (citySelected.length > 0) {
                let idciudad = [];
                citySelected &&
                    citySelected.map((reg) => {
                        let validar;
                        validar = idciudad.includes(reg.idciu);
                        if (!validar) {
                            idciudad.push(reg.idciu);
                        }
                    });

                productosfiltrados &&
                    productosfiltrados.map((item) => {
                        if (idciudad.includes(item.ciudad)) {
                            productosfiltradoscity.push(item);
                        }
                    });
            }

            //console.log("XXXXX : ", productosfiltradoscity);
            //console.log("CIUDXXX : ", citySelected);
        } else productosfiltradoscity = productosfiltrados;

        if (productosfiltradoscity.length > 0)
            dataPrdItem = productosfiltradoscity;
        else dataPrdItem = productItems;

        //console.log("XXXXXDDDDDDD : ", dataPrdItem);

        let datosfiltrador = [];
        if (datosBuscar) {
            let palabraminuscula = datosBuscar.toLowerCase();

            let nvoprod = [];
            dataPrdItem &&
                dataPrdItem.map((row, index) => {
                    let nombre = row.name.toLowerCase();

                    let validar;
                    validar = nombre.includes(palabraminuscula);
                    if (validar) {
                        nvoprod.push(row);
                    }  
                });
            datosfiltrador = nvoprod;
            console.log("DATOS BUSCAR : ", datosBuscar);
        }

        if (datosfiltrador.length > 0) {
            dataPrdItem = datosfiltrador;
        }

        let precios = [];
        dataPrdItem &&
            dataPrdItem.map((row, index) => {
                precios.push(row.price);
            });

        let ordenarPrecios = [];
        if (orderPrice == 1) {
            const compare = (a, b) => {
                if (b.price > a.price) {
                    return -1;
                }
                if (b.price < a.price) {
                    return 1;
                }
                return 0;
            };

            if (dataPrdItem.length > 0) dataPrdItem.sort(compare);
            //console.log("ORDENADOS : ", menorAmayor);
        } else if (orderPrice == 2) {
            const compare = (a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            };

            if (dataPrdItem.length > 0) dataPrdItem.sort(compare);
        }

        products = [
            [
                withGrid(
                    productosfiltradoscity,
                    loading,
                    5,
                    showProductInteractivo
                ),
            ],
        ];
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    useEffect(() => {
        setCitySelected([]);
        if (optionSelect === 1 && maximizarOption === 1) {
            setZoomTipoVehiculo(
                "col-md-1 mt-150 ml-200 minimizarbusqueda positionone"
            );
            setZoomBusquedaProductos("col-md-10 maximizarbusqueda");
        }

        if (
            (optionSelect === 1 || optionSelect === 2) &&
            maximizarOption === 0
        ) {
            setZoomTipoVehiculo("col-md-6");
            setZoomBusquedaProductos("col-md-6");
        }

        if (optionSelect === 2 && maximizarOption === 2) {
            setZoomTipoVehiculo("col-md-1  mt-150 ml-200 minimizarbusqueda ");
            setZoomBusquedaProductos("col-md-10 maximizarbusqueda");
        }

        if (maximizarOption != 0) {
            setclassSearch("ml-60 ps-page ps-page--shopping");
        } else if (maximizarOption === 0) {
            setclassSearch("ps-page ps-page--shopping");
        }
    }, [optionSelect, maximizarOption]);

    useEffect(() => {
        if (productItems) {
            let precios = [];
            productItems &&
                productItems.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });

            //console.log("ORDENADOS : ", menorAmayor);
            let long = menorAmayor.length;

            setMenorPrecio(menorAmayor[0]);
            setMayorPrecio(menorAmayor[long - 1]);
            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };
            localStorage.setItem("rangoprecios", JSON.stringify(item));
        }
    }, [productItems]);

    useEffect(() => {
        SelectCondition(condicionPrd);
    }, [condicionPrd]);

    const SelectCondition = (item) => {
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(1));
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(2));
        } else {
            setCondition(item);
            dispatch(getClearCondition(0));
            //setitemSel(item);
            setFiltroCond(item);
            //setMarcarCondicion("subrayartexto");
        }
    };

    const cerrarCity = (dato) => {
        let ciudades = citySelected;
        let citysel = [];
        let contcity = [];
        ciudades &&
            ciudades.map((item, index) => {
                if (dato != item.idciu) {
                    citysel.push(item);
                } else setEraseCitySel(dato);
            });
        setCitySelected(citysel);
        localStorage.setItem("cityselect", JSON.stringify(citysel));
        if (citysel.length > 0) {
            dispatch(getClearLocation(1));
        } else if (citysel.length == 0) {
            dispatch(getClearLocation(0));
        }
        //console.log("RESTA CIDU : ", citysel);
    };

    return (
        <div className={classSearch}>
            {maximizarOption > 0 ? (
                <Grid container spacing={1}>
                    <Grid item xs={2} md={2} lg={2}>
                        {filtroCond > 0 ? (
                            <div className="mlmenos11">
                                {filtroCond == 1 ? (
                                    <div className="textocdnsearchinteractive">
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={8} md={8} lg={8}>
                                                <a className="">Nuevo</a>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    className="colorxcerrarfiltro apuntador"
                                                    onClick={() =>
                                                        SelectCondition(0)
                                                    }>
                                                    {" X "}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : filtroCond == 2 ? (
                                    <div className="mlmenos35 textocdnsearchinteractive">
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={8} md={8} lg={8}>
                                                <a className="">Usado</a>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    className="colorxcerrarfiltro apuntador"
                                                    onClick={() =>
                                                        SelectCondition(0)
                                                    }>
                                                    {" X "}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </Grid>

                    <Grid item xs={9} md={9} lg={9} className="mlmenos4">
                        {citySelected.length == 1 ? (
                            <div className={classCondicion}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="tamañotextociudadeselectcuatro">
                                            {citySelected[0].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[0].idciu
                                                )
                                            }>
                                            <div className={classCity}>X</div>
                                        </a>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : citySelected.length == 2 ? (
                            <div className={classCondicion}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="tamañotextociudadeselectcuatro">
                                            {citySelected[0].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[0].idciu
                                                )
                                            }>
                                            <div className={classCity}>X</div>
                                        </a>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        md={2}
                                        lg={2}
                                        className={classCitySel}>
                                        <div className="tamañotextociudadeselectcinco">
                                            {citySelected[1].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[1].idciu
                                                )
                                            }>
                                            <div
                                                className={`pl-2 ${classCity}`}>
                                                X
                                            </div>
                                        </a>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : citySelected.length == 3 ? (
                            <div className={classCondicion}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="tamañotextociudadeselectcuatro">
                                            {citySelected[0].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[0].idciu
                                                )
                                            }>
                                            <div className={classCity}>X</div>
                                        </a>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        md={2}
                                        lg={2}
                                        className={classCitySel}>
                                        <div className="tamañotextociudadeselectcinco">
                                            {citySelected[1].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[1].idciu
                                                )
                                            }>
                                            <div
                                                className={`pl-2 ${classCity}`}>
                                                X
                                            </div>
                                        </a>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        md={2}
                                        lg={2}
                                        className={classCitySel}>
                                        <div className="tamañotextociudadeselectseis">
                                            {citySelected[2].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[2].idciu
                                                )
                                            }>
                                            <div
                                                className={`pl-4 ${classCity}`}>
                                                X
                                            </div>
                                        </a>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : citySelected.length == 4 ? (
                            <div className={classCondicion}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2} md={2} lg={2}>
                                        <div className="tamañotextociudadeselectcuatro">
                                            {citySelected[0].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[0].idciu
                                                )
                                            }>
                                            <div className={classCity}>X</div>
                                        </a>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        md={2}
                                        lg={2}
                                        className={classCitySel}>
                                        <div className="tamañotextociudadeselectcinco">
                                            {citySelected[1].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[1].idciu
                                                )
                                            }>
                                            <div
                                                className={`pl-2 ${classCity}`}>
                                                X
                                            </div>
                                        </a>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        md={2}
                                        lg={2}
                                        className={classCitySel}>
                                        <div className="tamañotextociudadeselectseis">
                                            {citySelected[2].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[2].idciu
                                                )
                                            }>
                                            <div
                                                className={`pl-15 ${classCity}`}>
                                                X
                                            </div>
                                        </a>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        md={2}
                                        lg={2}
                                        className={classCitySel}>
                                        <div className="tamañotextociudadeselectsiete">
                                            {citySelected[3].nombreciu}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <a
                                            onClick={() =>
                                                cerrarCity(
                                                    citySelected[3].idciu
                                                )
                                            }>
                                            <div
                                                className={`pl-20 ${classCity}`}>
                                                X
                                            </div>
                                        </a>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <div className="mtmenos90"></div>
                        )}
                    </Grid>
                </Grid>
            ) : null}

            {maximizarOption == 0 && optionSelect == 1 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajaproductsitems lineaderecha">
                        <ShopSearchInteractive
                            className="ps-shop--grid"
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}>
                            {products}
                        </ShopSearchInteractive>
                    </div>
                </div>
            ) : maximizarOption == 0 && optionSelect == 2 ? (
                <div className="ps-layout__right">
                    <div className="lineaderechaphoto tamañocajaproductsimage">
                        <ShopSearchInteractive
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}>
                            {products}
                        </ShopSearchInteractive>
                    </div>
                </div>
            ) : maximizarOption == 0 && optionSelect == 3 ? (
                <div className="ps-layout__right">
                    <div className="lineaderechaphoto tamañocajaproductsimage">
                        <ShopSearchInteractive
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}>
                            {products}
                        </ShopSearchInteractive>
                    </div>
                </div>
            ) : optionSelect == 1 && maximizarOption == 1 ? (
                <div className="ps-layout__right">
                    <div className="pl-20 tamañocajashopsearchinteractive">
                        <SearchItemsMaximize
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                            dataCitySelect={dataCitySelect}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                            datosBuscar={datosBuscar}
                            setDatosBuscar={setDatosBuscar}
                        />
                    </div>
                </div>
            ) : optionSelect == 2 && maximizarOption == 2 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajashopsearchinteractivephoto">
                        <SearchPhotoMaximize
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                            dataCitySelect={dataCitySelect}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                            datosBuscar={datosBuscar}
                            setDatosBuscar={setDatosBuscar}
                        />
                    </div>
                </div>
            ) : optionSelect == 3 && maximizarOption == 3 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajashopsearchinteractivephoto">
                        <SearchPhotoItemsMaximize
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                            dataCitySelect={dataCitySelect}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                            datosBuscar={datosBuscar}
                            setDatosBuscar={setDatosBuscar}
                        />
                    </div>
                </div>
            ) : (
                <div className="ps-layout__right lineaderecha">
                    <ShopSearchInteractive
                        className="ps-shop--grid"
                        setOptionSelect={setOptionSelect}
                        optionSelect={optionSelect}
                        maximizarOption={maximizarOption}
                        setMaximizarOption={setMaximizarOption}
                        zoom={zoom}
                        setZoom={setZoom}
                        condicionPrd={condicionPrd}
                        dataPrdItem={dataPrdItem}
                        database={database}
                        precioMin={precioMin}
                        precioMax={precioMax}>
                        {products}
                    </ShopSearchInteractive>
                </div>
            )}
        </div>
    );
};

export default SearchInteractiveItems;
