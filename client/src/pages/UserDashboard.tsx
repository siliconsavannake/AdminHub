import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MiniAppCard } from '@/components/cards/MiniAppCard';
import { useAuthContext } from '@/contexts/AuthContext';
import { CheckCircle, FileText, Clock, File, HelpCircle, Calendar } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuthContext();

  const { data: userApps = [], isLoading: appsLoading } = useQuery({
    queryKey: ['/api/mini-applications/user', user?.id],
    enabled: !!user?.id,
  });

  const { data: recentActivity = [], isLoading: activityLoading } = useQuery({
    queryKey: ['/api/analytics/activity'],
  });

  const handleLaunchApp = (app: any) => {
    if (app.url) {
      window.open(app.url, '_blank');
    } else {
      console.log('Launching app:', app);
    }
  };

  return (
    <DashboardLayout
      title="My Applications"
      description="Access your assigned mini applications and resources"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-yellow-700 rounded-xl text-black p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-2" data-testid="text-welcome">
          Welcome back, {user?.firstName}!
        </h2>
        <p className="text-yellow-100 text-sm sm:text-base">
          You have access to {userApps.length} mini applications. Check your notifications for recent updates.
        </p>
      </div>

      {/* User's Mini Applications */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Your Applications</h2>
        {appsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-24 sm:h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : userApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {userApps.map((app: any) => (
              <MiniAppCard
                key={app.id}
                app={app}
                onLaunch={handleLaunchApp}
                showActions={false}
              />
            ))}
            
            {/* Example of restricted app */}
            <Card className="opacity-60" data-testid="card-restricted-app">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                    <i className="fas fa-boxes text-gray-500 text-lg sm:text-xl"></i>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    Restricted
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 mb-2 text-sm sm:text-base">Inventory System</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                  This application requires additional permissions. Contact your administrator.
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  Access level: No permission
                </div>
                <button disabled className="w-full px-3 py-2 text-sm bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
                  Request Access
                </button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No applications assigned yet. Contact your administrator for access.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activity & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-3 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-primary h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Completed task "Q4 Marketing Analysis"</p>
                    <p className="text-xs text-gray-500">Project Tracker • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="text-green-600 h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Submitted expense report for approval</p>
                    <p className="text-xs text-gray-500">HR Portal • 1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-yellow-600 h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Updated project timeline</p>
                    <p className="text-xs text-gray-500">Project Tracker • 2 days ago</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors" data-testid="link-handbook">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <File className="text-yellow-600 h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Employee Handbook</p>
                  <p className="text-xs text-gray-500">Updated policies and procedures</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors" data-testid="link-help">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="text-green-600 h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Help Center</p>
                  <p className="text-xs text-gray-500">Get support and tutorials</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors" data-testid="link-calendar">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-purple-600 h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Company Calendar</p>
                  <p className="text-xs text-gray-500">Upcoming events and meetings</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
