import axios, { AxiosResponse } from 'axios';
import { Airport } from '../types'

// requires 3 API calls since the ArcGIS service does not overlap airport results :/
const API_URLS = [
  `https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Airports_by_scale/FeatureServer/1/query?where=Owner%3D%27Public%27+and+Facility%3D%27Airport%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=FAA_ID%2C+NAME%2C+CITY%2C+COUNTY%2C+STATE%2C+INTL&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json`,
  `https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Airports_by_scale/FeatureServer/2/query?where=OWNER%3D%27Public%27+and+Facility%3D%27Airport%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=FAA_ID%2C+NAME%2C+CITY%2C+COUNTY%2C+STATE%2C+INTL&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json`,
  `https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Airports_by_scale/FeatureServer/3/query?where=OWNER%3D%27Public%27+and+Facility%3D%27Airport%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=FAA_ID%2C+NAME%2C+CITY%2C+COUNTY%2C+STATE%2C+INTL&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json`
];

export const getAirportData = async (): Promise<Airport[]> => {
  try {
    const promises = API_URLS.map(url => axios.get(url));
    const responses : AxiosResponse<any>[] = await Promise.all(promises);
    return responses.flatMap((response) => response.data.features);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};