import { Meal } from '@types/index'
import Image from 'next/image'
import Link from 'next/link'
import classes from './meal-item.module.css'

export default function MealItem({ meal }: { meal: Meal }) {
  const { title, image, slug, summary, creator } = meal

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}