
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  // Store settings state
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'NajihKids',
    storeEmail: 'contact@najihkids.com',
    storePhone: '+212 520 123 456',
    storeAddress: 'Marrakech, Morocco',
    currency: 'MAD',
    taxRate: 20,
  });
  
  // Shipping settings state
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 500,
    standardShippingCost: 50,
    expressShippingCost: 100,
    internationalShipping: true,
    trackingEnabled: true,
  });
  
  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    codEnabled: true,
    bankTransferEnabled: true,
    creditCardEnabled: false,
    paypalEnabled: false,
    cryptoEnabled: false,
  });
  
  const handleStoreChange = (field: string, value: string | number) => {
    setStoreSettings({
      ...storeSettings,
      [field]: value
    });
  };
  
  const handleShippingChange = (field: string, value: number | boolean) => {
    setShippingSettings({
      ...shippingSettings,
      [field]: value
    });
  };
  
  const handlePaymentChange = (field: string, value: boolean) => {
    setPaymentSettings({
      ...paymentSettings,
      [field]: value
    });
  };
  
  const handleSaveSettings = (settingType: string) => {
    toast({
      title: "Settings saved",
      description: `${settingType} settings have been updated successfully.`,
    });
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Settings className="mr-2 h-6 w-6" />
          Store Settings
        </h1>
        <Link to="/admin">
          <Button variant="outline">Back to Admin</Button>
        </Link>
      </div>
      
      <Tabs defaultValue="store" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) => handleStoreChange('storeName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={(e) => handleStoreChange('storeEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.storePhone}
                    onChange={(e) => handleStoreChange('storePhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Input
                    id="storeAddress"
                    value={storeSettings.storeAddress}
                    onChange={(e) => handleStoreChange('storeAddress', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={storeSettings.currency}
                    onChange={(e) => handleStoreChange('currency', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={storeSettings.taxRate}
                    onChange={(e) => handleStoreChange('taxRate', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Store')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure your shipping options and prices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (MAD)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) => handleShippingChange('freeShippingThreshold', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="standardShippingCost">Standard Shipping Cost (MAD)</Label>
                  <Input
                    id="standardShippingCost"
                    type="number"
                    value={shippingSettings.standardShippingCost}
                    onChange={(e) => handleShippingChange('standardShippingCost', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expressShippingCost">Express Shipping Cost (MAD)</Label>
                  <Input
                    id="expressShippingCost"
                    type="number"
                    value={shippingSettings.expressShippingCost}
                    onChange={(e) => handleShippingChange('expressShippingCost', Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="internationalShipping"
                    checked={shippingSettings.internationalShipping}
                    onCheckedChange={(checked) => handleShippingChange('internationalShipping', checked)}
                  />
                  <Label htmlFor="internationalShipping">Enable International Shipping</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trackingEnabled"
                    checked={shippingSettings.trackingEnabled}
                    onCheckedChange={(checked) => handleShippingChange('trackingEnabled', checked)}
                  />
                  <Label htmlFor="trackingEnabled">Enable Order Tracking</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Shipping')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure available payment methods for your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="codEnabled"
                    checked={paymentSettings.codEnabled}
                    onCheckedChange={(checked) => handlePaymentChange('codEnabled', checked)}
                  />
                  <Label htmlFor="codEnabled">Cash on Delivery</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="bankTransferEnabled"
                    checked={paymentSettings.bankTransferEnabled}
                    onCheckedChange={(checked) => handlePaymentChange('bankTransferEnabled', checked)}
                  />
                  <Label htmlFor="bankTransferEnabled">Bank Transfer</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="creditCardEnabled"
                    checked={paymentSettings.creditCardEnabled}
                    onCheckedChange={(checked) => handlePaymentChange('creditCardEnabled', checked)}
                  />
                  <Label htmlFor="creditCardEnabled">Credit Card</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="paypalEnabled"
                    checked={paymentSettings.paypalEnabled}
                    onCheckedChange={(checked) => handlePaymentChange('paypalEnabled', checked)}
                  />
                  <Label htmlFor="paypalEnabled">PayPal</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="cryptoEnabled"
                    checked={paymentSettings.cryptoEnabled}
                    onCheckedChange={(checked) => handlePaymentChange('cryptoEnabled', checked)}
                  />
                  <Label htmlFor="cryptoEnabled">Cryptocurrency</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Payment')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
