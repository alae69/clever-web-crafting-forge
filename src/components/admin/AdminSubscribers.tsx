
import React, { useState } from 'react';
import { useContentStore, Subscriber } from '@/store/contentStore';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminSubscribers = () => {
  const { subscribers, addSubscriber, removeSubscriber } = useContentStore();
  const [newSubscriber, setNewSubscriber] = useState<Omit<Subscriber, 'dateSubscribed'>>({
    email: '',
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubscriber(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubscriber = () => {
    if (!newSubscriber.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(newSubscriber.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Check if subscriber already exists
    if (subscribers.some(sub => sub.email === newSubscriber.email)) {
      toast.error("This email is already subscribed");
      return;
    }

    const subscriber: Subscriber = {
      ...newSubscriber,
      dateSubscribed: new Date().toISOString().split('T')[0]
    };

    addSubscriber(subscriber);
    toast.success("Subscriber added successfully");
    setNewSubscriber({ email: '', name: '' });
  };

  const handleRemoveSubscriber = (email: string) => {
    removeSubscriber(email);
    toast.success("Subscriber removed successfully");
  };

  // Simple email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
        <CardDescription>Manage your newsletter subscribers</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date Subscribed</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.length > 0 ? (
                subscribers.map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{subscriber.name || 'N/A'}</TableCell>
                    <TableCell>{subscriber.dateSubscribed}</TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveSubscriber(subscriber.email)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">No subscribers yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Add New Subscriber</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Input
                name="email"
                value={newSubscriber.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            <div>
              <Input
                name="name"
                value={newSubscriber.name}
                onChange={handleChange}
                placeholder="Name (optional)"
              />
            </div>
          </div>
          <Button onClick={handleAddSubscriber}>Add Subscriber</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          Total Subscribers: {subscribers.length}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminSubscribers;
