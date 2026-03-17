"use client";

import React from 'react';
import { useActionState } from 'react';
import { updateProfile } from '@/actions/profile';

type Props = {
  initialDefault: string;
  email?: string;
};

export default function ProfileForm({ initialDefault, email }: Props) {
  const initialState = { success: false, message: '', errors: null } as any;
  const [state, formAction, isPending] = useActionState(updateProfile as any, initialState);

  return (
    <div className="max-w-md rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-[#FF630F]">Profile</h2>

      {state?.message && (
        <div className={`mb-4 rounded-md p-3 text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-orange-700'}`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={email || ''} readOnly className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 bg-gray-50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Default Delivery Location</label>
          <textarea
            name="default_delivery_location"
            defaultValue={initialDefault || ''}
            rows={3}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-[#FF630F] focus:ring-1 focus:ring-[#FF630F]"
            placeholder="Building A, 3rd Floor, Desk 12"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#FF630F] px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
