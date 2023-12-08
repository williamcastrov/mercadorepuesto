/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CloseWindowContext } from "../Header";
import {
    FilterContext,
    key,
    keys,
    SavedVehicle,
    state,
} from "../FilterWrapper";
import VehicleOverview from "./VehicleOverview";
import Button from "./Button";
import { Themes } from "~/utilities/StyleVariables";
import { useSelector } from "react-redux";

interface Props {
    vehicles: SavedVehicle[];
}

const Select = ({ vehicles }: Props) => {
    const { setView } = useContext(FilterContext);
    const closeWindow = useContext(CloseWindowContext);
    const { logged: user, uid: id } = useSelector(
        (store: any) => store.userlogged.userlogged
    );

    const goToCreate = () => {
        const limit = user ? 10 : 3;

        vehicles.length >= limit
            ? setView(state.Warning)
            : setView(state.Filter);
    };


    return (
        <Container length={vehicles.length}>
            <div className="select-container">
                <p>Agrega tu vehículo para filtrar tu busqueda</p>
                <VehicleOverview type={state.None} />
                <div className="vehicles-container">
                    {vehicles.sort((a,b) => user ? b.id - a.id : 1).map((op, i) => (
                        <VehicleOverview
                            type={state.Select}
                            key={i}
                            index={i}
                            vehicle={op}
                        />
                    ))}
                </div>
                <button className="add-vehicle-button" onClick={goToCreate}>
                    Agrega tu vehículo
                </button>
            </div>
            <div className="button-container">
                <Button onclick={closeWindow}>Listo</Button>
            </div>
        </Container>
    );
};

export default Select;

interface ContainerProps {
    length: number;
}

const Container = styled.div<ContainerProps>`
    display: grid;

    .select-container {
        .vehicles-container {
            /* max-height: 15rem;
      overflow-y: scroll;
      overflow-x: hidden; */
            /* padding-right: 0.4rem; */

            /* scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      } */

            & > div {
                &:first-child {
                    margin-top: 0;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        & > p {
            font-size: 1.75rem;
            font-weight: 500;
            line-height: 1.75rem;
            color: ${Themes.main};
            padding: 0.5rem 0;
            padding-right: 2rem;
        }

        .add-vehicle-button {
            background-color: ${Themes.offWhite};
            border-radius: 999px;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            padding: 0.75rem 1.25rem;
            text-align: start;
            width: 100%;
            ${({ length }) => (length > 0 ? "margin-top: 1rem;" : "")}
        }
    }

    .button-container {
        justify-self: end;
    }
`;
