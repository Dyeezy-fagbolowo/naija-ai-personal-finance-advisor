import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  TrendingDown
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

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalSavings = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalBalance = totalSavings + totalInvestments - totalExpenses;

  const handleAuth = () => {
    // Mock authentication
    setUser({ email: authData.email });
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const addInvestment = (investment) => {
    setInvestments([...investments, { ...investment, id: Date.now() }]);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return <Utensils className="w-4 h-4" />;
      case 'Transport': return <Car className="w-4 h-4" />;
      case 'Bills': return <Home className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
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
                  <h1 className="text-xl font-bold text-slate-900">Naija Finance Bank</h1>
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

              {/* Login Card */}
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

        {/* Trust Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Naija Finance Bank</h2>
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

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="w-6 h-6" />
                  <span className="font-bold">Naija Finance Bank</span>
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
                    <span>hello@naijafinancebank.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
              <p>&copy; 2024 Naija Finance Bank. All rights reserved. Licensed by CBN. NDIC Insured.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Banking Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Naija Finance Bank</h1>
                <p className="text-xs text-slate-600">Personal Banking Dashboard</p>
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

      <div className="container mx-auto px-6 py-8">
        {/* AI Recommendations */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">AI Financial Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600 bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    {rec.type === 'warning' && <AlertCircle className="w-5 h-5 text-orange-500" />}
                    {rec.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {rec.type === 'info' && <Lightbulb className="w-5 h-5 text-blue-500" />}
                    <CardTitle className="text-lg text-slate-900">{rec.title}</CardTitle>
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

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                <Wallet className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalBalance.toLocaleString()}</div>
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
              <div className="text-2xl font-bold">₦{totalExpenses.toLocaleString()}</div>
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
              <div className="text-2xl font-bold">₦{totalInvestments.toLocaleString()}</div>
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
              <div className="text-2xl font-bold">₦{totalSavings.toLocaleString()}</div>
              <p className="text-blue-100 text-xs">Across all goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Banking Tabs */}
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 h-12">
            <TabsTrigger value="expenses" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium">
              Budget Planning
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium">
              Investments
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white font-medium">
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input type="number" placeholder="Amount (₦)" className="border-slate-300" />
                  <Input type="text" placeholder="Description" className="border-slate-300" />
                  <select className="px-3 py-2 border border-slate-300 rounded-md">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Bills</option>
                    <option>Other</option>
                  </select>
                  <Button className="bg-slate-900 hover:bg-slate-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(expense.category)}
                        <div>
                          <p className="font-medium text-slate-900">{expense.description}</p>
                          <p className="text-sm text-slate-500">{expense.category} • {expense.date}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-red-600">-₦{expense.amount.toLocaleString()}</p>
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
                <div className="flex space-x-4">
                  <Input 
                    type="number" 
                    placeholder="Monthly Budget (₦)" 
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="border-slate-300"
                  />
                  <Button className="bg-slate-900 hover:bg-slate-800">Update Budget</Button>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select className="px-3 py-2 border border-slate-300 rounded-md">
                    <option>Stocks</option>
                    <option>Bonds</option>
                    <option>Real Estate</option>
                    <option>Mutual Funds</option>
                  </select>
                  <Input type="number" placeholder="Amount (₦)" className="border-slate-300" />
                  <Button className="bg-green-600 hover:bg-green-700">Add Investment</Button>
                </div>
                <div className="space-y-3">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                      <div>
                        <p className="font-medium text-slate-900">{investment.type}</p>
                        <p className="text-sm text-slate-500">₦{investment.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+{investment.returns}%</p>
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
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex justify-between items-center mb-2">
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
    </div>
  );
};

export default Index;
