import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MiniAppCard } from '@/components/cards/MiniAppCard';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function MyApps() {
  const { user } = useAuth();

  const { data: userApps = [], isLoading } = useQuery({
    queryKey: ['/api/mini-applications/user', user?.id],
    enabled: !!user?.id,
  });

  const handleLaunchApp = (app: any) => {
    if (app.url) {
      window.open(app.url, '_blank');
    } else {
      console.log('Launching app:', app);
    }
  };

  return (
    <DashboardLayout title="My Apps" description="Your assigned mini applications">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : userApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userApps.map((app: any) => (
            <MiniAppCard
              key={app.id}
              app={app}
              onLaunch={handleLaunchApp}
              showActions={false}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No applications assigned yet. Contact your administrator for access.</p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
