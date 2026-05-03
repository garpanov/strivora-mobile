import { Tabs } from "expo-router";
import CustomTabBar from "@/components/bottomNavig";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="tasks" />
      <Tabs.Screen name="finance" />
      <Tabs.Screen name="analytics" />
    </Tabs>
  );
}