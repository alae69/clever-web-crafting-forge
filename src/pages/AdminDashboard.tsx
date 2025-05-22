
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminCountdown from '@/components/admin/AdminCountdown';
import AdminSubscribers from '@/components/admin/AdminSubscribers';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="countdown" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="countdown">Countdown</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="countdown" className="space-y-8">
          <AdminCountdown />
        </TabsContent>
        
        <TabsContent value="subscribers" className="space-y-8">
          <AdminSubscribers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
