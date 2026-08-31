import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

export default function useSocialAuth() {
  const [loadingStrategy, setLoadingStartegy] = useState<String | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    if (loadingStrategy) {
      return;
    }
    setLoadingStartegy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in Incomplete",
          "Sign-in did not complete, please try again.",
        );
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth", error);
      Alert.alert("Error failed to sign in. Please try again");
    } finally {
      setLoadingStartegy(null);
    }
  };
  return { handleSocialAuth, loadingStrategy };
}
