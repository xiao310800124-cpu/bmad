import { verifySession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await verifySession();

  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#2C3E50] text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold text-[#FF630F]">bmad Admin</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="block bg-[#1A252F] px-6 py-3 border-l-4 border-[#FF630F]">
            Dashboard
          </a>
          <a href="#" className="block px-6 py-3 hover:bg-[#34495E]">
            Billing & Invoicing
          </a>
          <a href="#" className="block px-6 py-3 hover:bg-[#34495E]">
            Restaurants
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Finance Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Finance Manager ({session.email})</span>
            <form
              action={async () => {
                'use server';
                await deleteSession();
                redirect('/login');
              }}
            >
              <button
                type="submit"
                className="rounded bg-white px-4 py-2 text-sm font-semibold shadow-sm border border-gray-200 hover:bg-gray-50"
              >
                Sign Out
              </button>
            </form>
          </div>
        </header>

        {/* Data Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Monthly Spend</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">¥ 14,250.00</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Active Orders Today</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">142</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Pending Complaints</h3>
            <p className="mt-2 text-3xl font-bold text-[#FF630F]">3</p>
          </div>
        </div>

        {/* Unified Settlement Table (Mock) */}
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Recent Settlement Ledger</h3>
            <button className="bg-[#FF630F] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#E65100]">
              Export Invoice (CSV)
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Restaurant</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4">ORD-9932</td>
                <td className="px-6 py-4">alex@company.com</td>
                <td className="px-6 py-4">Wagas Central</td>
                <td className="px-6 py-4">¥ 48.00</td>
                <td className="px-6 py-4"><span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">Billed</span></td>
              </tr>
              <tr>
                <td className="px-6 py-4">ORD-9933</td>
                <td className="px-6 py-4">jordan@company.com</td>
                <td className="px-6 py-4">Manner Coffee</td>
                <td className="px-6 py-4">¥ 35.00</td>
                <td className="px-6 py-4"><span className="inline-flex rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-700">Unbilled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
