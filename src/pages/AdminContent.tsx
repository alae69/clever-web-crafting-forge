
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePageContentStore, PageContentStore } from '@/store/pageContentStore';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const AdminContent = () => {
  const { pages, updatePage } = usePageContentStore();
  const [editableContent, setEditableContent] = React.useState<PageContentStore>(pages);

  const handleSave = (page: keyof PageContentStore) => {
    updatePage(page, editableContent[page]);
    toast({
      title: "Content updated",
      description: `${page} page content has been updated successfully.`,
    });
  };

  const handleChange = (page: keyof PageContentStore, field: 'title' | 'content', value: string) => {
    setEditableContent({
      ...editableContent,
      [page]: {
        ...editableContent[page],
        [field]: value
      }
    });
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Link to="/admin">
          <Button variant="outline">Back to Admin</Button>
        </Link>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        {Object.keys(pages).map((page) => (
          <TabsContent key={page} value={page} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit {page.charAt(0).toUpperCase() + page.slice(1)} Page</CardTitle>
                <CardDescription>
                  Update the title and content for the {page} page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${page}-title`}>Title</Label>
                  <Input
                    id={`${page}-title`}
                    value={editableContent[page as keyof PageContentStore].title}
                    onChange={(e) => handleChange(page as keyof PageContentStore, 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${page}-content`}>Content</Label>
                  <Textarea
                    id={`${page}-content`}
                    rows={10}
                    value={editableContent[page as keyof PageContentStore].content}
                    onChange={(e) => handleChange(page as keyof PageContentStore, 'content', e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSave(page as keyof PageContentStore)}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminContent;
