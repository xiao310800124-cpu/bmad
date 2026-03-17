import sql from '@/lib/db';
import Link from 'next/link';

type Props = { params: { id: string } };

export default async function RestaurantPage({ params }: Props) {
  const id = params.id;
  const restaurants = await sql`SELECT id, name, description, hero_image FROM restaurants WHERE id = ${id} LIMIT 1`;
  const items = await sql`SELECT id, name, description, price, is_available FROM menu_items WHERE restaurant_id = ${id} ORDER BY created_at`;

  const r = restaurants[0];
  if (!r) return <div className="p-8">Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#FF630F]">{r.name}</h1>
          <p className="text-gray-600">{r.description}</p>
        </div>

        <div className="grid gap-4">
          {items.map((it: any) => (
            <div key={it.id} className="rounded-lg bg-white p-4 shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{it.name}</h3>
                  <p className="text-sm text-gray-500">{it.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">¥{it.price}</div>
                  {!it.is_available && <div className="text-xs text-red-500">Unavailable</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/" className="text-[#FF630F]">← Back to restaurants</Link>
        </div>
      </div>
    </div>
  );
}
