import sql from '@/lib/db';
import { verifySession } from '@/lib/session';
import ProfileForm from '@/components/ProfileForm';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await verifySession();
  if (!session?.userId) {
    return redirect('/login');
  }

  const users = await sql`
    SELECT email, default_delivery_location FROM users WHERE id = ${session.userId} LIMIT 1
  `;

  const user = users[0] || { email: '', default_delivery_location: '' };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4">
      <div className="mx-auto max-w-2xl">
        <ProfileForm initialDefault={user.default_delivery_location || ''} email={user.email} />
      </div>
    </div>
  );
}
