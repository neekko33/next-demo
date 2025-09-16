import Link from "next/link"

export default function Home() {
  return (
    <main className="p-4 text-white">
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <p>Welcome to the home page of our Next.js application.</p>
      <nav>
        <ul>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li>
            <Link href="/meals/share">Meals share</Link>
          </li>
          <li>
            <Link href="/meals/meal-1">Meal 1</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
