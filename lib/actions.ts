'use server'
import { saveMeal } from '@/lib/meals'
import { Meal } from '@/types'
import { redirect } from 'next/navigation'

const isInvalidText = (text: string | null): boolean => {
  return !text || text.trim() === ''
}

const isInvalidEmail = (email: string | null): boolean => {
  if (isInvalidText(email)) {
    return true
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !emailRegex.test(email as string)
}

const isInvalidFile = (file: File | null): boolean => {
  if (!file || file.size === 0) {
    return true
  }
  const validTypes = ['image/jpeg', 'image/png']
  return !validTypes.includes(file.type)
}

export const shareMeal = async (prevState: { errors: string[]}, formData: FormData) => {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }
  
  const errors: string[] = []
  Object.entries(meal).forEach(([key, value]) => {
    switch (key) {
      case 'image':
        if (isInvalidFile(value as File | null)) {
          errors.push('Please provide a valid image file.')
        }
        break
      case 'creator_email':
        if (isInvalidEmail(value as string | null)) {
          errors.push('Please provide a valid email address.')
        }
        break
      default:
        if (isInvalidText(value as string | null)) {
          errors.push(`Please provide a valid ${key}.`)
        }
        break
    }
  })
  if (errors.length > 0) {
    return {
      errors,
    }
  }

  await saveMeal(meal as Meal & { image: File })
  redirect('/meals')
}
