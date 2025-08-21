import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, isLoading]);

  const handleGoogleLogin = () => {
    window.location.href = '/api/login';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-yellow-700 dark:from-primary dark:to-yellow-800 items-center justify-center">
        <div className="text-center text-white dark:text-white">
          <div className="w-24 h-24 bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-8">
            <Building className="text-4xl text-white h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4">CompanyName</h1>
          <p className="text-xl text-yellow-100 dark:text-yellow-200">Mini Application Management Platform</p>
          <div className="mt-8 space-y-4 text-left">
            <div className="flex items-center text-yellow-100 dark:text-yellow-200">
              <div className="w-2 h-2 bg-yellow-100 dark:bg-yellow-200 rounded-full mr-3"></div>
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center text-yellow-100 dark:text-yellow-200">
              <div className="w-2 h-2 bg-yellow-100 dark:bg-yellow-200 rounded-full mr-3"></div>
              <span>Secure domain authentication</span>
            </div>
            <div className="flex items-center text-yellow-100 dark:text-yellow-200">
              <div className="w-2 h-2 bg-yellow-100 dark:bg-yellow-200 rounded-full mr-3"></div>
              <span>Mini application management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="lg:hidden w-16 h-16 bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building className="text-2xl text-primary h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Sign in to access your dashboard</p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            data-testid="button-google-login"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Organization domain required</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Only accounts with @companyname.com domain can access this dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
