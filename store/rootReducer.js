import { combineReducers } from "redux";
import app from "./app/reducer";
import shop from "./shop/reducer";
import ecomerce from "./ecomerce/reducer";
import categories from "./categories/reducer";
import homepages from "./homepages/reducer";
import typesidentifications from "./typesidentifications/reducer";
import userlogged from "./userlogged/reducer";
import typesvehicles from "./typesvehicles/reducer";
import vehiclesbrands from "./vehiclesbrands/reducer";
import yearsvehicles from "./yearsvehicles/reducer";
import modelsvehicles from "./modelsvehicles/reducer";
import bodiesvehicles from "./bodiesvehicles/reducer";
import users from "./users/reducer";
import tokenregistro from "./tokenregistro/reducer";
import versionmotor from "./versionmotor/reducer";
import datosmotor from "./datosmotor/reducer";
import vehiculoseleccionado from "./selectedvehicle/reducer";
import datosproducto from "./datosproducto/reducer";
import datosproductouno from "./datosproductouno/reducer";
import ubicarproducto from "./ubicarproducto/reducer";
import variablesgeneralesmrp from "./variablesgeneralesmrp/reducer";
import datasearchinteractive from "./datasearchinteractive/reducer";
import dataselectedexternal from "./dataselectedexternal/reducer";
import selectviewproduct from "./selectviewproduct/reducer";
import datafindproducts from "./datafindproducts/reducer";
import datosgenerales from "./datosgenerales/reducer";

const rootReducer = combineReducers({
    app,
    shop,
    ecomerce,
    categories,
    homepages,
    typesidentifications,
    userlogged,
    typesvehicles,
    vehiclesbrands,
    yearsvehicles,
    modelsvehicles,
    bodiesvehicles,
    users,
    tokenregistro,
    versionmotor,
    datosmotor,
    vehiculoseleccionado,
    datosproducto,
    datosproductouno,
    ubicarproducto,
    variablesgeneralesmrp,
    datasearchinteractive,
    dataselectedexternal,
    selectviewproduct,
    datafindproducts,
    datosgenerales
});

export default rootReducer;
