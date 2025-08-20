import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Star, Tag, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

export default function ProductsServices() {
  const [searchQuery, setSearchQuery] = useState('');

  const productCategories = [
    {
      id: 'software',
      name: 'Software Solutions',
      count: 12,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'consulting',
      name: 'Consulting Services',
      count: 8,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'support',
      name: 'Support & Maintenance',
      count: 6,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'training',
      name: 'Training Programs',
      count: 4,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const products = [
    {
      id: '1',
      name: 'Enterprise CRM Platform',
      description: 'Comprehensive customer relationship management solution with advanced analytics and automation capabilities.',
      category: 'software',
      price: '$299/month',
      rating: 4.8,
      features: ['Lead Management', 'Sales Analytics', 'Email Integration', 'Mobile App'],
      status: 'active',
      launched: '2023-06-15',
      clients: 150,
    },
    {
      id: '2',
      name: 'Digital Transformation Consulting',
      description: 'Strategic consulting services to help organizations modernize their technology infrastructure and processes.',
      category: 'consulting',
      price: '$200/hour',
      rating: 4.9,
      features: ['Strategy Planning', 'Technology Assessment', 'Implementation Support', 'Change Management'],
      status: 'active',
      launched: '2023-03-20',
      clients: 45,
    },
    {
      id: '3',
      name: 'Project Management Suite',
      description: 'All-in-one project management tool with task tracking, team collaboration, and resource planning.',
      category: 'software',
      price: '$149/month',
      rating: 4.6,
      features: ['Task Management', 'Gantt Charts', 'Team Chat', 'Time Tracking'],
      status: 'active',
      launched: '2023-09-10',
      clients: 200,
    },
    {
      id: '4',
      name: '24/7 Technical Support',
      description: 'Round-the-clock technical support and maintenance services for all our software products.',
      category: 'support',
      price: '$99/month',
      rating: 4.7,
      features: ['24/7 Support', 'Remote Assistance', 'Regular Updates', 'Priority Queue'],
      status: 'active',
      launched: '2023-01-01',
      clients: 300,
    },
    {
      id: '5',
      name: 'Cloud Migration Services',
      description: 'Professional services to migrate your applications and data to cloud platforms safely and efficiently.',
      category: 'consulting',
      price: 'Custom Quote',
      rating: 4.8,
      features: ['Migration Planning', 'Data Transfer', 'Security Assessment', 'Post-Migration Support'],
      status: 'active',
      launched: '2023-04-12',
      clients: 75,
    },
    {
      id: '6',
      name: 'Software Development Training',
      description: 'Comprehensive training programs for software development best practices and modern technologies.',
      category: 'training',
      price: '$1,500/person',
      rating: 4.9,
      features: ['Hands-on Learning', 'Expert Instructors', 'Certification', 'Follow-up Support'],
      status: 'active',
      launched: '2023-08-01',
      clients: 120,
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'beta':
        return 'bg-blue-100 text-blue-800';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <DashboardLayout
      title="Products & Services"
      description="Explore our comprehensive portfolio of software solutions and professional services"
    >
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search products and services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-products"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {productCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer" data-testid={`card-category-${category.id}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <Tag className="h-6 w-6" />
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
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow" data-testid={`card-product-${product.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2" data-testid={`text-product-name-${product.id}`}>
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4 mb-3">
                    {renderStars(product.rating)}
                    <Badge className={getStatusColor(product.status)} variant="outline">
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                    {product.price}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4" data-testid={`text-product-description-${product.id}`}>
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-feature-${product.id}-${index}`}>
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span data-testid={`text-product-clients-${product.id}`}>{product.clients} clients</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Launched {new Date(product.launched).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button className="flex-1" data-testid={`button-learn-more-${product.id}`}>
                  Learn More
                </Button>
                <Button variant="outline" data-testid={`button-request-demo-${product.id}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Request Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No products or services found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
