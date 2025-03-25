import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getRecipes(): Promise<Recipe[]> {
  return await sanityClient.fetch(
    groq`*[_type == "recipe" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getRecipe(slug: string): Promise<Recipe> {
  return await sanityClient.fetch(
    groq`*[_type == "recipe" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Ingredient {
  name: string,
  quantity: number,
  unit: string
}

export interface IngredientSection {
  section: string,
  ingredients: Ingredient[]
};

export interface Recipe {
  _type: "recipe";
  _createdAt: string;
  title?: string;
  slug: Slug;
  description?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
  ingredients: IngredientSection[];
}
