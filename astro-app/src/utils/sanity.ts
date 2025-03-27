import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getRecipes(type: string = ""): Promise<Recipe[]> {
  return await sanityClient.fetch(
    groq`*[_type == "recipe" && ${type ? `type == "${type}" &&` : ''} defined(slug.current)] | order(_createdAt desc)`
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
  subIngredients: Ingredient[]
};

export interface InstructionSection {
  section: string,
  instructions: string[]
};


export interface Recipe {
  _type: "recipe";
  _createdAt: string;
  title: string;
  slug: Slug;
  allergens: string[];
  servings: number;
  description?: string;
  mainImage?: ImageAsset & { alt?: string };
  ingredients: IngredientSection[];
  instructionSections: InstructionSection[];
}
