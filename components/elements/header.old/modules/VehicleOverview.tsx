import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Themes } from "~/utilities/StyleVariables";
import {
    DeletingContext,
    EditingContext,
    FilterContext,
    SavedVehicle,
    SelectedContext,
    state,
} from "../FilterWrapper";
import EditIcon from "../svgs/EditIcon";
import MotorcycleIcon from "../svgs/MotorcicleIcon";
import SideCarIcon from "../svgs/SideCarIcon";
import TipperIcon from "../svgs/TipperIcon";
import TowTruckIcon from "../svgs/TowTruckIcon";
import TrashIcon from "../svgs/TrashIcon";
import TruckIcon from "../svgs/TruckIcon";
import VanIcon from "../svgs/VanIcon";

interface Props {
    vehicle?: SavedVehicle;
    type: state;
    index?: number;
}

const VehicleOverview = ({ vehicle, index, type }: Props) => {
    const { setDeleting } = useContext(DeletingContext);
    const { setView } = useContext(FilterContext);
    const { selected, setSelected } = useContext(SelectedContext);
    const { setEditing } = useContext(EditingContext);
    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    let isSelected: boolean;

    if (selected === null) {
        isSelected = type === state.None;
    } else if (user) {
        isSelected = vehicle?.id === selected;
    } else {
        isSelected = selected === index;
    }

    const selectVehicle = () => {
        if (user) {
            setSelected(vehicle?.id);
        } else {
            setSelected(type === state.Select ? index : null);
        }
    };

    const deleteVehicle = () => {
        if (user) {
            setDeleting(vehicle?.id);
        } else {
            setDeleting(index);
        }
        setView(state.Delete);
        setSelected(null);
    };

    const editVehicle = () => {
        setEditing(index);
        setView(state.Edit);
        setSelected(null);
    };

    //  useEffect(() => {
    //      if (selected === -1 && type !== state.None) {
    //          selectVehicle();
    //      }
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    //  }, []);

    return (
        <Container type={type}>
            <div onClick={selectVehicle} className="overview">
                {type === state.None && (
                    <div>Buscar para cualquier vehículo</div>
                )}
                {vehicle && type !== state.None && (
                    <>
                        <div>
                            <span>
                                <VehicleIcon
                                    type={vehicle.type.toLowerCase()}
                                    body={vehicle.body.toLowerCase()}
                                />
                            </span>
                            <span>
                                {`${vehicle.brand}, ${vehicle.model}, ${
                                    vehicle.year
                                }, ${vehicle.cilinder}, ${vehicle.fuel}${
                                    vehicle.traction &&
                                    vehicle.traction !== "indefinido" &&
                                    vehicle.traction !== "undefined"
                                        ? ", " + vehicle.traction
                                        : ""
                                }${
                                    vehicle.transmision &&
                                    vehicle.transmision !== "indefinido" &&
                                    vehicle.transmision !== "undefined"
                                        ? ", " + vehicle.transmision
                                        : ""
                                }`}
                            </span>
                        </div>
                    </>
                )}
                {type !== state.Delete && (
                    <div
                        className={`check-circle ${
                            isSelected ? "selected" : ""
                        }`}
                    />
                    //   <input type={"radio"} readOnly checked={isSelected} />
                )}
            </div>
            {type === state.None && (
                <>
                    <button className="dummy-buttons">
                        <svg />
                    </button>
                    <button className="dummy-buttons">
                        <svg />
                    </button>
                </>
            )}
            {type === state.Select && (
                <>
                    <button onClick={deleteVehicle}>
                        <span className="tooltip">Eliminar</span>
                        <TrashIcon />
                    </button>
                    <button onClick={editVehicle}>
                        <span className="tooltip">Editar</span>
                        <EditIcon />
                    </button>
                </>
            )}
        </Container>
    );
};

const VehicleIcon = ({ type, body }: { type: string; body: string }) => {
    switch (type) {
        case "carros y camionetas":
            return <SideCarIcon />;
        case "motos":
            return <MotorcycleIcon />;
        case "camiones":
            return <TruckIcon />;
        case "buses y vans":
            return <VanIcon />;
        case "maquinaria pesada":
            return <TowTruckIcon />;
         case "carros de colección":
            return <SideCarIcon />;
        case "eléctricos":
            const heavyVehicles = [
                "Articulado",
                "Camión sencillo",
                "Cuatro manos",
                "Doble troque camión",
                "Grúas",
                "Turbo",
                "Volqueta doble troque",
                "Volqueta sencilla",
            ];

            const motorcycles = ["moto carro y triciclos", "scooter"];

            if (
                heavyVehicles.some((vehicle) => vehicle.toLowerCase() === body)
            ) {
                return <TruckIcon />;
            } else if (motorcycles.some((vehicle) => vehicle.toLowerCase() === body)){
               return <MotorcycleIcon />;
            } else if (body === 'vans') {
               return <VanIcon />;
            } else {
               return <SideCarIcon />
            }
        default:
            return null;
    }
};

export default VehicleOverview;

interface ContainerProps {
    type: state;
}

const Container = styled.div<ContainerProps>`
    grid-template-columns: 1fr auto auto;
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1rem;

    ${({ type }) => type !== state.Delete && `gap: 0.5rem; cursor: pointer;`}

    .overview {
        background-color: ${Themes.offWhite};
        border-radius: 9999px;
        display: grid;
        font-size: 1.5rem;
        gap: 0.5rem;
        grid-template-columns: 1fr auto;
        padding: 0.75rem 1.25rem;
        position: relative;

        div {
            width: 100%;

            display: flex;
            gap: 0.5rem;
            overflow: hidden;
            flex-wrap: nowrap;
            text-overflow: ellipsis;
            white-space: nowrap;

            span {
                align-self: center;

                svg {
                    height: 1.5rem;
                    fill: ${Themes.main};
                }
            }
        }

        .check-circle {
            aspect-ratio: 1/1;
            align-self: center;
            background-color: white;
            border: 2px ${Themes.lightMain} solid;
            border-radius: 50%;
            width: 1.5rem;
            z-index: 10;

            &.selected {
                background-color: ${Themes.main};
            }
        }
    }

    button {
        aspect-ratio: 1/1;
        border-radius: 999px;
        background-color: ${Themes.offWhite};
        padding: 1rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        svg {
            aspect-ratio: 1/1;
            fill: ${Themes.main};
            width: 1.5rem;
        }

        &:hover {
            .tooltip {
                display: block;
            }
        }

        .tooltip {
            background-color: rgba(211, 211, 211, 0.6);
            border-radius: 4px;
            display: none;
            top: -70%;
            left: 0;
            padding: 2px;
            position: absolute;
            text-align: center;
        }

        &.dummy-buttons {
            opacity: 0;
            cursor: default;
        }
    }
`;
