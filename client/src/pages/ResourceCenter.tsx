import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Video, Download, ExternalLink, BookOpen, Users } from 'lucide-react';
import { useState } from 'react';

export default function ResourceCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const resourceCategories = [
    {
      id: 'policies',
      name: 'Policies & Procedures',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      count: 12,
    },
    {
      id: 'training',
      name: 'Training Materials',
      icon: Video,
      color: 'bg-green-100 text-green-600',
      count: 8,
    },
    {
      id: 'forms',
      name: 'Forms & Templates',
      icon: Download,
      color: 'bg-purple-100 text-purple-600',
      count: 15,
    },
    {
      id: 'guides',
      name: 'User Guides',
      icon: BookOpen,
      color: 'bg-orange-100 text-orange-600',
      count: 6,
    },
  ];

  const resources = [
    {
      id: '1',
      title: 'Employee Handbook 2024',
      description: 'Complete guide to company policies, benefits, and procedures',
      category: 'policies',
      type: 'PDF',
      size: '2.4 MB',
      lastUpdated: '2024-01-15',
      url: '#',
    },
    {
      id: '2',
      title: 'IT Security Training',
      description: 'Mandatory cybersecurity awareness training for all employees',
      category: 'training',
      type: 'Video',
      size: '45 min',
      lastUpdated: '2024-01-10',
      url: '#',
    },
    {
      id: '3',
      title: 'Expense Report Template',
      description: 'Standard template for submitting business expense reports',
      category: 'forms',
      type: 'Excel',
      size: '156 KB',
      lastUpdated: '2024-01-08',
      url: '#',
    },
    {
      id: '4',
      title: 'HR Portal User Guide',
      description: 'Step-by-step guide for using the HR management system',
      category: 'guides',
      type: 'PDF',
      size: '1.8 MB',
      lastUpdated: '2024-01-05',
      url: '#',
    },
    {
      id: '5',
      title: 'Remote Work Policy',
      description: 'Guidelines and requirements for remote work arrangements',
      category: 'policies',
      type: 'PDF',
      size: '892 KB',
      lastUpdated: '2024-01-03',
      url: '#',
    },
    {
      id: '6',
      title: 'Project Management Best Practices',
      description: 'Training module on effective project management techniques',
      category: 'training',
      type: 'Video',
      size: '32 min',
      lastUpdated: '2023-12-28',
      url: '#',
    },
  ];

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-800';
      case 'Video':
        return 'bg-blue-100 text-blue-800';
      case 'Excel':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout
      title="Resource Center"
      description="Access company documents, training materials, and helpful resources"
    >
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-resources"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {resourceCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer" data-testid={`card-category-${category.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" data-testid={`badge-count-${category.id}`}>
                    {category.count}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mt-4" data-testid={`text-category-name-${category.id}`}>
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Resources</span>
            <span className="text-sm font-normal text-gray-500">
              {filteredResources.length} resources
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                data-testid={`resource-${resource.id}`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900" data-testid={`text-resource-title-${resource.id}`}>
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 truncate" data-testid={`text-resource-description-${resource.id}`}>
                      {resource.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Updated {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getTypeColor(resource.type)} variant="outline">
                    {resource.type}
                  </Badge>
                  <Button variant="outline" size="sm" data-testid={`button-download-${resource.id}`}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" data-testid={`button-view-${resource.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No resources found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
