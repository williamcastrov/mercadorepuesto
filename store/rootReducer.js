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
import datosnewmodels from "./datanewmodels/reducer";
import datosnewcylinder from "./datanewcylinder/reducer";
import editdata from "./editdata/reducer";
import editdatafind from "./editdatafind/reducer";
import dataselectsearch from "./dataselectsearch/reducer";
import wordbase from "./wordbase/reducer";
import wishlist from "./datawishlist/reducer";
import datacityprd from "./datacityprd/reducer";
import cityselect from "./cityselect/reducer";
import selectcondition from "./selectcondition/reducer";
import rangosprecio from "./rangosprecio/reducer";
import datashoppingcart from "./datashoppingcart/reducer";
import addedtocart from "./addedtocart/reducer";
import changesearch from "./changesearch/reducer";
import changesearchprice from "./changesearchprice/reducer";
import clearlocation from "./clearlocation/reducer";
import clearcondition from "./clearcondition/reducer";
import leeira from "./leeira/reducer";
import addlogin from "./addlogin/reducer";
import blockscreen from "./blockscreen/reducer";
import cancelcondition from "./cancelcondition/reducer";
import duplicarprd from "./duplicarprd/reducer";

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
    datosgenerales,
    datosnewmodels,
    datosnewcylinder,
    editdata,
    editdatafind,
    dataselectsearch,
    wordbase,
    wishlist,
    datacityprd,
    cityselect,
    selectcondition,
    rangosprecio,
    datashoppingcart,
    addedtocart,
    changesearch,
    changesearchprice,
    clearlocation,
    clearcondition,
    leeira,
    addlogin,
    blockscreen,
    cancelcondition,
    duplicarprd
});

export default rootReducer;
