import sql from 'better-sqlite3'
import { Meal } from '@/types/meal'

const db = sql('data/meals.db')

export async function getMeals(): Promise<Meal[]> {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return db.prepare('SELECT * FROM meals').all()
}

export async function getMealBySlug(slug: string): Promise<Meal> {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}