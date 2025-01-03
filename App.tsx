import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  return (
    <GluestackUIProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#333",
        }}
      >
        {fontsLoaded ? (
          <Text color="white" fontSize={50} fontWeight={600}>
            App
          </Text>
        ) : (
          <Text>Loading fonts...</Text>
        )}
      </View>
    </GluestackUIProvider>
  );
}
