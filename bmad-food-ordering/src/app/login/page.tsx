'use client';

import { useActionState } from 'react';
import { loginUser } from '@/actions/login';
import Link from 'next/link';

const initialState = {
  success: false,
  message: '',
  errors: null as any,
  type: undefined as string | undefined,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser as any, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-4 text-[#333333]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#FF630F]">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Log in to bmad Food Ordering</p>
        </div>

        {state?.message && !state.success && (
          <div
            className={`mb-6 rounded-lg p-4 text-sm ${
              state.type === 'warning'
                ? 'bg-[#FFF3E0] text-[#E65100]'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Corporate Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:border-[#FF630F] focus:outline-none focus:ring-1 focus:ring-[#FF630F]"
              placeholder="alex@company.com"
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-[#E65100]">{state.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:border-[#FF630F] focus:outline-none focus:ring-1 focus:ring-[#FF630F]"
              placeholder="••••••••"
            />
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-[#E65100]">{state.errors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-xl bg-[#FF630F] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E65100] focus:outline-none focus:ring-2 focus:ring-[#FF630F] focus:ring-offset-2 disabled:opacity-70"
          >
            {isPending ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Need an account?{' '}
          <Link href="/register" className="font-semibold text-[#FF630F] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
