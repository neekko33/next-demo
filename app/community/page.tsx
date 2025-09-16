import Image from 'next/image';

import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1 className='text-4xl font-bold mb-2'>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p className='text-2xl'>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h2 className='text-3xl font-bold'>Community Perks</h2>

        <ul className={classes.perks}>
          <li>
            <Image src={mealIcon} alt="A delicious meal" />
            <p className='text-2xl'>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p className='text-2xl'>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
              src={eventsIcon}
              alt="A crowd of people at a cooking event"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}