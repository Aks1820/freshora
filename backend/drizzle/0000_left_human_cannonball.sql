CREATE TABLE "favourites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"cook_time" text,
	"servings" integer,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ingredients" jsonb NOT NULL,
	"short_description" text NOT NULL,
	"rating" numeric(2, 1),
	"prep_time" integer,
	"servings" integer,
	"calories" integer,
	"protein" integer,
	"carbs" integer,
	"fats" integer,
	"thumbnail" text NOT NULL,
	"instructions" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now()
);
