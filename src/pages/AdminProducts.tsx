
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Package, Trash2, Plus } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/components/ProductCard';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminProducts = () => {
  const { products, updateProduct, deleteProduct, addProduct } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: '',
    stockQuantity: 1,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    rating: 4,
  });
  
  const handleEdit = (product: Product) => {
    setEditingProduct({...product});
  };
  
  const handleSave = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
      toast.success(`${editingProduct.name} has been updated successfully.`);
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
    toast.success(updatedProduct.inStock ? "Product is now in stock" : "Product is now out of stock");
  };

  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
  };

  const closeDeleteDialog = () => {
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      toast.success(`${productToDelete.name} has been deleted.`);
      closeDeleteDialog();
    }
  };

  const openAddProductDialog = () => {
    setIsAddingProduct(true);
  };

  const closeAddProductDialog = () => {
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      price: 0,
      category: '',
      stockQuantity: 1,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      rating: 4,
    });
  };

  const handleNewProductChange = (field: keyof Product, value: any) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price === undefined) {
      toast.error("Product name and price are required.");
      return;
    }
    
    addProduct(newProduct as Product);
    toast.success(`${newProduct.name} has been added successfully.`);
    closeAddProductDialog();
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Package className="mr-2 h-6 w-6" />
          Product Management
        </h1>
        <div className="flex gap-3">
          <Button 
            onClick={openAddProductDialog} 
            variant="default" 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          <Link to="/admin">
            <Button variant="outline">Back to Admin</Button>
          </Link>
        </div>
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
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => openDeleteDialog(product)}
                        >
                          <Trash2 className="h-4 w-4" />
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
      
      {/* Edit Product Dialog */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(productToDelete)} onOpenChange={closeDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={isAddingProduct} onOpenChange={closeAddProductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name *</label>
              <Input 
                value={newProduct.name || ''} 
                onChange={(e) => handleNewProductChange('name', e.target.value)}
                placeholder="Product name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (MAD) *</label>
              <Input 
                type="number"
                value={newProduct.price || ''} 
                onChange={(e) => handleNewProductChange('price', Number(e.target.value))}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input 
                value={newProduct.category || ''} 
                onChange={(e) => handleNewProductChange('category', e.target.value)}
                placeholder="Category (e.g. boys, girls, baby)"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={newProduct.description || ''} 
                onChange={(e) => handleNewProductChange('description', e.target.value)}
                placeholder="Product description"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                value={newProduct.image || ''} 
                onChange={(e) => handleNewProductChange('image', e.target.value)}
                placeholder="https://..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Quantity</label>
              <Input 
                type="number"
                value={newProduct.stockQuantity || 0} 
                onChange={(e) => handleNewProductChange('stockQuantity', Number(e.target.value))}
                placeholder="0"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                checked={newProduct.inStock || false} 
                onCheckedChange={(checked) => handleNewProductChange('inStock', checked)}
              />
              <label className="text-sm font-medium">In Stock</label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeAddProductDialog}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
