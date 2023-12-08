import React, { useEffect, useState } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ModuleShopActionsInteractivo from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import { getDataCityPrd } from "../../store/datacityprd/action";
import ViewFilterSelect from "../search/viewfilterselect";

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

const SearchPhotoMaximize = (props) => {
    const {
        optionSelect,
        setOptionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        menorprecio,
        setMenorPrecio,
        mayorprecio,
        setMayorPrecio,
        precioFiltroMinimo,
        setPrecioFiltroMinimo,
        precioFiltroMaximo,
        setPrecioFiltroMaximo,
        filtroPrecio,
        setFiltroPrecio,
        condicionPrd,
        ciudadesPrd,
        dataCitySelect,
        dataPrdItem,
        database,
        precioMin,
        precioMax,
        orderPrice,
        setOrderPrice,
        datosBuscar,
        setDatosBuscar,

        classSearch,
        setclassSearch,
        eraseCitySel,
        setEraseCitySel,
        citySelected,
        setCitySelected,
        filtroCond,
        setFiltroCond,
        condition,
        setCondition,
        marcarCondicion,
        setMarcarCondicion,
        itemSelCond,
        setitemSelCond,
        classCondicion,
        setClassCondicion,
        classCity,
        setClassCity,
        classCitySel,
        setClassCitySel,
        classActionInteractive,
    } = props;

    const [selCiudad, setSelCiudad] = useState([]);
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    let dataCity = useSelector((state) => state.cityselect.cityselect);

    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", keyword);
    const { loading, productItems, getProducts } = useGetProducts();
    //console.log("PRODUCT ITEMS : ", productItems);
    const { withGrid } = useProductGroup();

    let ubicacion;

    useEffect(() => {
        ubicacion = JSON.parse(localStorage.getItem("ubicacionproducto"));
    }, []);

    useEffect(() => {
        if (dataCity.length > 0) {
            setCitySelected(dataCity);
            setSelCiudad(dataCity)
        } else if (citySelected.length > 0) {
            setCitySelected(citySelected);
            setSelCiudad(citySelected)
        }
    }, [dataCity, citySelected]);

    useEffect(() => {
        const queries = {
            name_contains: "mazda",
        };
        getProducts(queries);
    }, [keyword]);

    let products;
    if (dataPrdItem && dataPrdItem.length > 0) {
        arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        let allprdciud = [];
        let itemciud = [];

        dataPrdItem &&
            dataPrdItem.map((row, index) => {
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
                dataPrdItem &&
                    dataPrdItem.map((row, index) => {
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
        //console.log("CIUDADES : ", arrayciud)
        productosfiltrados = [];
        productosfiltradoscity = [];

        if (condicionPrd > 0) {
            dataPrdItem &&
                dataPrdItem.map((item) => {
                    if (condicionPrd == item.condition) {
                        productosfiltrados.push(item);
                    }
                });
        } else productosfiltrados = dataPrdItem;

        if (dataCitySelect) {
            if (dataCitySelect.length > 0) {
                let idciudad = [];
                dataCitySelect &&
                    dataCitySelect.map((reg) => {
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

                //console.log("XXXXX : ", productosfiltradoscity);
                //console.log("CIUDXXX : ", dataCitySelect);
            } else productosfiltradoscity = productosfiltrados;
        } else productosfiltradoscity = productosfiltrados;

        let prdrangprecio = [];
        productosfiltradoscity &&
            productosfiltradoscity.map((item) => {
                if (item.price >= precioMin && item.price <= precioMax) {
                    prdrangprecio.push(item);
                }
            });

        products = withGrid(prdrangprecio, loading, 6);
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    return (
        <div className="tamañoresultadodatosphotossearchinteractive">
            <div className="mb-10">
                <h1 className="titulocantidadproductossearchlist ">
                    (
                    {productItems && productItems.length > 0
                        ? productItems.length
                        : 0}
                    ) Productos resultado de tu busqueda {ubicacion} del
                    vehículo {datosbuscadorinteractivo.nombrecarroceria}
                    {", "}
                    {datosbuscadorinteractivo.nombremarca}
                    {", "}
                    {datosbuscadorinteractivo.nombremodelo}
                </h1>
            </div>
            {selCiudad.length == 0 && filtroCond == 0 ? (
                <div className="mtmenos1"></div>
            ) : (
                <ViewFilterSelect
                    classSearch={classSearch}
                    setclassSearch={setclassSearch}
                    eraseCitySel={eraseCitySel}
                    setEraseCitySel={setEraseCitySel}
                    citySelected={citySelected}
                    setCitySelected={setCitySelected}
                    filtroCond={filtroCond}
                    setFiltroCond={setFiltroCond}
                    condition={condition}
                    setCondition={setCondition}
                    marcarCondicion={marcarCondicion}
                    setMarcarCondicion={setMarcarCondicion}
                    itemSelCond={itemSelCond}
                    setitemSelCond={setitemSelCond}
                    classCondicion={classCondicion}
                    setClassCondicion={setClassCondicion}
                    classCity={classCity}
                    setClassCity={setClassCity}
                    classCitySel={setClassCity}
                    setClassCitySel={setClassCitySel}
                    maximizarOption={maximizarOption}
                    optionSelect={optionSelect}
                />
            )}

            <div className="ps-page ps-page--shopping">
                <div className={classActionInteractive}>
                    <ModuleShopActionsInteractivo
                        optionSelect={optionSelect}
                        setOptionSelect={setOptionSelect}
                        maximizarOption={maximizarOption}
                        setMaximizarOption={setMaximizarOption}
                        zoom={zoom}
                        setZoom={setZoom}
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
                        orderPrice={orderPrice}
                        setOrderPrice={setOrderPrice}
                        datosBuscar={datosBuscar}
                        setDatosBuscar={setDatosBuscar}
                    />
                    <div>{products}</div>
                </div>
            </div>
        </div>
    );
};

export default SearchPhotoMaximize;
