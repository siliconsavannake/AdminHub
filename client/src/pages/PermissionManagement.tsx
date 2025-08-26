import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Search, Plus, Edit, Key, Shield, Lock } from 'lucide-react';

const permissionSchema = z.object({
  name: z.string().min(1, 'Permission name is required'),
  description: z.string().optional(),
  resource: z.string().min(1, 'Resource is required'),
  action: z.string().min(1, 'Action is required'),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

export default function PermissionManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: permissions = [], isLoading } = useQuery({
    queryKey: ['/api/permissions'],
  });

  const form = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: '',
      description: '',
      resource: '',
      action: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: PermissionFormData) => {
      const url = selectedPermission 
        ? `/api/permissions/${selectedPermission.id}` 
        : '/api/permissions';
      const method = selectedPermission ? 'PUT' : 'POST';
      return apiRequest(method, url, data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: `Permission ${selectedPermission ? 'updated' : 'created'} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/permissions'] });
      handleCloseModal();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${selectedPermission ? 'update' : 'create'} permission`,
        variant: 'destructive',
      });
    },
  });

  const filteredPermissions = permissions.filter((permission: any) =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPermission = () => {
    setSelectedPermission(null);
    form.reset();
    setIsModalOpen(true);
  };

  const handleEditPermission = (permission: any) => {
    setSelectedPermission(permission);
    form.reset({
      name: permission.name,
      description: permission.description || '',
      resource: permission.resource,
      action: permission.action,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPermission(null);
    form.reset();
  };

  const onSubmit = (data: PermissionFormData) => {
    mutation.mutate(data);
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'write':
        return 'bg-green-100 text-green-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const resources = [
    'users', 'roles', 'permissions', 'departments', 'mini-applications', 
    'analytics', 'settings', 'reports', 'billing', 'audit-logs'
  ];

  const actions = ['read', 'write', 'delete', 'admin', 'execute', 'approve'];

  return (
    <DashboardLayout
      title="Permission Management"
      description="Define and manage granular permissions for system resources"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-80"
            data-testid="input-search-permissions"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <Button onClick={handleAddPermission} data-testid="button-add-permission">
          <Plus className="h-4 w-4 mr-2" />
          Add Permission
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permissions</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-total-permissions">
                  {permissions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Key className="text-yellow-600 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resources</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-resources">
                  {new Set(permissions.map((p: any) => p.resource)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="text-green-600 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Action Types</p>
                <p className="text-3xl font-bold text-gray-900" data-testid="stat-action-types">
                  {new Set(permissions.map((p: any) => p.action)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="text-purple-600 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission Name</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission: any) => (
                  <TableRow key={permission.id} data-testid={`row-permission-${permission.id}`}>
                    <TableCell className="font-medium" data-testid={`text-permission-name-${permission.id}`}>
                      {permission.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {permission.resource}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getActionColor(permission.action)}
                        data-testid={`badge-permission-action-${permission.id}`}
                      >
                        {permission.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600" data-testid={`text-permission-description-${permission.id}`}>
                      {permission.description || 'No description'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(permission.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPermission(permission)}
                        data-testid={`button-edit-permission-${permission.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {filteredPermissions.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No permissions found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Permission Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle data-testid="text-modal-title">
              {selectedPermission ? 'Edit Permission' : 'Add New Permission'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permission Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter permission name" {...field} data-testid="input-permission-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="resource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resource</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-resource">
                            <SelectValue placeholder="Select resource" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resources.map((resource) => (
                            <SelectItem key={resource} value={resource}>
                              {resource}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-action">
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {actions.map((action) => (
                            <SelectItem key={action} value={action}>
                              {action}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this permission allows"
                        rows={3}
                        {...field}
                        data-testid="textarea-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={handleCloseModal} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button type="submit" disabled={mutation.isPending} data-testid="button-submit">
                  {mutation.isPending
                    ? 'Saving...'
                    : selectedPermission
                    ? 'Update Permission'
                    : 'Create Permission'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
