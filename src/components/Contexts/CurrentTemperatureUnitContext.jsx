import React from "react";

const CurrentTemperaturUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperaturUnitContext };
