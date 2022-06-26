import React, {useState} from "react";
import ModuleShopActions from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import CustomPagination from "~/components/elements/basic/CustomPagination";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";

const ShopInteractivo = ({
    children,
    classes,
    fullwidth = false,
    actions = true,
    showProductInteractivo
}) => {
    let actionsView;
    if (actions) {
        actionsView = (
            <div className="ps-shop__header">
                <div className="container">
                    <br />
                    {/*<ModuleShopActions /> */}
                    <ShopInteractivoHeader />
                </div>
            </div>
        );
    }
    if (!fullwidth) {
        if (!showProductInteractivo) {
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
        }
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

const ShopInteractivoHeader = (props) => {
    
    const noMostrarFotos = () => {
       
    };

    return (
        <div>
            <Row>
                <Col xs={1} sm={2} lg={3}>
                    <Button
                        className="botonheaderinteractivoizquierda"
                        onClick={noMostrarFotos}>
                        <i
                            className="fa fa-2x fa-picture-o"
                            aria-hidden="true"></i>
                    </Button>
                </Col>

                <Col xs={1} sm={2} lg={3}>
                    <Button className="botonheaderinteractivo">XXX1 </Button>
                </Col>

                <Col xs={1} sm={2} lg={3}>
                    <Button className="botonheaderinteractivo">XXX2</Button>
                </Col>

                <Col xs={1} sm={2} lg={3}>
                    <Button className="botonheaderinteractivoderecha">
                        <i
                            class="fa fa-2x fa-arrows-alt"
                            aria-hidden="true"></i>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default ShopInteractivo;
