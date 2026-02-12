'use client';

import { ExpiryItemWithStatus } from '@/lib/types';
import { getStatusColors } from '@/lib/expiry-utils';
import { getItemIcon, getItemAccent } from '@/lib/item-icons';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3 } from 'lucide-react';

interface ExpiryItemCardProps {
  item: ExpiryItemWithStatus;
  onEdit: (item: ExpiryItemWithStatus) => void;
  onDelete: (id: number) => void;
}

export function ExpiryItemCard({ item, onEdit, onDelete }: ExpiryItemCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const colors = getStatusColors(item.status);
  const ItemIcon = getItemIcon(item.name);
  const accent = getItemAccent(item.name);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setIsDeleting(true);
      await onDelete(item.id);
    }
  };

  const expDate = new Date(item.expiry_date);
  const year = expDate.getFullYear();
  const month = expDate.toLocaleString('en-US', { month: 'short' });
  const day = expDate.getDate();

  const card = (
    <Card
      textured
      className={`
        relative border-2 transition-all duration-300
        ${colors.bg} ${colors.border} ${colors.glow}
        ${accent.borderLeft}
        ${isDeleting ? 'opacity-50' : ''}
        overflow-hidden
      `}
    >
      {/* Status tint overlay */}
      <div className={`absolute inset-0 ${colors.tint} pointer-events-none`} />
      {/* Diagonal accent stripe */}
      <div
        className="absolute -right-12 -top-12 h-32 w-32 rotate-45 bg-white/20 pointer-events-none"
      />

      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg pointer-events-none" />

      <motion.div
        className="absolute inset-0 bg-white/30 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 relative z-10">
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ rotate: isHovered ? [0, -8, 8, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className={`flex shrink-0 w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center shadow-sm`}
          >
            <ItemIcon className="w-6 h-6 text-white" />
          </motion.div>
          <h3 className={`text-xl font-semibold ${colors.text}`}>{item.name}</h3>
        </div>
        <Badge
          variant="outline"
          className={`
            ${colors.bg} ${colors.text} border ${colors.border}
            uppercase text-xs font-medium
          `}
        >
          {item.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        <motion.div
          className={`space-y-2 ${colors.text}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold">{year}</p>
            <p className="text-lg font-medium opacity-75">
              {month} {day}
            </p>
          </div>
          <motion.p
            className="text-sm opacity-75 font-medium"
            animate={{
              scale: item.status === 'critical' ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: item.status === 'critical' ? Infinity : 0,
            }}
          >
            {item.daysUntilExpiry === 0
              ? '⚠️ Expires today!'
              : item.daysUntilExpiry < 0
                ? `Expired ${Math.abs(item.daysUntilExpiry)} days ago`
                : `${item.daysUntilExpiry} days left`}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => onEdit(item)}
            variant="outline"
            size="sm"
            disabled={isDeleting}
            className="border-border hover:bg-background gap-2 flex-1"
          >
            <Edit3 className="w-3 h-3" />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            className="gap-2 flex-1"
          >
            {isDeleting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-3 h-3" />
                Delete
              </>
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {card}
    </motion.div>
  );
}
