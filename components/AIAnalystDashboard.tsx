import { Suspense } from 'react';
import AIAnalystClient from './AIAnalystClient';

export default function AIAnalystDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-3xl font-bold text-white mb-4">AI Investment Strategist Pro</h1>
          <p className="text-gray-400">Loading advanced stock analysis tools...</p>
        </div>
      </div>
    }>
      <AIAnalystClient />
    </Suspense>
  );
}
