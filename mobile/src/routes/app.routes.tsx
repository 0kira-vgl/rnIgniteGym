import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Exercise } from "@screens/exercise";
import { History } from "@screens/history";
import { Home } from "@screens/home";
import { Profile } from "@screens/profile";
import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: { exerciseId: string };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // remove o nome da rota do tab
        tabBarInactiveTintColor: tokens.colors.gray200, // cor do tab inativo
        tabBarActiveTintColor: tokens.colors.green500, // cor do tab ativo
        tabBarStyle: {
          backgroundColor: tokens.colors.gray600, // cor de fundo do tab bar
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["10"],
          paddingTop: tokens.space["6"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          // muda o icon do tab
          tabBarIcon: ({ color }) => (
            <HomeSvg width={iconSize} height={iconSize} fill={color} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg width={iconSize} height={iconSize} fill={color} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg width={iconSize} height={iconSize} fill={color} />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
          },
        }} // remove o button
      />
    </Navigator>
  );
}
