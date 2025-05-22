
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample customer data - in a real app, this would come from a store or API
const customers = [
  { id: 1, name: 'Ahmed Belmehdi', email: 'ahmed@example.com', orders: 3, totalSpent: 1250 },
  { id: 2, name: 'Fatima Alaoui', email: 'fatima@example.com', orders: 5, totalSpent: 2780 },
  { id: 3, name: 'Mohammed Tazi', email: 'mohammed@example.com', orders: 2, totalSpent: 890 },
  { id: 4, name: 'Laila Bennani', email: 'laila@example.com', orders: 8, totalSpent: 3450 },
  { id: 5, name: 'Karim Idrissi', email: 'karim@example.com', orders: 1, totalSpent: 350 },
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredCustomers = customers.filter(
    customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6" />
          Customer Management
        </h1>
        <Link to="/admin">
          <Button variant="outline">Back to Admin</Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search customers by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent (MAD)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
