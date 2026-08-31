import SearchCardRecipe from "@/components/SearchCardRecipe";
import {
  fetchAddToFavourites,
  fetchAllRecipes,
} from "@/services/recipes.service";
import { IAddToFavourite, IRecipe } from "@/types/recipes.types";
import { useUser } from "@clerk/expo";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";

export default function search() {
  const { user } = useUser();

  const [searchValue, setSearchValue] = useState("");
  const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);

  const handleFetchAllRecipes = async () => {
    const response = await fetchAllRecipes();
    const recipes = response?.allRecipes ?? [];
    setAllRecipes(recipes);
    setFilteredRecipes(recipes);
  };

  const handleAddToFavourites = async (recipe: IAddToFavourite) => {
    if (!user) return;

    try {
      await fetchAddToFavourites({ userId: user.id, ...recipe });
      Alert.alert("Recipe added to favourites");

    } catch (error) {
      console.log("Failed to add favourites", error);
    }
  };

  useEffect(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      setFilteredRecipes(allRecipes);
      return;
    }

    const filtered = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search),
    );

    setFilteredRecipes(filtered);
  }, [searchValue, allRecipes]);

  useEffect(() => {
    handleFetchAllRecipes();
  }, []);

  return (
    <View className="flex-1 bg-vista-white p-4 pt-safe mt-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="relative">
          <TextInput
            className="h-12 rounded-lg bg-global-sand pl-12"
            placeholder="Search recipes..."
            placeholderTextColor="#594139"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <Feather
            name="search"
            size={22}
            color="#594139"
            style={{
              position: "absolute",
              left: 12,
              top: 8,
            }}
          />
        </View>
        <View className="mt-4 pb-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <SearchCardRecipe
                key={recipe.id}
                recipe={recipe}
                onHandleAddToFavourites={handleAddToFavourites}
              />
            ))
          ) : (
            <Text className="mt-10 text-center text-base text-kabul">
              No recipes found
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
