import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext({
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };
