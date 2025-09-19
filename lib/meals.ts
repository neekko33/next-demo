import sql from 'better-sqlite3'
import { Meal } from '@/types/meal'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'fs'

const db = sql('data/meals.db')

export async function getMeals(): Promise<Meal[]> {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return db.prepare('SELECT * FROM meals').all()
}

export async function getMealBySlug(slug: string): Promise<Meal> {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(
  meal: Omit<Meal, 'id' | 'slug'> & { image: File }
): Promise<void> {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const filename = `${meal.slug}-${Date.now()}.${extension}`

  fs.createWriteStream(`public/images/${filename}`).write(
    Buffer.from(await meal.image.arrayBuffer()),
    (err: Error | null | undefined) => {
      if (err) {
        console.error('Error saving image:', err)
      }
    }
  )

  meal.image = `/images/${filename}`

  db.prepare(
    `INSERT INTO meals 
    (title, summary, instructions, image, slug, creator, creator_email) 
    VALUES (
      @title, @summary, @instructions, @image, @slug, @creator, @creator_email
    )`
  ).run(meal)
}
