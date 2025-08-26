import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Login() {
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation('/dashboard');
  };

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
              <span>Comprehensive dashboard views</span>
            </div>
            <div className="flex items-center text-yellow-100 dark:text-yellow-200">
              <div className="w-2 h-2 bg-yellow-100 dark:bg-yellow-200 rounded-full mr-3"></div>
              <span>Direct access to applications</span>
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
            onClick={handleContinue}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
            data-testid="button-continue-dashboard"
          >
            <Building className="w-5 h-5 mr-3" />
            Continue to Dashboard
          </Button>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Click the button above to access your dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
