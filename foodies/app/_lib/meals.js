import fs from "node:fs/promises";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import crypto from "node:crypto";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug =
    slugify(meal.title, { lower: true }) +
    "-" +
    crypto.randomUUID().slice(0, 8);

  meal.instructions = xss(meal.instructions);

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(meal.image.type)) {
    throw new Error("Invalid image type");
  }

  const extension = meal.image.type.split("/")[1];
  const fileName = `${meal.slug}.${extension}`;

  await fs.mkdir("public/images", { recursive: true });

  const bufferedImage = await meal.image.arrayBuffer();

  await fs.writeFile(`public/images/${fileName}`, Buffer.from(bufferedImage));

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
