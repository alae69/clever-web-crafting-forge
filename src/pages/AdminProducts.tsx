
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Package } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/components/ProductCard';
import { Switch } from '@/components/ui/switch';

const AdminProducts = () => {
  const { products, updateProduct } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const handleEdit = (product: Product) => {
    setEditingProduct({...product});
  };
  
  const handleSave = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
      toast({
        title: "Product updated",
        description: `${editingProduct.name} has been updated successfully.`,
      });
    }
  };
  
  const handleCancel = () => {
    setEditingProduct(null);
  };
  
  const handleEditChange = (field: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value
      });
    }
  };
  
  const toggleStock = (product: Product) => {
    const updatedProduct = { 
      ...product, 
      inStock: !product.inStock,
      stockQuantity: !product.inStock ? (product.stockQuantity || 1) : 0
    };
    updateProduct(updatedProduct);
    toast({
      title: updatedProduct.inStock ? "Product is now in stock" : "Product is now out of stock",
      description: `${product.name} has been updated.`
    });
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Package className="mr-2 h-6 w-6" />
          Product Management
        </h1>
        <Link to="/admin">
          <Button variant="outline">Back to Admin</Button>
        </Link>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price (MAD)</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stockQuantity || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={product.inStock || false} 
                          onCheckedChange={() => toggleStock(product)}
                        />
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Name</label>
                  <Input 
                    value={editingProduct.name} 
                    onChange={(e) => handleEditChange('name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Price (MAD)</label>
                  <Input 
                    type="number"
                    value={editingProduct.price} 
                    onChange={(e) => handleEditChange('price', Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Category</label>
                  <Input 
                    value={editingProduct.category || ''} 
                    onChange={(e) => handleEditChange('category', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Stock Quantity</label>
                  <Input 
                    type="number"
                    value={editingProduct.stockQuantity || 0} 
                    onChange={(e) => handleEditChange('stockQuantity', Number(e.target.value))}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={editingProduct.inStock || false} 
                    onCheckedChange={(checked) => handleEditChange('inStock', checked)}
                  />
                  <label className="text-sm font-medium">In Stock</label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
