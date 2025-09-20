import sql from 'better-sqlite3'
import { Meal } from '@/types'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'fs'

const db = sql('data/meals.db')

export async function getMeals(): Promise<Meal[]> {
  return db.prepare('SELECT * FROM meals').all() as Meal[]
}

export async function getMealBySlug(slug: string): Promise<Meal> {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal
}

export async function saveMeal(
  meal: Omit<Meal, 'id' | 'slug'> & { image: File }
): Promise<void> {
  const slug = slugify(meal.title, { lower: true })
  const instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const filename = `${slug}-${Date.now()}.${extension}`

  fs.createWriteStream(`public/images/${filename}`).write(
    Buffer.from(await meal.image.arrayBuffer()),
    (err: Error | null | undefined) => {
      if (err) {
        console.error('Error saving image:', err)
      }
    }
  )

  const imagePath = `/images/${filename}`
  
  const saveMeal: Omit<Meal, 'id'> = {
    ...meal,
    image: imagePath,
    slug,
    instructions,
  }

  db.prepare(
    `INSERT INTO meals 
    (title, summary, instructions, image, slug, creator, creator_email) 
    VALUES (
      @title, @summary, @instructions, @image, @slug, @creator, @creator_email
    )`
  ).run(saveMeal)
}
