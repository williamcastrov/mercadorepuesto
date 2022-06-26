import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const ModuleShopSortBy = () => {
    const sortByItems = [
        {
            id: 1,
            text: 'Populares',
        },
        {
            id: 2,
            text: 'Puntuación media',
        },
        {
            id: 3,
            text: 'Más reciente',
        },
        {
            id: 4,
            text: 'Precio: Bajo - Alto',
        },
        {
            id: 5,
            text: 'Precio: Alto - Bajo',
        },
    ];
    const viewItems = sortByItems.map((item) => (
        <Menu.Item key={item.id}>
            <a href="#">{item.text}</a>
        </Menu.Item>
    ));
    const view = <Menu>{viewItems}</Menu>;

    return (
        <div className="ps-shop__sortby">
            <span>Sortby</span>
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle">
                <Button>
                    Popularity <i className="icon-chevron-down"></i>
                </Button>
            </Dropdown>
        </div>
    );
};

export default ModuleShopSortBy;
