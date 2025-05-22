
import React, { useState } from 'react';
import { useContentStore, CountdownSettings } from '@/store/contentStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AdminCountdown = () => {
  const { countdown, updateCountdown } = useContentStore();
  const [settings, setSettings] = useState<CountdownSettings>({
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
    enabled: countdown.enabled
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === 'enabled' ? (e.target as HTMLInputElement).checked : parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    updateCountdown(settings);
    toast.success("Countdown settings updated successfully");
  };

  const handleReset = () => {
    setSettings({
      days: countdown.days,
      hours: countdown.hours,
      minutes: countdown.minutes,
      seconds: countdown.seconds,
      enabled: countdown.enabled
    });
    toast.info("Changes reverted");
  };

  const handleToggleEnable = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      enabled: checked
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summer Collection Countdown</CardTitle>
        <CardDescription>Manage the countdown timer for your summer collection promotion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <Switch 
            id="countdown-enabled" 
            checked={settings.enabled}
            onCheckedChange={handleToggleEnable}
          />
          <Label htmlFor="countdown-enabled">Enable countdown timer</Label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="days">Days</Label>
            <Input 
              id="days" 
              name="days" 
              type="number" 
              value={settings.days} 
              onChange={handleChange}
              min="0"
              max="999"
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input 
              id="hours" 
              name="hours" 
              type="number" 
              value={settings.hours} 
              onChange={handleChange}
              min="0"
              max="23"
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input 
              id="minutes" 
              name="minutes" 
              type="number" 
              value={settings.minutes} 
              onChange={handleChange}
              min="0"
              max="59"
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seconds">Seconds</Label>
            <Input 
              id="seconds" 
              name="seconds" 
              type="number" 
              value={settings.seconds} 
              onChange={handleChange}
              min="0"
              max="59"
              disabled={!settings.enabled}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>Reset</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default AdminCountdown;
