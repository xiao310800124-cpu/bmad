import sql from '@/lib/db';
import Link from 'next/link';

export default async function HomePage() {
  const restaurants = await sql`SELECT id, name, description, hero_image FROM restaurants WHERE is_active = true ORDER BY created_at`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[#FF630F]">Restaurants</h1>
          <p className="text-gray-600">Browse onboarded restaurants</p>
        </header>

        <div className="grid gap-4">
          {restaurants.map((r: any) => (
            <Link key={r.id} href={`/restaurant/${r.id}`} className="block rounded-lg bg-white p-4 shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{r.name}</h2>
                  <p className="text-sm text-gray-500">{r.description}</p>
                </div>
                <div className="text-sm text-[#FF630F]">View menu →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
import { verifySession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await verifySession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 text-[#333333]">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#FF630F]">bmad Food Ordering</h1>
            <p className="mt-2 text-gray-500">Welcome back, {session.email}</p>
          </div>
          <form
            action={async () => {
              'use server';
              await deleteSession();
              redirect('/login');
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300"
            >
              Sign Out
            </button>
          </form>
        </header>
        
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Today's Restaurants</h2>
          <p className="mt-4 text-gray-600">
            This is the mobile-first catalog view for employees. You are successfully logged in with role: <strong>{session.role}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
