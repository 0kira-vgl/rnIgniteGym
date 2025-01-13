import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { config } from "./config/gluestack-ui.config";
import { Loading } from "./src/components/loading";
import { SignIn } from "@screens/signIn";
import { SignUp } from "@screens/signUp";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      {fontsLoaded ? <SignUp /> : <Loading />}
    </GluestackUIProvider>
  );
}
