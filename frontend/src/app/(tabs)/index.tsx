import RecipeCard from "@/components/RecipeCard";
import { fetchAllRecipes } from "@/services/recipes.service";
import { IRecipe } from "@/types/recipes.types";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";


export default function homescreen() {
  const router = useRouter();
  const [allRecipes, setAllrecipes] = useState<IRecipe[]>([]);

  const handleGetAllRecipes = async () => {
    const response = await fetchAllRecipes();
    setAllrecipes(response?.allRecipes || []);
  };

  const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
  };

  useEffect(() => {
    handleGetAllRecipes();
  }, []);

  if (allRecipes.length === 0) {
    return null;
  }

  return (
    <View className="flex-1 bg-vista-white pt-safe">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-28"
      >
        <View className="flex-row items-center justify-between mt-4 mb-5">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="leaf"
              size={32}
              color="green"
            />

            <Text className="text-black text-4xl font-extrabold">
              Freshora
            </Text>
          </View>

        
        </View>

        <View className="relative overflow-hidden rounded-3xl">
          <Image
            source={{ uri: allRecipes[0].thumbnail }}
            className="w-full h-80"
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.9)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />

          <View className="absolute top-4 left-4 flex-row gap-2">
            <View className="flex-row items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full">
              <AntDesign name="field-time" size={14} color="#333" />

              <Text className="text-cod-gray text-xs font-semibold">
                {allRecipes[0].prepTimeMinutes} min
              </Text>
            </View>

            <View className="flex-row items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full">
              <Text className="text-burning-orange text-sm">
                ★
              </Text>

              <Text className="text-cod-gray text-xs font-semibold">
                {allRecipes[0].rating}
              </Text>
            </View>
          </View>

          <View className="absolute bottom-5 left-5 right-5">
            <Text
              numberOfLines={2}
              className="text-white text-3xl font-extrabold leading-9"
            >
              {allRecipes[0].name}
            </Text>

            <Text
              numberOfLines={2}
              className="text-white/90 text-sm leading-5 mt-2"
            >
              {allRecipes[0].shortDescription}
            </Text>

            <Pressable
              onPress={() => handleNavigation(String(allRecipes[0].id))}
              className="self-start mt-4 bg-burning-orange px-5 py-3 rounded-xl active:opacity-80"
            >
              <Text className="text-white text-sm font-bold">
                View Recipe
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-cod-gray font-bold text-xl mb-3">
            Trending Now
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 16,
              paddingRight: 8,
            }}
          >
            {allRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </ScrollView>
        </View>

        <View className="mt-9">
          <Text className="text-cod-gray font-bold text-xl">
            All Recipes
          </Text>

          <Text className="text-kabul text-sm mt-1 mb-4">
            Discover something delicious
          </Text>

          {allRecipes.map((recipe) => (
            <Pressable
              key={recipe.id}
              onPress={() => handleNavigation(String(recipe.id))}
              className="flex-row items-center mb-4 bg-white rounded-2xl overflow-hidden border border-cavern-pink active:opacity-80"
            >
              <Image
                source={{ uri: recipe.thumbnail }}
                className="w-28 h-28"
              />

              <View className="flex-1 py-3 px-3">
                <Text
                  numberOfLines={1}
                  className="text-cod-gray text-base font-bold"
                >
                  {recipe.name}
                </Text>

                <Text
                  numberOfLines={2}
                  className="text-kabul text-xs leading-4 mt-1"
                >
                  {recipe.shortDescription}
                </Text>

                <View className="flex-row items-center gap-2 mt-3">
                  <View className="flex-row items-center gap-1">
                    <AntDesign
                      name="field-time"
                      size={13}
                      color="#696969"
                    />

                    <Text className="text-kabul text-xs font-medium">
                      {recipe.prepTimeMinutes}m
                    </Text>
                  </View>

                  <View className="h-1 w-1 rounded-full bg-kabul" />

                  <View className="flex-row items-center gap-1">
                    <MaterialCommunityIcons
                      name="silverware-fork-knife"
                      size={14}
                      color="#696969"
                    />

                    <Text className="text-kabul text-xs font-medium">
                      {recipe.servings}
                    </Text>
                  </View>

                  <View className="h-1 w-1 rounded-full bg-kabul" />

                  <View className="flex-row items-center gap-1">
                    <Text className="text-burning-orange text-xs">
                      ★
                    </Text>

                    <Text className="text-kabul text-xs font-medium">
                      {recipe.rating}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}