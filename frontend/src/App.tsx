import Map from "./components/Map";
import SideMenu from "./components/SideMenu";
import { CalculationProvider } from "./hooks/useCalculation";
import { CentroidsInCircleProvider } from "./hooks/useCentroidsInCircle";
import { MapProvider } from "./hooks/useMap";
import { UserConfigProvider } from "./hooks/useUserConfig";

function App() {
  return (
    <div>
      <MapProvider>
        <CentroidsInCircleProvider>
          <CalculationProvider>
            <UserConfigProvider>
              <SideMenu />
              <Map />
            </UserConfigProvider>
          </CalculationProvider>
        </CentroidsInCircleProvider>
      </MapProvider>
    </div>
  );
}

export default App;
