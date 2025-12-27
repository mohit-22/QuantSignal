// Simple test to verify watchlist functionality
const { getWatchlistSymbolsByEmail, addToWatchlist } = require('./lib/actions/watchlist.actions.ts');

async function testWatchlist() {
  try {
    console.log('Testing watchlist functionality...');

    // Test getting watchlist for a test email
    const symbols = await getWatchlistSymbolsByEmail('test@example.com');
    console.log('Current watchlist symbols:', symbols);

    // Test adding a stock to watchlist
    const result = await addToWatchlist('test@example.com', 'AAPL', 'Apple Inc.');
    console.log('Add to watchlist result:', result);

    // Check watchlist again
    const updatedSymbols = await getWatchlistSymbolsByEmail('test@example.com');
    console.log('Updated watchlist symbols:', updatedSymbols);

  } catch (error) {
    console.error('Watchlist test error:', error);
  }
}

testWatchlist();
