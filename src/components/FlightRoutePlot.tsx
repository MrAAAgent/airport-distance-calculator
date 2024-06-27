import React, { useEffect, useState } from 'react';
import { GoogleMap, Libraries, Marker, useJsApiLoader } from '@react-google-maps/api';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

interface FlightRoutePlotProps {
  flightPathCoordinate1: google.maps.LatLngLiteral | null;
  flightPathCoordinate2: google.maps.LatLngLiteral | null; 
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
`;

const MapContainer = styled(Box)`
  width: 1000px;
  height: 564px;

  @media (max-width: 1024px) {
    width: 92%;
  }

  @media (max-height: 864px) {
    height: 400px;
  }

  @media (max-height: 700px) {
    height: 352px;
  }

  @media (max-height: 648px) {
    height: 320px;
  }
`;

const DistanceTypography = styled(Typography)`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #123499;
  width: 1000px;

  @media (max-width: 999px) {
    width: 92%;
  }
`;

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 39.8283, lng: -98.5795 // supposed center lat lng of USA
};

const googleApiLibraries: Libraries = ["geometry"];

const FlightRoutePlot : React.FC<FlightRoutePlotProps> = ({flightPathCoordinate1, flightPathCoordinate2}) => {
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState<google.maps.Map|null>(null);
  const [flightRoutePolyline, setFlightRoutePolyline] = useState<google.maps.Polyline|null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "MOCK_GOOGLE_MAPS_API_KEY",
    libraries: googleApiLibraries
  })

  const convertMetresToNauticalMiles = (metres: number) => {
    return Math.round(metres * 0.00053996 * 100) / 100; // round to nearest 2 decimal places
  }

  const updateMapBounds = (coordinates: google.maps.LatLngLiteral[]) => {
    var bounds = new google.maps.LatLngBounds()
    coordinates.forEach((coordinate) => {
      bounds.extend(coordinate);
    })
    map?.setCenter(bounds.getCenter());
    map?.panToBounds(bounds);
    map?.fitBounds(bounds);
  }

  useEffect(() => {
    if (isLoaded) {
      // add polyline (flight route) only if both airports are chosen
      if (flightPathCoordinate1 && flightPathCoordinate2) {
        const newGeodesicPoly = new google.maps.Polyline({
          path: [flightPathCoordinate1, flightPathCoordinate2],
          strokeColor: "#CC0099",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          geodesic: true,
          map: map,
          
        });
        if (flightRoutePolyline) {
          flightRoutePolyline.setMap(null); // remove previous polyline if it exists
        }
        setFlightRoutePolyline(newGeodesicPoly);
        // make sure that the map is focused on the polyline
        updateMapBounds([flightPathCoordinate1, flightPathCoordinate2]);
        
        // calculate nautical miles distance between the two airports
        setDistance(
          convertMetresToNauticalMiles(
            google.maps.geometry.spherical.computeDistanceBetween(
              flightPathCoordinate1, flightPathCoordinate2
            )
          )
        );
      // handle panning to airport marker when single airport is selected
      } else if (flightPathCoordinate1) {
        map?.panTo(flightPathCoordinate1);
        if (flightRoutePolyline) {
          flightRoutePolyline.setMap(null); // remove previous polyline if it exists
        }
      } else if (flightPathCoordinate2) {
        map?.panTo(flightPathCoordinate2);
        if (flightRoutePolyline) {
          flightRoutePolyline.setMap(null); // remove previous polyline if it exists
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flightPathCoordinate1, flightPathCoordinate2, isLoaded, map]) // recommended to add flightRoutePolyline which could infinitely trigger the useEffect

  return isLoaded ? (
    <Container>
      <MapContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={(map) => setMap(map)}
        onUnmount={() => setMap(null)}
        options={{
          zoomControl: false,
          scrollwheel: false,
          streetViewControl:false,
          fullscreenControl: false,
          draggable: false,
          mapTypeControl: false,
        }}
      >
      {flightPathCoordinate1 && 
        <Marker position={flightPathCoordinate1}></Marker>
      }
      {flightPathCoordinate2 && 
        <Marker 
          position={flightPathCoordinate2}>
          animation={google.maps.Animation.DROP}
          label={}
        </Marker>
      }
      </GoogleMap>
      </MapContainer>
      {flightPathCoordinate1 && flightPathCoordinate2 && 
        <DistanceTypography>
          { distance ?
            `Estimated flight distance: ${distance} Nautical miles (nmi)` :
            `You've selected the same airport!`
          }
        </DistanceTypography>
      }
    </Container>
  ) : <></>;
}

export default FlightRoutePlot;