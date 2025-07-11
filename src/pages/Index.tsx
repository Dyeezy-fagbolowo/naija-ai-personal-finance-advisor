
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
  Lightbulb
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Naija Finance AI
                </h1>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              AI-Powered Personal Finance
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take control of your finances with intelligent insights, personalized recommendations, 
              and automated tracking designed for Nigerian financial needs.
            </p>
          </div>

          {/* Auth Card */}
          <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </CardTitle>
              <CardDescription>
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={authData.email}
                onChange={(e) => setAuthData({...authData, email: e.target.value})}
                className="h-12"
              />
              <Input
                type="password"
                placeholder="Enter your password"
                value={authData.password}
                onChange={(e) => setAuthData({...authData, password: e.target.value})}
                className="h-12"
              />
              <Button 
                onClick={handleAuth} 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
              <p className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <Card className="text-center border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>
                  Get personalized financial advice powered by artificial intelligence
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Smart Tracking</CardTitle>
                <CardDescription>
                  Automatically categorize and analyze your spending patterns
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Goal Planning</CardTitle>
                <CardDescription>
                  Set and achieve your financial goals with intelligent planning
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Naija Finance AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user.email}</span>
              <Button 
                onClick={() => setUser(null)} 
                variant="outline" 
                size="sm"
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* AI Recommendations */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">AI Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    {rec.type === 'warning' && <AlertCircle className="w-5 h-5 text-orange-500" />}
                    {rec.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {rec.type === 'info' && <Brain className="w-5 h-5 text-blue-500" />}
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{rec.message}</p>
                  <Badge variant="outline" className="text-xs">
                    {rec.action}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalBalance.toLocaleString()}</div>
              <p className="text-blue-100 text-xs">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <Minus className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalExpenses.toLocaleString()}</div>
              <p className="text-red-100 text-xs">{((totalExpenses / budget) * 100).toFixed(1)}% of budget</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Investments</CardTitle>
                <TrendingUp className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalInvestments.toLocaleString()}</div>
              <p className="text-green-100 text-xs">+8.5% average return</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <PiggyBank className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalSavings.toLocaleString()}</div>
              <p className="text-purple-100 text-xs">Across all goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="expenses" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Expenses
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Budget
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Investments
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>Track and categorize your daily expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input type="number" placeholder="Amount (₦)" />
                  <Input type="text" placeholder="Description" />
                  <select className="px-3 py-2 border rounded-md">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Bills</option>
                    <option>Other</option>
                  </select>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </Button>
                </div>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(expense.category)}
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>Set and monitor your monthly spending limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-4">
                  <Input 
                    type="number" 
                    placeholder="Monthly Budget (₦)" 
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                  <Button>Update Budget</Button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Budget Progress</span>
                    <span>{((totalExpenses / budget) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(totalExpenses / budget) * 100} className="w-full" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Spent</p>
                      <p className="font-semibold">₦{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Remaining</p>
                      <p className="font-semibold text-green-600">₦{(budget - totalExpenses).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Manage your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select className="px-3 py-2 border rounded-md">
                    <option>Stocks</option>
                    <option>Bonds</option>
                    <option>Real Estate</option>
                    <option>Mutual Funds</option>
                  </select>
                  <Input type="number" placeholder="Amount (₦)" />
                  <Button className="bg-green-600 hover:bg-green-700">Add Investment</Button>
                </div>
                <div className="space-y-3">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{investment.type}</p>
                        <p className="text-sm text-gray-500">₦{investment.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+{investment.returns}%</p>
                        <p className="text-sm text-gray-500">Returns</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Financial Goals</CardTitle>
                <CardDescription>Set and track your financial objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <Badge variant={goal.priority === 'High' ? 'destructive' : 'secondary'}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>₦{goal.current.toLocaleString()}</span>
                          <span>₦{goal.target.toLocaleString()}</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} />
                        <p className="text-sm text-gray-600">
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
