import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLocation('/dashboard');
  };

  const handleCreateAccount = () => {
    setLocation('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800">
      <div className="w-full max-w-md">
        {/* Login Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 mx-4">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <User className="text-white h-12 w-12" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Please sign in to your account</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* Username/Email Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-gray-300 font-medium">Username or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username or email"
                  className="pl-10 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  data-testid="input-username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              data-testid="button-login"
            >
              Sign In
            </Button>
          </form>

          {/* Links Section */}
          <div className="mt-6 space-y-4">
            {/* Forgot Password Link */}
            <div className="text-center">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                data-testid="link-forgot-password"
              >
                Forgot Username / Password?
              </a>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>

            {/* Create Account Link */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Don't have an account?
              </p>
              <button
                onClick={handleCreateAccount}
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-sm transition-colors underline"
                data-testid="button-create-account"
              >
                Create new account
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white text-xs opacity-75">
            © 2025 CompanyName. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}