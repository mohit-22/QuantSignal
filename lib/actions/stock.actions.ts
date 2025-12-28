'use server';

import { StockAPI, StockData, NewsItem } from '@/lib/stock-api';
import { AIAnalyzer, AIAnalysis } from '@/lib/ai-analysis';

export async function getStockData(symbols: string[]): Promise<StockData[]> {
  try {
    return await StockAPI.getMultipleStocks(symbols);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
}

export async function getStockHistory(symbol: string): Promise<any[]> {
  try {
    return await StockAPI.getHistoricalData(symbol);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    return [];
  }
}

export async function getStockAnalysis(stockData: any, historicalData: any[]): Promise<AIAnalysis | null> {
  try {
    return await AIAnalyzer.analyzeStock(stockData, historicalData);
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    return null;
  }
}

export async function getStockNews(symbol: string): Promise<NewsItem[]> {
  try {
    return await StockAPI.getStockNews(symbol);
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return [];
  }
}

export async function analyzeStocks(symbols: string[]): Promise<{
  stocks: StockData[];
  selectedStock: StockData | null;
  historicalData: any[];
  aiAnalysis: AIAnalysis | null;
  news: NewsItem[];
}> {
  try {
    const stocks = await getStockData(symbols);

    if (stocks.length === 0) {
      return {
        stocks: [],
        selectedStock: null,
        historicalData: [],
        aiAnalysis: null,
        news: []
      };
    }

    const selectedStock = stocks[0];
    console.log('Selected stock:', selectedStock);

    const historicalData = await getStockHistory(selectedStock.symbol);
    console.log('Historical data points:', historicalData.length, 'First few points:', historicalData.slice(0, 3));

    const aiAnalysis = await getStockAnalysis(selectedStock, historicalData);
    console.log('AI Analysis result:', aiAnalysis ? {
      recommendation: aiAnalysis.investmentRecommendation,
      confidence: aiAnalysis.confidenceLevel,
      overviewLength: aiAnalysis.companyOverview?.length || 0
    } : 'Null');

    const news = await getStockNews(selectedStock.symbol);
    console.log('News items:', news.length);

    return {
      stocks,
      selectedStock,
      historicalData,
      aiAnalysis,
      news
    };
  } catch (error) {
    console.error('Error analyzing stocks:', error);
    return {
      stocks: [],
      selectedStock: null,
      historicalData: [],
      aiAnalysis: null,
      news: []
    };
  }
}
