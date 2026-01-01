<div align="center">
  <br />
    <a href="" target="_blank">
      <img src="public/readme/hero.webp" alt="Project Banner">
    </a>
    
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=black"/>
    <img src="https://img.shields.io/badge/-Better Auth-black?style=for-the-badge&logoColor=white&logo=betterauth&color=black"/>
<img src="https://img.shields.io/badge/-Shadcn-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=black"/>
<img src="https://img.shields.io/badge/-Inngest-black?style=for-the-badge&logoColor=white&logo=inngest&color=black"/><br/>

<img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=00A35C"/>
<img src="https://img.shields.io/badge/-CodeRabbit-black?style=for-the-badge&logoColor=white&logo=coderabbit&color=9146FF"/>
<img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=38B2AC"/>
<img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6"/>

  </div>

  <h3 align="center">Stock Market App — Alerts, Charts, AI Insights</h3>

   
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤖 [AI Investment Strategist Pro](#ai-strategist)
5. ⚡ [Automated Workflows](#automation)
6. 💼 [Portfolio Simulator](#portfolio)
7. 🎨 [User Experience](#ux)
8. 🏗️ [Architecture](#architecture)
9. 🤸 [Quick Start](#quick-start)
10. 🔗 [Assets](#links)
11. 🚀 [More](#more)


## <a name="introduction">✨ Introduction</a>

**QuantSignal** is a comprehensive AI-powered stock market intelligence platform that combines real-time financial data, advanced AI analysis, and automated workflows to empower investors with data-driven insights. Built as a modern full-stack application, QuantSignal transforms complex market data into actionable investment intelligence.

### 🎯 What QuantSignal Does

QuantSignal serves as your personal AI Investment Strategist Pro, providing:

- **🤖 AI-Powered Stock Analysis**: Advanced Gemini AI analyzes stocks with detailed company overviews, market positioning, financial health assessments, and personalized investment recommendations (BUY/HOLD/SELL) with confidence levels and price targets.

- **📊 Real-Time Market Intelligence**: Live TradingView widgets display market overviews, stock heatmaps, technical analysis, company profiles, and financial statements for comprehensive market monitoring.

- **💼 Portfolio Management Tools**: Interactive portfolio simulator allows users to test different asset allocations, analyze diversification, and simulate investment performance across multiple stocks.

- **📱 Personalized Watchlist**: User authentication system enables personalized stock tracking with watchlist management, real-time alerts, and customized market insights.

- **📧 Automated Intelligence Delivery**: Event-driven workflows automatically send personalized daily news summaries, market updates, and investment insights directly to users' inboxes.

- **🔍 Intelligent Stock Search**: Advanced search functionality helps users discover and analyze stocks across different industries, sectors, and market caps.

### 🚀 Key Differentiators

- **AI-First Approach**: Every analysis is enhanced with AI insights, making complex financial data accessible to both novice and experienced investors.
- **Real-Time Integration**: Live market data from Finnhub API ensures users always have the most current market information.
- **Automated Workflows**: Inngest-powered automation handles everything from welcome emails to daily market summaries.
- **Modern UX**: Beautiful, responsive interface built with Next.js, Shadcn UI, and Tailwind CSS for an exceptional user experience.
- **Comprehensive Analysis**: From technical charts to fundamental analysis, users get 360-degree stock insights in one platform.



## <a name="tech-stack">⚙️ Tech Stack</a>

### 🎨 Frontend & UI
- **[Next.js 15.5.2](https://nextjs.org/docs)** - React framework with App Router, server components, and Turbopack for fast development. Handles routing, API routes, and server-side rendering for optimal performance.
- **[React 19.1.0](https://reactjs.org/)** - Modern React with concurrent features and improved performance. Used for building interactive components and managing application state.
- **[Shadcn/ui](https://ui.shadcn.com/docs)** - Production-ready component library built on Radix UI primitives. Provides beautiful, accessible components like dialogs, dropdowns, and form inputs used throughout the application.
- **[TailwindCSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework with custom design system. Creates the dark, professional theme and responsive layouts across all pages.
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with strict typing. Ensures code reliability and provides excellent developer experience with IntelliSense.

### 🔐 Authentication & Security
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library handling user registration, login, session management, and secure API access. Powers the watchlist and user personalization features.

### 🤖 AI & Intelligence
- **[Google Gemini AI](https://aistudio.google.com/)** - Advanced AI model for generating stock analysis, investment recommendations, personalized email content, and market insights. Provides the "AI Investment Strategist Pro" functionality.
- **[CodeRabbit](https://coderabbit.ai/)** - AI-powered code review tool integrated into the development workflow for maintaining code quality.

### 📊 Financial Data & APIs
- **[Finnhub API](https://finnhub.io/)** - Real-time financial market data provider. Supplies live stock prices, historical data, company information, news, and market quotes for all analysis features.
- **[Yahoo Finance 2](https://github.com/gadicc/node-yahoo-finance2)** - Additional financial data source for comprehensive market coverage and stock information.

### ⚡ Backend & Automation
- **[Inngest](https://www.inngest.com/)** - Event-driven workflow platform. Powers automated email delivery, daily news summaries, and scheduled market updates with reliable background job processing.
- **[NodeMailer](https://nodemailer.com/)** - Email delivery service for sending personalized welcome emails and daily market intelligence summaries to users.

### 💾 Database & Storage
- **[MongoDB](https://www.mongodb.com/)** - NoSQL document database with Mongoose ODM. Stores user profiles, watchlists, and application data with flexible schema design.
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling for Node.js. Provides data validation, schema definitions, and database operations.

### 📈 Data Visualization
- **[TradingView Widgets](https://www.tradingview.com/widget/)** - Professional financial charts and market data widgets. Powers the interactive charts, technical analysis, and market overview displays.
- **[Chart.js](https://www.chartjs.org/)** - JavaScript charting library integrated with React. Creates custom stock comparison charts and portfolio performance visualizations.

### 🛠️ Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting for maintaining code quality and consistency.
- **[TypeScript Compiler](https://www.typescriptlang.org/)** - Advanced type checking and compilation for reliable, maintainable code.
- **[Turbo](https://turbo.build/)** - High-performance build system integrated with Next.js for fast development and optimized production builds.

## <a name="ai-strategist">🤖 AI Investment Strategist Pro Dashboard</a>

### Overview
The AI Investment Strategist Pro is QuantSignal's flagship feature - a comprehensive AI-powered stock analysis platform that transforms complex financial data into actionable investment intelligence.

### Key Capabilities

**🎯 Multi-Modal Analysis**
- **Overview Mode**: Real-time stock cards with current prices, performance metrics, and interactive charts
- **AI Analysis Mode**: Deep-dive AI-powered insights with investment recommendations and risk assessments
- **Portfolio Mode**: Investment simulation and portfolio optimization tools
- **Comparison Mode**: Side-by-side analysis of multiple stocks with performance visualization

**📊 Intelligent Analysis Engine**
- **Company Overview**: AI-generated summaries of business models, products, and market presence
- **Market Position**: Competitive analysis including market share and growth potential
- **Financial Health**: Assessment of profitability, debt levels, valuation metrics, and cash flow
- **Risk Assessment**: Comprehensive evaluation of market, sector, and company-specific risks
- **Investment Recommendations**: Clear BUY/HOLD/SELL recommendations with confidence levels
- **Price Targets**: Realistic 12-month price projections with high/low ranges

**📈 Advanced Analytics**
- **Technical Indicators**: Volatility calculations, trend analysis, and momentum indicators
- **Historical Data Processing**: 6-month price trend analysis with statistical modeling
- **News Integration**: Real-time news sentiment analysis and market impact assessment
- **Sector Analysis**: Industry-specific insights and comparative performance metrics

**🎨 User Experience**
- **Batch Processing**: Analyze multiple stocks simultaneously (AAPL, MSFT, TSLA, GOOGL, NVDA)
- **Interactive Interface**: Drag-and-drop portfolio allocation and real-time performance updates
- **Visual Dashboard**: Professional charts, heatmaps, and data visualizations
- **Mobile Responsive**: Full functionality across desktop, tablet, and mobile devices

### AI Analysis Example
```
For Apple Inc. (AAPL):
- Investment Recommendation: BUY (85% confidence)
- Price Target: $165-$210 (12 months)
- Key Drivers: Strong ecosystem, services growth, AI integration
- Risk Factors: Supply chain dependencies, regulatory scrutiny
```

## <a name="automation">⚡ Automated Workflows & Intelligence</a>

### Event-Driven Architecture
QuantSignal uses **Inngest** to power intelligent, automated workflows that deliver personalized market intelligence:

**📧 Welcome Email Automation**
- Triggered on user registration (`app/user.created` event)
- AI-generated personalized welcome messages based on user profiles
- Includes specific references to investment goals, risk tolerance, and preferred sectors
- Professional HTML email templates with QuantSignal branding

**📰 Daily News Intelligence**
- Scheduled workflow runs daily at 12:00 PM (`0 12 * * *`)
- Fetches latest market news from Finnhub API
- AI summarizes news in plain English with key takeaways
- Personalized content based on user's watchlist stocks
- Professional email delivery with market insights and actionable information

**🔄 Real-Time Data Processing**
- Continuous market data updates and analysis
- Automated alert generation based on watchlist changes
- Background processing for AI analysis and recommendations
- Scalable event processing for high-volume market data

### Email Intelligence Features
- **Personalization Engine**: AI creates tailored content for each user's investment profile
- **Plain Language Summaries**: Complex financial news explained in simple, actionable terms
- **Visual Email Design**: Dark theme, professional formatting with clear sections
- **Smart Content Filtering**: Prioritizes relevant news based on user preferences
- **Automated Scheduling**: Reliable delivery without manual intervention

## <a name="portfolio">💼 Portfolio Simulator & Analysis</a>

### Investment Strategy Testing
The Portfolio Simulator allows users to test investment strategies before committing real capital:

**🎛️ Allocation Management**
- **Interactive Sliders**: Adjust percentage allocations for each stock
- **Real-Time Calculations**: Instant updates of total value and performance metrics
- **Diversification Analysis**: AI-powered assessment of portfolio risk and balance
- **Investment Amount Control**: Test different investment sizes and scenarios

**📊 Performance Analytics**
- **Total Portfolio Value**: Real-time calculation based on current allocations
- **Return Calculations**: Combined performance across all holdings
- **Risk Assessment**: Portfolio volatility and diversification metrics
- **Scenario Testing**: Compare different allocation strategies side-by-side

**🤖 AI Portfolio Insights**
- **Optimization Suggestions**: AI recommendations for better diversification
- **Risk Level Assessment**: Low/Medium/High risk categorization
- **Strategy Recommendations**: Data-driven portfolio improvement suggestions
- **Market Condition Analysis**: How different scenarios perform in various market environments

### Example Portfolio Analysis
```
Portfolio Composition:
- AAPL: 30% ($3,000 at $150/share)
- MSFT: 25% ($2,500 at $400/share)
- TSLA: 20% ($2,000 at $200/share)
- GOOGL: 15% ($1,500 at $120/share)
- NVDA: 10% ($1,000 at $800/share)

AI Analysis:
- Diversification Score: 85/100
- Risk Level: Medium
- Recommendation: Well-balanced portfolio with tech sector focus
```

## 🎨 User Experience & Interface

### Design Philosophy
QuantSignal features a **professional dark theme** optimized for financial analysis and extended viewing sessions:

**🌙 Dark Mode Excellence**
- **Eye Comfort**: Reduced eye strain during long analysis sessions
- **Professional Aesthetics**: Clean, modern interface suitable for financial professionals
- **Data Visibility**: High contrast ratios ensure all market data is easily readable
- **Consistent Branding**: Cohesive visual identity across all components

**📱 Responsive Design**
- **Desktop Optimization**: Full feature access with multi-column layouts
- **Tablet Adaptation**: Adjusted layouts for medium screens with touch interactions
- **Mobile Experience**: Streamlined interface with essential features prioritized
- **Progressive Enhancement**: Core functionality works across all device sizes

**🔄 Interactive Elements**
- **Smooth Animations**: Professional transitions and loading states
- **Real-Time Updates**: Live data refresh without page reloads
- **Intuitive Controls**: Drag-and-drop portfolio allocation and interactive charts
- **Feedback Systems**: Clear loading indicators and success/error states

### Navigation & Information Architecture
- **Logical Flow**: From market overview → detailed analysis → portfolio simulation
- **Context Preservation**: Maintains user state and preferences across sessions
- **Quick Access**: Watchlist and recent stocks easily accessible from any page
- **Search Integration**: Fast stock discovery with intelligent filtering

### Accessibility & Usability
- **WCAG Compliance**: Meets web accessibility standards for inclusive design
- **Keyboard Navigation**: Full functionality without mouse dependency
- **Screen Reader Support**: Proper ARIA labels and semantic HTML structure
- **Color Contrast**: High contrast ratios for users with visual impairments

## <a name="ux">🎨 User Experience & Interface</a>

## <a name="architecture">🏗️ Architecture & Data Flow</a>

### System Architecture

**Frontend Layer (Next.js + React)**
```
📱 User Interface
├── 🏠 Home Dashboard (TradingView Widgets)
├── 🤖 AI Analyst Pro (Multi-modal Analysis)
├── 👤 Watchlist (Personalized Tracking)
├── 📈 Stock Details (Deep-dive Analysis)
└── 💼 Portfolio Simulator (Strategy Testing)
```

**Backend Layer (Next.js API Routes)**
```
🔧 API Endpoints
├── 📊 Stock Data (Finnhub Integration)
├── 🤖 AI Analysis (Gemini AI)
├── 👤 User Management (Better Auth)
├── 📧 Email System (NodeMailer)
└── 💾 Database (MongoDB)
```

**Automation Layer (Inngest)**
```
⚡ Event Workflows
├── 👋 User Registration → Welcome Email
├── 📰 Daily Schedule → News Summary
├── 📊 Market Updates → Data Refresh
└── 🤖 AI Processing → Analysis Generation
```

### Data Flow Architecture

**1. User Registration Flow**
```
User Signs Up → Better Auth → MongoDB → Inngest Trigger → AI Email Generation → Personalized Welcome Email
```

**2. Stock Analysis Flow**
```
User Input → Finnhub API → Gemini AI Analysis → Database Storage → UI Display → Interactive Charts
```

**3. Daily Intelligence Flow**
```
Cron Schedule → Fetch User Data → Get Watchlist → Finnhub News → AI Summarization → Email Delivery
```

### Database Schema

**User Collection**
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  investmentGoals: String,
  riskTolerance: String,
  preferredIndustry: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Watchlist Collection**
```javascript
{
  _id: ObjectId,
  userEmail: String,
  symbol: String,
  company: String,
  addedAt: Date,
  alerts: Boolean
}
```

**Analysis Cache Collection**
```javascript
{
  _id: ObjectId,
  symbol: String,
  analysis: AIAnalysis,
  lastUpdated: Date,
  expiresAt: Date
}
```

### API Integration Points

**Finnhub API Endpoints Used:**
- `/quote?symbol=` - Real-time stock prices
- `/stock/candle?symbol=` - Historical price data
- `/company-news?symbol=` - Company news and updates
- `/stock/profile2?symbol=` - Company profile information
- `/scan/technical-indicator` - Technical analysis data

**Gemini AI Integration:**
- Stock analysis prompts with financial data
- Email content personalization
- News summarization and insights
- Investment recommendation generation

**TradingView Widgets:**
- Market overview and heatmaps
- Advanced charting with technical indicators
- Company profile and financial data
- Real-time price feeds and timelines

### Performance Optimization

**Frontend Optimizations:**
- Next.js App Router with server components
- Turbopack for fast development builds
- React Suspense for loading states
- Debounced search and API calls
- Client-side caching for stock data

**Backend Optimizations:**
- MongoDB indexing for fast queries
- Redis caching for API responses (planned)
- Inngest for reliable background processing
- API rate limiting and error handling
- Connection pooling for database efficiency

**Data Processing:**
- Batch processing for multiple stock analysis
- Incremental updates for watchlist changes
- Background AI processing to avoid UI blocking
- Smart caching with TTL for market data

## <a name="features">🔋 Features</a>

### 🤖 AI Investment Strategist Pro Dashboard

**The Heart of QuantSignal** - A comprehensive AI-powered analysis platform featuring:

- **Multi-Analysis Types**: Choose from Overview, AI Analysis, Portfolio Simulation, and Stock Comparison modes
- **Intelligent Stock Input**: Enter multiple stock symbols (AAPL, MSFT, TSLA, etc.) for batch analysis
- **Real-Time Stock Cards**: Interactive cards showing current prices, daily changes, market cap, and P/E ratios
- **Advanced AI Analysis**: Gemini AI provides detailed company overviews, market positioning, financial health assessments, risk analysis, and personalized investment recommendations
- **Confidence Scoring**: Each AI recommendation includes confidence levels and realistic price targets
- **News Integration**: Latest market news and company updates integrated into analysis
- **Interactive Charts**: 6-month price trend charts for each analyzed stock

### 📊 Real-Time Market Dashboard

**Live Market Intelligence** at your fingertips:

- **Market Overview Widget**: Real-time market indices and sector performance
- **Stock Heatmap**: Visual representation of market movements across sectors
- **Market Quotes**: Live price feeds for major indices and commodities
- **Top Stories Timeline**: Breaking news and market-moving headlines
- **TradingView Integration**: Professional-grade financial charts and technical analysis

### 💼 Portfolio Simulator

**Test Investment Strategies** before risking real money:

- **Asset Allocation**: Drag-and-drop interface for adjusting portfolio weights
- **Performance Analytics**: Real-time calculation of total value, returns, and diversification metrics
- **Risk Assessment**: AI-powered portfolio risk analysis and optimization suggestions
- **Scenario Testing**: Test different market conditions and allocation strategies
- **Investment Amount Control**: Set custom investment amounts and see projected outcomes

### 👤 Personal Watchlist & Authentication

**Your Personalized Investment Hub**:

- **User Authentication**: Secure sign-up/sign-in with Better Auth integration
- **Personal Watchlist**: Add/remove stocks to track your favorite investments
- **Watchlist Analytics**: Performance tracking and portfolio insights for watchlist stocks
- **Cross-Device Sync**: Access your watchlist from any device with data persistence

### 📈 Individual Stock Deep Dive

**Comprehensive Stock Analysis Pages**:

- **Symbol Info Widget**: Real-time price, volume, and key metrics
- **Advanced Charts**: Multiple chart types including candlestick, line, and technical analysis
- **Technical Indicators**: RSI, MACD, moving averages, and other technical tools
- **Company Profile**: Detailed business overview, leadership, and corporate structure
- **Financial Statements**: Balance sheets, income statements, and cash flow analysis
- **Watchlist Integration**: One-click addition to personal watchlist

### 📧 Automated Intelligence System

**Never Miss Market Opportunities**:

- **Personalized Welcome Emails**: AI-generated welcome messages tailored to user profiles and investment goals
- **Daily News Summaries**: Automated daily emails with market news, watchlist updates, and AI insights
- **Event-Driven Workflows**: Inngest-powered automation for timely notifications and updates
- **Smart Content Generation**: AI creates personalized, easy-to-understand market summaries in plain English

### 🔍 Advanced Search & Discovery

**Find Investment Opportunities**:

- **Intelligent Search**: Search stocks by symbol, company name, or sector
- **Market Data Integration**: Real-time quotes and company information
- **Sector Filtering**: Browse stocks by industry sectors and market segments
- **Performance Sorting**: Sort by market cap, price performance, and trading volume

### 🎨 Modern User Experience

**Beautiful, Intuitive Interface**:

- **Dark Theme**: Professional dark mode optimized for extended viewing
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clean, organized interface with logical information hierarchy
- **Loading States**: Smooth animations and loading indicators for better user experience
- **Accessibility**: WCAG-compliant design with proper contrast and navigation

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/mohit-22/QuantSignal.git
https://github.com/mohit-22/QuantSignal.git
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# FINNHUB
NEXT_PUBLIC_NEXT_PUBLIC_FINNHUB_API_KEY=
FINNHUB_BASE_URL=https://finnhub.io/api/v1

# MONGODB
MONGODB_URI=

# BETTER AUTH
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# GEMINI
GEMINI_API_KEY=

#NODEMAILER
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

Replace the placeholder values with your real credentials. You can get these by signing up at: [**MongoDB**](https://www.mongodb.com/products/platform/atlas-database), [**Gemini**](https://aistudio.google.com/prompts/new_chat?utm_source=chatgpt.com), [**Inngest**](https://jsm.dev/stocks-inggest), [**Finnhub**](https://finnhub.io).

**Running the Project**

```bash
npm run dev
npx inngest-cli@latest dev
```



