import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { AirportSelector, FlightRoutePlot, Navbar } from './components';
import { Airport } from './types';
import { getAirportData } from './services/airport.service'

const AppContainer = styled(Box)`
  text-align: center;
  background-color: #F2E8DE;
  min-height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  padding-top: 56px;
  flex-grow: 1;
`;

function App() {
  const [airportData, setAirportData] = useState<Airport[]>([]);
  const [airportSelection1, setAirportSelection1] = useState<Airport|null>(null);
  const [airportSelection2, setAirportSelection2] = useState<Airport|null>(null);
  const [flightPathCoordinate1, setFlightPathCoordinate1] = useState<google.maps.LatLngLiteral|null>(null);
  const [flightPathCoordinate2, setFlightPathCoordinate2] = useState<google.maps.LatLngLiteral|null>(null);
  
  useEffect(() => {
    const fetchAirportData = async () => {
      try {
        const data = await getAirportData();
        setAirportData(data);
      } catch (error) {
        console.error('Failed to fetch airport data');
      }
    }
    fetchAirportData();
  }, [])

  useEffect(() => {
    setFlightPathCoordinate1(
      airportSelection1
        ? {lat: airportSelection1.geometry.y, lng: airportSelection1.geometry.x}
        : null
    );
  }, [airportSelection1])

  useEffect(() => {
    setFlightPathCoordinate2(
      airportSelection2
        ? {lat: airportSelection2.geometry.y, lng: airportSelection2.geometry.x}
        : null
    );
  }, [airportSelection2])

  return (
    <AppContainer>
      <Navbar />
      <AirportSelector
        airportOptions={airportData}
        onAirport1Select={setAirportSelection1}
        onAirport2Select={setAirportSelection2}
      />
      <FlightRoutePlot
        flightPathCoordinate1={flightPathCoordinate1}
        flightPathCoordinate2={flightPathCoordinate2}
      />
    </AppContainer>
  );
}

export default App;