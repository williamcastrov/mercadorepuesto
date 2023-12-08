import React from "react";
import ModuleShopActions from "~/components/partials/shop/modules/ModuleShopActions";
import CustomPagination from "~/components/elements/basic/CustomPagination";

const ShopInteractivo = ({ children, classes, fullwidth = false, actions = true }) => {
    let actionsView;
    if (actions) {
        actionsView = (
            <div className="ps-shop__header">
                <div className="container">
                    <ModuleShopActions />
                </div>
            </div>
        );
    }
    if (!fullwidth) {
        return (
            <div className={`ps-shop ${classes}`}>
                <div className="tamañoactionsview">
                {actionsView}
                </div>
                <div className="mlmenos20 ps-shop__content">{children}</div>
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
