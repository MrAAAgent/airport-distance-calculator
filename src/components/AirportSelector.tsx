import React, { Dispatch } from 'react';
import styled from '@emotion/styled';
import { Autocomplete, Box, ListItem, TextField } from '@mui/material';

interface AirportSelectorProps {
  airportOptions : any[];
  onAirport1Select: Dispatch<any>;
  onAirport2Select: Dispatch<any>;
}

interface AirportAutocompleteProps {
  airportOptions : any[];
  inputLabel: string;
  onAirportSelect: Dispatch<any>;
}

const AirportSelectorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1000px;
  margin: 12px;

  @media (max-width: 1024px) {
    width: 92%;
  }
`;

const AirportAutocompleteContainer = styled(Box)`
  width: 100%;
  margin: 8px;

  .MuiAutocomplete-inputRoot {
    background-color: white;
  }
`;

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({airportOptions, inputLabel, onAirportSelect}) => {
  return (
    <AirportAutocompleteContainer>
      <Autocomplete
        disablePortal
        options={airportOptions}
        getOptionLabel={(option) => `${option.attributes.NAME} (${option.attributes.FAA_ID}) | ${option.attributes.CITY}, ${option.attributes.STATE}`}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={inputLabel} />}
        onChange={(event, newValue) => onAirportSelect(newValue)}
        renderOption={(props, option) => (
          <ListItem {...props} key={option.attributes.FAA_ID}>
            {option.attributes.NAME} ({option.attributes.FAA_ID}) | {option.attributes.CITY}, {option.attributes.STATE}
          </ListItem>
        )}
      />
    </AirportAutocompleteContainer>
  )
}

const AirportSelector : React.FC<AirportSelectorProps> = ({airportOptions, onAirport1Select, onAirport2Select}) => {
  return (
    <AirportSelectorContainer sx={{display: 'flex', flexDirection: 'horizontal'}}>
      <AirportAutocomplete
        airportOptions={airportOptions}
        inputLabel="Select Airport #1"
        onAirportSelect={onAirport1Select}
      />
      <AirportAutocomplete
        airportOptions={airportOptions}
        inputLabel="Select Airport #2"
        onAirportSelect={onAirport2Select}
      />
    </AirportSelectorContainer>
  ); 
}

export default AirportSelector;