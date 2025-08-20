import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Building,
  ALargeSmall,
  Book,
  Users,
  Briefcase,
  Settings,
  Tags,
  Key,
  Table,
  UserCog,
  ChevronDown,
  Home,
  UserPen,
  LogOut,
} from 'lucide-react';

export function Sidebar() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuthContext();
  const { searchQuery, setSearchQuery } = useAppContext();

  if (!isAuthenticated || !user) {
    return null;
  }

  const isAdmin = user.role === 'admin';
  const userInitials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U';

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const isActiveRoute = (route: string) => {
    return location === route || location.startsWith(route);
  };

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search mini applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Company Logo & Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Building className="text-primary h-5 w-5" />
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">CompanyName</span>
          </div>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary justify-start"
              data-testid="button-profile"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profileImageUrl || ''} />
                <AvatarFallback className="bg-gradient-to-r from-primary to-blue-600 text-white font-medium">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <ChevronDown className="text-gray-400 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center" data-testid="link-dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center" data-testid="link-profile">
                <UserPen className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600" data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {/* Static Navigation Items */}
          <Link href="/my-apps">
            <Button
              variant={isActiveRoute('/my-apps') ? 'default' : 'ghost'}
              className="w-full justify-start"
              data-testid="link-my-apps"
            >
              <ALargeSmall className="mr-3 h-4 w-4" />
              My Apps
            </Button>
          </Link>
          
          <Link href="/resource-center">
            <Button
              variant={isActiveRoute('/resource-center') ? 'default' : 'ghost'}
              className="w-full justify-start"
              data-testid="link-resource-center"
            >
              <Book className="mr-3 h-4 w-4" />
              Resource Center
            </Button>
          </Link>
          
          <Link href="/employee-directory">
            <Button
              variant={isActiveRoute('/employee-directory') ? 'default' : 'ghost'}
              className="w-full justify-start"
              data-testid="link-employee-directory"
            >
              <Users className="mr-3 h-4 w-4" />
              Employee Directory
            </Button>
          </Link>
          
          <Link href="/products-services">
            <Button
              variant={isActiveRoute('/products-services') ? 'default' : 'ghost'}
              className="w-full justify-start"
              data-testid="link-products-services"
            >
              <Briefcase className="mr-3 h-4 w-4" />
              Product and Services
            </Button>
          </Link>

          {/* Admin Only Navigation */}
          {isAdmin && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Administration
              </p>
              
              <Link href="/admin">
                <Button
                  variant={isActiveRoute('/admin') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  data-testid="link-admin-dashboard"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Admin Dashboard
                </Button>
              </Link>
              
              <Link href="/roles">
                <Button
                  variant={isActiveRoute('/roles') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  data-testid="link-roles"
                >
                  <Tags className="mr-3 h-4 w-4" />
                  Roles
                </Button>
              </Link>
              
              <Link href="/permissions">
                <Button
                  variant={isActiveRoute('/permissions') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  data-testid="link-permissions"
                >
                  <Key className="mr-3 h-4 w-4" />
                  Permissions
                </Button>
              </Link>
              
              <Link href="/departments">
                <Button
                  variant={isActiveRoute('/departments') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  data-testid="link-departments"
                >
                  <Table className="mr-3 h-4 w-4" />
                  Departments
                </Button>
              </Link>
              
              <Link href="/user-management">
                <Button
                  variant={isActiveRoute('/user-management') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  data-testid="link-user-management"
                >
                  <UserCog className="mr-3 h-4 w-4" />
                  User Management
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
