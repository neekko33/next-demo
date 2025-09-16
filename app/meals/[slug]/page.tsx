export default function Meal({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Meal: {params.slug}</h1>
    </main>
  );
}