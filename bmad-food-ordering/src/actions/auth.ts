'use server';

import sql from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = registerSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please correct the errors.',
    };
  }

  try {
    // Check if user exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `;

    if (existingUser.length > 0) {
      return {
        success: false,
        message: 'This email is already in use.', // Friendly error message for UI
        type: 'warning',
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user into DB
    const [newUser] = await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${passwordHash}, 'EMPLOYEE')
      RETURNING id, email, role
    `;

    // Optionally: Automatically log them in here via JWT/Session

    return {
      success: true,
      message: 'Account created successfully! Welcome to bmad Food Ordering.',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } catch (error) {
    console.error('Registration Error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      type: 'error',
    };
  }
}
