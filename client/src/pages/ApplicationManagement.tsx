import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MiniAppCard } from '@/components/cards/MiniAppCard';
import { AddMiniAppModal } from '@/components/modals/AddMiniAppModal';
import { useAppContext } from '@/contexts/AppContext';
import { useState } from 'react';
import { Search, Plus, ALargeSmall, ArrowUp } from 'lucide-react';

export default function ApplicationManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const {
    setIsAddAppModalOpen,
    setSelectedApp,
  } = useAppContext();

  const { data: miniApplications = [], isLoading: appsLoading } = useQuery({
    queryKey: ['/api/mini-applications'],
  });

  const { data: statistics } = useQuery({
    queryKey: ['/api/analytics/statistics'],
  });

  const filteredApplications = miniApplications.filter((app: any) => {
    const matchesSearch = 
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddApp = () => {
    setSelectedApp(null);
    setIsAddAppModalOpen(true);
  };

  const handleConfigureApp = (app: any) => {
    setSelectedApp(app);
    setIsAddAppModalOpen(true);
  };

  const getStatusCounts = () => {
    const statusCounts = miniApplications.reduce((acc: any, app: any) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});
    return statusCounts;
  };

  const statusCounts = getStatusCounts();

  return (
    <DashboardLayout
      title="Application Management"
      description="Manage and configure all mini applications in the system"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
              data-testid="input-search-applications"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48" data-testid="select-category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="HR & Payroll">HR & Payroll</SelectItem>
              <SelectItem value="Project Management">Project Management</SelectItem>
              <SelectItem value="Inventory">Inventory</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48" data-testid="select-status-filter">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleAddApp} data-testid="button-add-application">
          <Plus className="h-4 w-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Apps</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="stat-total-apps">
                  {miniApplications.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 rounded-lg flex items-center justify-center">
                <ALargeSmall className="text-primary h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 dark:text-green-400 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                8%
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="stat-active-apps">
                  {statusCounts.active || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                <ALargeSmall className="text-green-600 dark:text-green-400 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Maintenance</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="stat-maintenance-apps">
                  {statusCounts.maintenance || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center">
                <ALargeSmall className="text-yellow-600 dark:text-yellow-400 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Development</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="stat-development-apps">
                  {statusCounts.development || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                <ALargeSmall className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-results-count">
          {filteredApplications.length} applications found
        </p>
      </div>

      {/* Applications Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {appsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApplications.map((app: any) => (
                <MiniAppCard
                  key={app.id}
                  app={app}
                  onConfigure={handleConfigureApp}
                  onViewDetails={(app) => console.log('View details:', app)}
                />
              ))}
            </div>
          )}

          {filteredApplications.length === 0 && !appsLoading && (
            <div className="text-center py-12">
              <ALargeSmall className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No applications found</p>
              <p className="text-gray-400 dark:text-gray-500 mb-6">
                {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first application'}
              </p>
              <Button onClick={handleAddApp} data-testid="button-add-first-app">
                <Plus className="h-4 w-4 mr-2" />
                Add Application
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddMiniAppModal />
    </DashboardLayout>
  );
}