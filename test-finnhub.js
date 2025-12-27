const { searchStocks } = require('./lib/actions/finnhub.actions.ts');

async function testFinnhub() {
  try {
    console.log('Testing Finnhub API...');
    const results = await searchStocks('AAPL');
    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
}

testFinnhub();
