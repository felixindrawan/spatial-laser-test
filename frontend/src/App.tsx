import { useCallback, useState } from "react";
import Map from "./components/Map";
import SideMenu from "./components/SideMenu";
import { CalculationProvider } from "./hooks/useCalculation";
import { SelectedFeaturesInCircleProvider } from "./hooks/useSelectedFeaturesInCircle";
import { LegendConfigProvider } from "./hooks/useLegendConfig";
import { MapProvider } from "./hooks/useMap";
import { UserConfigProvider } from "./hooks/useUserConfig";
import FabSettings from "./components/SideMenu/FabSettings";
import MapData from "./components/MapData";
import CurrentCoordinates from "./components/CurrentCoordinates";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setOpenDrawer(!openDrawer);
  }, [openDrawer]);

  return (
    <div>
      <MapProvider>
        <SelectedFeaturesInCircleProvider>
          <CalculationProvider>
            <UserConfigProvider>
              <LegendConfigProvider>
                <CurrentCoordinates />
                <MapData />
                <FabSettings handleToggle={handleDrawerToggle} />
                <SideMenu open={openDrawer} handleToggle={handleDrawerToggle} />
                <Map />
              </LegendConfigProvider>
            </UserConfigProvider>
          </CalculationProvider>
        </SelectedFeaturesInCircleProvider>
      </MapProvider>
    </div>
  );
}

export default App;
