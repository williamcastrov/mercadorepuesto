import { all } from "redux-saga/effects";

import AppSaga from "./app/saga";
import ShopSaga from "./shop/saga";
import Ecomerce from "./ecomerce/saga";
import Categories from "./categories/saga";
import Homepages from "./homepages/saga";
import Typesidentifications from "./typesidentifications/saga";
import UserSaga from "./userlogged/saga";
import TypesVehiclesSaga from "./typesvehicles/saga";
import VehiclesBrandsSaga from "./vehiclesbrands/saga";
import YearsVehiclesSaga from "./yearsvehicles/saga";
import ModelsVehiclesSaga from "./modelsvehicles/saga";
import BodiesVehiclesSaga from "./bodiesvehicles/saga";
import UsersSaga from "./users/saga";
import TokenRegistroSaga from "./tokenregistro/saga";
import VersionMotorSaga from "./versionmotor/saga";
import DatosMotorSaga from "./datosmotor/saga";
import VehiculoSeleccionadoSaga from "./selectedvehicle/saga";
import DatosProductoSaga from "./datosproducto/saga";
import DatosProductoUnoSaga from "./datosproductouno/saga";
import UbicarProducto from "./ubicarproducto/saga";
import VariablesGeneralesMrp from "./variablesgeneralesmrp/saga";
import DataSearchInteractive from "./datasearchinteractive/saga";
import DataSelectedExternal from "./dataselectedexternal/saga";
import SelectViewProduct from "./selectviewproduct/saga";
import DataFindProducts from "./datafindproducts/saga";
import DatosGenerales from "./datosgenerales/saga";
import DatosNewModels from "./datanewmodels/saga";
import DatosNewCylinder from "./datanewcylinder/saga";
import DatosEditar from "./editdata/saga";
import DatosEditarBuscar from "./editdatafind/saga";
import DataSelectSearch from "./dataselectsearch/saga";
import WordBase from "./wordbase/saga";
import WishList from "./datawishlist/saga";
import DataCityPrd from "./datacityprd/saga";
import CitySelect from "./cityselect/saga";
import SelectCondition from "./selectcondition/saga";
import RangosPrecio from "./rangosprecio/saga";
import DataShoppingCart from "./datashoppingcart/saga";
import AddEdToCart from "./addedtocart/saga";
import ChangeSaga from "./changesearch/saga";
import ChangeSagaPrice from "./changesearchprice/saga";
import ClearLocation from "./clearlocation/saga";
import ClearCondition from "./clearcondition/saga";
import LeeIra from "./leeira/saga";
import AddLogin from "./addlogin/saga";
import BlockScreen from "./blockscreen/saga";
import CancelCondition from "./cancelcondition/saga";
import DuplicarPrd from "./duplicarprd/saga";

export default function* rootSaga() {
    yield all([AppSaga(), ShopSaga(), Ecomerce(), Categories(), Homepages(), Typesidentifications(), UserSaga(),
               TypesVehiclesSaga(), VehiclesBrandsSaga(), YearsVehiclesSaga(), ModelsVehiclesSaga(), BodiesVehiclesSaga(),
               UsersSaga(), TokenRegistroSaga(), VersionMotorSaga(), DatosMotorSaga(), VehiculoSeleccionadoSaga(),
               DatosProductoSaga(), DatosProductoUnoSaga(), UbicarProducto(), VariablesGeneralesMrp(), DataSearchInteractive(),
               DataSelectedExternal(), SelectViewProduct(), DataFindProducts(), DatosGenerales(), DatosNewModels(),
               DatosNewCylinder(), DatosEditar(), DatosEditarBuscar(), DataSelectSearch(), WordBase(), WishList(),
               DataCityPrd(), CitySelect(), SelectCondition(), RangosPrecio(), DataShoppingCart(), AddEdToCart(),
               ChangeSaga(), ChangeSagaPrice(), ClearLocation(), ClearCondition(), LeeIra(), AddLogin(), BlockScreen(),
               CancelCondition(), DuplicarPrd()
        ]);
}
