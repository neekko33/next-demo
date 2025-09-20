import { getMealBySlug } from '@/lib/meals';
import classes from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata( { params: { slug } }: { params: { slug: string } }) {
  const meal = await getMealBySlug(slug)

  if (!meal) return notFound()

  return {
    title: meal.title,
    description: meal.summary,
  } 
}

export default async function Meal({ params: { slug } }: { params: { slug: string } }) {
  const meal = await getMealBySlug(slug)

  if (!meal) {
    notFound()
  }

  return (
    <>
      <header className={classes.header}>
       <div className={classes.image}>
          <Image fill src={meal.image} alt="Meal Image" /> 
        </div> 
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
        </header>    
      <main>
        <p className={`${classes.instructions} whitespace-pre-line`} dangerouslySetInnerHTML={{__html: meal.instructions}}></p>
      </main>
    </>
  );
}