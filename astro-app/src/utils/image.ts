import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { sanityClient } from "sanity:client";
import fs from 'fs';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Image) {
  return builder.image(source);
}

export async function getPlaceholders(): Promise<string[]> {
  const dir = "./public/placeholders/";
  const cur = await fs.readdirSync("./");
  return await fs.readdirSync(dir);
}

const placeholders: string[] = await getPlaceholders();
export async function getRandomPlaceholder(str: string) {
  return placeholders[str.charCodeAt(0) % placeholders.length];
}
