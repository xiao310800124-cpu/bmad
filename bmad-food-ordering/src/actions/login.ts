'use server';

import sql from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please correct the errors.',
    };
  }

  let userToAuth = null;

  try {
    // 1. Check if user exists
    const users = await sql`
      SELECT id, email, password_hash, role FROM users WHERE email = ${email} LIMIT 1
    `;

    if (users.length === 0) {
      return {
        success: false,
        message: 'Invalid email or password.', // Empathetic warning UI catch
        type: 'warning',
      };
    }

    const user = users[0];

    // 2. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return {
        success: false,
        message: 'Invalid email or password.',
        type: 'warning',
      };
    }

    userToAuth = user;

  } catch (error) {
    console.error('Login Error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      type: 'error',
    };
  }

  // 3. Create session (Out of try/catch to avoid Next.js redirect breaking on throw)
  if (userToAuth) {
    await createSession(userToAuth.id, userToAuth.email, userToAuth.role);

    // 4. Role-based Redirect
    if (userToAuth.role === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect('/');
    }
  }

  return { success: false, message: 'Fallback logic reached' };
}
