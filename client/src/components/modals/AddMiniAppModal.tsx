import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAppContext } from '@/contexts/AppContext';
import { isUnauthorizedError } from '@/lib/authUtils';

const miniAppSchema = z.object({
  name: z.string().min(1, 'Application name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().min(1, 'Icon is required'),
  url: z.string().url().optional(),
  status: z.string().default('active'),
});

type MiniAppFormData = z.infer<typeof miniAppSchema>;

export function AddMiniAppModal() {
  const { isAddAppModalOpen, setIsAddAppModalOpen, selectedApp, setSelectedApp } = useAppContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<MiniAppFormData>({
    resolver: zodResolver(miniAppSchema),
    defaultValues: {
      name: selectedApp?.name || '',
      description: selectedApp?.description || '',
      category: selectedApp?.category || '',
      icon: selectedApp?.icon || '',
      url: selectedApp?.url || '',
      status: selectedApp?.status || 'active',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: MiniAppFormData) => {
      const url = selectedApp ? `/api/mini-applications/${selectedApp.id}` : '/api/mini-applications';
      const method = selectedApp ? 'PUT' : 'POST';
      return apiRequest(method, url, data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: `Mini application ${selectedApp ? 'updated' : 'created'} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/mini-applications'] });
      handleClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: 'Unauthorized',
          description: 'You are logged out. Logging in again...',
          variant: 'destructive',
        });
        setTimeout(() => {
          window.location.href = '/api/login';
        }, 500);
        return;
      }
      toast({
        title: 'Error',
        description: `Failed to ${selectedApp ? 'update' : 'create'} mini application`,
        variant: 'destructive',
      });
    },
  });

  const handleClose = () => {
    setIsAddAppModalOpen(false);
    setSelectedApp(null);
    form.reset();
  };

  const onSubmit = (data: MiniAppFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isAddAppModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {selectedApp ? 'Edit Mini Application' : 'Add New Mini Application'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter application name" {...field} data-testid="input-app-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HR & Payroll">HR & Payroll</SelectItem>
                        <SelectItem value="Project Management">Project Management</SelectItem>
                        <SelectItem value="Inventory">Inventory</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
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
                      placeholder="Describe the application's purpose and functionality"
                      rows={3}
                      {...field}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-icon">
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fas fa-user-tie">👔 User Tie</SelectItem>
                        <SelectItem value="fas fa-boxes">📦 Boxes</SelectItem>
                        <SelectItem value="fas fa-chart-line">📈 Chart</SelectItem>
                        <SelectItem value="fas fa-project-diagram">🔄 Project</SelectItem>
                        <SelectItem value="fas fa-cogs">⚙️ Settings</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="development">In Development</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application URL (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/app" 
                      type="url" 
                      {...field} 
                      data-testid="input-url" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={handleClose} data-testid="button-cancel">
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending} data-testid="button-submit">
                {mutation.isPending
                  ? 'Saving...'
                  : selectedApp
                  ? 'Update Application'
                  : 'Create Application'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
