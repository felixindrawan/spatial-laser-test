import { useCallback, useState } from "react";
import Map from "./components/Map";
import MapLegend from "./components/MapLegend";
import SideMenu from "./components/SideMenu";
import { CalculationProvider } from "./hooks/useCalculation";
import { CentroidsInCircleProvider } from "./hooks/useCentroidsInCircle";
import { LegendConfigProvider } from "./hooks/useLegendConfig";
import { MapProvider } from "./hooks/useMap";
import { UserConfigProvider } from "./hooks/useUserConfig";
import FabSettings from "./components/SideMenu/FabSettings";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setOpenDrawer(!openDrawer);
  }, [openDrawer]);

  return (
    <div>
      <MapProvider>
        <CentroidsInCircleProvider>
          <CalculationProvider>
            <UserConfigProvider>
              <LegendConfigProvider>
                <FabSettings handleToggle={handleDrawerToggle} />
                <MapLegend />
                <SideMenu open={openDrawer} handleToggle={handleDrawerToggle} />
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
