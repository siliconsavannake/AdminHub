import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MiniAppCard } from '@/components/cards/MiniAppCard';
import { UserCard } from '@/components/cards/UserCard';
import { AddMiniAppModal } from '@/components/modals/AddMiniAppModal';
import { AddUserModal } from '@/components/modals/AddUserModal';
import { RoleModal } from '@/components/modals/RoleModal';
import { useAppContext } from '@/contexts/AppContext';
import {
  Plus,
  UserPlus,
  Tags,
  Download,
  ALargeSmall,
  Users,
  Table,
  Key,
  ArrowUp,
  Bus,
  ServerCog,
  Calendar,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    setIsAddAppModalOpen,
    setIsAddUserModalOpen,
    setIsRoleModalOpen,
    setSelectedApp,
    setSelectedRole,
  } = useAppContext();

  const { data: statistics, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/analytics/statistics'],
  });

  const { data: miniApplications = [], isLoading: appsLoading } = useQuery({
    queryKey: ['/api/mini-applications'],
  });

  const { data: recentActivity = [], isLoading: activityLoading } = useQuery({
    queryKey: ['/api/analytics/activity'],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  const handleAddApp = () => {
    setSelectedApp(null);
    setIsAddAppModalOpen(true);
  };

  const handleConfigureApp = (app: any) => {
    setSelectedApp(app);
    setIsAddAppModalOpen(true);
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setIsRoleModalOpen(true);
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="Manage mini applications, users, and permissions"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mini Apps</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-total-apps">
                  {statsLoading ? '...' : statistics?.totalApps || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <ALargeSmall className="text-primary h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                8%
              </span>
              <span className="text-gray-600 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-active-users">
                  {statsLoading ? '...' : statistics?.activeUsers || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="text-green-600 h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                12%
              </span>
              <span className="text-gray-600 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-departments">
                  {statsLoading ? '...' : statistics?.departments || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Table className="text-yellow-600 h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600 flex items-center">
                0%
              </span>
              <span className="text-gray-600 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Permission Groups</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-permissions">
                  {statsLoading ? '...' : statistics?.permissionGroups || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Key className="text-orange-600 h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                3%
              </span>
              <span className="text-gray-600 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleAddApp} className="flex items-center" data-testid="button-add-app">
            <Plus className="mr-2 h-4 w-4" />
            Add Mini App
          </Button>
          <Button 
            onClick={() => setIsAddUserModalOpen(true)} 
            className="flex items-center bg-green-600 hover:bg-green-700" 
            data-testid="button-add-user"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <Button 
            onClick={handleAddRole} 
            className="flex items-center bg-yellow-600 hover:bg-yellow-700" 
            data-testid="button-manage-roles"
          >
            <Tags className="mr-2 h-4 w-4" />
            Manage Roles
          </Button>
          <Button variant="outline" className="flex items-center" data-testid="button-export">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Mini Applications Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Mini Applications</h2>
          <div className="flex items-center space-x-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48" data-testid="select-category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hr-payroll">HR & Payroll</SelectItem>
                <SelectItem value="project-management">Project Management</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {appsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {miniApplications.map((app: any) => (
              <MiniAppCard
                key={app.id}
                app={app}
                onConfigure={handleConfigureApp}
                onViewDetails={(app) => console.log('View details:', app)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity & User Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
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
                {recentActivity.slice(0, 5).map((activity: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bus className="text-primary h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900" data-testid={`activity-${index}`}>
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span>{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button variant="link" className="mt-4 p-0 h-auto text-primary">
              View all activity
            </Button>
          </CardContent>
        </Card>

        {/* User Management Quick View */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">User Management</CardTitle>
            <Button variant="link" className="p-0 h-auto text-primary">
              View all users
            </Button>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {users.slice(0, 3).map((user: any) => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    onEdit={(user) => console.log('Edit user:', user)} 
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddMiniAppModal />
      <AddUserModal />
      <RoleModal />
    </DashboardLayout>
  );
}
