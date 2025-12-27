import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export interface AIAnalysis {
  companyOverview: string;
  marketPosition: string;
  financialHealth: string;
  investmentRecommendation: 'BUY' | 'HOLD' | 'SELL';
  confidenceLevel: number;
  riskAssessment: string;
  priceTarget: {
    low: number;
    high: number;
    timeframe: string;
  };
  keyDrivers: string[];
  risks: string[];
}

export interface PortfolioAnalysis {
  totalValue: number;
  totalReturn: number;
  diversification: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

export class AIAnalyzer {
  private static async getGeminiResponse(prompt: string): Promise<string> {
    if (!genAI) {
      console.log('Gemini API key not configured, using fallback analysis');
      return 'API_KEY_NOT_CONFIGURED';
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'Unable to generate AI analysis at this time.';
    }
  }

  static async analyzeStock(stockData: any, historicalData: any[]): Promise<AIAnalysis> {
    // Calculate some basic metrics from historical data
    const avgPrice = historicalData.length > 0
      ? historicalData.reduce((sum, item) => sum + item.close, 0) / historicalData.length
      : stockData.price;

    const volatility = this.calculateVolatility(historicalData);
    const trend = this.calculateTrend(historicalData);

    const prompt = `
You are an expert financial analyst with 20+ years of experience. Provide a detailed stock analysis based on the following data:

COMPANY INFORMATION:
- Symbol: ${stockData.symbol}
- Company: ${stockData.name}
- Current Price: $${stockData.price}
- Daily Change: ${stockData.changePercent >= 0 ? '+' : ''}${stockData.changePercent.toFixed(2)}%
- Market Cap: ${stockData.marketCap ? `$${(stockData.marketCap / 1e9).toFixed(1)}B` : 'N/A'}
- Sector: ${stockData.sector || 'N/A'}
- P/E Ratio: ${stockData.pe || 'N/A'}

TECHNICAL ANALYSIS:
- Average Price (6 months): $${avgPrice.toFixed(2)}
- Price Volatility: ${volatility.toFixed(2)}%
- Trend Direction: ${trend}
- Historical Data Points: ${historicalData.length}

Provide a comprehensive analysis in this exact JSON format:
{
  "companyOverview": "Detailed description of the company's business model, products, and market presence",
  "marketPosition": "Competitive analysis including market share, industry position, and growth potential",
  "financialHealth": "Assessment of financial metrics, profitability, debt levels, and cash flow",
  "investmentRecommendation": "BUY, HOLD, or SELL (be decisive and explain reasoning)",
  "confidenceLevel": 75,
  "riskAssessment": "Detailed risk evaluation including market, sector, and company-specific risks",
  "priceTarget": {
    "low": ${Math.round(stockData.price * 0.85)},
    "high": ${Math.round(stockData.price * 1.25)},
    "timeframe": "12 months"
  },
  "keyDrivers": ["Primary growth driver 1", "Primary growth driver 2", "Primary growth driver 3"],
  "risks": ["Major risk factor 1", "Major risk factor 2", "Major risk factor 3"]
}

Be specific, data-driven, and provide actionable insights. Consider current market conditions and provide realistic price targets.
`;

    try {
      console.log('Generating AI analysis for:', stockData.symbol, 'with', historicalData.length, 'historical points');
      const response = await this.getGeminiResponse(prompt);
      console.log('Gemini API response received, length:', response.length);

      if (response === 'API_KEY_NOT_CONFIGURED') {
        console.log('Using enhanced fallback analysis due to missing API key');
        return this.generateFallbackAnalysis(stockData, historicalData);
      }

      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      console.log('Cleaned response preview:', cleanedResponse.substring(0, 200) + '...');

      // Try to extract JSON from the response
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed AI analysis with recommendation:', parsed.investmentRecommendation);
        return parsed;
      }

      console.warn('No JSON found in AI response, using fallback. Full response:', cleanedResponse);
      return this.generateFallbackAnalysis(stockData, historicalData);
    } catch (error) {
      console.error('AI Analysis error:', error);
      return this.generateFallbackAnalysis(stockData, historicalData);
    }
  }

  private static calculateVolatility(data: any[]): number {
    if (data.length < 2) return 0;

    const returns = [];
    for (let i = 1; i < data.length; i++) {
      returns.push((data[i].close - data[i-1].close) / data[i-1].close);
    }

    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;

    return Math.sqrt(variance) * Math.sqrt(252) * 100; // Annualized volatility
  }

  private static calculateTrend(data: any[]): string {
    if (data.length < 10) return 'neutral';

    const recent = data.slice(-10);
    const older = data.slice(-20, -10);

    const recentAvg = recent.reduce((sum, item) => sum + item.close, 0) / recent.length;
    const olderAvg = older.reduce((sum, item) => sum + item.close, 0) / older.length;

    const change = (recentAvg - olderAvg) / olderAvg;

    if (change > 0.05) return 'upward';
    if (change < -0.05) return 'downward';
    return 'sideways';
  }

