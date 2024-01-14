import Map from "./components/Map";
import MapLegend from "./components/MapLegend";
import SideMenu from "./components/SideMenu";
import { CalculationProvider } from "./hooks/useCalculation";
import { CentroidsInCircleProvider } from "./hooks/useCentroidsInCircle";
import { LegendConfigProvider } from "./hooks/useLegendConfig";
import { MapProvider } from "./hooks/useMap";
import { UserConfigProvider } from "./hooks/useUserConfig";

function App() {
  return (
    <div>
      <MapProvider>
        <CentroidsInCircleProvider>
          <CalculationProvider>
            <UserConfigProvider>
              <LegendConfigProvider>
                <MapLegend />
                <SideMenu />
                <Map />
              </LegendConfigProvider>
            </UserConfigProvider>
          </CalculationProvider>
        </CentroidsInCircleProvider>
      </MapProvider>
    </div>
  );
}

export default App;
