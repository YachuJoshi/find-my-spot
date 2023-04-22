import axios from "axios";

export const getDestinationLocation = async () => {
  const { data: locations } = await axios.get(`/api/locations`);
  return locations[0];
};

export const getNearestParkingSpotLocation = async (long, lat) => {
  const { data } = await axios.get(`/api/location?long=${long}&lat=${lat}`);
  return data;
};

export const getAssignedParkingSpotStatus = async (id) => {
  const { data } = await axios.get(`/api/location/${id}`);
  return data.isAvailable;
};
