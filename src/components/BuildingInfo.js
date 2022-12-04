import React, { useState } from 'react';

import styled from 'styled-components';
import { Building } from '.';

const Container = styled.div`
   {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const CustomDiv = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

export default function BuildingInfo({ buildings }) {
  const [selectedBuilding, setSelectedBuilding] = useState(buildings?.[0]);

  return (
    <Container>
      <CustomDiv>
        <select
          defaultValue={buildings?.[0]}
          onChange={(e) => {
            let selectedObj = buildings.filter(
              (build) => build.id == e.target.value
            );
            setSelectedBuilding(selectedObj[0]);
          }}
        >
          {buildings &&
            buildings.map((bld) => {
              return (
                <option key={bld.id} value={bld.id}>
                  {' '}
                  {bld.name}
                </option>
              );
            })}
        </select>
      </CustomDiv>
      {buildings && selectedBuilding && <Building details={selectedBuilding} />}
    </Container>
  );
}
