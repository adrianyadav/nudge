'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ExpiryItemForm } from '@/components/expiry-item-form';
import { ExpiryItemList } from '@/components/expiry-item-list';
import { getItemsAction } from '@/app/actions/item-actions';
import { ExpiryItemWithStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function Dashboard() {
  const { data: session } = useSession();
  const [items, setItems] = useState<ExpiryItemWithStatus[]>([]);
  const [editingItem, setEditingItem] = useState<ExpiryItemWithStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    const data = await getItemsAction();
    setItems(data);
    setIsLoading(false);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    loadItems();
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl float-slow" />
      <div className="blob blob-2 float-medium" />

      {/* Abstract line shapes */}
      <div className="absolute top-1/4 right-[5%] w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/3 left-[8%] w-24 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r bg-primary bg-clip-text text-transparent mb-2">
              Nudge
            </h1>
     
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-medium text-gray-800">
                {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-border hover:bg-background gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        </motion.header>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <ExpiryItemForm
            editingItem={editingItem}
            onCancelEdit={handleCancelEdit}
            onItemCreated={loadItems}
          />
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-12 h-12 border-4 border-border border-t-primary rounded-full"
              />
              <p className="text-gray-500 mt-4">Loading your items...</p>
            </div>
          ) : (
            <ExpiryItemList items={items} onEditItem={setEditingItem} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
