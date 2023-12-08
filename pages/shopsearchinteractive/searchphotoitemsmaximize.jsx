import React, { useEffect, useState, useRef  } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ModuleShopActionsInteractivo from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import { getDataCityPrd } from "../../store/datacityprd/action";
import { getAddEdToCart } from "../../store/addedtocart/action";
import ViewFilterSelect from "../search/viewfilterselect";
import ViewAddShoppingCart from "../shop/viewaddshoppingcart";

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

const SearchPhotoItemsMaximize = (props) => {
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

    let dataCity = useSelector((state) => state.cityselect.cityselect);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const irA = useRef(null);

    let addedtocart = [0];
    addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    const [addcartId, setAddcartId] = useState(0);
    const [addcartIdLogin, setAddcartIdLogin] = useState(0);
    const [addcartImagen, setAddcartImagen] = useState(0);
    const [addcartTitulo, setAddcartTitulo] = useState(0);
    const [addcartCantidad, setAddcartCantidad] = useState(0);
    const [datFindInteractive, setDatFindInteractive] = useState([]);

    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", keyword);
    const { loading, productItems, getProducts } = useGetProducts();
    //console.log("PRODUCT ITEMS : ", productItems);
    const { withGrid, withList } = useProductGroup();

    let datosbuscadorinteractivo = [];

    datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    let ubicacion;

    useEffect(() => {
        let aadditemcar = JSON.parse(localStorage.getItem("aadditemcar"));
        let datcart = JSON.parse(localStorage.getItem("addedtocart"));
        let datcarshopping;
        if (addedtocart.length > 0) datcarshopping = addedtocart;
        else if (datcart) datcarshopping = datcart;

        if (aadditemcar) {
            setAddcartId(addedtocart.idproducto);
            setAddcartImagen(addedtocart.nombreimagen1);
            setAddcartTitulo(addedtocart.titulonombre);
            setAddcartCantidad(addedtocart.cantidad);
            //localStorage.setItem("aadditemcar", JSON.stringify(false));
        } else {
            if (addcartId > 0) {
                setAddcartId(0);
                setAddcartImagen(0);
                setAddcartTitulo(0);
                setAddcartCantidad(0);
                let item = {
                    idproducto: 0,
                    nombreimagen1: "",
                    titulonombre: "",
                    cantidad: "",
                };
                dispatch(getAddEdToCart(item));
            }
        }
    }, [addedtocart]);

    useEffect(() => {
        ubicacion = JSON.parse(localStorage.getItem("ubicacionproducto"));
    }, []);

    useEffect(() => {
        if (datosbuscadorinteractivo.length > 0) {
            setDatFindInteractive(datosbuscadorinteractivo);
        } else {
            let dat = JSON.parse(localStorage.getItem("dataselectsearch"));
            setDatFindInteractive(dat);
        }
    }, [datosbuscadorinteractivo]);

    useEffect(() => {
        const queries = {
            name_contains: "mazda",
        };
        getProducts(queries);
    }, [keyword]);

    useEffect(() => {
        if (dataCity.length > 0) {
            setCitySelected(dataCity);
            setSelCiudad(dataCity);
        } else if (citySelected.length > 0) {
            setCitySelected(citySelected);
            setSelCiudad(citySelected);
        }
    }, [dataCity, citySelected]);

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

        products = withList(prdrangprecio, loading, 6);
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [addcartId, addedtocart]);

    return (
        <div className="tamañosearchphotitemmaximiza" ref={irA}>
            <div className="mb-10">
                <h1 className="titulocantidadproductossearchlist ">
                    (
                    {productItems && productItems.length > 0
                        ? productItems.length
                        : 0}
                    ) Productos resultado de tu busqueda {ubicacion} del
                    vehículo {datFindInteractive.nombrecarroceria}
                    {""}
                    {datFindInteractive.nombremarca}
                    {""}
                    {datFindInteractive.nombremodelo}
                </h1>
            </div>
            {selCiudad.length == 0 && filtroCond == 0 ? (
                <div className="mtmenos1"></div>
            ) : optionSelect > 0 ? (
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
            ) : null}

            {addcartId > 0 ? (
                <div className="productoagregarcarritodos">
                    <ViewAddShoppingCart
                        idproducto={addcartId}
                        nombreimagen1={addcartImagen}
                        titulonombre={addcartTitulo}
                    />
                </div>
            ) : addcartIdLogin > 0 ? (
                <div className="productoagregarcarritodos">
                    <ViewAddShoppingCart
                        idproducto={addcartIdLogin}
                        nombreimagen1={addcartImagen}
                        titulonombre={addcartTitulo}
                    />
                </div>
            ) : null}

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

export default SearchPhotoItemsMaximize;
