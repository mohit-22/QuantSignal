'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function addToWatchlist(email: string, symbol: string, company: string): Promise<boolean> {
  if (!email || !symbol || !company) return false;

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Find user by email
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return false;

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return false;

    // Try to add to watchlist (will fail if already exists due to unique index)
    await Watchlist.create({
      userId,
      symbol: symbol.toUpperCase(),
      company: company.trim(),
    });

    return true;
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return false;
  }
}

export async function removeFromWatchlist(email: string, symbol: string): Promise<boolean> {
  if (!email || !symbol) return false;

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Find user by email
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return false;

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return false;

    // Remove from watchlist
    const result = await Watchlist.deleteOne({
      userId,
      symbol: symbol.toUpperCase(),
    });

    return result.deletedCount > 0;
  } catch (err) {
    console.error('removeFromWatchlist error:', err);
    return false;
  }
}

export async function toggleWatchlist(email: string, symbol: string, company: string): Promise<boolean> {
  if (!email || !symbol) return false;

  const watchlistSymbols = await getWatchlistSymbolsByEmail(email);
  const isInWatchlist = watchlistSymbols.includes(symbol.toUpperCase());

  if (isInWatchlist) {
    return await removeFromWatchlist(email, symbol);
  } else {
    return await addToWatchlist(email, symbol, company);
  }
}

export async function toggleWatchlistForCurrentUser(symbol: string, company: string): Promise<{ success: boolean; isInWatchlist: boolean }> {
  try {
    if (!auth) throw new Error('Auth not initialized');
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) {
      return { success: false, isInWatchlist: false };
    }

    const email = session.user.email;
    const success = await toggleWatchlist(email, symbol, company);

    if (success) {
      // Get updated watchlist status
      const watchlistSymbols = await getWatchlistSymbolsByEmail(email);
      const isInWatchlist = watchlistSymbols.includes(symbol.toUpperCase());
      return { success: true, isInWatchlist };
    }

    return { success: false, isInWatchlist: false };
  } catch (error) {
    console.error('toggleWatchlistForCurrentUser error:', error);
    return { success: false, isInWatchlist: false };
  }
}