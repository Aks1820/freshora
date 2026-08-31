import "dotenv/config";
import { and, eq } from "drizzle-orm/";
import express from "express";


import { db } from "./db/client";
import { favouritesTable, recipesTable } from "./db/schema";

const app = express();

const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  return res.status(200).json({ success: true });
});

// all-recipes- fetch every recipe from the DB
app.get("/api/all-recipes", async (req, res) => {
  try {
    const allRecipes = await db.select().from(recipesTable);
    return res.status(200).json({ all_recipes: allRecipes });
  } catch (error) {
    console.log("Error while fetching recipes", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// add-to-favourites

// add-to-favourites
app.post("/api/add-to-favourites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings, description } =
      req.body || {};
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newFavourites = await db
      .insert(favouritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
        description,
      })
      .returning();
      return res.status(200).json(newFavourites[0])
  } catch (error) {
    console.log("Error while adding favourite recipes", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// get favourite recipes
app.get("/api/favourites/:userId", async (req, res) => {
    try {
        const {userId} = req.params || {}
        const userFavourites = await db.select().from(favouritesTable).where(eq(favouritesTable.userId, userId))
        return res.status(200).json(userFavourites)
    } catch (error) {
        console.log("Error while fetching favourite recipes", error);
    return res.status(500).json({ error: "Something went wrong" });
    }
})

// detail recipe
app.get("/api/detail/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await db
      .select()
      .from(recipesTable)
      .where(eq(recipesTable.id, Number(recipeId)));

    return res.status(200).json({
      recipe_detail: recipe,
    });
  } catch (error) {
    console.log("Error while fetching recipes details", error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// api/delete-favourites/:userId/:recipeId - DELETE
app.delete("/api/delete-favourites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favouritesTable)
      .where(
        and(
          eq(favouritesTable.userId, userId),
          eq(favouritesTable.recipeId, Number(recipeId))
        )
      );

    return res.status(200).json({
      success: true,
      message: "Favourite deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting favourites recipes", error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});
  

console.log("ALL RECIPES ROUTE REGISTERED");

app.listen(PORT,"0.0.0.0", () => {
  console.log("server is running at", PORT);
});
