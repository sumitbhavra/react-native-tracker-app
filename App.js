import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/routes/createRootNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { navigationRef } from "./src/navigationRef";
import { Provider as TrackProvider } from "./src/context/TrackContext";

const App = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <TrackProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </TrackProvider>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;
