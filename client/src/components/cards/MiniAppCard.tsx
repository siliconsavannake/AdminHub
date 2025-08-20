import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Settings, Eye, Users, Calendar } from 'lucide-react';
import type { MiniApplication } from '@shared/schema';

interface MiniAppCardProps {
  app: MiniApplication;
  onConfigure?: (app: MiniApplication) => void;
  onViewDetails?: (app: MiniApplication) => void;
  onLaunch?: (app: MiniApplication) => void;
  showActions?: boolean;
}

export function MiniAppCard({ app, onConfigure, onViewDetails, onLaunch, showActions = true }: MiniAppCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'maintenance':
        return 'Maintenance';
      case 'inactive':
        return 'Inactive';
      case 'development':
        return 'In Development';
      default:
        return status;
    }
  };

  const getIconGradient = (category: string) => {
    switch (category) {
      case 'HR & Payroll':
        return 'from-blue-500 to-blue-600';
      case 'Inventory':
        return 'from-green-500 to-green-600';
      case 'Project Management':
        return 'from-purple-500 to-purple-600';
      case 'Finance':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow" data-testid={`card-app-${app.id}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${getIconGradient(app.category)} rounded-xl flex items-center justify-center`}>
            <i className={`${app.icon} text-white text-lg sm:text-xl`}></i>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Badge className={`${getStatusColor(app.status)} text-xs`} variant="outline">
              {getStatusText(app.status)}
            </Badge>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" data-testid="button-app-menu">
                    <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onConfigure && (
                    <DropdownMenuItem onClick={() => onConfigure(app)} data-testid="menu-configure">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </DropdownMenuItem>
                  )}
                  {onViewDetails && (
                    <DropdownMenuItem onClick={() => onViewDetails(app)} data-testid="menu-details">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base" data-testid="text-app-name">
          {app.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2" data-testid="text-app-description">
          {app.description}
        </p>

        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 text-xs sm:text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Users className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span data-testid="text-active-users">{app.activeUsers || 0}</span> users
          </span>
          <span className="flex items-center">
            <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Updated </span>{new Date(app.updatedAt!).toLocaleDateString()}
          </span>
        </div>

        <div className="mobile-stack">
          {onLaunch ? (
            <Button 
              className="flex-1 text-sm" 
              onClick={() => onLaunch(app)} 
              disabled={app.status !== 'active'}
              data-testid="button-launch"
            >
              Launch
            </Button>
          ) : (
            <>
              {onConfigure && (
                <Button className="flex-1 text-sm" onClick={() => onConfigure(app)} data-testid="button-configure">
                  Configure
                </Button>
              )}
              {onViewDetails && (
                <Button variant="outline" className="text-sm" onClick={() => onViewDetails(app)} data-testid="button-details">
                  Details
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
