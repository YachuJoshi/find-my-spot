import { useState, createContext, useContext } from "react";

const ParkingSpaceContext = createContext();

export const useParkingSpaceContext = () => useContext(ParkingSpaceContext);

export function ParkingSpaceProvider({ children }) {
  const [parkingSpace, setParkingSpace] = useState({});

  const value = {
    parkingSpace,
    setParkingSpace,
  };

  return (
    <ParkingSpaceContext.Provider value={value}>
      {children}
    </ParkingSpaceContext.Provider>
  );
}
