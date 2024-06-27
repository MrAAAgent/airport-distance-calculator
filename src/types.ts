type AirportAttributes = {
    FAA_ID: string;
    NAME: string;
    CITY: string;
    COUNTY: string;
    STATE: string;
    INTL: string
};

type AirportGeometry = {
    x: number;
    y: number
}

export type Airport = {
  attributes: AirportAttributes;
  geometry: AirportGeometry
}