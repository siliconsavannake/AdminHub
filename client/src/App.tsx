import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

// Pages
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import UserDashboard from "@/pages/UserDashboard";
import MyApps from "@/pages/MyApps";
import ResourceCenter from "@/pages/ResourceCenter";
import EmployeeDirectory from "@/pages/EmployeeDirectory";
import ProductsServices from "@/pages/ProductsServices";
import RoleManagement from "@/pages/RoleManagement";
import PermissionManagement from "@/pages/PermissionManagement";
import DepartmentManagement from "@/pages/DepartmentManagement";
import UserManagement from "@/pages/UserManagement";
import EditProfile from "@/pages/EditProfile";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, adminOnly = false }: { component: React.ComponentType; adminOnly?: boolean }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <Component />;
}

function Router() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Public routes */}
      {!isAuthenticated ? (
        <Route path="/" component={Login} />
      ) : (
        <>
          {/* Dashboard routes */}
          <Route path="/" component={user?.role === 'admin' ? AdminDashboard : UserDashboard} />
          <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} adminOnly />} />
          
          {/* User routes */}
          <Route path="/my-apps" component={() => <ProtectedRoute component={MyApps} />} />
          <Route path="/resource-center" component={() => <ProtectedRoute component={ResourceCenter} />} />
          <Route path="/employee-directory" component={() => <ProtectedRoute component={EmployeeDirectory} />} />
          <Route path="/products-services" component={() => <ProtectedRoute component={ProductsServices} />} />
          <Route path="/profile" component={() => <ProtectedRoute component={EditProfile} />} />
          
          {/* Admin routes */}
          <Route path="/roles" component={() => <ProtectedRoute component={RoleManagement} adminOnly />} />
          <Route path="/permissions" component={() => <ProtectedRoute component={PermissionManagement} adminOnly />} />
          <Route path="/departments" component={() => <ProtectedRoute component={DepartmentManagement} adminOnly />} />
          <Route path="/user-management" component={() => <ProtectedRoute component={UserManagement} adminOnly />} />
        </>
      )}
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppProvider>
            <Toaster />
            <Router />
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
