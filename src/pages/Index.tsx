
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

  const getFinancialAdvice = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('budget')) {
      return "For effective budgeting in Nigeria, use the 50-30-20 rule: 50% for needs (rent, food), 30% for wants (entertainment), and 20% for savings. Track your expenses in Naira and adjust based on your income level.";
    }
    if (lowerMessage.includes('investment') || lowerMessage.includes('invest')) {
      return "Nigerian investment options include: Treasury Bills (low risk, 10-15% returns), Mutual Funds (medium risk), Nigerian Stock Exchange stocks (higher risk), and Real Estate. Start with Treasury Bills if you're new to investing.";
    }
    if (lowerMessage.includes('saving') || lowerMessage.includes('save')) {
      return "Build an emergency fund of 6 months expenses first. Then save for specific goals. Use high-yield savings accounts or fixed deposits. Automate your savings to make it consistent.";
    }
    if (lowerMessage.includes('debt')) {
      return "Prioritize high-interest debt first. List all debts, pay minimums on all, then extra on highest interest rate debt. Avoid borrowing for wants, only for needs or investments.";
    }
    if (lowerMessage.includes('retirement')) {
      return "Start your Retirement Savings Account (RSA) early. Contribute beyond the mandatory 8% if possible. Consider additional voluntary contributions for tax benefits and better retirement.";
    }
    if (lowerMessage.includes('business')) {
      return "Before starting a business in Nigeria, save 6-12 months of operating expenses. Research your market, get proper registration, and maintain separate business and personal finances.";
    }
    return "I can help with budgeting, investments, savings, debt management, retirement planning, and business finance. What specific area would you like advice on?";
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', content: chatInput };
    const botResponse = { type: 'bot', content: getFinancialAdvice(chatInput) };
    
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
                      const amount = document.getElementById('expense-amount').value;
                      const description = document.getElementById('expense-description').value;
                      const category = document.getElementById('expense-category').value;
                      
                      if (amount && description) {
                        addExpense({
                          amount: Number(amount),
                          description,
                          category
                        });
                        document.getElementById('expense-amount').value = '';
                        document.getElementById('expense-description').value = '';
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
                      const type = document.getElementById('investment-type').value;
                      const amount = document.getElementById('investment-amount').value;
                      
                      if (amount) {
                        addInvestment({
                          type,
                          amount: Number(amount),
                          returns: Math.random() * 15 + 5 // Random returns between 5-20%
                        });
                        document.getElementById('investment-amount').value = '';
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
                      const title = document.getElementById('goal-title').value;
                      const target = document.getElementById('goal-target').value;
                      const current = document.getElementById('goal-current').value;
                      
                      if (title && target) {
                        addGoal({
                          title,
                          target: Number(target),
                          current: Number(current) || 0,
                          priority: 'Medium'
                        });
                        document.getElementById('goal-title').value = '';
                        document.getElementById('goal-target').value = '';
                        document.getElementById('goal-current').value = '';
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

      {/* Smart Chatbot */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:bg-transparent lg:inset-auto lg:bottom-4 lg:right-4 lg:w-80">
          <div className="absolute bottom-0 left-0 right-0 bg-white lg:relative lg:rounded-lg lg:shadow-xl lg:border border-slate-200 max-h-[90vh] lg:max-h-96 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">AI Finance Advisor</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowChatbot(false)}
                className="p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
              {chatMessages.length === 0 && (
                <div className="text-center text-slate-500 text-sm">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p>Ask me about budgeting, investing, saving, or any financial advice!</p>
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about your finances..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 border-slate-300"
                />
                <Button 
                  onClick={handleChatSubmit}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <Button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Index;