  private static generateFallbackAnalysis(stockData: any, historicalData: any[]): AIAnalysis {
    // Calculate some basic metrics from historical data
    const avgPrice = historicalData.length > 0
      ? historicalData.reduce((sum, item) => sum + item.close, 0) / historicalData.length
      : stockData.price;

    const volatility = this.calculateVolatility(historicalData);
    const trend = this.calculateTrend(historicalData);

    const recommendation = stockData.changePercent > 5 ? 'BUY' :
                          stockData.changePercent < -5 ? 'SELL' : 'HOLD';

    console.log('Generating fallback analysis for', stockData.symbol);

    return {
      companyOverview: `${stockData.name} (${stockData.symbol}) is a publicly traded company operating in the ${stockData.sector || 'technology'} sector. The company has shown ${trend} momentum over the past 6 months with an average price of $${avgPrice.toFixed(2)} and volatility of ${volatility.toFixed(2)}%.`,
      marketPosition: `${stockData.name} operates in a competitive ${stockData.sector || 'technology'} market. The company's market capitalization of ${stockData.marketCap ? `$${(stockData.marketCap / 1e9).toFixed(1)} billion` : 'undisclosed'} positions it as a ${stockData.marketCap > 100000000000 ? 'large-cap' : stockData.marketCap > 2000000000 ? 'mid-cap' : 'small-cap'} company with significant market presence.`,
      financialHealth: `Trading at $${stockData.price} with a P/E ratio of ${stockData.pe || 'N/A'}, ${stockData.name} demonstrates ${stockData.pe && stockData.pe < 20 ? 'attractive valuation metrics' : stockData.pe && stockData.pe > 30 ? 'premium valuation' : 'reasonable market valuation'}. The company shows ${stockData.changePercent >= 0 ? 'positive momentum' : 'negative momentum'} with ${Math.abs(stockData.changePercent).toFixed(2)}% daily movement.`,
      investmentRecommendation: recommendation,
      confidenceLevel: Math.max(60, Math.min(90, 70 + (stockData.changePercent * 2))),
      riskAssessment: `Market volatility poses the primary risk with ${volatility.toFixed(2)}% historical volatility. Sector-specific risks in ${stockData.sector || 'technology'} include competitive pressures and regulatory changes. Company-specific risks include execution risks and market acceptance of products/services.`,
      priceTarget: {
        low: Math.round(stockData.price * 0.85),
        high: Math.round(stockData.price * 1.25),
        timeframe: '12 months'
      },
      keyDrivers: [
        `${trend} price momentum and market sentiment`,
        `Strong ${stockData.sector || 'technology'} sector performance`,
        `Company's competitive advantages and market position`
      ],
      risks: [
        `High market volatility (${volatility.toFixed(2)}% historical)`,
        `Sector-specific risks in ${stockData.sector || 'technology'}`,
        `Economic downturns and market corrections`
      ]
    };
  }

  static async generateMarketInsights(stocks: any[]): Promise<string> {
    const prompt = `
Analyze the following portfolio/market data and provide key market insights:

Portfolio Data: ${JSON.stringify(stocks, null, 2)}

Provide 3-5 key market insights and trends based on this data. Focus on:
- Overall market sentiment
- Sector performance
- Notable trends or patterns
- Investment opportunities or risks

Keep it concise but insightful.
`;

    return await this.getGeminiResponse(prompt);
  }

  static async analyzePortfolio(stocks: any[], allocations: { [symbol: string]: number }): Promise<PortfolioAnalysis> {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.price * (allocations[stock.symbol] || 0), 0);
    const totalReturn = stocks.reduce((sum, stock) => sum + (stock.changePercent * (allocations[stock.symbol] || 0) / 100), 0);

    const prompt = `
Analyze this investment portfolio and provide recommendations:

Portfolio: ${JSON.stringify(stocks, null, 2)}
Allocations: ${JSON.stringify(allocations, null, 2)}
Total Value: $${totalValue.toFixed(2)}
Total Return: ${totalReturn.toFixed(2)}%

Provide portfolio analysis in JSON format:
{
  "diversification": 0-100,
  "riskLevel": "Low|Medium|High",
  "recommendations": ["rec1", "rec2", "rec3"]
}
`;

    try {
      const response = await this.getGeminiResponse(prompt);
      const analysis = JSON.parse(response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());

      return {
        totalValue,
        totalReturn,
        diversification: analysis.diversification || 50,
        riskLevel: analysis.riskLevel || 'Medium',
        recommendations: analysis.recommendations || ['Diversify your portfolio', 'Monitor market conditions', 'Consider long-term holding']
      };
    } catch (error) {
      return {
        totalValue,
        totalReturn,
        diversification: 50,
        riskLevel: 'Medium',
        recommendations: ['Diversify your portfolio', 'Monitor market conditions', 'Consider long-term holding']
      };
    }
  }
}