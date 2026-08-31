
import { pgTable, serial, text,jsonb, decimal, integer, timestamp } from "drizzle-orm/pg-core";

export const favouritesTable = pgTable("favourites", {
    id:serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cookTime: text("cook_time"),
    servings: integer("servings"),
    description: text("description"),
    created_at: timestamp("created_at").defaultNow(),


})


export const recipesTable = pgTable("recipes", {
    id:serial("id").primaryKey(),
    name: text("name").notNull(),
    ingredients: jsonb("ingredients").$type<string[]>().notNull(),
    short_description: text("short_description").notNull(),
    rating: decimal("rating", { precision: 2, scale: 1 }),
    prep_time_minutes: integer("prep_time"),
    servings: integer("servings"),
    calories: integer("calories"),
    protein: integer("protein"),
    carbs: integer("carbs"),
    fats: integer("fats"),
    thumbnail: text("thumbnail").notNull(),
    instructions: jsonb("instructions").$type<string[]>().notNull(),
    created_at: timestamp("created_at").defaultNow(),
    
   

   
    

    

})