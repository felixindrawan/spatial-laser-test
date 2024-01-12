import Map from "./components/Map";
import SideMenu from "./components/SideMenu";
import { CalculationProvider } from "./hooks/useCalculation";
import { MapProvider } from "./hooks/useMap";
import { UserConfigProvider } from "./hooks/useUserConfig";

function App() {
  return (
    <div>
      <MapProvider>
        <CalculationProvider>
          <UserConfigProvider>
            <SideMenu />
            <Map />
          </UserConfigProvider>
        </CalculationProvider>
      </MapProvider>
    </div>
  );
}

export default App;
