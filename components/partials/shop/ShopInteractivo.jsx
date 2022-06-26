import React, { useState } from "react";
import ModuleShopActions from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import CustomPagination from "~/components/elements/basic/CustomPagination";

const ShopInteractivo = (props) => {
    let actionsView;
    const {
        children,
        classes,
        fullwidth = false,
        actions = true,
        prueba,
    } = props;

    //Esta sección de codigo la comento, por que la movi a SEARINTERACTIVE CORRESPONDE AL HEADER
/*
    if (actions) {
        actionsView = (
            <div className="ps-shop__header">
                <div className="container">
                    <br />
                    <ModuleShopActions /> 
                    <ShopInteractivoHeader />
                </div>
            </div>
        );
    }
    */

    if (!fullwidth) {
        return (
            <div className={`ps-shop ${classes}`}>
                {actionsView}
                <div className="ps-shop__content espacioimageneshabitaculo">
                    {children}
                </div>
                <div className="ps-shop__footer">
                    <CustomPagination />
                </div>
            </div>
        );
    } else {
        return (
            <div className={`ps-shop ${classes !== undefined ? classes : ""}`}>
                {actionsView}
                <div className="ps-shop__content">
                    <div className="container">{children}</div>
                    <div className="ps-shop__footer">
                        <CustomPagination />
                    </div>
                </div>
            </div>
        );
    }
};

export default ShopInteractivo;
