'use server';

import sql from '@/lib/db';
import { z } from 'zod';
import { verifySession } from '@/lib/session';

const profileSchema = z.object({
  default_delivery_location: z.string().max(255).optional(),
});

export async function updateProfile(prevState: any, formData: FormData) {
  const default_delivery_location = (formData.get('default_delivery_location') as string) || null;

  const validated = profileSchema.safeParse({ default_delivery_location });
  if (!validated.success) {
    return { success: false, message: 'Invalid input', errors: validated.error.flatten().fieldErrors };
  }

  const session = await verifySession();
  if (!session?.userId) {
    return { success: false, message: 'Not authenticated' };
  }

  try {
    await sql`
      UPDATE users
      SET default_delivery_location = ${default_delivery_location}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${session.userId}
    `;

    return { success: true, message: 'Profile updated' };
  } catch (err) {
    console.error('Profile update error:', err);
    return { success: false, message: 'Could not update profile' };
  }
}
