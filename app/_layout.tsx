import { useEffect, useState, createContext } from "react";
import { Stack } from "expo-router/stack";
import { Session } from "@supabase/supabase-js";
import { AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export const UserContext = createContext<Session | null>(null);

AppState.addEventListener("change", async (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Layout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      router.replace(session ? "(tabs)" : "");
    });
  }, []);
  return (
    <UserContext.Provider value={session}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserContext.Provider>
  );
}
