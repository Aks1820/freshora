import {
  fetchDeleteFavourites,
  fetchUserFavouriteRecipes,
} from "@/services/recipes.service";

import { IAddToFavourite } from "@/types/recipes.types";
import { useUser } from "@clerk/expo";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

const FavouritesScreen = () => {
  const router = useRouter();

  const [favouritesList, setFavouritesList] = useState<IAddToFavourite[]>([]);
  const { user } = useUser();
  const [loading,setLoading] = useState(false)

  const handleFetchFavouritesRecipes = async () => {
    if (!user) {
      return null;
    }

    setLoading(true)
    const data = await fetchUserFavouriteRecipes(user.id);
    setLoading(false)
    setFavouritesList(data || []);
  };

  const handleDeleteFavourites = async (id: number) => {
    if (!user) {
      return null;
    }

    try {
      await fetchDeleteFavourites(user.id, id);
    } catch (error) {
      Alert.alert("Error while deleting");
    }
    handleFetchFavouritesRecipes();
  };
  const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchFavouritesRecipes();
    }, []),
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="h-full p-4 mt-4 bg-vista-white pt-safe ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-[2rem] font-extrabold">Favourites</Text>

        <Text className="mt-2 text-kabul">
          {favouritesList.length} Recipes saved for your next culinary
          adventure.
        </Text>

        <View className="mt-8 flex gap-8 pb-24">
          {favouritesList.map((recipe, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => handleNavigation(String(recipe.recipeId))}
                className="relative rounded-xl bg-white shdaow overflow-hidden"
              >
                <Image source={{ uri: recipe.image }} className="w-full h-80" />
                <View className="absolute top-4 right-4 bg-white opacity-80 rounded-full p-3">
                  <AntDesign name="heart" size={16} color="#970000bf" />
                </View>

                <Pressable
                  onPress={() => handleDeleteFavourites(recipe.recipeId || 0)}
                  className="absolute top-20 right-4 bg-white opacity-80 rounded-full p-3"
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={16}
                    className="text-kabul"
                  />
                </Pressable>

                <View className="p-4">
                  <Text className="font-bold text-xl">{recipe.title}</Text>

                  <Text className="mt-2 text-kabul">{recipe.description}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        
      </ScrollView>
    </View>
  );
};

export default FavouritesScreen;
