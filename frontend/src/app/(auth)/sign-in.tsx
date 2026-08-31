import useSocialAuth from "@/hooks/useSocialAuth";
import * as Haptics from "expo-haptics";
import { Image, Pressable, Text, View } from "react-native";

export default function SignInScreen() {
  const { handleSocialAuth } = useSocialAuth();

  const handleGooglePress = async () => {
    await Haptics.performAndroidHapticsAsync(
      Haptics.AndroidHaptics.Virtual_Key,
    );
    handleSocialAuth("oauth_google");
  };

  const handleApplePress = async () => {
    await Haptics.performAndroidHapticsAsync(
      Haptics.AndroidHaptics.Virtual_Key,
    );
    handleSocialAuth("oauth_apple");
  };

  return (
    <View>
      <Image source={require("@/assets/images/hero.png")} className="w-full" />
      <View className="-mt-24 h-full bg-white rounded-tr-[2.375rem] rounded-tl-[2.375rem] p-8 mb-16 ">
        <View className="flex gap-2 items-center">
          <Text className="text-center text-cod-gray text-4xl font-extrabold">
            Discover Delicious Recipes
          </Text>
          <Text className="text-xs text-kabul text-center">
            Discover mouthwatering recipes, simple cooking ideas, and delicious
            flavors for every meal.
          </Text>
        </View>
        <View className="mt-6 gap-4 flex items-center">
          <Pressable
            onPress={() => handleSocialAuth("oauth_google")}
            className="cursor-pointer flex items-center justify-center flex-row gap-4 w-full border border-ebb py-4 rounded-full"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Image
              source={require("@/assets/images/google.png")}
              className="w-5 h-5"
            />
            <Text className="text-base font-semibold">
              Continue with Google
            </Text>
          </Pressable>
        </View>
        <View className="mt-6 gap-4 flex items-center">
          <Pressable
            onPress={() => handleSocialAuth("oauth_apple")}
            className=" bg-black cursor-pointer flex items-center justify-center flex-row gap-4 w-full border border-ebb py-4 rounded-full"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Image
              source={require("@/assets/images/apple.png")}
              style={{ width: 20, height: 20, tintColor: "white" }}
            />
            <Text className="text-base font-semibold text-white">
              Continue with Apple
            </Text>
          </Pressable>
          <Text className="w-[80%] text-center mt-4 text-kabul font-light text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
}
