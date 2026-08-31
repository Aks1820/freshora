import { fetchRecipeDetails } from "@/services/recipes.service";
import { IRecipe } from "@/types/recipes.types";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const DetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipeDetails, setRecipeDetails] = useState<IRecipe>();

  const handleFetchRecipeDetail = async () => {
    const response = await fetchRecipeDetails(id);

    setRecipeDetails(response.recipeDetail[0]);
  };
  useEffect(() => {
    handleFetchRecipeDetail();
  }, []);
  if (!recipeDetails) {
    return null;
  }
  return (
    <View className="h-full bg-vista-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{ uri: recipeDetails.thumbnail }}
            className="h-100 w-full"
            alt="detail-image"
          />
          <Pressable
            className="absolute top-20 left-6"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
        </View>
        <View className="p-4">
          <Text className="font-extrabold text-[1.75rem]">
            {recipeDetails.name}
          </Text>

          <Text className="mt-2 text-kabul">
            {recipeDetails.shortDescription}
          </Text>
          <View className="mt-8 flex-row items-center gap-2">
            <View className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white border rounded-xl border-ebb">
              <Text className="text-orange-400">★</Text>
              <Text className="font-bold text-kabul">
                {recipeDetails.rating} (120)
              </Text>
            </View>

            <View className="px-4 py-3 justify-center items-center flex-row gap-2 bg-white rounded-xl border border-ebb">
              <AntDesign name="field-time" size={16} color="black" />
              <Text className="font-bold text-kabul">
                {recipeDetails.prepTimeMinutes} mins
              </Text>
            </View>
            <View className="px-4 py-3 justify-center items-center flex-row gap-2 bg-white rounded-xl border border-ebb">
              <SimpleLineIcons name="energy" size={16} color="black" />
              <Text className="font-bold text-kabul">
                {recipeDetails.calories} Cal
              </Text>
            </View>
          </View>
          <View className="mt-8">
            <Text className="text-2xl font-bold  text-cod-gray">
              Ingredients
            </Text>

            <View className="border-b border-ebb mt-4" />
            <View className="gap-4 mt-8">
              {recipeDetails.ingredients.map((item) => {
                return (
                  <View key={item} className="flex-row gap-4 items-center">
                    <View className="h-8 w-8 rounded-lg border-[1.5px] border-kabul" />

                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
            <View className="p-4 bg-white border border-ebb rounded-2xl mt-8">
              <Text className="font-bold text-cod-gray text-xl">
                Nutrition per serving
              </Text>

              <View className="mt-4 flex-row gap-2">
                <View className="flex-1 mx-1 items-center justify-center rounded-2xl bg-white p-4 shadow">
                  <Text className="text-kabul text-sm font-medium">
                    Protein
                  </Text>

                  <Text className="mt-1 text-xl font-bold text-cod-gray">
                    {recipeDetails.protein}g
                  </Text>
                </View>
                <View className="flex-1 mx-1 items-center justify-center rounded-2xl bg-white p-4 shadow">
                  <Text className="text-kabul text-sm font-medium">Carbs</Text>

                  <Text className="mt-1 text-xl font-bold text-cod-gray">
                    {recipeDetails.carbs}g
                  </Text>
                </View>

                <View className="flex-1 mx-1 items-center justify-center rounded-2xl bg-white p-4 shadow">
                  <Text className="text-kabul text-sm font-medium">Fats</Text>

                  <Text className="mt-1 text-xl font-bold text-cod-gray">
                    {recipeDetails.fats}g
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-8">
            <Text className="text-xl font-bold text-cod-gray">
              Instructions
            </Text>

            <View className="gap-4 mt-4">
              {recipeDetails.instructions.map((item, index) => {
                return (
                  <View key={item} className="flex-row gap-3">
                    <View className="h-7 w-7 rounded-full bg-burning-orange items-center justify-center">
                      <Text className="text-white font-bold">{index + 1}</Text>
                    </View>

                    <Text className="flex-1 text-kabul text-base leading-6">
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
