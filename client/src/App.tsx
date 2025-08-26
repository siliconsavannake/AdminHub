import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
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
import ApplicationManagement from "@/pages/ApplicationManagement";
import EditProfile from "@/pages/EditProfile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Login route */}
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Dashboard routes */}
      <Route path="/dashboard" component={AdminDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      
      {/* User routes */}
      <Route path="/my-apps" component={MyApps} />
      <Route path="/resource-center" component={ResourceCenter} />
      <Route path="/employee-directory" component={EmployeeDirectory} />
      <Route path="/products-services" component={ProductsServices} />
      <Route path="/profile" component={EditProfile} />
      
      {/* Management routes */}
      <Route path="/roles" component={RoleManagement} />
      <Route path="/permissions" component={PermissionManagement} />
      <Route path="/departments" component={DepartmentManagement} />
      <Route path="/user-management" component={UserManagement} />
      <Route path="/applications" component={ApplicationManagement} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppProvider>
            <Toaster />
            <Router />
          </AppProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
