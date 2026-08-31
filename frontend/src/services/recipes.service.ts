import { IAddToFavourite } from "@/types/recipes.types";
import { convertKeysToCamelCase } from "@/utils/app.utils";
import { BASE_URL } from "../utils/constants";



const fetchAllRecipes = async () => {
    try {
        const url = `${BASE_URL}/all-recipes`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Recipe request failed with status ${response.status}`)
        }
        const data = await response.json()
        const parsedRecipes = convertKeysToCamelCase(data)

        return parsedRecipes


    } catch (error) {
        console.log("Error while fetching all recipes", error)
    }
}

const fetchAddToFavourites = async (requestPayload: IAddToFavourite) =>{
    try {
        const url = `${BASE_URL}/add-to-favourites`;
    const { userId, recipeId, title, image, cookTime, servings, description } =
      requestPayload || {};
    const payload = {
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
        description,
      };
    const response = await fetch(url, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",},
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data
    } catch (error) {
        console.log("Error while adding to Favourites", error)

    }
   



}

const fetchUserFavouriteRecipes = async (userId: string) => {
    try {
        const url = `${BASE_URL}/favourites/${userId}`
        const response = await fetch(url)
        const data = await response.json();
        const parsedData = await convertKeysToCamelCase(data)
        return parsedData

    } catch (error) {
        console.log("Error while fetching user saved recipes", error)
    }
}

const fetchRecipeDetails = async (recipeId : string) =>{
    try {
        const url = `${BASE_URL}/detail/${recipeId}`
        const response = await fetch(url)
        const data = await response.json();
        const parsedData = await convertKeysToCamelCase(data)
        return parsedData

    } catch (error) {
        console.log("Error while fetching recipe details", error)
    }
}

const fetchDeleteFavourites = async (userId: string, recipeId: number) => {
  try {
    const url = `${BASE_URL}/delete-favourites/${userId}/${Number(recipeId)}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();

    const parsedData = await convertKeysToCamelCase(data);

    return parsedData;
  } catch (error) {
    console.log("Error while fetching deleting recipe", error);
  }
};


    

export { fetchAddToFavourites, fetchAllRecipes, fetchDeleteFavourites, fetchRecipeDetails, fetchUserFavouriteRecipes };
 