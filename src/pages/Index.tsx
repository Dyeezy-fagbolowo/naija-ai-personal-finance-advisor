import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  Target, 
  Brain, 
  Plus,
  Minus,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Wallet,
  Home,
  Car,
  ShoppingCart,
  Utensils,
  Lightbulb,
  Shield,
  Lock,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Building2,
  Users,
  Award,
  TrendingDown,
  MessageCircle,
  Send,
  X
} from 'lucide-react';

const Index = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 5000, description: 'Groceries', category: 'Food', date: '2024-01-15' },
    { id: 2, amount: 15000, description: 'Fuel', category: 'Transport', date: '2024-01-14' },
    { id: 3, amount: 25000, description: 'Electricity Bill', category: 'Bills', date: '2024-01-13' }
  ]);
  const [budget, setBudget] = useState(150000);
  const [investments, setInvestments] = useState([
    { id: 1, type: 'Stocks', amount: 100000, returns: 8.5 },
    { id: 2, type: 'Bonds', amount: 200000, returns: 12.2 }
  ]);
  const [goals, setGoals] = useState([
    { id: 1, title: 'Emergency Fund', target: 500000, current: 125000, priority: 'High' },
    { id: 2, title: 'New Car', target: 2000000, current: 400000, priority: 'Medium' },
    { id: 3, title: 'House Down Payment', target: 5000000, current: 800000, priority: 'High' }
  ]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const { toast } = useToast();

  const nigerianFinanceQuotes = [
    "Small money wey you save today go become big money tomorrow",
    "No spend money wey you never earn",
    "Investment na the key to wealth building for Nigeria",
    "Save first, spend wetin remain",
    "Make your money work for you, no be you work for money forever",
    "Emergency fund na your financial insurance",
    "Budget na roadmap to financial success",
    "Debt na enemy of wealth - avoid am like fire"
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalSavings = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalBalance = totalSavings + totalInvestments - totalExpenses;

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % nigerianFinanceQuotes.length);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, []);

  const handleAuth = () => {
    if (authData.email && authData.password) {
      setUser({ email: authData.email });
      toast({
        title: "Welcome!",
        description: "Successfully logged into your financial dashboard",
      });
    }
  };

  const addExpense = (newExpense) => {
    const expense = { ...newExpense, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    setExpenses([...expenses, expense]);
    toast({
      title: "Expense Added",
      description: `₦${expense.amount.toLocaleString()} for ${expense.description}`,
    });
  };

  const addInvestment = (newInvestment) => {
    const investment = { ...newInvestment, id: Date.now() };
    setInvestments([...investments, investment]);
    toast({
      title: "Investment Added",
      description: `₦${investment.amount.toLocaleString()} in ${investment.type}`,
    });
  };

  const addGoal = (newGoal) => {
    const goal = { ...newGoal, id: Date.now() };
    setGoals([...goals, goal]);
    toast({
      title: "Goal Added",
      description: `Target: ₦${goal.target.toLocaleString()}`,
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return <Utensils className="w-4 h-4" />;
      case 'Transport': return <Car className="w-4 h-4" />;
      case 'Bills': return <Home className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getAdvancedFinancialAdvice = (message) => {
    const lowerMessage = message.toLowerCase();
    const userFinancialData = {
      totalExpenses,
      totalInvestments,
      totalSavings,
      totalBalance,
      budget,
      expenseRatio: (totalExpenses / budget) * 100,
      savingsRate: totalSavings > 0 ? ((totalSavings / (totalSavings + totalExpenses)) * 100) : 0
    };

    // Context-aware responses based on user's actual financial data
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      if (userFinancialData.expenseRatio > 80) {
        return `Based on your current spending of ₦${totalExpenses.toLocaleString()} against your ₦${budget.toLocaleString()} budget (${userFinancialData.expenseRatio.toFixed(1)}%), you're spending too much! I recommend: 1) Use the 50/30/20 rule - 50% needs, 30% wants, 20% savings. 2) Cut unnecessary expenses in your highest spending categories. 3) Consider increasing your income through side hustles like freelancing, online business, or skill monetization. 4) Track every naira spent for 30 days to identify spending leaks.`;
      }
      return `Your spending is at ${userFinancialData.expenseRatio.toFixed(1)}% of budget - that's manageable! To optimize: 1) Automate savings first before spending. 2) Use the envelope method for discretionary spending. 3) Review and negotiate recurring bills like data plans, subscriptions. 4) Consider zero-based budgeting where every naira has a purpose.`;
    }

    if (lowerMessage.includes('investment') || lowerMessage.includes('invest')) {
      const investmentAdvice = userFinancialData.totalInvestments < 100000 ? 
        "Start small with these beginner-friendly Nigerian options: 1) Treasury Bills (minimum ₦50,000, 15-18% returns). 2) Money Market Funds (minimum ₦5,000, 12-15% returns). 3) Cowrywise or PiggyVest for automated savings. 4) Nigerian Stock Exchange ETFs for diversification." :
        `With ₦${totalInvestments.toLocaleString()} invested, consider diversifying: 1) Real Estate Investment Trusts (REITs) - 12-20% returns. 2) Blue-chip Nigerian stocks (Dangote, MTN, BUA). 3) International diversification through Bamboo or Tradestation. 4) Fixed income securities for stability.`;
      
      return `${investmentAdvice} Key principles: Never invest money you can't afford to lose, diversify across asset classes, and maintain 6-12 months emergency fund before aggressive investing.`;
    }

    if (lowerMessage.includes('saving') || lowerMessage.includes('emergency')) {
      const currentEmergencyFund = goals.find(g => g.title.toLowerCase().includes('emergency'))?.current || 0;
      const monthlyExpenses = totalExpenses;
      const recommendedEmergency = monthlyExpenses * 6;
      
      return `Your emergency fund status: ₦${currentEmergencyFund.toLocaleString()} saved. Recommended: ₦${recommendedEmergency.toLocaleString()} (6 months expenses). Strategies: 1) Automate ₦${Math.ceil(recommendedEmergency/12).toLocaleString()} monthly transfers. 2) Use high-yield savings accounts (ALAT, Kuda, VBank offer 10-15%). 3) Save windfalls like bonuses, gifts, tax refunds. 4) Start a savings challenge like ₦365 daily (₦133k yearly).`;
    }

    if (lowerMessage.includes('debt') || lowerMessage.includes('loan')) {
      return `Nigerian debt management strategy: 1) List all debts with interest rates (credit cards typically 24-36%, personal loans 15-25%). 2) Pay minimums on all, extra on highest interest rate (debt avalanche). 3) Consolidate high-interest debt if possible. 4) Avoid borrowing for consumables - only for appreciating assets or income-generating activities. 5) Negotiate with creditors for payment plans. 6) Consider side income to accelerate debt payoff.`;
    }

    if (lowerMessage.includes('retirement') || lowerMessage.includes('pension')) {
      return `Nigerian retirement planning: 1) Contribute to your Retirement Savings Account (RSA) - mandatory 8% minimum. 2) Make additional voluntary contributions (AVC) for tax benefits. 3) Start early - ₦10,000 monthly from age 25 becomes ₦50M+ by retirement. 4) Diversify beyond pension: stocks, real estate, business investments. 5) Consider Pension Fund Administrators (PFAs) with good track records like ARM, Leadway, or Stanbic IBTC.`;
    }

    if (lowerMessage.includes('business') || lowerMessage.includes('entrepreneurship')) {
      return `Starting a business in Nigeria: 1) Validate your idea with minimum viable product (MVP). 2) Save 6-12 months operating expenses before starting. 3) Register with CAC, get TIN, open business bank account. 4) Explore funding: BOI loans, Bank of Agriculture (for agric), Tony Elumelu Foundation, grants. 5) Master cash flow management - many businesses fail due to poor cash flow, not lack of profit. 6) Consider digital businesses for lower startup costs.`;
    }

    if (lowerMessage.includes('tax') || lowerMessage.includes('firs')) {
      return `Nigerian tax optimization: 1) Understand your tax bracket (7.5-24% for individuals). 2) Maximize deductions: pension contributions, life insurance premiums, donations to approved charities. 3) Keep proper records for business expenses. 4) Use tax-efficient investments like pension funds. 5) File returns on time to avoid penalties. 6) Consider professional tax advice for complex situations.`;
    }

    if (lowerMessage.includes('inflation') || lowerMessage.includes('economy')) {
      return `Protecting against Nigerian inflation (currently 15-25%): 1) Invest in assets that beat inflation: stocks, real estate, foreign currency. 2) Avoid keeping large amounts in regular savings (3-5% returns vs 20% inflation). 3) Consider dollar-denominated investments through Bamboo, Tradestation. 4) Build multiple income streams. 5) Invest in your skills - education and certifications provide inflation-beating returns.`;
    }

    if (lowerMessage.includes('side') || lowerMessage.includes('income') || lowerMessage.includes('money')) {
      return `Side income ideas for Nigerians: 1) Digital: Freelancing (Upwork, Fiverr), content creation, affiliate marketing, dropshipping. 2) Skills-based: Tutoring, consulting, graphic design, web development. 3) Physical: Food business, fashion, cleaning services, transportation (Uber, Bolt). 4) Passive: Rental income, dividend stocks, peer-to-peer lending. Start with your existing skills and gradually scale.`;
    }

    // Personalized insights based on user data
    const personalizedInsight = `Based on your financial profile: Total Balance: ₦${totalBalance.toLocaleString()}, Savings Rate: ${userFinancialData.savingsRate.toFixed(1)}%. `;
    
    return personalizedInsight + "I can help with budgeting, investments, savings strategies, debt management, retirement planning, business finance, tax optimization, and building multiple income streams. What specific financial goal are you working towards?";
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', content: chatInput };
    const botResponse = { type: 'bot', content: getAdvancedFinancialAdvice(chatInput) };
    
    setChatMessages([...chatMessages, userMessage, botResponse]);
    setChatInput('');
  };

  const aiRecommendations = [
    {
      type: 'warning',
      title: 'Budget Alert',
      message: `You've spent ${((totalExpenses / budget) * 100).toFixed(1)}% of your monthly budget.`,
      action: 'Review your spending patterns'
    },
    {
      type: 'success', 
      title: 'Investment Opportunity',
      message: 'Your emergency fund is on track. Consider increasing your stock investments.',
      action: 'Explore investment options'
    },
    {
      type: 'info',
      title: 'Savings Tip',
      message: 'You could save ₦15,000 monthly by reducing food expenses by 20%.',
      action: 'Set up automatic savings'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Professional Bank Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Naija Finance Advisor</h1>
                  <p className="text-xs text-slate-600">Trusted Financial Solutions</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>0800-NAIJA-BANK</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>NDIC Insured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Your Trusted Partner in
                  <span className="block text-blue-400">Financial Growth</span>
                </h2>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Experience next-generation banking with AI-powered insights, 
                  personalized financial advice, and secure digital solutions 
                  designed for modern Nigerians.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Bank-grade Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">Award-winning Service</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">2M+ Happy Customers</span>
                  </div>
                </div>
              </div>

              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">
                    {isLogin ? 'Secure Login' : 'Open Account'}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {isLogin ? 'Access your financial dashboard' : 'Start your financial journey today'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={authData.email}
                      onChange={(e) => setAuthData({...authData, email: e.target.value})}
                      className="h-12 border-slate-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                      className="h-12 border-slate-300 focus:border-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={handleAuth} 
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                  >
                    {isLogin ? 'Sign In Securely' : 'Create Account'}
                  </Button>
                  <div className="text-center">
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {isLogin ? 'New customer? Open an account' : 'Existing customer? Sign in'}
                    </button>
                  </div>
                  <div className="flex items-center justify-center space-x-2 pt-4 border-t">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-600">256-bit SSL Encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Banking Solutions</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Comprehensive financial services powered by artificial intelligence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-900">AI Financial Advisor</CardTitle>
                  <CardDescription className="text-slate-600">
                    Personalized financial recommendations powered by machine learning
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-slate-900">Digital Banking</CardTitle>
                  <CardDescription className="text-slate-600">
                    Complete banking services accessible 24/7 from anywhere
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-slate-900">Investment Platform</CardTitle>
                  <CardDescription className="text-slate-600">
                    Smart investment tools with real-time market insights
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Naija Finance Advisor</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Secure & Protected</h3>
                <p className="text-sm text-slate-600">Bank-grade security with NDIC insurance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Award Winning</h3>
                <p className="text-sm text-slate-600">Best Digital Bank Nigeria 2024</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Trusted by Millions</h3>
                <p className="text-sm text-slate-600">Over 2 million satisfied customers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">24/7 Support</h3>
                <p className="text-sm text-slate-600">Always here when you need us</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="w-6 h-6" />
                  <span className="font-bold">Naija Finance Advisor</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Nigeria's leading digital bank, committed to your financial success.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Personal Banking</li>
                  <li>Business Banking</li>
                  <li>Investment Services</li>
                  <li>Loans & Credit</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Security Center</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>0800-NAIJA-BANK</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>hello@naijafinanceadvisor.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
              <p>&copy; 2024 Naija Finance Advisor. All rights reserved. Licensed by CBN. NDIC Insured.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Naija Finance Advisor</h1>
                <p className="text-xs text-slate-600">Personal Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure Session</span>
                </div>
                <span className="text-slate-400">|</span>
                <span>{user.email}</span>
              </div>
              <Button 
                onClick={() => setUser(null)} 
                variant="outline" 
                size="sm"
                className="border-slate-300 hover:border-red-300 hover:text-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Nigerian Finance Quotes Widget */}
        <div className="mb-6 lg:mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 overflow-hidden">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Lightbulb className="w-6 h-6 text-yellow-300" />
                <h2 className="text-lg lg:text-xl font-bold">Nigerian Finance Wisdom</h2>
              </div>
              <div className="min-h-[2rem] flex items-center">
                <p className="text-blue-100 text-sm lg:text-base italic transition-opacity duration-300">
                  "{nigerianFinanceQuotes[currentQuote]}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Responsive AI Recommendations */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">AI Financial Insights</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600 bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    {rec.type === 'warning' && <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />}
                    {rec.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    {rec.type === 'info' && <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0" />}
                    <CardTitle className="text-base lg:text-lg text-slate-900">{rec.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-2">{rec.message}</p>
                  <Badge variant="outline" className="text-xs border-slate-300">
                    {rec.action}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Responsive Account Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                <Wallet className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">₦{totalBalance.toLocaleString()}</div>
              <p className="text-slate-300 text-xs">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <TrendingDown className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">₦{totalExpenses.toLocaleString()}</div>
              <p className="text-red-100 text-xs">{((totalExpenses / budget) * 100).toFixed(1)}% of budget</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Investment Portfolio</CardTitle>
                <TrendingUp className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">₦{totalInvestments.toLocaleString()}</div>
              <p className="text-green-100 text-xs">+8.5% average return</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Savings Goals</CardTitle>
                <Target className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">₦{totalSavings.toLocaleString()}</div>
              <p className="text-blue-100 text-xs">Across all goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Responsive Main Banking Tabs */}
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white border border-slate-200 h-auto p-1">
            <TabsTrigger value="expenses" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium text-xs lg:text-sm py-2 lg:py-3">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium text-xs lg:text-sm py-2 lg:py-3">
              Budget Planning
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium text-xs lg:text-sm py-2 lg:py-3">
              Investments
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium text-xs lg:text-sm py-2 lg:py-3">
              Financial Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Transaction Management</CardTitle>
                <CardDescription className="text-slate-600">Track and categorize your financial transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Input type="number" placeholder="Amount (₦)" className="border-slate-300" id="expense-amount" />
                  <Input type="text" placeholder="Description" className="border-slate-300" id="expense-description" />
                  <select className="px-3 py-2 border border-slate-300 rounded-md" id="expense-category">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Bills</option>
                    <option>Other</option>
                  </select>
                  <Button 
                    className="bg-slate-900 hover:bg-slate-800 w-full lg:w-auto"
                    onClick={() => {
                      const amountInput = document.getElementById('expense-amount') as HTMLInputElement;
                      const descriptionInput = document.getElementById('expense-description') as HTMLInputElement;
                      const categorySelect = document.getElementById('expense-category') as HTMLSelectElement;
                      
                      if (amountInput?.value && descriptionInput?.value) {
                        addExpense({
                          amount: Number(amountInput.value),
                          description: descriptionInput.value,
                          category: categorySelect.value
                        });
                        amountInput.value = '';
                        descriptionInput.value = '';
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-slate-200 rounded-lg bg-white space-y-2 lg:space-y-0">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(expense.category)}
                        <div>
                          <p className="font-medium text-slate-900">{expense.description}</p>
                          <p className="text-sm text-slate-500">{expense.category} • {expense.date}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-red-600 text-right lg:text-left">-₦{expense.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Budget Planning</CardTitle>
                <CardDescription className="text-slate-600">Set and monitor your monthly spending limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                  <Input 
                    type="number" 
                    placeholder="Monthly Budget (₦)" 
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="border-slate-300 flex-1"
                  />
                  <Button className="bg-slate-900 hover:bg-slate-800 w-full lg:w-auto">Update Budget</Button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-900">Budget Progress</span>
                    <span className="text-slate-600">{((totalExpenses / budget) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(totalExpenses / budget) * 100} className="w-full" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Spent</p>
                      <p className="font-semibold text-slate-900">₦{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Remaining</p>
                      <p className="font-semibold text-green-600">₦{(budget - totalExpenses).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Investment Portfolio</CardTitle>
                <CardDescription className="text-slate-600">Manage your investment portfolio with professional guidance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <select className="px-3 py-2 border border-slate-300 rounded-md" id="investment-type">
                    <option>Stocks</option>
                    <option>Bonds</option>
                    <option>Real Estate</option>
                    <option>Mutual Funds</option>
                  </select>
                  <Input type="number" placeholder="Amount (₦)" className="border-slate-300" id="investment-amount" />
                  <Button 
                    className="bg-green-600 hover:bg-green-700 w-full lg:w-auto"
                    onClick={() => {
                      const typeSelect = document.getElementById('investment-type') as HTMLSelectElement;
                      const amountInput = document.getElementById('investment-amount') as HTMLInputElement;
                      
                      if (amountInput?.value) {
                        addInvestment({
                          type: typeSelect.value,
                          amount: Number(amountInput.value),
                          returns: Math.random() * 15 + 5
                        });
                        amountInput.value = '';
                      }
                    }}
                  >
                    Add Investment
                  </Button>
                </div>
                <div className="space-y-3">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-slate-200 rounded-lg bg-white space-y-2 lg:space-y-0">
                      <div>
                        <p className="font-medium text-slate-900">{investment.type}</p>
                        <p className="text-sm text-slate-500">₦{investment.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-left lg:text-right">
                        <p className="font-semibold text-green-600">+{investment.returns.toFixed(1)}%</p>
                        <p className="text-sm text-slate-500">Returns</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Financial Goals</CardTitle>
                <CardDescription className="text-slate-600">Set and track your financial objectives with smart planning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Input type="text" placeholder="Goal Title" className="border-slate-300" id="goal-title" />
                  <Input type="number" placeholder="Target Amount (₦)" className="border-slate-300" id="goal-target" />
                  <Input type="number" placeholder="Current Amount (₦)" className="border-slate-300" id="goal-current" />
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
                    onClick={() => {
                      const titleInput = document.getElementById('goal-title') as HTMLInputElement;
                      const targetInput = document.getElementById('goal-target') as HTMLInputElement;
                      const currentInput = document.getElementById('goal-current') as HTMLInputElement;
                      
                      if (titleInput?.value && targetInput?.value) {
                        addGoal({
                          title: titleInput.value,
                          target: Number(targetInput.value),
                          current: Number(currentInput?.value) || 0,
                          priority: 'Medium'
                        });
                        titleInput.value = '';
                        targetInput.value = '';
                        currentInput.value = '';
                      }
                    }}
                  >
                    Add Goal
                  </Button>
                </div>
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-2 space-y-2 lg:space-y-0">
                        <h3 className="font-semibold text-slate-900">{goal.title}</h3>
                        <Badge variant={goal.priority === 'High' ? 'destructive' : 'secondary'}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">₦{goal.current.toLocaleString()}</span>
                          <span className="text-slate-600">₦{goal.target.toLocaleString()}</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} />
                        <p className="text-sm text-slate-600">
                          {((goal.current / goal.target) * 100).toFixed(1)}% complete
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Advanced Smart Chatbot */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:bg-transparent lg:inset-auto lg:bottom-4 lg:right-4 lg:w-96">
          <div className="absolute bottom-0 left-0 right-0 bg-white lg:relative lg:rounded-lg lg:shadow-xl lg:border border-slate-200 max-h-[90vh] lg:max-h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white lg:rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-yellow-300" />
                <div>
                  <h3 className="font-bold">Grok-4o AI Finance Advisor</h3>
                  <p className="text-xs text-blue-100">Personalized financial guidance</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowChatbot(false)}
                className="p-1 h-auto text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0 bg-slate-50">
              {chatMessages.length === 0 && (
                <div className="text-center text-slate-500 text-sm space-y-4">
                  <Brain className="w-12 h-12 mx-auto text-blue-600" />
                  <div>
                    <p className="font-semibold mb-2">Welcome to your AI Finance Advisor!</p>
                    <p className="text-xs">I analyze your financial data and provide personalized advice on:</p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div className="bg-white p-2 rounded border">📊 Budget Analysis</div>
                      <div className="bg-white p-2 rounded border">💰 Investment Strategy</div>
                      <div className="bg-white p-2 rounded border">🎯 Goal Planning</div>
                      <div className="bg-white p-2 rounded border">💳 Debt Management</div>
                    </div>
                  </div>
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex items-center space-x-1 mb-2 text-xs text-blue-600">
                        <Brain className="w-3 h-3" />
                        <span className="font-semibold">AI Advisor</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200 bg-white lg:rounded-b-lg">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about budgeting, investments, savings..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 border-slate-300 text-sm"
                />
                <Button 
                  onClick={handleChatSubmit}
                  className="bg-blue-600 hover:bg-blue-700 px-3"
                  size="sm"
                  disabled={!chatInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                💡 Ask specific questions like "How can I save ₦100,000 in 6 months?"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <Button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      >
        <div className="flex flex-col items-center">
          <Brain className="w-6 h-6" />
          <span className="text-xs font-semibold">AI</span>
        </div>
      </Button>
    </div>
  );
};

export default Index;
