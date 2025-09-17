import classes from './meals-grid.module.css'
import { Meal } from '@types/index'
import MealItem from './meal-item'

export default function MealsGrid({ meals }: { meals: Meal[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  )
}