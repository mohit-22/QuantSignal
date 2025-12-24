import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/database/mongoose";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";

export default async function WatchlistPage() {
    // Check database connection first - redirect if not connected
    try {
        await connectToDatabase();
    } catch (error) {
        redirect('/mongodb-error');
    }

    // Check authentication - redirect to sign-in if not authenticated
    if (!auth) {
        redirect('/sign-in');
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) {
        redirect('/sign-in');
    }

    const userEmail = session.user.email;

    // Get watchlist data - handle errors gracefully for this part
    let watchlistSymbols: string[] = [];
    let watchlistStocks: StockWithWatchlistStatus[] = [];

    try {
        watchlistSymbols = await getWatchlistSymbolsByEmail(userEmail);

        if (watchlistSymbols.length > 0) {
            // Get full stock details for each watchlist item individually
            const stockPromises = watchlistSymbols.map(async (symbol) => {
                try {
                    // Use searchStocks with individual symbols
                    const results = await searchStocks(symbol, userEmail);
                    return results.find(stock => stock.symbol === symbol) || {
                        symbol,
                        name: symbol,
                        exchange: 'Unknown',
                        type: 'Stock',
                        isInWatchlist: true
                    };
                } catch (error) {
                    console.error(`Error fetching details for ${symbol}:`, error);
                    // Return basic info if API fails
                    return {
                        symbol,
                        name: symbol,
                        exchange: 'Unknown',
                        type: 'Stock',
                        isInWatchlist: true
                    };
                }
            });

            watchlistStocks = await Promise.all(stockPromises);
        }
    } catch (error) {
        // Handle watchlist data fetching errors gracefully
        console.error('Error fetching watchlist data:', error);
        watchlistSymbols = [];
        watchlistStocks = [];
    }

    return (
        <div className="py-8 px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
                    <p className="text-gray-400">
                        Track your favorite stocks and monitor their performance
                    </p>
                </div>

                {watchlistStocks.length === 0 ? (
                    <div className="text-center py-16 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="mb-6">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Your Watchlist is Empty</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Start building your watchlist by adding stocks you want to track.
                            Click the star icon on any stock page to add it here.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Browse Stocks
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-400">
                                {watchlistStocks.length} stock{watchlistStocks.length !== 1 ? 's' : ''} in your watchlist
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {watchlistStocks.map((stock) => (
                                <div
                                    key={stock.symbol}
                                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <Link
                                                href={`/stocks/${stock.symbol}`}
                                                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
                                            >
                                                {stock.name}
                                            </Link>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {stock.symbol} • {stock.exchange}
                                            </p>
                                            <p className="text-gray-500 text-xs mt-1 capitalize">
                                                {stock.type}
                                            </p>
                                        </div>
                                        <WatchlistButton
                                            symbol={stock.symbol}
                                            company={stock.name}
                                            isInWatchlist={stock.isInWatchlist}
                                            type="icon"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/stocks/${stock.symbol}`}
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
