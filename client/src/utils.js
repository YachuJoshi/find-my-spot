const options = {
  enableHighAccuracy: true,
};

export const getCoordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const getCurrentLocation = async () => {
  const position = await getCoordinates();

  return {
    currentLng: position.coords.longitude,
    currentLat: position.coords.latitude,
  };
};
