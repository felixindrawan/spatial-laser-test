import { useCallback } from "react";
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
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [openDrawer, setOpenDrawer] = useLocalStorage("drawerState", true);
  const handleDrawerToggle = useCallback(() => {
    setOpenDrawer(!openDrawer);
  }, [openDrawer, setOpenDrawer]);

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
